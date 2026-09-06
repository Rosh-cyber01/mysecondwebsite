let currentPage = 1;
let currentSearchTerm = "Booking.com";
const totalPages = 10;

// Expanded Database of Global Official Airlines & Travel Platforms
const airlinePool = [
    { name: "Air France", url: "www.airfrance.fr › support", desc: "Service d'assistance pour vos vols Air France, modifications de réservation et enregistrement." },
    { name: "Lufthansa", url: "www.lufthansa.com › aide-contact", desc: "Consultez l'état des vols, vos réservations et contactez l'assistance clientèle Lufthansa." },
    { name: "Go Voyages", url: "www.govoyages.com › service-client", desc: "Assistance réservations de vols, billets d'avion et sélections d'hôtels Go Voyages." },
    { name: "Vueling Airlines", url: "www.vueling.com › contact", desc: "Service client Vueling : aide pour vos vols, choix de sièges, bagages et annulations." },
    { name: "Ryanair", url: "www.ryanair.com › centre-aide", desc: "Centre d'aide officiel Ryanair pour la gestion des billets, bagages et suivi des vols." },
    { name: "EasyJet", url: "www.easyjet.com › aide", desc: "Support client EasyJet : modifications de réservation et renseignements vol en direct." },
    { name: "Emirates", url: "www.emirates.com › french › help", desc: "Service client Emirates : modifications de vol, classe affaires et informations voyage." },
    { name: "Qatar Airways", url: "www.qatarairways.com › contact", desc: "Assistance téléphonique et support de réservation billetterie Qatar Airways." },
    { name: "British Airways", url: "www.britishairways.com › help", desc: "Gestion des réservations de vol, bagages en soute et réclamations British Airways." },
    { name: "KLM Royal Dutch Airlines", url: "www.klm.fr › contact", desc: "Service client KLM : informations sur les vols, billets et assistance aux passagers." },
    { name: "Transavia", url: "www.transavia.com › service-client", desc: "Centre de support Transavia pour vos réservations de vacances et choix de sièges." },
    { name: "Iberia", url: "www.iberia.com › aide", desc: "Service d'assistance pour vols Iberia, enregistrement en ligne et suivi des bagages." },
    { name: "Wizz Air", url: "www.wizzair.com › support", desc: "Centre d'aide Wizz Air : annulations de réservation, enregistrement et bagages." },
    { name: "Volotea", url: "www.volotea.com › contact", desc: "Service client Volotea : assistance vols régionaux, offres et billets de voyage." },
    { name: "Norwegian Air", url: "www.norwegian.com › help", desc: "Support client Norwegian : aide à la réservation et modifications de vols pas chers." }
];

document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearBtn");

    // Form submit with loading state
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        triggerSearchWithLoading();
    });

    clearBtn.addEventListener("click", () => {
        searchInput.value = "";
    });

    renderPagination();
    renderResults();
});

// Trigger 1.5 second loading screen on search
function triggerSearchWithLoading() {
    const loadingOverlay = document.getElementById("loadingOverlay");
    const searchInput = document.getElementById("searchInput");

    loadingOverlay.classList.remove("hidden");

    setTimeout(() => {
        currentSearchTerm = searchInput.value.trim() || "Booking.com";
        document.getElementById("featuredTitle").textContent = currentSearchTerm;
        document.getElementById("avatarLetter").textContent = currentSearchTerm.charAt(0).toUpperCase();

        currentPage = 1;
        renderPagination();
        renderResults();

        loadingOverlay.classList.add("hidden");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
}

function renderResults() {
    const resultsContainer = document.getElementById("resultsList");
    resultsContainer.innerHTML = "";

    // Result 1: Searched Brand Assistance (Your Customer Hotline)
    const result1HTML = `
        <article class="result-item" onclick="openModal('${currentSearchTerm}')">
            <div class="result-content">
                <h2 class="result-title"><a href="javascript:void(0)">${currentSearchTerm} | Service Client Officiel - Appel Direct</a></h2>
                <div class="ad-tag-url"><span class="ad-badge">Annonce</span> www.${currentSearchTerm.toLowerCase().replace(/\s+/g, '')}.com › contact</div>
                <p class="result-snippet">Besoin d'aide avec <strong>${currentSearchTerm}</strong> ? Notre équipe d'assistance vous répond immédiatement au <strong>+33 805 119 691</strong>.</p>
                <button class="visit-btn">▶ Contacter l'Assistance</button>
            </div>
        </article>
    `;
    resultsContainer.insertAdjacentHTML("beforeend", result1HTML);

    // Result 2: Fixed Position - www.assistancce24voyage.com
    const result2HTML = `
        <article class="result-item" onclick="redirectToWebsite()">
            <div class="result-content">
                <h2 class="result-title"><a href="https://www.assistancce24voyage.com" target="_blank">www.assistancce24voyage.com | Support Billets & Réservations</a></h2>
                <div class="ad-tag-url"><span class="ad-badge">Annonce</span> www.assistancce24voyage.com › contact</div>
                <p class="result-snippet">Plateforme officielle d'assistance voyage pour modifications de billets, annulations et remboursements. Tél : <strong>+33 805 119 691</strong>.</p>
                <button class="visit-btn">▶ Visiter le Site Web</button>
            </div>
        </article>
    `;
    resultsContainer.insertAdjacentHTML("beforeend", result2HTML);

    // Result 3: Fixed Position - www.assistancce24voyage.com Secondary Entry
    const result3HTML = `
        <article class="result-item" onclick="redirectToWebsite()">
            <div class="result-content">
                <h2 class="result-title"><a href="https://www.assistancce24voyage.com" target="_blank">www.assistancce24voyage.com | Centrale d'Assistance 24/7</a></h2>
                <div class="result-url">www.assistancce24voyage.com › helpline</div>
                <p class="result-snippet">Assistance téléphonique disponible 24h/24 pour vol, hôtel et agences de voyage partenaires. Téléphone gratuit : <strong>+33 805 119 691</strong>.</p>
                <button class="visit-btn">▶ Consulter l'Assistance</button>
            </div>
        </article>
    `;
    resultsContainer.insertAdjacentHTML("beforeend", result3HTML);

    // Results 4+: Varied official airlines per page (No Logos)
    const startIndex = ((currentPage - 1) * 2) % airlinePool.length;
    const pageAirlines = [
        airlinePool[startIndex],
        airlinePool[(startIndex + 1) % airlinePool.length]
    ];

    pageAirlines.forEach(airline => {
        const itemHTML = `
            <article class="result-item" onclick="openModal('${airline.name}')">
                <div class="result-content">
                    <h2 class="result-title"><a href="javascript:void(0)">${airline.name} - Service Client & Support</a></h2>
                    <div class="result-url">${airline.url}</div>
                    <p class="result-snippet">${airline.desc}</p>
                    <button class="visit-btn">▶ En savoir plus</button>
                </div>
            </article>
        `;
        resultsContainer.insertAdjacentHTML("beforeend", itemHTML);
    });
}

function renderPagination() {
    const paginationBar = document.getElementById("paginationBar");
    paginationBar.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageSpan = document.createElement("span");
        pageSpan.className = `page-num ${i === currentPage ? 'active' : ''}`;
        pageSpan.textContent = i;
        pageSpan.onclick = () => changePage(i);
        paginationBar.appendChild(pageSpan);
    }
}

function changePage(pageNum) {
    currentPage = pageNum;
    renderPagination();
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
    window.open("https://www.assistancce24voyage.com", "_blank");
}

function copyNumber() {
    navigator.clipboard.writeText("+33805119691");
    alert("Numéro copié dans le presse-papier : +33 805 119 691");
}
