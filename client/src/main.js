const API_URL = "http://localhost:3000/";
const divApp = document.querySelector("#app");

const linksNav = document.querySelectorAll("nav a");
linksNav.forEach(link => {
    link.addEventListener("click", () => {
        const linkActive = document.querySelector(".active");
        linkActive.classList.remove("active");
        link.classList.add("active");
    });
});

function onClickHome(){
    const divContent = document.createElement("div");

    const homeContent = document.createElement("p");
    homeContent.textContent = "home page";

    divContent.appendChild(homeContent);

    divApp.removeChild(divApp.children[0]);
    divApp.appendChild(divContent);
}

function onClickLink(link, hasAnImage){
    const LINK_API_URL = API_URL + link;
    fetch(LINK_API_URL)
    .then(response => response.json())
    .then(data => {
        const divGridContainer = document.createElement("div");
        divGridContainer.classList.add("grid-container");
        //console.log(data);
        data.forEach(element => {
            const divGridItem = document.createElement("div");
            divGridItem.classList.add("grid-item");
            const divFlipCard = document.createElement("div");
            divFlipCard.classList.add("flip-card");
            const divFlipCardInner = document.createElement("div");
            divFlipCardInner.classList.add("flip-card-inner");
            const divFlipCardFront = document.createElement("div");
            divFlipCardFront.classList.add("flip-card-front");

            if(hasAnImage){
                const imgFlipCardFront = document.createElement("img");
                imgFlipCardFront.src = element.media;

                divFlipCardFront.appendChild(imgFlipCardFront);
            }else{
                const noImgFlipCardFront = document.createElement("p");
                noImgFlipCardFront.textContent = element.name;
                
                divFlipCardFront.appendChild(noImgFlipCardFront);
            }

            const divFlipCardBack = document.createElement("div");
            divFlipCardBack.classList.add("flip-card-back");

            const divFlipCardBackContent = document.createElement("p");
            divFlipCardBackContent.textContent = element.name;
            
            divFlipCardBack.appendChild(divFlipCardBackContent);

            divFlipCardInner.appendChild(divFlipCardFront);
            divFlipCardInner.appendChild(divFlipCardBack);
            divFlipCard.appendChild(divFlipCardInner);
            divGridItem.appendChild(divFlipCard);
            divGridContainer.appendChild(divGridItem);
        });
        const divContent = document.createElement("div");
        divContent.appendChild(divGridContainer);
        divApp.removeChild(divApp.children[0]);
        divApp.appendChild(divContent);
    });
}

function onClickAbout(){
    const divContent = document.createElement("div");

    const aboutContent = document.createElement("p");
    aboutContent.textContent = "about page";

    divContent.appendChild(aboutContent);

    divApp.removeChild(divApp.children[0]);
    divApp.appendChild(divContent);
}