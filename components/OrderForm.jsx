"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Pricing data ── */
const SERVICES = {
  bigbag: {
    title: "Zamów Big-Bag 1m³",
    quantityLabel: "Ilość worków *",
    sizes: null,
    waste: [
      { key: "gruz", label: "Gruz", price: "299 zł", sub: "brutto, VAT 8%" },
      { key: "zmieszane", label: "Zmieszane", price: "390 zł", sub: "brutto, VAT 8%" },
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
        { key: "gruz", label: "Gruz", price: "390 zł", sub: "brutto, VAT 8%" },
        { key: "zmieszane", label: "Zmieszane", price: "1190 zł", sub: "brutto, VAT 8%" },
      ],
      "7m3": [{ key: "zmieszane", label: "Zmieszane", price: "1390 zł", sub: "brutto, VAT 8%" }],
    },
  },
};

const TOILET_SERVICES = {
  t7dni: { title: "Zamów toaletę — 7 dni", quantityLabel: "Ilość toalet *", sizes: null, noWaste: true },
  t1m1s: { title: "Zamów toaletę — 1 miesiąc", quantityLabel: "Ilość toalet *", sizes: null, noWaste: true },
  t1m2s: { title: "Zamów toaletę — 1 miesiąc", quantityLabel: "Ilość toalet *", sizes: null, noWaste: true },
  t1m4s: { title: "Zamów toaletę — 1 miesiąc", quantityLabel: "Ilość toalet *", sizes: null, noWaste: true },
};

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
  const services = mode === "toalety" ? TOILET_SERVICES : SERVICES;

  const [currentType, setCurrentType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({
    name: "", phone: "", email: "", company: "", address: "", city: "", date: "", quantity: "1", notes: "",
  });

  const svc = currentType ? services[currentType] : null;
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const wasteOptions = useMemo(() => {
    if (!svc || svc.noWaste) return null;
    if (svc.sizes) return selectedSize ? svc.wasteBySize[selectedSize] : null;
    return svc.waste;
  }, [svc, selectedSize]);

  function setField(k, v) {
    setFields((f) => ({ ...f, [k]: v }));
  }

  function pickService(key) {
    setCurrentType(key);
    setSelectedSize(null);
    setSelectedWaste(null);
    setErrors((e) => ({ ...e, service: false }));
  }

  function submit() {
    const errs = {};
    if (!currentType) errs.service = true;
    ["name", "phone", "address", "city", "date"].forEach((k) => {
      if (!fields[k].trim()) errs[k] = true;
    });
    if (svc && svc.sizes && !selectedSize) errs.size = true;
    if (svc && !svc.noWaste && !selectedWaste) errs.waste = true;

    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitted(true);
  }

  function reset() {
    setFields({ name: "", phone: "", email: "", company: "", address: "", city: "", date: "", quantity: "1", notes: "" });
    setCurrentType(null);
    setSelectedSize(null);
    setSelectedWaste(null);
    setErrors({});
    setSubmitted(false);
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
                            }}
                          />
                        ))
                      ) : (
                        <div className="text-[13px] italic text-[#7a7a82]">← Najpierw wybierz rozmiar</div>
                      )}
                    </div>
                  </>
                )}

                <hr className={dividerCls} />
                <div className={sectionLabelCls}>Szczegóły dostawy</div>

                <Field label="Adres dostawy *" error={errors.address}>
                  <input className={inputCls} placeholder="ul. Budowlana 12" value={fields.address} onChange={(e) => setField("address", e.target.value)} />
                </Field>
                <Field label="Miasto *" error={errors.city}>
                  <input className={inputCls} placeholder="Białystok" value={fields.city} onChange={(e) => setField("city", e.target.value)} />
                </Field>
                <Field label="Preferowana data dostawy *" error={errors.date}>
                  <input className={inputCls} type="date" min={today} value={fields.date} onChange={(e) => setField("date", e.target.value)} />
                </Field>
                <Field label={svc ? svc.quantityLabel : "Ilość *"}>
                  <input className={inputCls} type="number" min="1" max="20" value={fields.quantity} onChange={(e) => setField("quantity", e.target.value)} />
                </Field>

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

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[13px] font-light text-[#7a7a82]">🔒 Dane chronione, bez spamu</div>
                <button
                  onClick={submit}
                  className="rounded-full bg-gold px-9 py-[15px] font-display text-[16px] font-bold uppercase tracking-[-0.3px] text-[#0f1012] transition-all duration-200 hover:scale-[1.04] hover:brightness-110 active:scale-[0.97]"
                >
                  Wyślij zamówienie →
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
            <p className="mx-auto mb-8 max-w-[400px] text-[16px] font-light text-[#7a7a82]">
              Dziękujemy. Nasz konsultant skontaktuje się z Tobą telefonicznie w ciągu 2 godzin w dni robocze.
            </p>
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
