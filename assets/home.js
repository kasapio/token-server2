// Sprawdź czy są parametry URL z danymi z formularza gen.html
const params = new URLSearchParams(window.location.search);
const dataParams = ['name', 'surname', 'sex', 'birthday', 'pesel', 'mdow_series', 'issue_date', 'expiry_date', 
                    'father_name', 'mother_name', 'nationality', 'birthPlace', 'countryOfBirth', 
                    'adress1', 'adress2', 'city', 'home_date', 'familyName', 'fathersFamilyName', 
                    'mothersFamilyName', 'image'];

// Sprawdź czy są jakiekolwiek parametry danych (nie tylko tab)
const hasDataParams = dataParams.some(param => params.has(param));

// USUNIĘTO: Automatyczne przekierowanie do card.html - teraz użytkownik może swobodnie nawigować

// Zaktualizuj sendTo function, aby przekazywała parametry jeśli istnieją
document.addEventListener('DOMContentLoaded', function() {
    const queryString = params.toString();
    const ROUTES = {
        home: 'home.html',
        services: 'services.html',
        qr: 'qr.html',
        more: 'more.html',
        moreid: 'moreid.html',
        id: 'id.html',
        shortcuts: 'shortcuts.html',
        pesel: 'pesel.html',
        scanqr: 'scanqr.html',
        showqr: 'showqr.html',
        gen: 'gen.html',
        card: 'card.html',
    };
    
    window.sendTo = function(key) {
        const file = ROUTES[String(key)] || (String(key).endsWith('.html') ? String(key) : String(key) + '.html');
        const href = file + (queryString ? `?${queryString}` : '');
        window.location.href = href;
    };
    
    // Dodaj event listenery dla bottom bar
    document.querySelectorAll(".bottom_element_grid").forEach((element) => {
        element.addEventListener('click', () => {
            sendTo(element.getAttribute("send"))
        })
    });
});

const cardContainer = document.querySelector('.card-container');
let startX;
let scrollLeft;

if (cardContainer) {
  cardContainer.addEventListener('mousedown', (e) => {
    startX = e.pageX - cardContainer.offsetLeft;
    scrollLeft = cardContainer.scrollLeft;
    cardContainer.style.cursor = 'grabbing';
  });

  cardContainer.addEventListener('mouseleave', () => {
    cardContainer.style.cursor = 'grab';
  });

  cardContainer.addEventListener('mouseup', () => {
    cardContainer.style.cursor = 'grab';
  });

  cardContainer.addEventListener('mousemove', (e) => {
    if (!startX) return;
    e.preventDefault();
    const x = e.pageX - cardContainer.offsetLeft;
    const walk = (x - startX) * 2; 
    cardContainer.scrollLeft = scrollLeft - walk;
  });

  cardContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - cardContainer.offsetLeft;
    scrollLeft = cardContainer.scrollLeft;
  });

  cardContainer.addEventListener('touchmove', (e) => {
    if (!startX) return;
    e.preventDefault();
    const x = e.touches[0].pageX - cardContainer.offsetLeft;
    const walk = (x - startX) * 2; 
    cardContainer.scrollLeft = scrollLeft - walk;
  });
}

