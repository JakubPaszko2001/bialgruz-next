const SECTIONS = [
  {
    title: '§ 1. Postanowienia ogólne',
    items: [
      'Niniejszy Regulamin określa zasady korzystania z platformy internetowej prowadzonej przez Usługodawcę, dostępnej pod adresem: https://bialgruz.pl/ (dalej: Platforma).',
      'Regulamin stanowi regulamin w rozumieniu art. 8 ustawy o świadczeniu usług drogą elektroniczną.',
      'Korzystanie z Platformy wymaga, aby wykorzystywane do tego celu urządzenie końcowe i system teleinformatyczny spełniały wymagania techniczne.',
      'Korzystanie z Platformy za pośrednictwem przeglądarki internetowej, w tym kontakt z Usługodawcą drogą mailową lub telefoniczną, może powodować naliczenie opłat za połączenie z siecią Internet (opłata za przesyłanie danych), zgodnie z pakietem taryfowym dostawcy usług, z którego korzysta Klient oraz naliczenie opłat przez operatora sieci telefonicznej.',
      'Informacje prezentowane na Platformie stanowią jedynie zaproszenie do zawarcia umowy w rozumieniu art. 71 Kodeksu cywilnego, a nie ofertę, o której mowa w art. 66 § 1 Kodeksu cywilnego.',
      'Akceptacja Regulaminu jest dobrowolna, ale niezbędna do złożenia zamówienia oraz zawarcia Umowy.',
    ],
  },
  {
    title: '§ 2. Definicje',
    intro: 'Poniższym wyrażeniom użytym w tekście Regulaminu zostały przypisane następujące znaczenia:',
    definitions: [
      ['BDO', 'Baza danych o produktach i opakowaniach oraz o gospodarce odpadami; państwowy, elektroniczny system rejestracji, ewidencji i sprawozdawczości odpadów w Polsce.'],
      ['Cena', 'określona w złotych polskich kwota wynagrodzenia brutto (uwzględniająca podatek od towarów i usług) należnego Usługodawcy tytułem wykonania Umowy dotyczącej świadczenia Usług lub sprzedaży Towarów, uwzględniająca wszystkie składniki świadczenia, w tym podstawienie, wynajem kontenera na 14 dni, odbiór oraz utylizację odpadów do 4 ton, z zastrzeżeniem usług dodatkowych; Cena konkretnych Usług zależy w szczególności od objętości Kontenera oraz rodzaju umieszczonych w nim Odpadów.'],
      ['Czysty gruz', 'czysty beton, cegły, pustaki, dachówki, tynki, kamienie.'],
      ['Dane Osobowe', 'informacje o zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej.'],
      ['Dzień Roboczy', 'dzień od poniedziałku do piątku z wyłączeniem dni ustawowo wolnych od pracy.'],
      ['Faktura Ustrukturyzowana', 'faktura wystawiona przy użyciu Krajowego Systemu e-Faktur wraz z przydzielonym numerem identyfikującym tę fakturę w tym systemie w związku z regulacją art. 106na ust. 1 ustawy o VAT.'],
      ['Klient', 'osoba fizyczna, osoba prawna albo inna jednostka organizacyjna nieposiadająca osobowości prawnej, posiadająca zdolność do czynności prawnych.'],
      ['Konsument', 'osoba fizyczna dokonująca z przedsiębiorcą czynności prawnej niezwiązanej bezpośrednio z jej działalnością gospodarczą lub zawodową.'],
      ['Kontener', 'kontener lub worek Big-Bag przeznaczony do gromadzenia Odpadów, będący przedmiotem Umowy.'],
      ['Krajowy System e-Faktur (KSeF)', 'platforma do wystawiania, przesyłania, otrzymywania i przechowywania Faktur Ustrukturyzowanych.'],
      ['Przedsiębiorca na prawach konsumenta', 'osoba fizyczna prowadząca jednoosobową działalność gospodarczą (JDG), która zawiera umowę z przedsiębiorcą niezwiązaną bezpośrednio z jej zawodowym charakterem.'],
      ['Odpady', 'substancje lub przedmioty, których Klient pozbywa się, zamierza się pozbyć lub do których pozbycia się jest obowiązany. Usługodawca wskazuje na Platformie, jakiego rodzaju Odpady mogą być przedmiotem Usługi.'],
      ['Odpady zmieszane', 'płyty G-K, szyby, okna, tworzywa sztuczne, materiały izolacyjne. W odpadach tych nie mogą znaleźć się odpady komunalne, tekstylne, niebezpieczne (m.in. azbest, eternit, papa, odpady medyczne, płyny, aerozole, opony, części samochodowe, elektroodpady).'],
      ['Okres Podstawienia', 'okres, na który Usługodawca podstawia Kontener na Odpady; standardowo okres 14 dni.'],
      ['Platforma', 'platforma umożliwiająca składanie Zamówień przez Klienta oraz świadczenie Usług udostępnianych przez Usługodawcę, prowadzona przez Usługodawcę, dostępna pod adresem internetowym: https://bialgruz.pl/.'],
      ['Przedsiębiorca', 'osoba fizyczna, osoba prawna i jednostka organizacyjna nieposiadająca osobowości prawnej, prowadząca we własnym imieniu działalność gospodarczą lub zawodową.'],
      ['Regulamin', 'niniejszy dokument określający zasady świadczenia i korzystania z usług oferowanych przez Usługodawcę na rzecz Klientów za pośrednictwem Platformy. Regulamin określa prawa i obowiązki Usługodawcy i Klienta, w szczególności w zakresie usług świadczonych drogą elektroniczną.'],
      ['Towar', 'rzeczy ruchome oferowane przez Usługodawcę na Platformie.'],
      ['Umowa', 'umowa zawierana pomiędzy Usługodawcą a Klientem, na podstawie której Usługodawca zobowiązuje się do świadczenia Usług lub sprzedaży Towarów na rzecz Klienta, a Klient – do zapłaty Ceny. Umowa jest zawierana pomiędzy Klientem a Usługodawcą po akceptacji Zamówienia przez Usługodawcę na zasadach określonych w Regulaminie. Umowa określa w szczególności rodzaj Usługi lub Towaru, ich główne cechy, Cenę oraz inne istotne warunki Umowy.'],
      ['Usługa', 'usługa świadczona przez Usługodawcę na rzecz Klienta, polegająca na odbiorze Odpadów wybranych przez Klienta, w tym na dostarczeniu i udostępnieniu odpowiedniego Kontenera, ich transporcie oraz zagospodarowaniu zgodnie z obowiązującymi przepisami, za zapłatą Ceny. Dostępność Usług zależy w szczególności od dostępności Kontenerów oraz lokalizacji ich realizacji. Usługi świadczone są na terenie powiatu białostockiego i okolic.'],
      ['Usługa Elektroniczna', 'usługa świadczona drogą elektroniczną w rozumieniu ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną przez Usługodawcę na rzecz Klienta za pośrednictwem Platformy, zgodnie z Regulaminem. W zakresie, w jakim Usługi Elektroniczne są świadczone przez podmioty współpracujące z Usługodawcą, odpowiednie postanowienia dotyczące zasad korzystania z tych usług znajdują się w regulaminach dotyczących świadczenia usług przez te podmioty.'],
      ['Usługodawca', 'BIALGRUZ sp. z o.o. z siedzibą w Porosły – Kolonia 12M (16-030), poczta Choroszcz, zarejestrowana w Sądzie Rejonowym w Białymstoku, XII Wydział Gospodarczy Krajowego Rejestru Sądowego, pod nr KRS: 0000859137, NIP: 9662143186, REGON: 386987837, nr BDO: 000672099, adres e-mail: biuro@bialgruz.pl, telefon: +48 799 091 000, +48 799 092 000, +48 799 093 000.'],
      ['Wymagania Techniczne', 'minimalne wymagania techniczne niezbędne do korzystania z Platformy, obejmujące w szczególności: urządzenie z dostępem do Internetu oraz aktualną przeglądarkę internetową (np. Chrome, Firefox, Opera) z włączoną obsługą plików cookies i JavaScript.'],
      ['Zamówienie', 'oświadczenie woli Klienta wyrażające bezpośrednią wolę zawarcia Umowy na odległość składane z wykorzystaniem środków porozumiewania się na odległość. Złożenie Zamówienia przez Klienta nie oznacza zawarcia Umowy. Klient wypełniając formularz Zamówienia składa ofertę nabycia określonej Usługi na warunkach określonych w Zamówieniu i Regulaminie. Akceptacja Zamówienia przez Usługodawcę oznacza zawarcie Umowy.'],
      ['Zestawienie opłat dodatkowych', 'dostępny na Platformie cennik usług niewliczonych w Cenę.'],
    ],
  },
  {
    title: '§ 3. Umowa o świadczenie Usług Elektronicznych',
    items: [
      {
        text: 'Usługodawca świadczy na rzecz Klientów następujące Usługi Elektroniczne:',
        sub: [
          'umożliwienie Klientom przeglądania treści zamieszczonych na Platformie, w tym możliwość weryfikacji Usług świadczonych przez Usługodawcę;',
          'umożliwianie Klientom składania Zamówień oraz zawierania Umów;',
          'prezentowanie Klientom treści reklamowych.',
        ],
      },
      'Usługi Elektroniczne świadczone przez Usługodawcę na rzecz Klientów są nieodpłatne.',
      'Korzystanie z Platformy wymaga zapoznania się z Regulaminem i jego zaakceptowania. Usługodawca nieodpłatnie udostępnia Klientom Regulamin za pośrednictwem Platformy.',
      {
        text: 'Klient zobowiązany jest w szczególności do:',
        sub: [
          'podawania w Zamówieniu wyłącznie prawdziwych i aktualnych danych;',
          'niezwłocznego aktualizowania danych, w tym Danych Osobowych, podanych Usługodawcy w związku z zawarciem Umowy o świadczenie Usług Elektronicznych lub Umowy, w szczególności w zakresie koniecznym dla prawidłowego wykonania Umowy/Umowy o świadczenie Usług Elektronicznych;',
          'korzystania z usług oferowanych przez Usługodawcę zgodnie z obowiązującymi przepisami prawa, postanowieniami Regulaminu;',
          'niedostarczania i nieprzekazywania w ramach Platformy jakichkolwiek treści zabronionych przez przepisy obowiązującego prawa, w szczególności treści naruszających majątkowe prawa autorskie osób trzecich lub ich dobra osobiste;',
          'niepodejmowania działań zabronionych lub naruszających interesy Usługodawcy, m.in. takich jak: nieterminowa zapłata Ceny; nieterminowy odbiór zamówionych Usług lub Towarów; nieterminowy zwrot Kontenera oraz niewypełnianie innych obowiązków związanych z zamawianymi Usługami lub Towarami; załadunek ponad wysokość burt Kontenera lub ponad limit wagowy; wypełnienie Kontenera zawartością niezgodną z Umową.',
        ],
      },
      {
        text: 'Każdorazowe wypełnienie formularza elektronicznego umożliwiającego złożenie Zamówienia jest równoznaczne z zawarciem pomiędzy danym Klientem, a Usługodawcą nowej umowy o świadczenie Usług Elektronicznych. Umowa wygasa w szczególności w przypadku gdy:',
        sub: [
          'umowa sprzedaży zostaje wykonana przez strony, albo',
          'traci moc wiążącą pomiędzy nimi z innych przyczyn przewidzianych niniejszym Regulaminem lub przepisami prawa, albo',
          'w przypadku, jeżeli wprowadzone przez Klienta dane uniemożliwiają wykonanie Umowy.',
        ],
      },
    ],
  },
  {
    title: '§ 4. Składanie zamówień',
    items: [
      'Zawarcie Umowy między Klientem a Usługodawcą następuje po uprzednim złożeniu przez Klienta Zamówienia.',
      'Wyliczona i widoczna w podsumowaniu Zamówienia Cena jest wiążąca od chwili złożenia przez Klienta Zamówienia, z zastrzeżeniem, że Usługodawca zachowuje prawo do rozliczenia dodatkowego w przypadku naliczenia opłat dodatkowych. Szczegółowy opis usług dodatkowych znajduje się w § 12 Regulaminu.',
      {
        text: 'Złożenie zamówienia następuje poprzez:',
        sub: [
          'wybranie Usług lub Towaru oraz przejście do formularza Zamówienia. Dostępność konkretnych Usług lub Towaru może zależeć od adresu, pod którym Usługi miałyby zostać wykonane, a Towary dostarczone;',
          'wypełnienie formularza Zamówienia, w tym podanie danych dotyczących Umowy, m.in.: miejsce dostawy/podstawienia Kontenera, rodzaj Towaru lub zamawianej Usługi (w tym rodzaj Odpadów, Kontenera do ich zbierania);',
          'akceptację Regulaminu oraz potwierdzenie zapoznanie się z polityką prywatności;',
          'wysłanie Zamówienia do Usługodawcy za pomocą udostępnionej na Platformie funkcjonalności (poprzez przycisk „Zamów teraz”).',
        ],
      },
      'W przypadku wyboru innej formy niż płatność gotówką, Klient może zostać przekierowany do strony zewnętrznego dostawcy usług płatniczych, w celu dokonania płatności.',
      'Usługodawca w odpowiedzi na Zamówienie wysyła do Klienta wiadomość na podany w tym celu przez Klienta adres e-mail lub numer telefonu z potwierdzeniem otrzymania Zamówienia i rozpoczęcia jego weryfikacji. Wysłanie tej wiadomości nie jest równoznaczne z przyjęciem Zamówienia ani zawarciem Umowy. Wiadomość ta ma jedynie charakter informacyjny.',
      {
        text: 'Po dokonaniu weryfikacji Zamówienia, Usługodawca wysyła do Klienta na podany adres e-mail lub wskazany numer telefonu wiadomość z:',
        sub: [
          'potwierdzeniem przyjęcia Zamówienia na Usługi lub Towary i zawarcia Umowy wraz ze wskazaniem terminu jej realizacji; lub',
          'informacją o braku możliwości przyjęcia oferty na Usługi lub Towary, złożonej w ramach Zamówienia, z uwagi na brak wolnych zasobów, brak spełnienia przez Klienta wymogów dotyczących przedmiotu Usługi lub zamówionego Towaru lub dotyczących treści Umowy, którą Klient i Usługodawca mają zawrzeć.',
        ],
      },
      'Wiadomość, o której mowa w ust. 6 zostanie wysłana nie później niż w terminie 2 Dni Roboczych od daty złożenia Zamówienia. Na czas weryfikacji Zamówienia wpływa w szczególności wybrany przez Klienta sposób płatności oraz rodzaj wybranej Usługi lub Towaru.',
      'Do zawarcia Umowy dochodzi z chwilą przyjęcia do realizacji Zamówienia, tj. otrzymania przez Klienta wiadomości, o której mowa w ust. 6 lit. a). Usługodawca przesyła Klientowi potwierdzenie warunków Umowy.',
      'W przypadku braku możliwości przyjęcia Zamówienia, Umowa nie zostaje zawarta. Usługodawca niezwłocznie, nie później niż w ciągu 14 (czternastu) dni od stwierdzenia braku możliwości przyjęcia Zamówienia, zwraca Klientowi uiszczone przez niego płatności, na rachunek bankowy, z użyciem którego została ona uiszczona na rzecz Usługodawcy.',
      'Usługodawca może informować Klienta o statusie Zamówienia, wysyłając wiadomości na podany przez Klienta adres e-mail lub kontaktując się telefonicznie, w tym za pośrednictwem wiadomości SMS.',
      'W przypadku braku możliwości wykonania Usługi lub dostarczenia Towaru z powodu okoliczności, za które odpowiada Klient, w szczególności braku dostępu lub dojazdu do lokalizacji wskazanej przez Klienta, przeładowania Kontenera, nieprawidłowego gromadzenia Odpadów oraz niewystawienia karty przekazania odpadów (KPO), zostanie naliczona dodatkowa opłata zgodnie z Zestawieniem opłat dodatkowych udostępnionym na Platformie.',
      'Całkowita wartość Zamówienia obejmuje Cenę, w tym również koszty transportu i utylizacji oraz ewentualnie inne koszty zgodnie z Zestawieniem opłat dodatkowych. O łącznej Cenie (wraz z podatkami) Usług lub Towarów będących przedmiotem Zamówienia oraz o innych kosztach, a gdy nie można ustalić wysokości tych opłat – o obowiązku ich uiszczenia, Klient jest informowany w trakcie składania Zamówienia, w tym także w chwili wyrażenia przez Klienta woli związania się Umową. Cena Usług zależy w szczególności od objętości Kontenera oraz rodzaju umieszczonych w nim Odpadów.',
      'Obowiązek wystawienia karty przekazania odpadów (KPO) spoczywa na Kliencie jako podmiocie przekazującym odpady. Usługodawca udostępnia bezpłatnie instrukcję wystawienia karty przekazania odpadów (KPO).',
      'Klient ponosi pełną odpowiedzialność za poprawność lokalizacji wskazanej w Umowie celem świadczenia Usługi lub sprzedaży Towarów, w szczególności za dopełnienie ewentualnych obowiązków związanych z uiszczeniem opłat lokalnych, w tym za zajęcia pasa drogowego, wystawienie Karty Przekazania Odpadów (KPO), prawidłową klasyfikację odpadów, segregację, właściwe udostępnienie Odpadów do odbioru, w tym zapewnienie dostępu, dojazdu oraz prawidłowy załadunek Odpadów, a także prawdziwość oświadczeń złożonych w trakcie składania Zamówienia. Klient ponosi odpowiedzialność za właściwe stosowanie przepisów ustawy z dnia 14 grudnia 2012 r. o odpadach i ustawy z dnia 13 września 1996 r. o utrzymaniu czystości i porządku w gminach w zakresie, w jakim przepisy te znajdują do niego zastosowanie. W przypadku Odpadów budowlanych i rozbiórkowych Klient powinien odpady wysegregować stosownie do art. 101a ustawy o odpadach.',
      'Klient ponosi odpowiedzialność za uszkodzenie lub utratę Kontenera oraz za szkody powstałe w związku z jego użytkowaniem.',
      'Usługodawca zastrzega, że ostateczna klasyfikacja Odpadów będzie dokonywana po ich odbiorze od Klienta, na co Klient wyraża bezwarunkowo i nieodwołalnie zgodę.',
      'Usługodawca nie ponosi odpowiedzialności za opóźnienia w realizacji Usługi wynikające z przyczyn od niego niezależnych, w szczególności takich jak: siła wyższa, warunki atmosferyczne, awarie sprzętu lub pojazdów, utrudnienia w ruchu drogowym lub inne zdarzenia o podobnym charakterze.',
      'W przypadku niemożności wykonania Zamówienia z przyczyn leżących po stronie Usługodawcy lub w przypadku wystąpienia siły wyższej, Usługodawca niezwłocznie informuje o tym fakcie Klienta i zwraca Klientowi wszystkie dokonane przez niego płatności na rachunek bankowy wskazany przez Klienta, a jeśli Klient nie wskaże tego rachunku bankowego w terminie 7 dni od przekazania mu informacji, na rachunek, z którego Klient dokonał płatności.',
    ],
  },
  {
    title: '§ 5. Płatności',
    items: [
      'Usługodawca umożliwia Klientowi płatności gotówkowe oraz płatności elektroniczne, które mogą być realizowane za pośrednictwem upoważnionych dostawców.',
      {
        text: 'Usługodawca udostępnia następujące formy płatności:',
        sub: [
          'płatność gotówką przy podstawieniu Kontenera;',
          'płatność kartą płatniczą lub BLIK przy podstawieniu Kontenera;',
          'płatność przelewem – w terminie do 3 dni od dnia wystawienia faktury;',
          'płatność elektroniczną za pośrednictwem usługi Click to Pay.',
        ],
      },
      'Usługa Click to Pay polega na przesłaniu Klientowi przez Usługodawcę, na wskazany przez Klienta adres e-mail lub numer telefonu, indywidualnego linku do płatności, umożliwiającego dokonanie zapłaty za Zamówienie za pośrednictwem systemu Przelewy24 bez konieczności ręcznego wprowadzania danych karty. Po otrzymaniu linku do płatności Klient realizuje płatność zgodnie z zasadami obowiązującymi u tego operatora. Skorzystanie z płatności Click to Pay wymaga dostępu do urządzenia z dostępem do Internetu oraz aktywnego adresu e-mail lub numeru telefonu umożliwiającego odbiór linku. Realizacja Zamówienia rozpoczyna się po zaksięgowaniu płatności dokonanej za pośrednictwem Przelewy24.',
      'Usługodawca nie ponosi odpowiedzialności za działanie systemu płatności upoważnionego dostawcy, w tym za przerwy techniczne, błędy systemowe lub inne ograniczenia wynikające z funkcjonowania tego systemu.',
      'Szczegółowe zasady realizacji płatności określa regulamin dostawcy usługi.',
      'Dniem otrzymania płatności jest dzień zaksięgowania środków na rachunku bankowym Usługodawcy.',
      'Jeżeli Klient wybiera płatność elektroniczną, musi ona zostać zaksięgowana na rachunku Usługodawcy najpóźniej w Dniu Roboczym poprzedzającym rozpoczęcie Usługi.',
      {
        text: 'Termin płatności uzależniony jest od wybranej przez Klienta formy płatności i wynosi odpowiednio:',
        sub: [
          'w przypadku płatności gotówką, kartą płatniczą lub BLIK – w chwili podstawienia Kontenera;',
          'w przypadku płatności przelewem – do 3 dni od dnia wystawienia faktury;',
          'w przypadku płatności za pośrednictwem usługi Click to Pay – w czasie ważności linku.',
        ],
      },
      'Brak otrzymania przez Usługodawcę płatności przed rozpoczęciem realizacji Usługi skutkuje brakiem jej realizacji.',
      'W przypadkach określonych przepisami prawa powszechnie obowiązującego, Usługodawca wystawia i doręcza faktury w formie Faktur Ustrukturyzowanych na rzecz Klientów, będących Przedsiębiorcami.',
      'Za moment wystawienia oraz moment odbioru Faktury Ustrukturyzowanej uznaje się daty określone w ustawie o podatku od towarów i usług dla Faktur Ustrukturyzowanych.',
      'W przypadku wystąpienia okoliczności uniemożliwiających wystawienie lub przesłanie Faktury Ustrukturyzowanej za pośrednictwem KSeF, w szczególności w przypadku awarii, a także z uwagi na inne okoliczności przewidziane przepisami ustawy o podatku od towarów i usług, Usługodawca może wystawiać i przesyłać faktury poza KSeF, zgodnie z obowiązującymi przepisami prawa.',
      'W zakresie dotyczącym: sposobu wystawienia Faktur Ustrukturyzowanych, daty ich wystawienia, terminu przesłania do KSeF, sposobu ich udostępnienia Klientowi oraz daty ich otrzymania przez Klienta w trybach szczególnych, zastosowanie znajdują odpowiednie przepisy ustawy o VAT, przy czym w przypadku płatności odroczonych termin płatności każdorazowo liczony jest od daty wskazanej na fakturze ustrukturyzowanej jako data wystawienia faktury.',
      'W przypadku faktur VAT wystawianych na rzecz Klientów niezobowiązanych do stosowania KSeF (np. na rzecz Konsumentów) faktura będzie udostępniana Klientowi mailowo na adres podany przy składaniu Zamówienia.',
    ],
  },
  {
    title: '§ 6. Postępowanie reklamacyjne',
    items: [
      'Klient ma prawo do złożenia reklamacji dotyczących Usług lub sprzedaży Towarów.',
      'Zaleca się zgłoszenie reklamacji niezwłocznie po stwierdzeniu nieprawidłowości, a w przypadku Klienta niebędącego Konsumentem lub Przedsiębiorcą na prawach Konsumenta – nie później niż w terminie 3 Dni Roboczych.',
      {
        text: 'Reklamacja może zostać złożona:',
        sub: [
          'drogą mailową na adres: biuro@bialgruz.pl,',
          'pisemnie na adres Usługodawcy.',
        ],
      },
      {
        text: 'Reklamacja powinna zawierać:',
        sub: [
          'dane Klienta,',
          'opis zgłaszanych zastrzeżeń,',
          'żądanie Klienta.',
        ],
      },
      'Reklamacje rozpatrywane są w terminie 14 dni od dnia ich zgłoszenia.',
      'W odniesieniu do Konsumentów lub Przedsiębiorców na prawach konsumenta, wymogi podane w ust. 4 mają formę jedynie zalecenia i nie wpływają na skuteczność reklamacji złożonych z pominięciem zalecanej treści reklamacji.',
      'Usługodawca zastrzega sobie prawo pozostawienia reklamacji bez odpowiedzi, jeżeli reklamacja nie będzie zawierać danych wystarczających do identyfikacji Klienta lub podmiotu, który wniósł reklamację.',
    ],
  },
  {
    title: '§ 7. Pozasądowe formy reklamacji',
    items: [
      {
        text: 'Klient będący Konsumentem lub Przedsiębiorcą na prawach konsumenta ma możliwość skorzystania z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń. W szczególności może:',
        sub: [
          'zwrócić się do właściwego miejscowo rzecznika konsumentów,',
          'wystąpić do wojewódzkiego inspektora Inspekcji Handlowej z wnioskiem o mediację, lub',
          'zwrócić się do stałego polubownego sądu konsumenckiego.',
        ],
      },
      'Skorzystanie z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń ma charakter dobrowolny. Postanowienia niniejszego paragrafu mają charakter informacyjny i nie stanowią zobowiązania Usługodawcy do skorzystania z pozasądowych sposobów rozwiązywania sporów.',
    ],
  },
  {
    title: '§ 8. Odstąpienie od umowy',
    items: [
      'Prawo do odstąpienia od Umowy przysługuje wyłącznie Klientom będącym Konsumentami lub Przedsiębiorcami na prawach konsumenta i nie ma zastosowania wobec Przedsiębiorców.',
      'Klient, o którym mowa w ust. 1, ma prawo odstąpić od Umowy zawartej na odległość lub poza lokalem przedsiębiorstwa w terminie 14 dni od zawarcia Umowy, a w przypadku Umowy, której przedmiotem jest sprzedaż Towaru – od otrzymania Towaru, bez podania przyczyny i bez ponoszenia kosztów innych niż przewidziane przez przepisy prawa. Do zachowania terminu wystarczające jest wysłanie przed jego upływem oświadczenia.',
      {
        text: 'Oświadczenie o odstąpieniu może być złożone w dowolnej formie zapewniającej zapoznanie się z nim Usługodawcy, w szczególności pocztą tradycyjną lub drogą elektroniczną na adres e-mail: biuro@bialgruz.pl. Klient może wykorzystać wzorzec oświadczenia o odstąpieniu od Umowy, który stanowi Załącznik nr 1 do Regulaminu.',
        download: { href: '/odstapienie.pdf', label: 'Pobierz wzór oświadczenia o odstąpieniu (PDF)' },
      },
      'Usługodawca ma obowiązek niezwłocznie, nie później niż w terminie 14 dni od dnia otrzymania oświadczenia Klienta o odstąpieniu od Umowy, zwrócić Klientowi wszystkie dokonane przez niego płatności, z wyjątkiem dodatkowych kosztów wynikających z wybranego przez Klienta sposobu dostarczenia innego niż najtańszy zwykły sposób dostarczenia oferowany przez Usługodawcę, chyba że przepisy prawa stanowią inaczej.',
      'Klient ma obowiązek zwrócić Towar lub Kontener Usługodawcy lub przekazać go osobie upoważnionej przez Usługodawcę do odbioru niezwłocznie, jednak nie później niż 14 dni od dnia, w którym odstąpił od Umowy, chyba że Usługodawca zaproponował, że sam odbierze Towar lub Kontener.',
      'Do zachowania terminu wystarczy odesłanie Towaru lub Kontenera przed jego upływem.',
      'Klient ponosi tylko bezpośrednie koszty zwrotu Towaru lub Kontenera, chyba że Usługodawca wyrazi zgodę na ich poniesienie.',
      'Klient ponosi odpowiedzialność za zmniejszenie wartości Towaru lub Kontenera będące wynikiem korzystania z niego w sposób wykraczający poza konieczny do stwierdzenia charakteru, cech i funkcjonowania towaru, jego utratę lub uszkodzenie.',
      'Jeżeli Klient wykonuje prawo odstąpienia od Umowy po zgłoszeniu żądania rozpoczęcia świadczenia Usługi przed upływem terminu do odstąpienia od Umowy, ma obowiązek zapłaty za świadczenia spełnione do chwili odstąpienia od Umowy.',
      'W przypadku, o którym mowa w ust. 9, kwotę do zapłaty oblicza się proporcjonalnie do zakresu spełnionego świadczenia, z uwzględnieniem uzgodnionej w Umowie Ceny.',
      {
        text: 'Uprawnienie do odstąpienia od Umowy zawartej poza lokalem przedsiębiorstwa lub na odległość nie przysługuje Klientom, o których mowa w ust. 1, w odniesieniu do umów:',
        sub: [
          'o świadczenie usług, za które konsument jest zobowiązany do zapłaty ceny, jeżeli przedsiębiorca wykonał w pełni usługę za wyraźną i uprzednią zgodą konsumenta, który został poinformowany przed rozpoczęciem świadczenia, że po spełnieniu świadczenia przez przedsiębiorcę utraci prawo odstąpienia od umowy, i przyjął to do wiadomości;',
          'w której cena lub wynagrodzenie zależy od wahań na rynku finansowym, nad którymi przedsiębiorca nie sprawuje kontroli, i które mogą wystąpić przed upływem terminu do odstąpienia od umowy;',
          'w której przedmiotem świadczenia jest towar nieprefabrykowany, wyprodukowany według specyfikacji konsumenta lub służący zaspokojeniu jego zindywidualizowanych potrzeb;',
          'w której przedmiotem świadczenia jest towar ulegający szybkiemu zepsuciu lub mający krótki termin przydatności do użycia;',
          'w której przedmiotem świadczenia jest towar dostarczany w zapieczętowanym opakowaniu, którego po otwarciu opakowania nie można zwrócić ze względu na ochronę zdrowia lub ze względów higienicznych, jeżeli opakowanie zostało otwarte po dostarczeniu;',
          'w której przedmiotem świadczenia są towary, które po dostarczeniu, ze względu na swój charakter, zostają nierozłącznie połączone z innymi towarami;',
          'w której przedmiotem świadczenia są napoje alkoholowe, których cena została uzgodniona przy zawarciu umowy sprzedaży, a których dostarczenie może nastąpić dopiero po upływie 30 dni i których wartość zależy od wahań na rynku, nad którymi przedsiębiorca nie ma kontroli;',
          'w której konsument wyraźnie żądał, aby przedsiębiorca do niego przyjechał w celu dokonania pilnej naprawy lub konserwacji; jeżeli przedsiębiorca świadczy dodatkowo inne usługi niż te, których wykonania konsument żądał, lub dostarcza towary inne niż części zamienne niezbędne do wykonania naprawy lub konserwacji, prawo odstąpienia od umowy przysługuje konsumentowi w odniesieniu do dodatkowych usług lub towarów;',
          'w której przedmiotem świadczenia są nagrania dźwiękowe lub wizualne albo programy komputerowe dostarczane w zapieczętowanym opakowaniu, jeżeli opakowanie zostało otwarte po dostarczeniu;',
          'o dostarczanie dzienników, periodyków lub czasopism, z wyjątkiem umowy o prenumeratę;',
          'zawartej w drodze aukcji publicznej;',
          'o świadczenie usług w zakresie zakwaterowania, innych niż do celów mieszkalnych, przewozu towarów, najmu samochodów, gastronomii, usług związanych z wypoczynkiem, wydarzeniami rozrywkowymi, sportowymi lub kulturalnymi, jeżeli w umowie oznaczono dzień lub okres świadczenia usługi;',
          'o dostarczanie treści cyfrowych, które nie są zapisane na nośniku materialnym, jeżeli spełnianie świadczenia rozpoczęło się za wyraźną zgodą Klienta przed upływem terminu do odstąpienia od Umowy i po poinformowaniu go przez Usługodawcę o utracie prawa odstąpienia od Umowy;',
          'o świadczenie usług, za które konsument jest zobowiązany do zapłaty ceny, w przypadku których konsument wyraźnie zażądał od przedsiębiorcy, aby przyjechał do niego w celu dokonania naprawy, a usługa została już w pełni wykonana za wyraźną i uprzednią zgodą konsumenta.',
        ],
      },
      'Wyrażenie zgody na rozpoczęcie świadczenia Usługi lub dostarczenia Towaru przed upływem terminu do odstąpienia od umowy oraz potwierdzenie przyjęcia do wiadomości skutków, o których mowa powyżej, następuje poprzez wyraźne działanie Konsumenta lub Przedsiębiorcy na prawach konsumenta, w szczególności poprzez zaznaczenie odpowiedniego pola wyboru przy składaniu zamówienia lub złożenie oświadczenia w innej utrwalonej formie.',
    ],
  },
  {
    title: '§ 9. Uregulowania dotyczące Przedsiębiorców',
    items: [
      'Postanowienia niniejszego paragrafu dotyczą wyłącznie Przedsiębiorców.',
      'W każdym przypadku ustalenia odpowiedzialności Usługodawcy, jego pracowników, upoważnionych przedstawicieli lub pełnomocników, odpowiedzialność ta wobec Przedsiębiorcy – bez względu na jej podstawę prawną – jest ograniczona, zarówno w ramach pojedynczego roszczenia, jak i wszystkich roszczeń łącznie, do wysokości zapłaconej Ceny lub wartości sprzedanego Towaru.',
      'Odpowiedzialność Usługodawcy, niezależnie od jej podstawy prawnej, nie obejmuje utraconych korzyści, w tym utraconych zysków.',
      'Odpowiedzialność Usługodawcy z tytułu rękojmi wobec Przedsiębiorców zostaje wyłączona na podstawie art. 558 § 1 Kodeksu cywilnego.',
      'Wszelkie spory powstałe pomiędzy Usługodawcą a Przedsiębiorcą będą rozstrzygane przez sąd właściwy dla siedziby Usługodawcy.',
    ],
  },
  {
    title: '§ 10. Rozwiązanie Umowy',
    items: [
      'Klient może rozwiązać Umowę o świadczenie Usług Elektronicznych ze skutkiem natychmiastowym, w każdym czasie, poprzez przesłanie Usługodawcy oświadczenia o jej wypowiedzeniu, w szczególności za pośrednictwem wiadomości e-mail.',
      'Usługodawca może wypowiedzieć Umowę o świadczenie Usług Elektronicznych ze skutkiem natychmiastowym lub ograniczyć Klientowi dostęp do Platformy w przypadku rażącego naruszenia postanowień Regulaminu.',
    ],
  },
  {
    title: '§ 11. Przetwarzanie danych osobowych',
    items: [
      'Administratorem danych osobowych jest BIALGRUZ Sp. z o.o., NIP: 9662143186, Porosły-Kolonia 12M, 16-070 Choroszcz (dalej: Administrator).',
      'Z Administratorem można skontaktować się za pośrednictwem adresu e-mail: kontakt@bialgruz.pl lub pisemnie na adres siedziby Administratora.',
      {
        text: 'Dane osobowe przetwarzane są w celu:',
        sub: [
          'zawarcia i realizacji umowy o świadczenie usług lub sprzedaży towarów,',
          'realizacji obowiązków prawnych ciążących na Administratorze,',
          'ewentualnego dochodzenia roszczeń lub obrony przed roszczeniami.',
        ],
      },
      {
        text: 'Podstawą prawną przetwarzania danych jest:',
        sub: [
          'art. 6 ust. 1 lit. b RODO (realizacja umowy),',
          'art. 6 ust. 1 lit. c RODO (obowiązek prawny),',
          'art. 6 ust. 1 lit. f RODO (uzasadniony interes Administratora).',
        ],
      },
      'Dane osobowe mogą być przekazywane podmiotom współpracującym z Administratorem, w szczególności: operatorom płatności, podmiotom księgowym, dostawcom usług IT, firmom wspierającym realizację usług, a także podmiotom uprawnionym na podstawie przepisów prawa.',
      'Dane osobowe będą przechowywane przez okres realizacji umowy, a następnie przez okres wymagany przepisami prawa (np. podatkowymi) lub do czasu przedawnienia roszczeń.',
      'Klient ma prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, wniesienia sprzeciwu, przenoszenia danych.',
      'Klient ma prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych w przypadku uznania, że przetwarzanie danych osobowych narusza postanowienia RODO.',
      'Podanie danych osobowych jest dobrowolne, jednak niezbędne do zawarcia i realizacji umowy.',
      'Dane osobowe nie będą podlegały zautomatyzowanemu podejmowaniu decyzji, w tym profilowaniu.',
    ],
  },
  {
    title: '§ 12. Usługi dodatkowe',
    items: [
      'Usługodawca wskazuje ceny usług dodatkowych w Regulaminie świadczenia usług oraz na swojej stronie internetowej, w zakładce „Cennik usług dodatkowych”. W przypadku wykonania czynności dodatkowych określonych w Zestawieniu opłat dodatkowych Usługodawca obciąża Klienta kwotami w nim wskazanymi.',
      'Informacje o naliczonych opłatach są przekazywane Klientowi wraz z dokumentem rozliczeniowym na adres e-mail wskazany w Zamówieniu. Termin płatności wynosi 14 dni od dnia doręczenia dokumentu rozliczeniowego.',
      'W przypadku nieuiszczenia opłaty w terminie Usługodawca jest uprawniony do naliczenia odsetek ustawowych za opóźnienie, a w przypadku Przedsiębiorców – odsetek ustawowych za opóźnienie w transakcjach handlowych.',
    ],
  },
  {
    title: '§ 13. Zmiany Regulaminu',
    items: [
      'Zmiana Regulaminu następuje poprzez opublikowanie jego nowej treści na stronie internetowej Usługodawcy, w zakładce „Regulamin Sklepu Internetowego”. Zmieniony Regulamin znajduje zastosowanie do Umów od dnia jego wejścia w życie. Nowy Regulamin wchodzi w życie nie wcześniej niż z chwilą jego opublikowania na stronie internetowej https://bialgruz.pl/.',
      'Zmiany Regulaminu nie naruszają praw nabytych przez Klientów na podstawie dotychczasowego Regulaminu.',
    ],
  },
  {
    title: '§ 14. Postanowienia końcowe',
    items: [
      'Regulamin dostępny jest pod adresem: https://bialgruz.pl/.',
      'W sprawach nieuregulowanych w Regulaminie zastosowanie mają przepisy prawa powszechnie obowiązującego.',
      'Niniejszy Regulamin wchodzi w życie z dniem ……………… 2026 r.',
    ],
  },
];

