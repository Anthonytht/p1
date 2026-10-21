# ☀️ Portal OZE - Szablon Witryny dla Firmy z Branży Odnawialnych Źródeł Energii

Kompletna, nowoczesna i w pełni responsywna strona internetowa klasy Enterprise dla przedsiębiorstwa z branży **OZE (Odnawialne Źródła Energii)**, przygotowana w formie elastycznego szablonu z wyznaczonymi sekcjami do uzupełnienia danymi Twojej firmy.

---

## 🚀 Jak uruchomić stronę?
Strona została zbudowana w czystym, wysoce zoptymalizowanym stosie **HTML5 + Vanilla CSS3 + Vanilla JavaScript (ES6+)**, dzięki czemu **nie wymaga instalacji Node.js, serwerów ani żadnych zewnętrznych bibliotek**.

1. Otwórz plik `index.html` bezpośrednio w dowolnej przeglądarce internetowej (Chrome, Edge, Firefox, Safari, Opera):
   - Kliknij dwukrotnie plik `index.html` w eksploratorze plików, **lub**
   - Wpisz w pasku adresu przeglądarki ścieżkę:  
     `file:///C:/Users/student/Documents/Kowalski%20Aleksander/p1/index.html`

---

## 📂 Struktura Sekcji (Zgodnie z wymaganiami)

Wszystkie sekcje posiadają profesjonalną strukturę wizualną, a ich treść biznesowa została oznaczona jako **pola do uzupełnienia `[...]`**:

1. **Strona Główna (Hero Section)**:
   - Dynamiczny baner powitalny z fotorealistyczną grafiką farmy fotowoltaicznej, magazynów BESS i turbin wiatrowych.
   - Pola na hasło marketingowe, podtytuł oferty oraz liczniki zrealizowanych projektów (+X MW mocy, powierzchnia magazynowa, czas dostawy).
   - Przyciski szybkiego przejścia (CTA) do oferty i warunków logistycznych.

2. **Informacje Ogólne (O firmie)**:
   - Przestrzeń na historię firmy, profil działalności i strukturę operacyjną.
   - 3 Filary strategiczne: Misja i transformacja OZE, Inżynieria technologiczna, Gwarancja i polski serwis SLA.
   - Pasek certyfikatów i norm (ISO 9001/14001, TÜV Rheinland, NC RfG / UDT, standard ESG).

3. **Oferta Specjalistycznych Produktów wraz z Cennikiem**:
   - **Katalog produktów**: filtry kategorii (Moduły PV, Magazyny BESS, Falowniki, Pompy ciepła HVAC, Konstrukcje i okablowanie) oraz dynamiczna wyszukiwarka na żywo.
   - Karty produktów z parametrami technicznymi (moc Wp, sprawność %, chemia ogniw, gwarancja) i przyciskami szczegółów.
   - **Interaktywny Cennik Hurtowy B2B**:
     - Przełącznik walut: **PLN / EUR (€)** (automatyczne przeliczanie kwot).
     - Przełącznik podatkowy: **Cena Netto / Brutto (+23% VAT)**.
     - Tabela progów rabatowych przy zamówieniach paletowych i kontenerowych.
     - Przycisk pobierania pliku cennika PDF.

4. **Metody Dystrybucji i Dostawy**:
   - 4 Dedykowane kanały logistyczne: Flota własna z dźwigami HDS, Przesyłki paletowe 24/48h (Dachser/Raben), Odbiór z centralnego hubu magazynowego oraz Dostawy FTL (Just-In-Time) na farmy fotowoltaiczne.
   - Wizualizacja nowoczesnego centrum dystrybucyjnego klasy A+.
   - **Interaktywny Kalkulator Logistyczny**: dynamiczne szacowanie czasu dostawy i kosztów netto w zależności od województwa i gabarytu ładunku.

5. **Kontakt & Zapytania B2B**:
   - Dane rejestrowe i teleadresowe: NIP, REGON, KRS, BDO, adres biura handlowego, infolinia i dedykowane skrzynki e-mail.
   - Stylizowana mapa wektorowa z koordynatami GPS magazynu centralnego.
   - Kompleksowy formularz zapytań ofertowych B2B z walidacją danych, wyborem segmentu OZE, szacowanej mocy instalacji oraz potwierdzeniem RODO.

---

## 🛠️ Specjalne Narzędzia dla Edytora Szablonu

- **Pasek Narzędziowy Szablonu (Top Bar)**:
  - Przycisk **"Podświetl pola [DO UZUPEŁNIENIA]"**: natychmiastowo aktywuje pulsujące ramki wokół każdego niespersonalizowanego pola w dokumencie wraz z licznikiem pozostałych pól.
  - Przycisk **"Lista sekcji"**: otwiera modal z instrukcją krok-po-kroku, co należy uzupełnić w danej sekcji.
- **Przełącznik Trybu Jasny / Ciemny**:
  - Domyślny elegancki motyw grafitowy (Dark Tech Eco) lub czysty motyw dzienny (Clean Daylight Eco), z zapisem preferencji w `localStorage`.

---

## 📁 Spis Plików w Projekcie

```
p1/
├── index.html              # Główny dokument strony z semantyczną strukturą i placeholderami
├── style.css               # Nowoczesny system designu CSS (zmienne, glassmorphism, responsywność)
├── app.js                  # Skrypt interaktywny (filtry, cennik, kalkulator dostaw, modale, motyw)
├── README.md               # Dokumentacja wdrożeniowa i instrukcja obsługi
└── assets/
    └── images/             # Zoptymalizowane grafiki wysokiej rozdzielczości
        ├── hero_banner.jpg # Fotografia infrastruktury OZE (PV + BESS + wiatraki)
        ├── product_pv.jpg  # Render modułu bifacial N-Type
        ├── product_bess.jpg# Render szafy magazynu energii BESS
        └── logistics_hub.jpg# Fotografia parku logistycznego i floty transportowej
```
