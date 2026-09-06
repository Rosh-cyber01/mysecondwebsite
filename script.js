let currentPage = 1;
let currentSearchTerm = "Booking.com";

// Official Airlines Data mapped per Page Number
const pagesData = {
    1: [
        { name: "Air France", url: "www.airfrance.fr › support", desc: "Service d'assistance pour vos vols Air France, bagages et enregistrement en ligne.", logo: "https://www.google.com/s2/favicons?domain=airfrance.fr&sz=64" },
        { name: "Lufthansa", url: "www.lufthansa.com › aide-contact", desc: "Consultez l'état des vols, vos réservations et contactez l'assistance Lufthansa.", logo: "https://www.google.com/s2/favicons?domain=lufthansa.com&sz=64" }
    ],
    2: [
        { name: "Vueling Airlines", url: "www.vueling.com › contact", desc: "Service client Vueling : aide pour vos vols, choix de sièges et annulations.", logo: "https://www.google.com/s2/favicons?domain=vueling.com&sz=64" },
        { name: "Ryanair", url: "www.ryanair.com › fr-fr › centre-aide", desc: "Centre d'aide officiel Ryanair pour la gestion des billets et suivi des bagages.", logo: "https://www.google.com/s2/favicons?domain=ryanair.com&sz=64" }
    ],
    3: [
        { name: "Go Voyages", url: "www.govoyages.com › service-client", desc: "Assistance réservations de vols et sélections d'hôtels Go Voyages.", logo: "https://www.google.com/s2/favicons?domain=govoyages.com&sz=64" },
        { name: "Emirates", url: "www.emirates.com › french › help", desc: "Service client Emirates : modifications de vol et informations de voyage.", logo: "https://www.google.com/s2/favicons?domain=emirates.com&sz=64" }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearBtn");

    // Process search ONLY on Enter press / form submit
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        executeSearch();
    });

    clearBtn.addEventListener("click", () => {
        searchInput.value = "";
    });

    renderResults();
});

function executeSearch() {
    const searchInput = document.getElementById("searchInput");
    currentSearchTerm = searchInput.value.trim() || "Booking.com";

    // Update Featured Box Header
    document.getElementById("featuredTitle").textContent = currentSearchTerm;
    document.getElementById("avatarLetter").textContent = currentSearchTerm.charAt(0).toUpperCase();

    renderResults();
}

function renderResults() {
    const resultsContainer = document.getElementById("resultsList");
    resultsContainer.innerHTML = "";

    // Result 1: Primary Search Term Assistance (Your Phone Number)
    const result1HTML = `
        <article class="result-item" onclick="openModal('${currentSearchTerm}')">
            <div class="result-content">
                <h2 class="result-title"><a href="javascript:void(0)">${currentSearchTerm} | Service Client Officiel - Appel Direct</a></h2>
                <div class="ad-tag-url"><span class="ad-badge">Annonce</span> www.${currentSearchTerm.toLowerCase().replace(/\s+/g, '')}.com › contact</div>
                <p class="result-snippet">Besoin d'aide avec <strong>${currentSearchTerm}</strong> ? Notre équipe d'assistance vous répond immédiatement au <strong>+33 805 119 691</strong>.</p>
                <button class="visit-btn">▶ Contacter l'Assistance</button>
            </div>
            <div class="logo-icon-box">
                <img src="https://www.google.com/s2/favicons?domain=${currentSearchTerm.toLowerCase().replace(/\s+/g, '')}.com&sz=64" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1033/1033083.png'" alt="Logo">
            </div>
        </article>
    `;
    resultsContainer.insertAdjacentHTML("beforeend", result1HTML);

    // Result 2: Assistance 24 Voyage (Direct Website Redirect)
    const result2HTML = `
        <article class="result-item" onclick="redirectToWebsite()">
            <div class="result-content">
                <h2 class="result-title"><a href="https://www.assistance24voyage.com" target="_blank">Assistance 24 Voyage | Support Billets & Réservations</a></h2>
                <div class="ad-tag-url"><span class="ad-badge">Annonce</span> www.assistance24voyage.com › contact</div>
                <p class="result-snippet">Plateforme officielle d'assistance voyage pour modifications de billets, annulations et remboursements. Tél : <strong>+33 805 119 691</strong>.</p>
                <button class="visit-btn">▶ Visiter le Site Web</button>
            </div>
            <div class="logo-icon-box">
                <span style="font-size: 24px;">🌐</span>
            </div>
        </article>
    `;
    resultsContainer.insertAdjacentHTML("beforeend", result2HTML);

    // Result 3: Secondary Assistance 24 Voyage entry (Direct Redirect)
    const result3HTML = `
        <article class="result-item" onclick="redirectToWebsite()">
            <div class="result-content">
                <h2 class="result-title"><a href="https://www.assistance24voyage.com" target="_blank">www.assistance24voyage.com | Centrale d'Assistance 24/7</a></h2>
                <div class="result-url">www.assistance24voyage.com › helpline</div>
                <p class="result-snippet">Assistance téléphonique disponible 24h/24 pour vol, hôtel et agences de voyage partenaires. Téléphone gratuit : <strong>+33 805 119 691</strong>.</p>
                <button class="visit-btn">▶ Consulter l'Assistance</button>
            </div>
            <div class="logo-icon-box">
                <span style="font-size: 24px;">✈️</span>
            </div>
        </article>
    `;
    resultsContainer.insertAdjacentHTML("beforeend", result3HTML);

    // Results 4+: Dynamic Official Airlines based on current page
    const airlineList = pagesData[currentPage] || pagesData[1];

    airlineList.forEach(airline => {
        const itemHTML = `
            <article class="result-item" onclick="openModal('${airline.name}')">
                <div class="result-content">
                    <h2 class="result-title"><a href="javascript:void(0)">${airline.name} - Service Client & Support</a></h2>
                    <div class="result-url">${airline.url}</div>
                    <p class="result-snippet">${airline.desc}</p>
                    <button class="visit-btn">▶ En savoir plus</button>
                </div>
                <div class="logo-icon-box">
                    <img src="${airline.logo}" alt="${airline.name}">
                </div>
            </article>
        `;
        resultsContainer.insertAdjacentHTML("beforeend", itemHTML);
    });
}

function changePage(pageNum, element) {
    currentPage = pageNum;
    const pages = document.querySelectorAll(".page-num");
    pages.forEach(p => p.classList.remove("active"));
    element.classList.add("active");

    renderResults();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openModal(brandName) {
    document.getElementById("modalBrandName").textContent = "Support " + brandName;
    document.getElementById("callModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("callModal").classList.add("hidden");
}

function redirectToWebsite() {
    window.open("https://www.assistance24voyage.com", "_blank");
}

function copyNumber() {
    navigator.clipboard.writeText("+33805119691");
    alert("Numéro copié dans le presse-papier : +33 805 119 691");
}
