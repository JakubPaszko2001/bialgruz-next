"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabaseClient";
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown, FaFilePdf, FaFileContract, FaSignOutAlt } from "react-icons/fa";
import { downloadUmowaPdf } from "./umowaPdf";

/* ── Style tokens (spójne z formularzem zamówień) ── */
const inputCls =
  "w-full rounded-[10px] border border-[#2a2b30] bg-[#0f1012] px-4 py-3 text-[15px] font-light text-[#f0ede8] outline-none transition-all placeholder:text-[#5c5c63] focus:border-gold focus:shadow-[0_0_0_3px_rgba(245,200,66,0.1)]";
const labelCls = "block text-[12px] font-medium uppercase tracking-[0.7px] text-[#7a7a82] mb-1.5";

const CONTAINER_FIELDS = [
  "name", "forname", "phone", "email", "nip",
  "rodzajuslugi", "rodzajodpadu", "ilosc", "address", "postcode", "city",
  "koordynaty",
  "message", "platnosc", "szacowany", "dataDostawy",
  "numerKontenera", "numerZlecenia", "Status", "dataUtworzenia",
];

// Toalety: bez rodzaju odpadu i numeru kontenera
const TOILET_FIELDS = [
  "name", "forname", "phone", "email", "nip",
  "rodzajuslugi", "ilosc", "address", "postcode", "city",
  "koordynaty",
  "message", "platnosc", "szacowany", "dataDostawy",
  "numerZlecenia", "Status", "dataUtworzenia",
];

export const ADMIN_FIELD_SETS = { container: CONTAINER_FIELDS, toilet: TOILET_FIELDS };

const labelFor = (field) => ({
  name: "Imię", forname: "Nazwisko", phone: "Telefon", email: "E-mail", nip: "NIP",
  rodzajuslugi: "Rodzaj usługi", rodzajodpadu: "Rodzaj odpadu", ilosc: "Ilość", address: "Adres",
  postcode: "Kod pocztowy", city: "Miasto", koordynaty: "Koordynaty", message: "Wiadomość",
  platnosc: "Płatność", szacowany: "Szacowany koszt", dataDostawy: "Data dostawy",
  numerKontenera: "Numer kontenera", numerZlecenia: "Numer zlecenia", Status: "Status",
  dataUtworzenia: "Data utworzenia",
}[field] || field);

const searchableFields = [
  "name", "forname", "phone", "email", "nip",
  "address", "postcode", "city", "koordynaty",
  "numerZlecenia", "numerKontenera",
  "rodzajuslugi", "rodzajodpadu", "message", "platnosc", "Status",
];

