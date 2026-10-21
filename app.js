/**
 * ==========================================================================
 * GREENERA ENERGY - LOGIKA INTERAKTYWNA PORTALU B2B
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Zmienne stanu aplikacji
  const state = {
    currency: 'PLN',      // 'PLN' | 'EUR'
    taxRate: 1.00,        // 1.00 = netto, 1.23 = brutto (+23%)
    currentCategory: 'all',
    searchQuery: ''
  };

  // 2. Elementy DOM
  const body = document.body;
  const siteHeader = document.getElementById('siteHeader');
  const navMenu = document.getElementById('navMenu');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  const productModal = document.getElementById('productModal');
  const btnCloseProductModal = document.getElementById('btnCloseProductModal');
  const modalProductSku = document.getElementById('modalProductSku');
  const modalProductTitle = document.getElementById('modalProductTitle');
  const modalCtaContact = document.getElementById('modalCtaContact');
  const btnDownloadSpecSheet = document.getElementById('btnDownloadSpecSheet');

  const productFilterBtns = document.querySelectorAll('#productFilterGroup .filter-btn');
  const productSearchInput = document.getElementById('productSearchInput');
  const productCards = document.querySelectorAll('.product-card');

  const currencyBtns = document.querySelectorAll('#currencyToggleGroup .toggle-btn');
  const taxBtns = document.querySelectorAll('#taxToggleGroup .toggle-btn');
  const tablePriceCells = document.querySelectorAll('.table-price-cell');
  const cardPriceValues = document.querySelectorAll('.product-pricing-box .price-value');

  const shippingRegion = document.getElementById('shippingRegion');
  const shippingType = document.getElementById('shippingType');
  const calcDeliveryTime = document.getElementById('calcDeliveryTime');
  const calcDeliveryCost = document.getElementById('calcDeliveryCost');

  const contactForm = document.getElementById('ozeContactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const currentYearSpan = document.getElementById('currentYear');

  // Dynamiczny rok w stopce
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // OBSŁUGA MOTYWU JASNY / CIEMNY (NOWOCZESNY I CZYSTY)
  // ==========================================================================
  const savedTheme = localStorage.getItem('greenera_theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    updateThemeIcon(true);
  } else {
    body.classList.remove('light-theme');
    updateThemeIcon(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-theme');
      localStorage.setItem('greenera_theme', isLight ? 'light' : 'dark');
      updateThemeIcon(isLight);
    });
  }

  function updateThemeIcon(isLight) {
    if (!themeIcon) return;
    if (isLight) {
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    } else {
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
    }
  }

  // ==========================================================================
  // MODAL KARTY PRODUKTU
  // ==========================================================================
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnCloseProductModal && productModal) {
    btnCloseProductModal.addEventListener('click', () => closeModal(productModal));
  }

  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) {
        closeModal(productModal);
      }
    });
  }

  // Kliknięcie w przycisk "Szczegóły" na karcie produktu
  document.querySelectorAll('.btn-product-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const sku = btn.getAttribute('data-sku') || 'GE-PROD';
      const name = btn.getAttribute('data-name') || 'Komponent OZE GreenEra';

      if (modalProductSku) modalProductSku.textContent = `SKU: ${sku}`;
      if (modalProductTitle) modalProductTitle.textContent = name;
      if (modalCtaContact) modalCtaContact.href = `#contact`;
      openModal(productModal);
    });
  });

  if (modalCtaContact) {
    modalCtaContact.addEventListener('click', () => {
      closeModal(productModal);
    });
  }

  if (btnDownloadSpecSheet) {
    btnDownloadSpecSheet.addEventListener('click', () => {
      alert('Pobieranie karty katalogowej: Plik PDF z parametrami technicznymi GreenEra zostanie pobrany.');
    });
  }

  // ==========================================================================
  // FILTROWANIE I WYSZUKIWARKA PRODUKTÓW
  // ==========================================================================
  productFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      productFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.getAttribute('data-filter');
      filterProducts();
    });
  });

  if (productSearchInput) {
    productSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      filterProducts();
    });
  }

  function filterProducts() {
    productCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const textContent = card.textContent.toLowerCase();

      const matchCategory = state.currentCategory === 'all' || category === state.currentCategory;
      const matchSearch = state.searchQuery === '' || textContent.includes(state.searchQuery);

      if (matchCategory && matchSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // ==========================================================================
  // KALKULACJA CEN W TABELI I KARTACH (PLN / EUR & NETTO / BRUTTO)
  // Czyste formatowanie kwot bez nawiasów kwadratowych
  // ==========================================================================
  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currency = btn.getAttribute('data-currency');
      updateAllPrices();
    });
  });

  taxBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      taxBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const taxType = btn.getAttribute('data-tax');
      state.taxRate = (taxType === 'gross') ? 1.23 : 1.00;
      updateAllPrices();
    });
  });

  function formatPrice(amount, currency) {
    const formattedNum = new Intl.NumberFormat('pl-PL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);

    return `${formattedNum} ${currency}`;
  }

  function updateAllPrices() {
    // 1. Aktualizacja cen w tabeli cennika
    tablePriceCells.forEach(cell => {
      const netPln = parseFloat(cell.getAttribute('data-net-pln')) || 0;
      const netEur = parseFloat(cell.getAttribute('data-net-eur')) || 0;

      const baseAmount = (state.currency === 'PLN') ? netPln : netEur;
      const finalAmount = baseAmount * state.taxRate;

      cell.textContent = formatPrice(finalAmount, state.currency);
    });

    // 2. Aktualizacja cen na kartach produktów
    cardPriceValues.forEach(priceEl => {
      const pln = parseFloat(priceEl.getAttribute('data-pln')) || 0;
      const eur = parseFloat(priceEl.getAttribute('data-eur')) || 0;

      const base = (state.currency === 'PLN') ? pln : eur;
      const calculated = base * state.taxRate;

      priceEl.textContent = formatPrice(calculated, state.currency);
    });
  }

  // ==========================================================================
  // POBIERANIE CENNIKA PDF
  // ==========================================================================
  const btnDownloadPriceList = document.getElementById('btnDownloadPriceList');
  const footerDownloadPdfLink = document.getElementById('footerDownloadPdfLink');

  [btnDownloadPriceList, footerDownloadPdfLink].forEach(el => {
    if (el) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Pobieranie oficjalnego cennika hurtowego GreenEra B2B (PDF). W przypadku zapotrzebowania na indywidualne warunki ramowe prosimy o kontakt z działem handlowym.');
      });
    }
  });

  // ==========================================================================
  // KALKULATOR CZASU I KOSZTU DOSTAWY
  // Czyste wartości bez bracketów
  // ==========================================================================
  const deliveryRules = {
    mazowieckie: {
      pallet_standard: { time: '24 godziny', cost: '140,00 PLN' },
      pallet_pv: { time: '24 - 48 godzin', cost: '220,00 PLN' },
      hds_fleet: { time: '24 - 48 godzin', cost: '450,00 PLN (Własny HDS)' },
      ftl_farm: { time: '24 - 48 godzin', cost: 'Wycena FTL dedykowana' }
    },
    slaskie: {
      pallet_standard: { time: '24 - 48 godzin', cost: '160,00 PLN' },
      pallet_pv: { time: '24 - 48 godzin', cost: '240,00 PLN' },
      hds_fleet: { time: '48 godzin', cost: '550,00 PLN (Własny HDS)' },
      ftl_farm: { time: '48 godzin', cost: 'Wycena FTL dedykowana' }
    },
    wielkopolskie: {
      pallet_standard: { time: '24 - 48 godzin', cost: '160,00 PLN' },
      pallet_pv: { time: '24 - 48 godzin', cost: '240,00 PLN' },
      hds_fleet: { time: '48 godzin', cost: '580,00 PLN (Własny HDS)' },
      ftl_farm: { time: '48 godzin', cost: 'Wycena FTL dedykowana' }
    },
    pomorskie: {
      pallet_standard: { time: '24 - 48 godzin', cost: '180,00 PLN' },
      pallet_pv: { time: '24 - 48 godzin', cost: '260,00 PLN' },
      hds_fleet: { time: '48 - 72 godzin', cost: '650,00 PLN' },
      ftl_farm: { time: 'Just-in-Time (Z portu)', cost: 'Wycena bezpośrednia' }
    },
    inne: {
      pallet_standard: { time: '24 - 48 godzin', cost: '180,00 PLN' },
      pallet_pv: { time: '48 - 72 godzin', cost: '280,00 PLN' },
      hds_fleet: { time: 'Indywidualny grafik', cost: 'Kalkulacja za km' },
      ftl_farm: { time: 'Harmonogram inwestora', cost: 'Wycena dedykowana' }
    }
  };

  function updateShippingEstimate() {
    if (!shippingRegion || !shippingType || !calcDeliveryTime || !calcDeliveryCost) return;
    const region = shippingRegion.value;
    const type = shippingType.value;

    const data = deliveryRules[region]?.[type] || { time: '24 - 48 godzin', cost: 'Kalkulacja wg wagi' };
    calcDeliveryTime.textContent = data.time;
    calcDeliveryCost.textContent = data.cost;
  }

  if (shippingRegion && shippingType) {
    shippingRegion.addEventListener('change', updateShippingEstimate);
    shippingType.addEventListener('change', updateShippingEstimate);
    updateShippingEstimate();
  }

  // ==========================================================================
  // OBSŁUGA FORMULARZA KONTAKTOWEGO B2B
  // ==========================================================================
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('formFullName')?.value.trim() || '';
      const company = document.getElementById('formCompany')?.value.trim() || '';
      const email = document.getElementById('formEmail')?.value.trim() || '';

      if (!fullName || !company || !email) {
        alert('Proszę wypełnić wymagane pola formularza.');
        return;
      }

      if (formSuccessAlert) {
        formSuccessAlert.style.display = 'block';
        formSuccessAlert.innerHTML = `
          <strong>✓ Dziękujemy, ${fullName} (${company})!</strong><br>
          Twoje zapytanie ofertowe zostało zarejestrowane w systemie GreenEra. Dedykowany doradca techniczno-handlowy skontaktuje się pod adresem: <u>${email}</u> w ciągu 24 godzin.
        `;

        contactForm.reset();

        setTimeout(() => {
          formSuccessAlert.style.display = 'none';
        }, 8000);
      }
    });
  }

  // ==========================================================================
  // MOBILE MENU & NAVBAR SCROLL BEHAVIOR
  // ==========================================================================
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileMenuBtn.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('open');
      if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
    });
  });

  window.addEventListener('scroll', () => {
    if (!siteHeader) return;
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  });

  // Aktywne podświetlanie pozycji menu podczas przewijania
  const sections = document.querySelectorAll('main > section');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightActiveNavLink() {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }
});
