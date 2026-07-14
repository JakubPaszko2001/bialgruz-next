import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { supabase } from './Supabase';
import Regulamin from './Regulamin';
import RegulaminUslug from './RegulaminUslug';
import Blik from "../Assets/blik.webp";

// Definicja dostępnych odpadów dla konkretnych usług - poza komponentem
const DOSTEPNE_ODPADY = {
  'BIG-BAG 1m³': ['Czysty gruz', 'Zmieszane'],
  'Kontener 5m³': ['Czysty gruz', 'Zmieszane'],
  'Kontener 7m³': ['Zmieszane'], // Tutaj brak gruzu - opcja zniknie z listy
};

const Order = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isRegulaminOpen, setIsRegulaminOpen] = useState(false);
  const [isRegulaminUslugOpen, setIsRegulaminUslugOpen] = useState(false);
  const [showNIPField, setShowNIPField] = useState(false);
  const [transportError, setTransportError] = useState(false);
  const [isRODOModalOpen, setIsRODOModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  // Śledzenie wybranej usługi dla dynamicznego filtrowania
  const [selectedService, setSelectedService] = useState('BIG-BAG 1m³');

  // Tryb współrzędnych
  const [useCoords, setUseCoords] = useState(false);
  const [coordsInput, setCoordsInput] = useState('');

  // Generator numeru zlecenia
  const generateOrderNumber = async () => {
    const { data, error } = await supabase
      .from('Zamówienia')
      .select('numerZlecenia, id')
      .order('id', { ascending: false })
      .limit(1);
  
    if (error) {
      console.error('Błąd podczas pobierania ostatniego numeru zlecenia:', error);
      return 'BIAL0001';
    }
  
    if (!data?.length || !data[0]?.numerZlecenia) return 'BIAL0001';
  
    const lastNumber = data[0].numerZlecenia;
    const match = lastNumber.match(/BIAL(\d+)/);
    const nextNumber = match ? parseInt(match[1], 10) + 1 : 1;
    return `BIAL${nextNumber.toString().padStart(4, '0')}`;
  };

  // Parser współrzędnych
  const parseCoordinates = (input) => {
    if (!input) return null;
    const str = String(input).trim();
    const re = /(-?\d{1,3}(?:\.\d+))[^0-9-]+(-?\d{1,3}(?:\.\d+))/;
    const m = str.match(re);
    if (!m) return null;
    const lat = parseFloat(m[1]);
    const lon = parseFloat(m[2]);
    if (!isFinite(lat) || !isFinite(lon)) return null;
    if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
    return { lat, lon };
  };

  // Obliczanie dystansu (Haversine)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // --- AKTUALNY CENNIK ---
  const getBasePrice = (usluga, odpad) => {
    const cennik = {
      'BIG-BAG 1m³': { 'Czysty gruz': 299, 'Zmieszane': 390 },
      'Kontener 5m³': { 'Czysty gruz': 390, 'Zmieszane': 1190 },
      'Kontener 7m³': { 'Zmieszane': 1390 },
    };
    return cennik[usluga]?.[odpad] ?? null;
  };

  // Funkcja obliczająca cenę szacunkową
  const updateEstimatedPrice = async () => {
    const service = selectedService; // Bierzemy wartość ze stanu Reacta
    const waste = form.current.rodzajodpadu.value;
    const basePrice = getBasePrice(service, waste);

    // Jeśli kombinacja nie istnieje w cenniku
    if (basePrice === null) {
      setEstimatedPrice(null);
      setTransportError(true);
      return;
    }

    if (useCoords) {
      const coords = parseCoordinates(coordsInput);
      if (!coords) {
        setEstimatedPrice(null);
        setFormErrors((p) => ({ ...p, coords: 'Podaj poprawne współrzędne' }));
        return;
      }
      const distance = calculateDistance(53.14717, 23.17618, coords.lat, coords.lon);
      const estimated = Math.round(basePrice + distance * 10.8);
      setEstimatedPrice(estimated);
      setTransportError(false);
      setFormErrors((p) => {
        const rest = { ...p };
        delete rest.coords;
        return rest;
      });
      return;
    }

    const address = form.current?.address?.value || '';
    const postcode = form.current?.postcode?.value || '';
    const city = form.current?.city?.value || '';
    const query = `${address} ${postcode} ${city}`.trim();

    if (!query || query.length < 6) {
      setEstimatedPrice(null);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data && data[0]) {
        const { lat, lon } = data[0];
        const distance = calculateDistance(53.14717, 23.17618, parseFloat(lat), parseFloat(lon));
        const estimated = Math.round(basePrice + distance * 10.8);
        setEstimatedPrice(estimated);
        setTransportError(false);
      } else {
        setEstimatedPrice(null);
      }
    } catch (error) {
      console.error('Błąd geokodowania:', error);
      setEstimatedPrice(null);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const requiredFieldsBase = ['rodzajuslugi', 'rodzajodpadu', 'name', 'forname', 'email', 'phone', 'deliveryDate'];
    const addressFields = ['address', 'postcode', 'city'];
    const newErrors = {};

    for (const field of requiredFieldsBase) {
      const value = form.current[field]?.value?.trim();
      if (!value) newErrors[field] = 'Uzupełnij to pole';
    }

    if (showNIPField && !form.current.nip?.value?.trim()) {
      newErrors.nip = 'Uzupełnij to pole';
    }

    let coords = null;
    if (useCoords) {
      coords = parseCoordinates(coordsInput);
      if (!coords) newErrors.coords = 'Podaj współrzędne lub link';
    } else {
      for (const f of addressFields) {
        const v = form.current[f]?.value?.trim();
        if (!v) newErrors[f] = 'Uzupełnij to pole';
      }
    }

    if (estimatedPrice === null) {
      setTransportError(true);
      return;
    }

    if (!paymentMethod) {
      newErrors.platnosc = 'Wybierz metodę płatności';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const numerZlecenia = await generateOrderNumber();
      const formData = {
        rodzajuslugi: form.current.rodzajuslugi.value,
        rodzajodpadu: form.current.rodzajodpadu.value,
        name: form.current.name.value,
        forname: form.current.forname.value,
        address: useCoords ? '' : (form.current.address?.value || ''),
        postcode: useCoords ? '' : (form.current.postcode?.value || ''),
        city: useCoords ? '' : (form.current.city?.value || ''),
        email: form.current.email.value,
        phone: form.current.phone.value,
        message: form.current.message.value || '',
        nip: showNIPField ? (form.current.nip?.value?.trim() || null) : null,
        platnosc: paymentMethod,
        szacowany: estimatedPrice?.toString() || null,
        dataDostawy: form.current.deliveryDate?.value || null,
        numerZlecenia,
        koordynaty: useCoords && coords ? `${coords.lat}, ${coords.lon}` : null,
      };

      await handleSaveToSupabase(formData);

      await emailjs.sendForm(
        'service_vkm0g32',
        'template_5n86nfp',
        form.current,
        'H8LWCkDY6CYMOnRKn'
      );

      form.current.reset();
      setEstimatedPrice(null);
      setPaymentMethod('');
      setCoordsInput('');
      setUseCoords(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error(error);
      alert('Wystąpił błąd podczas wysyłki.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToSupabase = async (data) => {
    const { error } = await supabase
      .from('Zamówienia')
      .insert([{ ...data, Status: 'Do realizacji' }]);
    if (error) console.error('Błąd zapisu:', error.message);
  };

  const renderInput = (name, label, type = 'text') => (
    <div>
      <label htmlFor={name} className="text-yellow-400">{label}:</label>
      <input
        id={name}
        name={name}
        type={type}
        className={`w-full p-3 border rounded-md bg-transparent ${
          formErrors[name] ? 'border-red-500' : 'border-yellow-500'
        }`}
        onInput={() => {
          if (formErrors[name]) {
            setFormErrors((prev) => {
              const updated = { ...prev };
              delete updated[name];
              return updated;
            });
          }
        }}
      />
      {formErrors[name] && <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>}
    </div>
  );

  return (
    <div id="order" className="w-full bg-[#222222] px-[20px] pb-12 relative">
      <h2 className="text-3xl font-bold text-white text-center py-12">Złóż zamówienie</h2>
      <div className="bg-[#1E1D1C] text-white max-w-4xl mx-auto p-6 rounded-xl shadow">
        <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* RODZAJ USŁUGI - Zmodyfikowany pod React State */}
          <div className="md:col-span-2">
            <label htmlFor="rodzajuslugi" className="text-yellow-400">Rodzaj usługi:</label>
            <select 
              id="rodzajuslugi" 
              name="rodzajuslugi" 
              value={selectedService}
              className="w-full p-3 border border-yellow-500 rounded-md bg-transparent text-white"
              onChange={(e) => { 
                setSelectedService(e.target.value); 
                setEstimatedPrice(null); 
                setTransportError(false); 
              }}
            >
              <option className="text-black">BIG-BAG 1m³</option>
              <option className="text-black">Kontener 5m³</option>
              <option className="text-black">Kontener 7m³</option>
            </select>
          </div>

          {/* RODZAJ ODPADU - Teraz dynamicznie filtrowany */}
          <div className="md:col-span-2">
            <label htmlFor="rodzajodpadu" className="text-yellow-400">Rodzaj odpadów:</label>
            <select 
              id="rodzajodpadu" 
              name="rodzajodpadu" 
              className="w-full p-3 border border-yellow-500 rounded-md bg-transparent text-white"
              onChange={() => { setEstimatedPrice(null); setTransportError(false); }}
            >
              {DOSTEPNE_ODPADY[selectedService].map((odpad) => (
                <option key={odpad} className="text-black">{odpad}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex items-center gap-2">
            <input type="checkbox" id="naFakture" className="accent-yellow-500" onChange={(e) => setShowNIPField(e.target.checked)} />
            <label htmlFor="naFakture" className="text-yellow-400">Chcę otrzymać fakturę VAT</label>
          </div>

          {/* PRZEŁĄCZNIK WSPÓŁRZĘDNYCH */}
          <div className="md:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="useCoords"
              className="accent-yellow-500"
              checked={useCoords}
              onChange={(e) => {
                setUseCoords(e.target.checked);
                setEstimatedPrice(null);
                setFormErrors((prev) => {
                  const updated = { ...prev };
                  delete updated.address; delete updated.postcode; delete updated.city; delete updated.coords;
                  return updated;
                });
              }}
            />
            <label htmlFor="useCoords" className="text-yellow-400">Nie mam adresu — podam współrzędne</label>
          </div>

          {!useCoords ? (
            <>
              {renderInput('address', 'Adres dostawy')}
              {renderInput('postcode', 'Kod pocztowy')}
              {renderInput('city', 'Miejscowość')}
            </>
          ) : (
            <div className="md:col-span-2">
              <label htmlFor="coords" className="text-yellow-400">Współrzędne (lat, lon) lub link do map:</label>
              <input
                id="coords"
                name="coords"
                type="text"
                value={coordsInput}
                onChange={(e) => { setCoordsInput(e.target.value); setEstimatedPrice(null); }}
                placeholder="53.415, 23.015"
                className={`w-full p-3 border rounded-md bg-transparent border-yellow-500`}
              />
            </div>
          )}

          {renderInput('name', 'Imię')}
          {renderInput('forname', 'Nazwisko')}
          {renderInput('email', 'Email', 'email')}
          {renderInput('phone', 'Telefon', 'tel')}

          {showNIPField && renderInput('nip', 'NIP')}

          <div className="md:col-span-2">
            <label htmlFor="message" className="text-yellow-400">Uwagi:</label>
            <textarea id="message" name="message" rows="3" className="w-full p-3 border border-yellow-500 rounded-md bg-transparent resize-none" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="deliveryDate" className="text-yellow-400">Preferowana data dostawy:</label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              className={`w-full p-3 border rounded-md bg-transparent text-white border-yellow-500`}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              onClick={updateEstimatedPrice}
              className="w-full md:w-auto px-6 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition"
            >
              Oblicz szacowany koszt dostawy
            </button>
            {estimatedPrice !== null && (
              <p className="text-yellow-400 text-sm mt-2">
                Szacowany koszt: <strong>{estimatedPrice} zł</strong>
              </p>
            )}
            {transportError && (
              <p className="text-red-500 text-sm mt-2">
                {getBasePrice(selectedService, form.current.rodzajodpadu.value) === null 
                  ? "Ta usługa (Gruz) nie jest dostępna dla wybranego gabarytu." 
                  : "Najpierw oblicz koszt dostawy."}
              </p>
            )}
          </div>

          <div className="md:col-span-2 mt-4">
            <label className="block text-yellow-400 font-medium mb-1">Forma płatności:</label>
            <div className="flex gap-4">
              {['gotówka', 'karta', 'przelew'].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="platnosc"
                    value={method}
                    className="accent-yellow-500"
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  {method === 'karta' ? <span>Karta / <img src={Blik} alt="BLIK" className="h-4 inline" /></span> : method}
                </label>
              ))}
            </div>
            {formErrors.platnosc && <p className="text-red-500 text-sm mt-1">{formErrors.platnosc}</p>}
          </div>

          <div className="md:col-span-2 text-sm bg-[#2B2B2B] p-4 rounded-lg border border-yellow-500 space-y-2">
            <label className="flex items-start gap-2"><input type="checkbox" required className="mt-1 accent-yellow-500" /> Zgoda na fakturę e-mail</label>
            <label className="flex items-start gap-2"><input type="checkbox" required className="mt-1 accent-yellow-500" /> Odpowiedzialność za odpady</label>
            <label className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1 accent-yellow-500" />
              <span>Akceptuję <button type="button" onClick={() => setIsRegulaminOpen(true)} className="underline text-yellow-400">Regulamin</button>, <button type="button" onClick={() => setIsRegulaminUslugOpen(true)} className="underline text-yellow-400">Regulamin świadczenia usług</button> oraz <button type="button" onClick={() => setIsRODOModalOpen(true)} className="underline text-yellow-400">RODO</button></span>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1 accent-yellow-500" />
              <span>Wyrażam zgodę na rozpoczęcie realizacji usługi przed upływem 14 dni od zawarcia umowy oraz przyjmuję do wiadomości, że po jej wykonaniu utracę prawo odstąpienia od umowy.</span>
            </label>
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-12 py-4 font-semibold text-black bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-xl shadow-lg transition hover:brightness-110 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Wysyłanie...' : 'ZAMÓW TERAZ'}
            </button>
          </div>
        </form>
      </div>
      
      {/* MODALE */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center">
          <div className="bg-[#1E1E1E] text-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-yellow-500">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Zamówienie wysłane!</h2>
            <p className="mb-6">Dziękujemy za skorzystanie z naszej usługi. Skontaktujemy się z Tobą wkrótce.</p>
            <button onClick={() => setIsSuccessModalOpen(false)} className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded shadow">OK</button>
          </div>
        </div>
      )}

      {isRegulaminOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center px-4">
          <div className="bg-[#1E1E1E] text-white p-6 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-yellow-500 relative">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">REGULAMIN SKLEPU INTERNETOWEGO BIALGRUZ</h2>

            <Regulamin />

            <button
              onClick={() => setIsRegulaminOpen(false)}
              className="absolute top-4 right-4 text-yellow-400 text-3xl hover:scale-110 transition-transform"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {isRegulaminUslugOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center px-4">
          <div className="bg-[#1E1E1E] text-white p-6 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-yellow-500 relative">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">REGULAMIN ŚWIADCZENIA USŁUG – BIALGRUZ</h2>

            <RegulaminUslug />

            <button
              onClick={() => setIsRegulaminUslugOpen(false)}
              className="absolute top-4 right-4 text-yellow-400 text-3xl hover:scale-110 transition-transform"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {isRODOModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center px-4">
          <div className="bg-[#1E1E1E] text-white p-6 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-yellow-500 relative">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center">Klauzula informacyjna RODO</h2>
            <div className="space-y-4 text-sm leading-relaxed text-gray-200">
              <p>
                Zgodnie z art. 13 ust. 1 i 2 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO), informujemy, że:
              </p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Administratorem danych osobowych jest <strong>BIALGRUZ Sp. z o.o.</strong>, NIP: 9662143186, Porosły-Kolonia 12M, 16-070 Choroszcz (dalej: Administrator).
                </li>
                <li>
                  Z Administratorem można skontaktować się za pośrednictwem adresu e-mail: <span className="text-yellow-400">kontakt@bialgruz.pl</span> lub pisemnie na adres siedziby Administratora.
                </li>
                <li>
                  Dane osobowe przetwarzane są w celu:
                  <ol className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                    <li>zawarcia i realizacji umowy o świadczenie usług lub sprzedaży towarów,</li>
                    <li>realizacji obowiązków prawnych ciążących na Administratorze,</li>
                    <li>ewentualnego dochodzenia roszczeń lub obrony przed roszczeniami.</li>
                  </ol>
                </li>
                <li>
                  Podstawą prawną przetwarzania danych jest:
                  <ol className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                    <li>art. 6 ust. 1 lit. b RODO (realizacja umowy),</li>
                    <li>art. 6 ust. 1 lit. c RODO (obowiązek prawny),</li>
                    <li>art. 6 ust. 1 lit. f RODO (uzasadniony interes Administratora).</li>
                  </ol>
                </li>
                <li>
                  Dane osobowe mogą być przekazywane podmiotom współpracującym z Administratorem, w szczególności: operatorom płatności, podmiotom księgowym, dostawcom usług IT, firmom wspierającym realizację usług, a także podmiotom uprawnionym na podstawie przepisów prawa.
                </li>
                <li>
                  Dane osobowe będą przechowywane przez okres realizacji umowy, a następnie przez okres wymagany przepisami prawa (np. podatkowymi) lub do czasu przedawnienia roszczeń.
                </li>
                <li>
                  Klient ma prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, wniesienia sprzeciwu, przenoszenia danych.
                </li>
                <li>
                  Klient ma prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych w przypadku uznania, że przetwarzanie danych osobowych narusza postanowienia RODO.
                </li>
                <li>
                  Podanie danych osobowych jest dobrowolne, jednak niezbędne do zawarcia i realizacji umowy.
                </li>
                <li>
                  Dane osobowe nie będą podlegały zautomatyzowanemu podejmowaniu decyzji, w tym profilowaniu.
                </li>
              </ol>
            </div>
            <button onClick={() => setIsRODOModalOpen(false)} className="absolute top-3 right-3 text-yellow-400 text-3xl hover:scale-110 transition-transform">×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;