const renderItem = (item, idx) => {
  if (typeof item === 'string') {
    return <li key={idx}>{item}</li>;
  }
  return (
    <li key={idx}>
      {item.text}
      {item.download && (
        <div className="mt-3">
          <a
            href={item.download.href}
            download
            className="inline-block px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition no-underline"
          >
            ⬇ {item.download.label}
          </a>
        </div>
      )}
      {item.sub && (
        <ol className="list-[lower-alpha] pl-6 mt-2 space-y-1">
          {item.sub.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      )}
    </li>
  );
};

const Regulamin = () => {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-gray-200">
      {SECTIONS.map((section) => (
        <section key={section.title}>
          <h3 className="font-bold text-yellow-400 mb-2">{section.title}</h3>
          {section.intro && <p className="mb-2">{section.intro}</p>}
          {section.items && (
            <ol className="list-decimal pl-6 space-y-2">
              {section.items.map((item, idx) => renderItem(item, idx))}
            </ol>
          )}
          {section.definitions && (
            <ul className="pl-2 space-y-2">
              {section.definitions.map(([term, def]) => (
                <li key={term}>
                  <strong className="text-yellow-300">{term}</strong> – {def}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <hr className="border-yellow-500/30 my-4" />

      <div className="text-center space-y-1 text-yellow-400 font-medium pb-4">
        <p>Kontakt: biuro@bialgruz.pl</p>
        <p>799-091-000 | 799-092-000 | 799-093-000</p>
        <p>BDO: 000672099</p>
      </div>
    </div>
  );
};

export default Regulamin;
