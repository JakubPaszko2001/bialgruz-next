"use client";

import { useEffect, useState } from "react";
import AdminPanel, { ADMIN_FIELD_SETS } from "@/components/AdminPanel";

const inputCls =
  "w-full rounded-[10px] border border-[#2a2b30] bg-[#0f1012] px-4 py-3.5 text-[15px] font-light text-[#f0ede8] outline-none transition-all placeholder:text-[#5c5c63] focus:border-gold focus:shadow-[0_0_0_3px_rgba(245,200,66,0.1)]";

export default function ToaletyAdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setAuthed(localStorage.getItem("isAdmin") === "true");
    setReady(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "Depozytor1") {
      localStorage.setItem("isAdmin", "true");
      setAuthed(true);
      setError("");
    } else {
      setError("Nieprawidłowe hasło");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setAuthed(false);
    setPassword("");
  };

  if (!ready) return <div className="min-h-screen bg-ink-black" />;

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-black px-4 font-sans">
        <div className="w-full max-w-md rounded-2xl border border-[#2a2b30] bg-[#18191d] p-8 sm:p-10">
          <h1 className="text-center font-display text-[28px] font-extrabold tracking-[-0.5px] text-gold">
            Panel administratora
          </h1>
          <p className="mt-1 text-center text-[14px] text-[#7a7a82]">Toalety przenośne — zarządzanie zamówieniami.</p>
          <form onSubmit={handleLogin} className="mt-7 flex flex-col gap-4">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.7px] text-[#7a7a82]">
                Hasło
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Wpisz hasło"
                className={inputCls}
                autoFocus
              />
              {error && <p className="mt-2 text-[13px] text-[#f04a4a]">{error}</p>}
            </div>
            <button
              type="submit"
              className="rounded-full bg-gold px-9 py-[15px] font-display text-[16px] font-bold uppercase tracking-[-0.3px] text-[#0f1012] transition-all duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
            >
              Zaloguj się →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-black px-4 py-10 sm:px-8">
      <AdminPanel
        onLogout={handleLogout}
        table="ToaletyZamowienia"
        title="Panel toalet"
        fields={ADMIN_FIELD_SETS.toilet}
        showUmowa
      />
    </div>
  );
}
