document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearBtn");
    const featuredTitle = document.getElementById("featuredTitle");
    const avatarLetter = document.getElementById("avatarLetter");
    const dynamicQueries = document.querySelectorAll(".dynamic-query");
    
    // Language Switcher
    const langEnBtn = document.getElementById("langEnBtn");
    const langFrBtn = document.getElementById("langFrBtn");
    const enElements = document.querySelectorAll(".lang-en");
    const frElements = document.querySelectorAll(".lang-fr");

    langEnBtn.addEventListener("click", () => {
        langEnBtn.classList.add("active");
        langFrBtn.classList.remove("active");
        enElements.forEach(el => el.classList.remove("hidden"));
        frElements.forEach(el => el.classList.add("hidden"));
    });

    langFrBtn.addEventListener("click", () => {
        langFrBtn.classList.add("active");
        langEnBtn.classList.remove("active");
        frElements.forEach(el => el.classList.remove("hidden"));
        enElements.forEach(el => el.classList.add("hidden"));
    });

    // Dynamic Search Input Logic
    function updateSearch() {
        const query = searchInput.value.trim() || "Booking.com";
        featuredTitle.textContent = query;
        avatarLetter.textContent = query.charAt(0).toUpperCase();

        dynamicQueries.forEach(el => {
            el.textContent = query;
        });
    }

    searchInput.addEventListener("input", updateSearch);
    
    clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        updateSearch();
    });
});

// Modal Logic
function openModal(brandName) {
    const query = document.getElementById("searchInput").value.trim() || brandName;
    document.getElementById("modalBrandName").textContent = query + " Support";
    document.getElementById("callModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("callModal").classList.add("hidden");
}

function copyNumber() {
    navigator.clipboard.writeText("+33805119691");
    alert("Phone number copied to clipboard: +33 805 119 691");
}

// Pagination Logic
function changePage(pageNum, element) {
    const pages = document.querySelectorAll(".page-num");
    pages.forEach(p => p.classList.remove("active"));
    element.classList.add("active");

    // Scroll back to top to mimic page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
