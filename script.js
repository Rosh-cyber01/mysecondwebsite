document.addEventListener("DOMContentLoaded", () => {
    const langEnBtn = document.getElementById("langEnBtn");
    const langFrBtn = document.getElementById("langFrBtn");
    
    const enElements = document.querySelectorAll(".lang-en");
    const frElements = document.querySelectorAll(".lang-fr");

    // Switch to English
    langEnBtn.addEventListener("click", () => {
        langEnBtn.classList.add("active");
        langFrBtn.classList.remove("active");

        enElements.forEach(el => el.classList.remove("hidden"));
        frElements.forEach(el => el.classList.add("hidden"));
    });

    // Switch to French
    langFrBtn.addEventListener("click", () => {
        langFrBtn.classList.add("active");
        langEnBtn.classList.remove("active");

        frElements.forEach(el => el.classList.remove("hidden"));
        enElements.forEach(el => el.classList.add("hidden"));
    });

    // Cookie Banner dismiss handlers
    const cookieBanner = document.getElementById("cookieBanner");
    const acceptBtns = [document.getElementById("acceptCookies"), document.getElementById("acceptCookiesFr")];
    const declineBtns = [document.getElementById("declineCookies"), document.getElementById("declineCookiesFr")];

    [...acceptBtns, ...declineBtns].forEach(btn => {
        if (btn) {
            btn.addEventListener("click", () => {
                cookieBanner.style.display = "none";
            });
        }
    });
});
