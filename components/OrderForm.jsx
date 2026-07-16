"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "./supabaseClient";

/* ── Pricing data ── */
const SERVICES = {
  bigbag: {
    title: "Zamów Big-Bag 1m³",
    quantityLabel: "Ilość worków *",
    sizes: null,
    waste: [
      { key: "gruz", label: "Gruz", price: "299 zł", base: 299, sub: "brutto, VAT 8%" },
      { key: "zmieszane", label: "Zmieszane", price: "390 zł", base: 390, sub: "brutto, VAT 8%" },
    ],
  },
  kontener: {
    title: "Zamów Kontener",
    quantityLabel: "Ilość kontenerów *",
    sizes: [
      { key: "5m3", label: "5m³", sub: "Idealny na remonty" },
      { key: "7m3", label: "7m³", sub: "Większe projekty" },
    ],
    wasteBySize: {
      "5m3": [
        { key: "gruz", label: "Gruz", price: "390 zł", base: 390, sub: "brutto, VAT 8%" },
        { key: "zmieszane", label: "Zmieszane", price: "1190 zł", base: 1190, sub: "brutto, VAT 8%" },
      ],
      "7m3": [{ key: "zmieszane", label: "Zmieszane", price: "1390 zł", base: 1390, sub: "brutto, VAT 8%" }],
    },
  },
};

/* ── Delivery pricing (ported from Order.jsx) ── */
const DEPOT = { lat: 53.14717, lon: 23.17618 }; // baza BIALGRUZ
const TRANSPORT_RATE = 10.8; // zł za km

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function geocode(query) {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (data && data[0]) return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  return null;
}

