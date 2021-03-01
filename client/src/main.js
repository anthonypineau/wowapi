const linksNav = document.querySelectorAll("nav a");
linksNav.forEach(link => {
    link.addEventListener("click", () => {
        const linkActive = document.querySelector(".active");
        linkActive.classList.remove("active");
        link.classList.add("active");
    });
});