export default function AdminPanel({ onLogout, table = "Zamówienia", title = "Panel zamówień", fields = CONTAINER_FIELDS, showUmowa = false }) {
  const allFields = fields;
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewArchive, setViewArchive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    if (isModalOpen) {
      const { style } = document.body;
      const prev = style.overflow;
      style.overflow = "hidden";
      return () => { style.overflow = prev; };
    }
  }, [isModalOpen]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("id", { ascending: false });
    if (!error) setOrders(data || []);
    else console.error("Błąd pobierania danych:", error.message);
    setLoading(false);
  }, [table]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleEdit = (order) => {
    setEditOrder({ ...order });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const { id, ...updatedData } = editOrder;
    const original = orders.find((o) => o.id === id);
    if (!original) { setIsModalOpen(false); await fetchOrders(); return; }

    const hasChanged = Object.keys(updatedData).some((k) => updatedData[k] !== original[k]);
    if (!hasChanged) { setIsModalOpen(false); return; }

    const { error } = await supabase.from(table).update(updatedData).eq("id", id);
    if (!error) { setIsModalOpen(false); fetchOrders(); }
    else console.error(error.message);
  };

  const handleDelete = async () => {
    if (deleteTarget == null) return;
    const { error } = await supabase.from(table).delete().eq("id", deleteTarget);
    setDeleteTarget(null);
    if (!error) fetchOrders();
    else console.error("Błąd usuwania:", error.message);
  };

  /* ── Helpery ── */
  const normalize = (val) =>
    (val ?? "").toString().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
  const digitsOnly = (val) => (val ?? "").toString().replace(/\D/g, "");
  const isValidDate = (d) => d instanceof Date && !isNaN(d.valueOf());
  const toDateMaybe = (v) => { if (!v) return null; const d = new Date(v); return isValidDate(d) ? d : null; };
  const toNumberMaybe = (v) => {
    if (typeof v === "number") return Number.isFinite(v) ? v : null;
    const n = parseFloat(String(v).replace(",", ".").replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? n : null;
  };

  const filteredOrders = useMemo(() => {
    const term = normalize(searchTerm);
    const termDigits = digitsOnly(searchTerm);
    const searched = !term && !termDigits
      ? orders
      : orders.filter((order) => {
          const haystack =
            searchableFields.map((f) => normalize(order?.[f])).join(" ") + " " + digitsOnly(order?.phone);
          const parts = term.split(/\s+/).filter(Boolean);
          const textMatch = term ? haystack.includes(term) : false;
          const allPartsMatch = parts.length ? parts.every((p) => haystack.includes(p)) : false;
          const phoneMatch = termDigits ? haystack.includes(termDigits) : false;
          return (term ? textMatch || allPartsMatch : false) || (termDigits ? phoneMatch : false);
        });
    return searched.filter((order) =>
      viewArchive ? normalize(order?.Status) === "zrealizowane" : normalize(order?.Status) !== "zrealizowane"
    );
  }, [orders, searchTerm, viewArchive]);

  const sortedOrders = useMemo(() => {
    if (!sortBy) return filteredOrders;
    const collator = new Intl.Collator("pl", { numeric: true, sensitivity: "base" });
    const dateFields = new Set(["dataUtworzenia", "dataDostawy"]);
    const arr = [...filteredOrders];
    arr.sort((a, b) => {
      const av = a?.[sortBy], bv = b?.[sortBy];
      if (dateFields.has(sortBy)) {
        const ad = toDateMaybe(av), bd = toDateMaybe(bv);
        if (ad && bd) return ad - bd;
        if (ad) return 1; if (bd) return -1; return 0;
      }
      const an = toNumberMaybe(av), bn = toNumberMaybe(bv);
      if (an !== null && bn !== null) return an < bn ? -1 : an > bn ? 1 : 0;
      return collator.compare(av == null ? "" : String(av), bv == null ? "" : String(bv));
    });
    if (sortDir === "desc") arr.reverse();
    return arr;
  }, [filteredOrders, sortBy, sortDir]);

  const handleSort = (field) => {
    if (sortBy !== field) { setSortBy(field); setSortDir("asc"); }
    else if (sortDir === "asc") setSortDir("desc");
    else { setSortBy(null); setSortDir("asc"); }
  };

  const renderSortIcon = (field) => {
    if (sortBy !== field) return <FaSort className="inline-block ml-1 opacity-40" />;
    return sortDir === "asc" ? <FaSortUp className="inline-block ml-1" /> : <FaSortDown className="inline-block ml-1" />;
  };

  const handleDownloadPdf = async (order) => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    // Font Unicode z polskimi znakami (DejaVu Sans)
    try {
      const buf = await (await fetch("/fonts/DejaVuSans.ttf")).arrayBuffer();
      let bin = "";
      const bytes = new Uint8Array(buf);
      for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
      const base64 = btoa(bin);
      doc.addFileToVFS("DejaVuSans.ttf", base64);
      doc.addFont("DejaVuSans.ttf", "DejaVu", "normal");
      doc.setFont("DejaVu", "normal");
    } catch (e) {
      console.error("Nie udało się załadować fontu PDF:", e);
    }

    doc.setFontSize(16);
    doc.text(`Karta zlecenia ${order?.numerZlecenia || ""}`.trim(), 40, 40);

    // Wypisz wszystkie pola obecne w rekordzie (pełny zestaw + ewentualne dodatkowe klucze)
    const keys = [...allFields, ...Object.keys(order || {}).filter((k) => k !== "id" && !allFields.includes(k))];
    const rows = keys.map((f) => {
      let v = order?.[f];
      if ((f === "dataUtworzenia" || f === "dataDostawy") && v) v = new Date(v).toLocaleDateString("pl-PL");
      return [labelFor(f), v == null ? "" : String(v)];
    });

    autoTable(doc, {
      startY: 64,
      head: [["Pole", "Wartość"]],
      body: rows,
      styles: { font: "DejaVu", fontStyle: "normal", fontSize: 10, cellPadding: 6, valign: "middle", overflow: "linebreak" },
      headStyles: { font: "DejaVu", fontStyle: "normal", fillColor: [245, 200, 66], textColor: 0, halign: "left" },
      columnStyles: { 0: { cellWidth: 170 }, 1: { cellWidth: "auto" } },
      theme: "grid",
      tableLineColor: [245, 200, 66],
      tableLineWidth: 0.5,
    });
    doc.save(`zlecenie_${order?.numerZlecenia || order?.id || "pdf"}.pdf`);
  };

  // Umowa PDF wypełniona danymi zamówienia (ten sam szablon co w formularzu)
  const handleDownloadUmowa = async (order) => {
    const plDate = (v) => (v ? new Date(v).toLocaleDateString("pl-PL") : "");
    const ru = order.rodzajuslugi || "";
    const typ = /umywalk/i.test(ru) ? "Z umywalką" : /standard/i.test(ru) ? "Standardowa" : /pakiet/i.test(ru) ? "wg pakietu" : "";
    const serw = ru.match(/(\d+)\s*serwis/i);
    const equip = (() => {
      const part = (order.message || "").split(/Wyposażenie:/i)[1];
      if (!part) return "Brak";
      return (
        part
          .split("\n")
          .map((s) => s.replace(/^[•\s]+/, "").trim())
          .filter(Boolean)
          .join(", ") || "Brak"
      );
    })();
    const addr = order.koordynaty
      ? order.koordynaty
      : [order.address, `${order.postcode || ""} ${order.city || ""}`.trim()].filter(Boolean).join(", ");

    const data = {
      data_awarcia: plDate(order.dataUtworzenia) || new Date().toLocaleDateString("pl-PL"),
      nr_umowy: order.numerZlecenia || "",
      zleceniodawca_nazwa: (order.nip || "").trim() || [order.name, order.forname].filter(Boolean).join(" "),
      zleceniodawca_nip: order.nip || "",
      zleceniodawca_adres: addr,
      zleceniodawca_tel: order.phone || "",
      zleceniodawca_email: order.email || "",
      lokalizajca: addr,
      ilosc_kabin: order.ilosc != null ? String(order.ilosc) : "",
      typ_kabiny: typ,
      wyposazenie: equip,
      liczba_serwisow: serw ? serw[1] : "",
      data_podstawienia: plDate(order.dataDostawy),
      data_zakonczenia: "",
      cena_jednostkowa: "",
      cena_laczna: order.szacowany || "",
    };

    await downloadUmowaPdf(data, `umowa_${order.numerZlecenia || order.id}.pdf`);
  };

  const fmtCell = (order, field) => {
    if ((field === "dataUtworzenia" || field === "dataDostawy") && order[field])
      return new Date(order[field]).toLocaleDateString("pl-PL");
    return order[field] ?? "";
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] text-left font-sans text-[#f0ede8]">
      {/* Nagłówek */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-[34px] font-extrabold tracking-[-0.5px] text-gold">{title}</h1>
          <p className="mt-1 text-[14px] text-[#7a7a82]">
            {viewArchive ? "Zamówienia zrealizowane" : "Zamówienia aktywne"} · {sortedOrders.length}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setViewArchive((v) => !v)}
            className={`rounded-full border px-5 py-2.5 font-display text-[13px] font-bold uppercase tracking-[0.3px] transition-all ${
              viewArchive ? "border-gold bg-gold text-[#0f1012]" : "border-[#2a2b30] text-gold hover:border-gold"
            }`}
          >
            {viewArchive ? "Pokaż aktywne" : "Archiwum"}
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-full border border-[#2a2b30] px-5 py-2.5 font-display text-[13px] font-bold uppercase tracking-[0.3px] text-[#7a7a82] transition-all hover:border-[#f04a4a] hover:text-[#f04a4a]"
          >
            <FaSignOutAlt /> Wyloguj
          </button>
        </div>
      </div>

      {/* Wyszukiwarka */}
      <div className="mb-6 flex items-stretch gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Szukaj: imię, nazwisko, telefon, e-mail, NIP, adres, miasto, nr zlecenia…"
          className={inputCls}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="shrink-0 rounded-[10px] border border-[#2a2b30] px-4 text-[13px] text-[#7a7a82] transition-all hover:border-gold hover:text-gold"
          >
            Wyczyść
          </button>
        )}
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded-2xl border border-[#2a2b30] bg-[#18191d]">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[#2a2b30]">
              {allFields.map((field) => (
                <th key={field} className="whitespace-nowrap px-3 py-3 text-left">
                  <button
                    onClick={() => handleSort(field)}
                    className="flex items-center text-[11px] font-semibold uppercase tracking-[0.6px] text-[#7a7a82] transition-colors hover:text-gold"
                    title={`Sortuj po: ${labelFor(field)}`}
                  >
                    <span>{labelFor(field)}</span>
                    {renderSortIcon(field)}
                  </button>
                </th>
              ))}
              <th className="whitespace-nowrap px-3 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.6px] text-[#7a7a82]">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id} className="border-b border-[#2a2b30]/60 transition-colors hover:bg-[rgba(245,200,66,0.03)]">
                {allFields.map((field) => (
                  <td
                    key={field}
                    className={`px-3 py-2.5 align-top font-light text-[#d6d3ce] ${
                      field === "message" ? "min-w-[240px] max-w-[320px] whitespace-pre-line" : "whitespace-nowrap"
                    }`}
                  >
                    {fmtCell(order, field)}
                  </td>
                ))}
                <td className="whitespace-nowrap px-3 py-2.5 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={() => handleEdit(order)} className="text-gold transition-colors hover:text-white" title="Edytuj"><FaEdit /></button>
                    <button onClick={() => setDeleteTarget(order.id)} className="text-[#f04a4a] transition-colors hover:text-white" title="Usuń"><FaTrash /></button>
                    <button onClick={() => handleDownloadPdf(order)} className="text-[#7a7a82] transition-colors hover:text-gold" title="Pobierz PDF"><FaFilePdf /></button>
                    {showUmowa && (
                      <button onClick={() => handleDownloadUmowa(order)} className="text-[#7a7a82] transition-colors hover:text-gold" title="Pobierz umowę (PDF)"><FaFileContract /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {!loading && sortedOrders.length === 0 && (
              <tr>
                <td colSpan={allFields.length + 1} className="py-10 text-center text-[14px] text-[#7a7a82]">
                  Brak wyników {searchTerm && <>dla: <span className="font-semibold text-[#f0ede8]">{searchTerm}</span></>}
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan={allFields.length + 1} className="py-10 text-center text-[14px] text-[#7a7a82]">Wczytywanie…</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal edycji */}
      {isModalOpen && editOrder && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm">
          <div className="flex min-h-[100svh] items-stretch justify-center p-0 sm:items-center sm:p-8">
            <div className="flex h-[100svh] w-full flex-col overflow-hidden border border-[#2a2b30] bg-[#18191d] sm:h-auto sm:max-h-[85vh] sm:max-w-2xl sm:rounded-2xl">
              <div className="flex shrink-0 items-center justify-between border-b border-[#2a2b30] px-5 py-4">
                <h2 className="font-display text-[20px] font-extrabold text-gold">Edytuj zamówienie</h2>
                <button onClick={() => setIsModalOpen(false)} className="px-2 text-2xl leading-none text-[#7a7a82] transition-colors hover:text-white" aria-label="Zamknij">×</button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {allFields.map((field) => (
                    <div key={field}>
                      <label className={labelCls}>{labelFor(field)}</label>
                      {field === "Status" ? (
                        <select value={editOrder?.Status || "Do realizacji"} onChange={(e) => setEditOrder({ ...editOrder, Status: e.target.value })} className={inputCls}>
                          <option value="Do realizacji">Do realizacji</option>
                          <option value="Podstawiony">Podstawiony</option>
                          <option value="Do odbioru">Do odbioru</option>
                          <option value="Zrealizowane">Zrealizowane</option>
                        </select>
                      ) : field === "platnosc" ? (
                        <select value={editOrder?.platnosc || ""} onChange={(e) => setEditOrder({ ...editOrder, platnosc: e.target.value })} className={inputCls}>
                          <option value="">— wybierz —</option>
                          <option value="gotówka">Gotówka</option>
                          <option value="karta">Karta</option>
                          <option value="przelew">Przelew</option>
                        </select>
                      ) : field === "dataDostawy" ? (
                        <input type="date" value={editOrder?.dataDostawy ? String(editOrder.dataDostawy).slice(0, 10) : ""} onChange={(e) => setEditOrder({ ...editOrder, dataDostawy: e.target.value })} className={inputCls} />
                      ) : (
                        <input type="text" value={editOrder?.[field] || ""} onChange={(e) => setEditOrder({ ...editOrder, [field]: e.target.value })} className={inputCls} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 justify-end gap-3 border-t border-[#2a2b30] px-5 py-4">
                <button onClick={() => setIsModalOpen(false)} className="rounded-full border border-[#2a2b30] px-6 py-2.5 font-display text-[14px] font-bold uppercase text-[#7a7a82] transition-all hover:border-gold hover:text-gold">Anuluj</button>
                <button onClick={handleSave} className="rounded-full bg-gold px-7 py-2.5 font-display text-[14px] font-bold uppercase text-[#0f1012] transition-all hover:brightness-110">Zapisz</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Potwierdzenie usunięcia */}
      {deleteTarget != null && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-2xl border border-[#f04a4a]/60 bg-[#18191d] p-7 text-center">
            <h2 className="mb-3 font-display text-[22px] font-extrabold text-[#f04a4a]">Potwierdź usunięcie</h2>
            <p className="mb-6 text-[14px] font-light text-[#7a7a82]">Czy na pewno chcesz usunąć to zamówienie?</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setDeleteTarget(null)} className="rounded-full border border-[#2a2b30] px-6 py-2.5 font-display text-[14px] font-bold uppercase text-[#7a7a82] transition-all hover:border-gold hover:text-gold">Anuluj</button>
              <button onClick={handleDelete} className="rounded-full bg-[#f04a4a] px-6 py-2.5 font-display text-[14px] font-bold uppercase text-white transition-all hover:brightness-110">Usuń</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