// Parser współrzędnych / linku do map (jak w Order.jsx)
function parseCoordinates(input) {
  if (!input) return null;
  const m = String(input).trim().match(/(-?\d{1,3}(?:\.\d+))[^0-9-]+(-?\d{1,3}(?:\.\d+))/);
  if (!m) return null;
  const lat = parseFloat(m[1]);
  const lon = parseFloat(m[2]);
  if (!isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  return { lat, lon };
}

const PAYMENT_METHODS = [
  { key: "gotówka", label: "Gotówka" },
  { key: "karta", label: "Karta / BLIK" },
  { key: "przelew", label: "Przelew" },
];

// Kolejny numer zlecenia: kontenery = BIALxxxx, toalety = TOAxxxx
async function generateOrderNumber(table, prefix) {
  const { data, error } = await supabase
    .from(table)
    .select("numerZlecenia, id")
    .order("id", { ascending: false })
    .limit(1);
  if (error || !data?.length || !data[0]?.numerZlecenia) return `${prefix}0001`;
  const match = data[0].numerZlecenia.match(new RegExp(`${prefix}(\\d+)`));
  const next = match ? parseInt(match[1], 10) + 1 : 1;
  return `${prefix}${next.toString().padStart(4, "0")}`;
}

const TOILET_SERVICES = {
  t7dni: { title: "Zamów toaletę — 7 dni", quantityLabel: "Ilość toalet *", sizes: null, noWaste: true, base: 199 },
  t1m1s: { title: "Zamów toaletę — 1 miesiąc", quantityLabel: "Ilość toalet *", sizes: null, noWaste: true, base: 249 },
  t1m2s: { title: "Zamów toaletę — 1 miesiąc", quantityLabel: "Ilość toalet *", sizes: null, noWaste: true, base: 349 },
  t1m4s: { title: "Zamów toaletę — 1 miesiąc", quantityLabel: "Ilość toalet *", sizes: null, noWaste: true, base: 479 },
};

// Typ toalety
const TOILET_TYPES = [
  { key: "std", label: "Standardowa", sub: "Klasyczna kabina" },
  { key: "umywalka", label: "Z umywalką", sub: "Z umywalką i zbiornikiem na wodę" },
];

// Wyposażenie dodatkowe (ceny brutto). perOrder = dopłata raz za zamówienie, reszta per toaleta.
const TOILET_ADDONS_BASE = [
  { key: "kosz", label: "Kosz na śmieci", price: 30 },
  { key: "swiatlo", label: "Oświetlenie wewnątrz", price: 49 },
  { key: "express", label: "Dostawa Express (w ciągu 12h)", price: 200, perOrder: true },
];
const TOILET_ADDONS_UMYWALKA = [
  { key: "mydlo", label: "Dozownik z mydłem", price: 49 },
  { key: "reczniki", label: "Podajnik z ręcznikami papierowymi", price: 59 },
];

// Limit dojazdu dla toalet: do 100 km cena z listy, powyżej — wycena indywidualna
const TOILET_FREE_RADIUS_KM = 100;

// Tabele Supabase per tryb
const TABLE_BY_MODE = { kontenery: "Zamówienia", toalety: "ToaletyZamowienia" };
const PREFIX_BY_MODE = { kontenery: "BIAL", toalety: "TOA" };

// Pakiety (kontener + toaleta). Cena bazowa stała, dojazd doliczany jak przy kontenerze.
const PACKAGES = [
  {
    key: "pkgRemont",
    label: "Pakiet Remont Gruz",
    base: 999,
    save: 438,
    items: ["Kontener 5m³", "Toaleta przenośna na 3 miesiące (2 serwisy/mies.)"],
  },
  {
    key: "pkgStandard",
    label: "Pakiet Budowa Standard",
    base: 1890,
    save: 696,
    items: ["Kontener 5m³", "Toaleta przenośna na 4 miesiące (2 serwisy/mies.)"],
  },
  {
    key: "pkgMax",
    label: "Pakiet Budowa Max",
    base: 2790,
    save: 1115,
    items: [
      "Kontener 7m³",
      "Toaleta przenośna na 5 miesięcy (4 serwisy/mies.)",
      "GRATIS: Big Bag 1m³ na czysty gruz",
    ],
  },
];

const PACKAGE_SERVICES = Object.fromEntries(
  PACKAGES.map((p) => [
    p.key,
    { title: `Zamów ${p.label}`, label: p.label, quantityLabel: "Ilość pakietów *", sizes: null, noWaste: true, base: p.base, isPackage: true },
  ])
);

const SERVICE_LISTS = {
  kontenery: [
    { key: "bigbag", label: "Big-Bag 1m³", sub: "od 299 zł brutto" },
    { key: "kontener", label: "Kontener", sub: "od 390 zł brutto" },
  ],
  toalety: [
    { key: "t7dni", label: "7 dni · 1 serwis", price: "199 zł", sub: "184,26 zł netto" },
    { key: "t1m1s", label: "1 miesiąc · 1 serwis", price: "249 zł", sub: "230,56 zł netto" },
    { key: "t1m2s", label: "1 miesiąc · 2 serwisy", price: "349 zł", sub: "323,15 zł netto" },
    { key: "t1m4s", label: "1 miesiąc · 4 serwisy", price: "479 zł", sub: "443,52 zł netto" },
  ],
};

/* ── Option card ── */
function OptCard({ item, selected, onClick, error }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative min-w-[140px] flex-1 select-none rounded-xl border bg-[#0f1012] p-4 px-5 text-left transition-all duration-200 ${
        error ? "border-[#f04a4a]" : selected ? "border-gold ring-1 ring-gold-dark" : "border-[#2a2b30]"
      } ${selected ? "-translate-y-0.5 bg-[rgba(245,200,66,0.06)]" : "hover:-translate-y-0.5 hover:border-gold-dark"}`}
    >
      <span
        className={`absolute right-2.5 top-2.5 grid h-5 w-5 place-items-center rounded-full border text-[10px] transition-all ${
          selected ? "border-gold bg-gold font-bold text-[#0f1012]" : "border-[#2a2b30]"
        }`}
      >
        {selected ? "✓" : ""}
      </span>
      <span className={`mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.5px] ${selected ? "text-gold" : "text-[#7a7a82]"}`}>
        {item.label}
      </span>
      {item.price && <span className="block font-display text-[20px] font-extrabold leading-[1.1] text-[#f0ede8]">{item.price}</span>}
      <span className="mt-1 block text-[11px] italic text-[#7a7a82]">{item.sub}</span>
    </button>
  );
}

const inputCls =
  "w-full rounded-[10px] border border-[#2a2b30] bg-[#0f1012] px-4 py-3.5 text-[15px] font-light text-[#f0ede8] outline-none transition-all placeholder:text-[#5c5c63] focus:border-gold focus:shadow-[0_0_0_3px_rgba(245,200,66,0.1)]";
const labelCls = "text-[12px] font-medium uppercase tracking-[0.7px] text-[#7a7a82]";
const sectionLabelCls = "col-span-full mt-1 text-[11px] font-semibold uppercase tracking-[1.2px] text-[#7a7a82]";
const dividerCls = "col-span-full my-1 border-t border-[#2a2b30]";

export default function OrderForm({ mode = "kontenery" }) {
  const serviceList = SERVICE_LISTS[mode] || SERVICE_LISTS.kontenery;
  const services = mode === "toalety" ? { ...TOILET_SERVICES, ...PACKAGE_SERVICES } : { ...SERVICES, ...PACKAGE_SERVICES };

  const [currentType, setCurrentType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [orderNumber, setOrderNumber] = useState(null);
  const [useCoords, setUseCoords] = useState(false);
  const [coordsInput, setCoordsInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [individualQuote, setIndividualQuote] = useState(false);
  const [toiletType, setToiletType] = useState(null);
  const [addons, setAddons] = useState({}); // { kosz: true, ... }
  const [fields, setFields] = useState({
    name: "", phone: "", email: "", company: "", address: "", postcode: "", city: "", date: "", quantity: "1", notes: "",
  });

  const svc = currentType ? services[currentType] : null;
  const isToilet = mode === "toalety";
  const needsPrice = true; // oba tryby: wymagamy adresu/dojazdu i płatności
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const wasteOptions = useMemo(() => {
    if (!svc || svc.noWaste) return null;
    if (svc.sizes) return selectedSize ? svc.wasteBySize[selectedSize] : null;
    return svc.waste;
  }, [svc, selectedSize]);

  // Dostępne wyposażenie dodatkowe (mydło/ręczniki tylko dla toalety z umywalką)
  const availableAddons = useMemo(() => {
    if (!isToilet) return [];
    return toiletType === "umywalka"
      ? [...TOILET_ADDONS_UMYWALKA, ...TOILET_ADDONS_BASE]
      : TOILET_ADDONS_BASE;
  }, [isToilet, toiletType]);

  // Dopłaty per toaleta (mnożone przez ilość)
  const unitAddonsTotal = useMemo(
    () => availableAddons.reduce((sum, a) => (addons[a.key] && !a.perOrder ? sum + a.price : sum), 0),
    [availableAddons, addons]
  );
  // Dopłaty per zamówienie (np. Dostawa Express — raz)
  const orderAddonsTotal = useMemo(
    () => availableAddons.reduce((sum, a) => (addons[a.key] && a.perOrder ? sum + a.price : sum), 0),
    [availableAddons, addons]
  );

  // Bazowa cena za sztukę: toalety = cena usługi + wyposażenie, pakiet = cena pakietu, kontenery = wg rozmiaru + odpadu
  const basePrice = useMemo(() => {
    if (svc?.isPackage) return svc.base;
    if (isToilet) return svc ? (svc.base ?? 0) + unitAddonsTotal : null;
    if (!wasteOptions || !selectedWaste) return null;
    return wasteOptions.find((w) => w.key === selectedWaste)?.base ?? null;
  }, [isToilet, svc, unitAddonsTotal, wasteOptions, selectedWaste]);

  // Reset wyceny po każdej zmianie wpływającej na cenę
  function clearEstimate() {
    setEstimatedPrice(null);
    setIndividualQuote(false);
    setPriceError("");
  }

  async function calcPrice() {
    if (basePrice === null) {
      setPriceError(isToilet ? "Najpierw wybierz usługę." : "Najpierw wybierz usługę, rozmiar i rodzaj odpadów.");
      return;
    }
    setPriceLoading(true);
    setPriceError("");
    setIndividualQuote(false);
    try {
      let coords;
      if (useCoords) {
        coords = parseCoordinates(coordsInput);
        if (!coords) {
          setEstimatedPrice(null);
          setPriceError("Podaj poprawne współrzędne lub link do map.");
          return;
        }
      } else {
        const query = `${fields.address} ${fields.postcode} ${fields.city}`.trim();
        if (query.length < 6) {
          setPriceError("Podaj adres, kod pocztowy i miasto dostawy.");
          return;
        }
        coords = await geocode(query);
        if (!coords) {
          setEstimatedPrice(null);
          setPriceError("Nie udało się zlokalizować adresu. Sprawdź dane.");
          return;
        }
      }
      const distance = calculateDistance(DEPOT.lat, DEPOT.lon, coords.lat, coords.lon);
      const qty = Math.max(1, parseInt(fields.quantity, 10) || 1);

      if (svc?.isPackage) {
        // pakiet: cena pakietu + dojazd
        setEstimatedPrice(Math.round((basePrice + distance * TRANSPORT_RATE) * qty));
      } else if (isToilet) {
        // do 100 km cena z listy, powyżej — wycena indywidualna
        if (distance > TOILET_FREE_RADIUS_KM) {
          setEstimatedPrice(null);
          setIndividualQuote(true);
        } else {
          setEstimatedPrice(basePrice * qty + orderAddonsTotal);
        }
      } else {
        setEstimatedPrice(Math.round((basePrice + distance * TRANSPORT_RATE) * qty));
      }
    } catch {
      setEstimatedPrice(null);
      setPriceError("Błąd wyceny. Spróbuj ponownie.");
    } finally {
      setPriceLoading(false);
    }
  }

  function setField(k, v) {
    setFields((f) => ({ ...f, [k]: v }));
  }

  function pickService(key) {
    setCurrentType(key);
    setSelectedSize(null);
    setSelectedWaste(null);
    setErrors((e) => ({ ...e, service: false }));
    clearEstimate();
  }

  function pickToiletType(key) {
    setToiletType(key);
    // Bez umywalki: usuń dopłaty za mydło/ręczniki
    if (key !== "umywalka") {
      setAddons((a) => {
        const { mydlo, reczniki, ...rest } = a;
        return rest;
      });
    }
    setErrors((e) => ({ ...e, toiletType: false }));
    clearEstimate();
  }

  function toggleAddon(key) {
    setAddons((a) => ({ ...a, [key]: !a[key] }));
    clearEstimate();
  }

  async function submit() {
    const errs = {};
    if (!currentType) errs.service = true;
    ["name", "phone", "date"].forEach((k) => {
      if (!fields[k].trim()) errs[k] = true;
    });
    if (useCoords) {
      if (!parseCoordinates(coordsInput)) errs.coords = true;
    } else {
      ["address", "postcode", "city"].forEach((k) => {
        if (!fields[k].trim()) errs[k] = true;
      });
    }
    if (svc && svc.sizes && !selectedSize) errs.size = true;
    if (svc && !svc.noWaste && !selectedWaste) errs.waste = true;
    if (isToilet && currentType && !svc?.isPackage && !toiletType) errs.toiletType = true;
    if (needsPrice && !paymentMethod) errs.platnosc = true;

    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Wymagamy policzonej wyceny (lub potwierdzonej wyceny indywidualnej dla toalet)
    if (needsPrice && estimatedPrice === null && !individualQuote) {
      setPriceError(
        isToilet
          ? "Sprawdź dostępność / koszt dostawy przed wysłaniem."
          : "Oblicz szacowany koszt dostawy przed wysłaniem."
      );
      return;
    }

    // Etykiety zgodne z cennikiem / panelem admin
    const serviceLabel = svc?.isPackage ? svc.label : serviceList.find((s) => s.key === currentType)?.label || "";
    const sizeLabel = selectedSize ? svc.sizes?.find((s) => s.key === selectedSize)?.label : "";
    const typeLabel = isToilet ? TOILET_TYPES.find((t) => t.key === toiletType)?.label : null;
    const rodzajuslugi = svc?.sizes
      ? `${serviceLabel} ${sizeLabel}`.trim()
      : isToilet && typeLabel
      ? `${serviceLabel} · ${typeLabel}`
      : serviceLabel;
    const rodzajodpadu = wasteOptions?.find((w) => w.key === selectedWaste)?.label || null;

    const selectedAddonLabels = availableAddons.filter((a) => addons[a.key]).map((a) => a.label);
    const [firstName, ...rest] = fields.name.trim().split(/\s+/);
    const message = [
      fields.notes.trim(),
      isToilet && selectedAddonLabels.length ? `Wyposażenie: ${selectedAddonLabels.join(", ")}` : "",
      `Ilość: ${fields.quantity}`,
    ]
      .filter(Boolean)
      .join(" | ");
    const coords = useCoords ? parseCoordinates(coordsInput) : null;

    const payload = {
      name: firstName || fields.name.trim(),
      forname: rest.join(" ") || null,
      phone: fields.phone.trim(),
      email: fields.email.trim() || null,
      nip: fields.company.trim() || null,
      rodzajuslugi,
      rodzajodpadu,
      address: useCoords ? "" : fields.address.trim(),
      postcode: useCoords ? "" : fields.postcode.trim(),
      city: useCoords ? "" : fields.city.trim(),
      koordynaty: coords ? `${coords.lat}, ${coords.lon}` : null,
      message,
      platnosc: paymentMethod || null,
      szacowany: individualQuote ? "Wycena indywidualna" : estimatedPrice != null ? estimatedPrice.toString() : null,
      dataDostawy: fields.date || null,
      Status: "Do realizacji",
    };

    const table = TABLE_BY_MODE[mode] || TABLE_BY_MODE.kontenery;
    const prefix = PREFIX_BY_MODE[mode] || PREFIX_BY_MODE.kontenery;
    setSubmitting(true);
    setSubmitError("");
    try {
      const numerZlecenia = await generateOrderNumber(table, prefix);
      const { error } = await supabase.from(table).insert([{ ...payload, numerZlecenia }]);
      if (error) throw error;
      setOrderNumber(numerZlecenia);
      setSubmitted(true);
    } catch (err) {
      console.error("Błąd zapisu zamówienia:", err);
      const detail = err?.message || err?.details || err?.hint || "";
      setSubmitError(
        `Nie udało się wysłać zamówienia. Spróbuj ponownie lub zadzwoń do nas.${detail ? ` (${detail})` : ""}`
      );
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setFields({ name: "", phone: "", email: "", company: "", address: "", postcode: "", city: "", date: "", quantity: "1", notes: "" });
    setCurrentType(null);
    setSelectedSize(null);
    setSelectedWaste(null);
    setErrors({});
    setSubmitted(false);
    setSubmitError("");
    setOrderNumber(null);
    setUseCoords(false);
    setCoordsInput("");
    setPaymentMethod("");
    setIndividualQuote(false);
    setToiletType(null);
    setAddons({});
    clearEstimate();
  }

  return (
    <div className="mx-auto w-full max-w-[1140px] text-left font-sans text-[#f0ede8]">
      {/* Step bar */}
      <div className="mb-9 flex items-center justify-center gap-3">
        <Step active={!submitted} done={submitted} num="1" label="Dane zamówienia" />
        <span className="h-px max-w-[60px] flex-1 bg-[#2a2b30]" />
        <Step active={submitted} done={submitted} num="2" label="Potwierdzenie" />
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-9">
              <h2 className="font-display text-[26px] font-extrabold tracking-[-0.5px] text-gold">
                {svc ? svc.title : "Zamów online"}
              </h2>
              <p className="mt-1 text-[14px] text-[#7a7a82]">
                Wybierz usługę i wypełnij dane — wycenę zobaczysz od razu na stronie.
              </p>
            </div>

            <div className="rounded-2xl border border-[#2a2b30] bg-[#18191d] p-6 sm:p-10">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className={sectionLabelCls}>Rodzaj usługi *</div>
                <div className="col-span-full flex flex-wrap gap-3">
                  {serviceList.map((s) => (
                    <OptCard key={s.key} item={s} selected={currentType === s.key} error={errors.service} onClick={() => pickService(s.key)} />
                  ))}
                </div>

                {(
                  <>
                    <div className={`${sectionLabelCls} flex items-center gap-2`}>
                      Pakiety <span className="rounded bg-brand-yellow px-1.5 py-0.5 text-[9px] font-bold text-ink-black">Oszczędzasz</span>
                    </div>
                    <div className="col-span-full grid grid-cols-1 gap-3 md:grid-cols-3">
                      {PACKAGES.map((p) => {
                        const selected = currentType === p.key;
                        return (
                          <button
                            type="button"
                            key={p.key}
                            onClick={() => pickService(p.key)}
                            className={`relative flex flex-col overflow-hidden rounded-xl border p-5 text-left transition-all ${
                              selected ? "border-gold bg-[rgba(245,200,66,0.06)] ring-1 ring-gold-dark" : "border-[#2a2b30] bg-[#0f1012] hover:border-gold-dark"
                            }`}
                          >
                            <span className="absolute right-3 top-3 rounded bg-brand-yellow/15 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-brand-yellow">
                              −{p.save} zł
                            </span>
                            <span className={`font-display text-[16px] font-extrabold uppercase tracking-[0.5px] ${selected ? "text-gold" : "text-[#f0ede8]"}`}>
                              {p.label}
                            </span>
                            <ul className="mt-3 flex flex-1 flex-col gap-1.5">
                              {p.items.map((it) => (
                                <li key={it} className="flex items-start gap-2 text-[12.5px] leading-snug text-[#a8a5a0]">
                                  <span className="mt-[3px] text-brand-yellow">✓</span>
                                  <span>{it}</span>
                                </li>
                              ))}
                            </ul>
                            <span className="mt-4 font-display text-[24px] font-extrabold text-gold">
                              {p.base} zł <span className="text-[12px] font-normal text-[#7a7a82]">brutto</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                <Field label={svc ? svc.quantityLabel : "Ilość *"}>
                  <input className={inputCls} type="number" min="1" max="20" value={fields.quantity} onChange={(e) => { setField("quantity", e.target.value); clearEstimate(); }} />
                </Field>

                {svc && svc.sizes && (
                  <>
                    <hr className={dividerCls} />
                    <div className={sectionLabelCls}>Rozmiar kontenera *</div>
                    <div className="col-span-full flex flex-wrap gap-3">
                      {svc.sizes.map((s) => (
                        <OptCard
                          key={s.key}
                          item={s}
                          selected={selectedSize === s.key}
                          error={errors.size}
                          onClick={() => {
                            setSelectedSize(s.key);
                            setSelectedWaste(null);
                            setErrors((e) => ({ ...e, size: false }));
                            clearEstimate();
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}

                {svc && !svc.noWaste && (
                  <>
                    <hr className={dividerCls} />
                    <div className={sectionLabelCls}>Rodzaj odpadów *</div>
                    <div className="col-span-full flex flex-wrap gap-3">
                      {wasteOptions ? (
                        wasteOptions.map((w) => (
                          <OptCard
                            key={w.key}
                            item={w}
                            selected={selectedWaste === w.key}
                            error={errors.waste}
                            onClick={() => {
                              setSelectedWaste(w.key);
                              setErrors((e) => ({ ...e, waste: false }));
                              clearEstimate();
                            }}
                          />
                        ))
                      ) : (
                        <div className="text-[13px] italic text-[#7a7a82]">← Najpierw wybierz rozmiar</div>
                      )}
                    </div>
                  </>
                )}

                {isToilet && svc && !svc.isPackage && (
                  <>
                    <hr className={dividerCls} />
                    <div className={sectionLabelCls}>Typ toalety *</div>
                    <div className="col-span-full flex flex-wrap gap-3">
                      {TOILET_TYPES.map((t) => (
                        <OptCard
                          key={t.key}
                          item={t}
                          selected={toiletType === t.key}
                          error={errors.toiletType}
                          onClick={() => pickToiletType(t.key)}
                        />
                      ))}
                    </div>

                    {toiletType && (
                      <>
                        <hr className={dividerCls} />
                        <div className={sectionLabelCls}>Wyposażenie dodatkowe</div>
                        <div className="col-span-full grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {availableAddons.map((a) => {
                            const checked = !!addons[a.key];
                            return (
                              <button
                                type="button"
                                key={a.key}
                                onClick={() => toggleAddon(a.key)}
                                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                                  checked ? "border-gold bg-[rgba(245,200,66,0.06)]" : "border-[#2a2b30] hover:border-gold-dark"
                                }`}
                              >
                                <span className="flex items-center gap-3">
                                  <span
                                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border text-[11px] ${
                                      checked ? "border-gold bg-gold font-bold text-[#0f1012]" : "border-[#2a2b30]"
                                    }`}
                                  >
                                    {checked ? "✓" : ""}
                                  </span>
                                  <span className="text-[14px] text-[#f0ede8]">{a.label}</span>
                                </span>
                                <span className="shrink-0 font-display text-[14px] font-bold text-gold">+{a.price} zł</span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </>
                )}

                <hr className={dividerCls} />
                <div className={sectionLabelCls}>Dane kontaktowe</div>

                <Field label="Imię i nazwisko *" error={errors.name}>
                  <input className={inputCls} placeholder="Jan Kowalski" value={fields.name} onChange={(e) => setField("name", e.target.value)} />
                </Field>
                <Field label="Telefon *" error={errors.phone}>
                  <input className={inputCls} placeholder="+48 500 000 000" value={fields.phone} onChange={(e) => setField("phone", e.target.value)} />
                </Field>
                <Field label="E-mail">
                  <input className={inputCls} type="email" placeholder="jan@firma.pl" value={fields.email} onChange={(e) => setField("email", e.target.value)} />
                </Field>
                <Field label="Firma (opcjonalnie)">
                  <input className={inputCls} placeholder="Nazwa firmy / NIP" value={fields.company} onChange={(e) => setField("company", e.target.value)} />
                </Field>

                <hr className={dividerCls} />
                <div className={sectionLabelCls}>Szczegóły dostawy</div>

                <label className="col-span-full flex cursor-pointer items-center gap-2.5 text-[13px] text-[#f0ede8]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#f5c842]"
                    checked={useCoords}
                    onChange={(e) => {
                      setUseCoords(e.target.checked);
                      clearEstimate();
                      setErrors((er) => ({ ...er, address: false, postcode: false, city: false, coords: false }));
                    }}
                  />
                  Nie mam adresu — podam współrzędne / link do map
                </label>

                {!useCoords ? (
                  <>
                    <Field label="Adres dostawy *" error={errors.address}>
                      <input className={inputCls} placeholder="ul. Budowlana 12" value={fields.address} onChange={(e) => { setField("address", e.target.value); clearEstimate(); }} />
                    </Field>
                    <Field label="Kod pocztowy *" error={errors.postcode}>
                      <input className={inputCls} placeholder="15-000" value={fields.postcode} onChange={(e) => { setField("postcode", e.target.value); clearEstimate(); }} />
                    </Field>
                    <Field label="Miasto *" error={errors.city}>
                      <input className={inputCls} placeholder="Białystok" value={fields.city} onChange={(e) => { setField("city", e.target.value); clearEstimate(); }} />
                    </Field>
                  </>
                ) : (
                  <Field label="Współrzędne (lat, lon) lub link do map *" error={errors.coords}>
                    <input
                      className={inputCls}
                      placeholder="53.415, 23.015"
                      value={coordsInput}
                      onChange={(e) => { setCoordsInput(e.target.value); clearEstimate(); setErrors((er) => ({ ...er, coords: false })); }}
                    />
                  </Field>
                )}
                <Field label="Preferowana data dostawy *" error={errors.date}>
                  <input className={inputCls} type="date" min={today} value={fields.date} onChange={(e) => setField("date", e.target.value)} />
                </Field>

                {needsPrice && (
                  <div className="col-span-full flex flex-col gap-3 rounded-xl border border-[#2a2b30] bg-[#0f1012] p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className={labelCls}>{isToilet ? "Koszt / dostępność dojazdu" : "Szacowany koszt (usługa + dojazd)"}</div>
                        <p className="mt-1 text-[12px] italic text-[#7a7a82]">
                          {isToilet
                            ? "Do 100 km cena z cennika. Powyżej 100 km — wycena indywidualna."
                            : "Wyliczany na podstawie adresu dostawy i wybranej usługi."}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={calcPrice}
                        disabled={priceLoading}
                        className="rounded-full border border-gold px-6 py-3 font-display text-[14px] font-bold uppercase tracking-[-0.2px] text-gold transition-all hover:bg-gold hover:text-[#0f1012] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {priceLoading ? "Liczenie…" : isToilet ? "Sprawdź koszt" : "Oblicz koszt dostawy"}
                      </button>
                    </div>
                    {estimatedPrice !== null && (
                      <div className="font-display text-[24px] font-extrabold text-gold">
                        {isToilet ? estimatedPrice : `~ ${estimatedPrice}`} zł{" "}
                        <span className="text-[13px] font-normal text-[#7a7a82]">
                          {isToilet ? "brutto (dojazd w cenie do 100 km)" : "brutto (szacunkowo)"}
                        </span>
                      </div>
                    )}
                    {individualQuote && (
                      <div className="text-[15px] font-light text-[#f0ede8]">
                        Adres powyżej 100 km od bazy — <span className="font-semibold text-gold">wycena indywidualna</span>. Wyślij zamówienie, oddzwonimy z ceną.
                      </div>
                    )}
                    {priceError && <p className="text-[13px] text-[#f04a4a]">{priceError}</p>}
                  </div>
                )}

                {needsPrice && (
                  <div className="col-span-full">
                    <div className={sectionLabelCls}>Forma płatności *</div>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {PAYMENT_METHODS.map((p) => (
                        <button
                          type="button"
                          key={p.key}
                          onClick={() => { setPaymentMethod(p.key); setErrors((er) => ({ ...er, platnosc: false })); }}
                          className={`flex-1 min-w-[130px] rounded-xl border px-5 py-3.5 text-left font-display text-[14px] font-bold uppercase tracking-[0.3px] transition-all ${
                            errors.platnosc
                              ? "border-[#f04a4a]"
                              : paymentMethod === p.key
                              ? "border-gold bg-[rgba(245,200,66,0.06)] text-gold"
                              : "border-[#2a2b30] text-[#7a7a82] hover:border-gold-dark"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="col-span-full flex flex-col gap-2">
                  <label className={labelCls}>Dodatkowe informacje</label>
                  <textarea
                    className={`${inputCls} min-h-[100px] resize-y`}
                    placeholder="Uwagi dotyczące miejsca dostawy, dojazdu, rodzaju odpadów..."
                    value={fields.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                  />
                </div>
              </div>

              {submitError && (
                <p className="mt-5 text-[14px] text-[#f04a4a]">{submitError}</p>
              )}
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[13px] font-light text-[#7a7a82]">🔒 Dane chronione, bez spamu</div>
                <button
                  onClick={submit}
                  disabled={submitting}
                  className="rounded-full bg-gold px-9 py-[15px] font-display text-[16px] font-bold uppercase tracking-[-0.3px] text-[#0f1012] transition-all duration-200 hover:scale-[1.04] hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                  {submitting ? "Wysyłanie…" : "Wyślij zamówienie →"}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 py-20 text-center"
          >
            <div className="mx-auto mb-6 grid h-20 w-20 animate-popIn place-items-center rounded-full border border-gold bg-[rgba(245,200,66,0.12)] text-4xl">
              ✓
            </div>
            <h2 className="mb-3 font-display text-[36px] font-extrabold tracking-[-1px] text-gold">Zamówienie wysłane!</h2>
            <p className="mx-auto mb-4 max-w-[400px] text-[16px] font-light text-[#7a7a82]">
              Dziękujemy. Nasz konsultant skontaktuje się z Tobą telefonicznie w ciągu 2 godzin w dni robocze.
            </p>
            {orderNumber && (
              <p className="mx-auto mb-8 text-[15px] text-[#7a7a82]">
                Numer zlecenia: <span className="font-display text-[18px] font-bold text-gold">{orderNumber}</span>
              </p>
            )}
            <button
              onClick={reset}
              className="rounded-full border border-[#2a2b30] px-7 py-3.5 font-display text-[15px] font-bold uppercase text-[#f0ede8] transition-all hover:border-gold hover:text-gold"
            >
              Złóż kolejne zamówienie
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Step({ active, done, num, label }) {
  const color = done ? "text-gold" : active ? "text-[#f0ede8]" : "text-[#7a7a82]";
  return (
    <div className={`flex items-center gap-2 text-[13px] font-medium ${color}`}>
      <span
        className={`grid h-[26px] w-[26px] place-items-center rounded-full border-[1.5px] border-current text-[11px] font-bold ${
          done ? "bg-gold text-[#0f1012]" : active ? "bg-[#f0ede8] text-[#0f1012]" : ""
        }`}
      >
        {num}
      </span>
      <span>{label}</span>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className={labelCls}>{label}</label>
      <div className={error ? "[&_input]:border-[#f04a4a]" : ""}>{children}</div>
    </div>
  );
}
