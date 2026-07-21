export default function Rodo() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-gray-200">
      <p>
        Zgodnie z art. 13 ust. 1 i 2 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia
        2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego
        przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO), informujemy, że:
      </p>
      <ol className="list-decimal space-y-3 pl-6">
        <li>
          Administratorem danych osobowych jest <strong>BIALGRUZ Sp. z o.o.</strong>, NIP: 9662143186, Porosły-Kolonia
          12M, 16-070 Choroszcz (dalej: Administrator).
        </li>
        <li>
          Z Administratorem można skontaktować się za pośrednictwem adresu e-mail:{" "}
          <span className="text-yellow-400">kontakt@bialgruz.pl</span> lub pisemnie na adres siedziby Administratora.
        </li>
        <li>
          Dane osobowe przetwarzane są w celu:
          <ol className="mt-2 list-[lower-alpha] space-y-1 pl-6">
            <li>zawarcia i realizacji umowy o świadczenie usług lub sprzedaży towarów,</li>
            <li>realizacji obowiązków prawnych ciążących na Administratorze,</li>
            <li>ewentualnego dochodzenia roszczeń lub obrony przed roszczeniami.</li>
          </ol>
        </li>
        <li>
          Podstawą prawną przetwarzania danych jest:
          <ol className="mt-2 list-[lower-alpha] space-y-1 pl-6">
            <li>art. 6 ust. 1 lit. b RODO (realizacja umowy),</li>
            <li>art. 6 ust. 1 lit. c RODO (obowiązek prawny),</li>
            <li>art. 6 ust. 1 lit. f RODO (uzasadniony interes Administratora).</li>
          </ol>
        </li>
        <li>
          Dane osobowe mogą być przekazywane podmiotom współpracującym z Administratorem, w szczególności: operatorom
          płatności, podmiotom księgowym, dostawcom usług IT, firmom wspierającym realizację usług, a także podmiotom
          uprawnionym na podstawie przepisów prawa.
        </li>
        <li>
          Dane osobowe będą przechowywane przez okres realizacji umowy, a następnie przez okres wymagany przepisami
          prawa (np. podatkowymi) lub do czasu przedawnienia roszczeń.
        </li>
        <li>
          Klient ma prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, wniesienia
          sprzeciwu, przenoszenia danych.
        </li>
        <li>
          Klient ma prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych w przypadku uznania, że
          przetwarzanie danych osobowych narusza postanowienia RODO.
        </li>
        <li>Podanie danych osobowych jest dobrowolne, jednak niezbędne do zawarcia i realizacji umowy.</li>
        <li>Dane osobowe nie będą podlegały zautomatyzowanemu podejmowaniu decyzji, w tym profilowaniu.</li>
      </ol>
    </div>
  );
}
