const API_URL = "http://localhost:3000/";
const divApp = document.querySelector("#app");

const buttonAdmin = document.getElementById("buttonAdministration");

fetch("./src/views/default.html").then(response => response.text()).then(data => divApp.innerHTML = data);

const linksNav = document.querySelectorAll("nav a");
linksNav.forEach(link => {
    if(!link.classList.contains("right"))
    {
        link.addEventListener("click", () => {
            const linkActive = document.querySelector(".active");
            linkActive.classList.remove("active");
            link.classList.add("active");
        });
    }
});

window.onload = function() { 
    if(localStorage.getItem("token")==null){
        localStorage.setItem("token", "token");
    }
    
    const LINK_API_URL = API_URL + "players";
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

                const imgFlipCardFront = document.createElement("img");
                imgFlipCardFront.src = element.icon;

                divFlipCardFront.appendChild(imgFlipCardFront);

            const divFlipCardBack = document.createElement("div");
            divFlipCardBack.classList.add("flip-card-back");

            const divFlipCardBackContent = document.createElement("p");
            divFlipCardBackContent.textContent = element.username;
            
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

            
            if(localStorage.getItem("token")!="token"){
                const divGridItemContainer = document.createElement("div");

                const button1 = document.createElement("button");
                button1.innerText = "Edit";
    
                divGridItemContainer.appendChild(button1);
    
                const button2 = document.createElement("button");
                button2.innerText = "Delete";

                divGridItemContainer.appendChild(button2);

                divGridItem.appendChild(divGridItemContainer);
            }

            divGridContainer.appendChild(divGridItem);
        });
        const divContent = document.createElement("div");

        if(localStorage.getItem("token")!="token"){
            const buttonAdd = document.createElement("button");
            buttonAdd.innerText = "Add";
            buttonAdd.addEventListener("click", ()=>{
                switch(link){
                    case "classes":
                        onClickAddClass();
                    break;
                    case "itemClasses":
                        onClickAddItemClass();
                    break;
                    case "items":
                        onClickAddItem();
                    break;
                    case "mounts":
                        onClickAddMount();
                    break;
                    case "professions":
                        onClickAddProfession();
                    break;
                    case "races":
                        onClickAddRace();
                    break;
                }
                
            });
            divContent.appendChild(buttonAdd);
        }

        divContent.appendChild(divGridContainer);
        divApp.removeChild(divApp.children[0]);
        divApp.appendChild(divContent);
    });
}

function onClickAdministration(){
    if(localStorage.getItem("token") == "exampletoken"){
        localStorage.setItem("token", "token");
    }else{
        localStorage.setItem("token", "exampletoken");
    }
    /*
    if(buttonAdmin.innerText === "Administration"){
        buttonAdmin.innerText = "Déconnexion"
    }else{
        buttonAdmin.innerText = "Administration"
    }
    */   
    fetch("./src/views/administration.html").then(response => response.text()).then(data => divApp.innerHTML = data);
}

function onClickAbout(){
    const divContent = document.createElement("div");

    const aboutContent = document.createElement("p");
    aboutContent.innerText = "about page";

    divContent.appendChild(aboutContent);

    divApp.removeChild(divApp.children[0]);
    divApp.appendChild(divContent);
}

function onClickAddClass(){
    const divContent = document.createElement("div");
    const form = document.createElement("form");
    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    const labelPowerType = document.createElement("label");
    const selectPowerType = document.createElement("select");
    const labelMedia = document.createElement("label");
    const inputMedia = document.createElement("input");
    const buttonAdd = document.createElement("button");
    name(form, labelName, inputName);
    powerType(form, labelPowerType, selectPowerType);
    media(form, labelMedia, inputMedia);
    addButtonAdd(form, buttonAdd, addClass);
    app(divApp, divContent, form);
}

function onClickAddItem(){
    const divContent = document.createElement("div");
    const form = document.createElement("form");

    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    name(form, labelName, inputName);

    const labelQuality = document.createElement("label");
    const selectQuality = document.createElement("select");
    quality(form, labelQuality, selectQuality);
    
    const labelLevel = document.createElement("label");
    const inputLevel = document.createElement("input");
    level(form, labelLevel, inputLevel);
    

    const labelRequiredLevel = document.createElement("label");
    labelRequiredLevel.innerText = "Required level :";
    labelRequiredLevel.setAttribute("for", "requiredLevel");

    const inputRequiredLevel = document.createElement("input");
    inputRequiredLevel.setAttribute("type", "number");
    inputRequiredLevel.setAttribute("id", "requiredLevel");

    form.appendChild(labelRequiredLevel);
    form.appendChild(inputRequiredLevel);
    form.appendChild(document.createElement("br"));

    const labelPurchasePrice = document.createElement("label");
    labelPurchasePrice.innerText = "Purchase price :";
    labelPurchasePrice.setAttribute("for", "purchasePrice");

    const inputPurchasePrice = document.createElement("input");
    inputPurchasePrice.setAttribute("type", "number");
    inputPurchasePrice.setAttribute("id", "purchasePrice");

    form.appendChild(labelPurchasePrice);
    form.appendChild(inputPurchasePrice);
    form.appendChild(document.createElement("br"));

    const labelSellPrice = document.createElement("label");
    labelSellPrice.innerText = "Sell price :";
    labelSellPrice.setAttribute("for", "sellPrice");

    const inputSellPrice = document.createElement("input");
    inputSellPrice.setAttribute("type", "number");
    inputSellPrice.setAttribute("id", "sellPrice");

    form.appendChild(labelSellPrice);
    form.appendChild(inputSellPrice);
    form.appendChild(document.createElement("br"));

    const labelIsEquippable = document.createElement("label");
    labelIsEquippable.innerText = "Equippable :";
    labelIsEquippable.setAttribute("for", "isEquippable");

    const selectIsEquippable = document.createElement("select");
    selectIsEquippable.setAttribute("id", "isEquippable");

    const optionSelectIsEquippable1 = document.createElement("option");
    optionSelectIsEquippable1.innerText = "True";
    optionSelectIsEquippable1.setAttribute("value", "1");

    const optionSelectIsEquippable2 = document.createElement("option");
    optionSelectIsEquippable2.innerText = "False";
    optionSelectIsEquippable2.setAttribute("value", "0");

    selectIsEquippable.appendChild(optionSelectIsEquippable1);
    selectIsEquippable.appendChild(optionSelectIsEquippable2);

    form.appendChild(labelIsEquippable);
    form.appendChild(selectIsEquippable);
    form.appendChild(document.createElement("br"));

    const labelIsStackable = document.createElement("label");
    labelIsStackable.innerText = "Stackable :";
    labelIsStackable.setAttribute("for", "isStackable");

    const selectIsStackable = document.createElement("select");
    selectIsStackable.setAttribute("id", "isStackable");

    const optionSelectIsStackable1 = document.createElement("option");
    optionSelectIsStackable1.innerText = "True";
    optionSelectIsStackable1.setAttribute("value", "1");

    const optionSelectIsStackable2 = document.createElement("option");
    optionSelectIsStackable2.innerText = "False";
    optionSelectIsStackable2.setAttribute("value", "0");

    selectIsStackable.appendChild(optionSelectIsStackable1);
    selectIsStackable.appendChild(optionSelectIsStackable2);

    form.appendChild(labelIsStackable);
    form.appendChild(selectIsStackable);
    form.appendChild(document.createElement("br"));

    const labelMedia = document.createElement("label");
    const inputMedia = document.createElement("input");
    media(form, labelMedia, inputMedia);

    const labelItemClass = document.createElement("label");
    labelItemClass.innerText = "Item class :";
    labelItemClass.setAttribute("for", "itemClass");

    const selectItemClass = document.createElement("select");
    selectItemClass.setAttribute("id", "itemClass");

    fetch("http://localhost:3000/itemClasses").then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const option = document.createElement("option");
            option.setAttribute("value", element.id);
            option.innerText = element.name;
            selectItemClass.appendChild(option);
        });
    });

    form.appendChild(labelItemClass);
    form.appendChild(selectItemClass);
    form.appendChild(document.createElement("br"));

    const buttonAdd = document.createElement("button");
    addButtonAdd(form, buttonAdd, addItem);
    app(divApp, divContent, form);
}

function onClickAddItemClass(){
    const divContent = document.createElement("div");

    const form = document.createElement("form");

    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    name(form, labelName, inputName);

    const buttonAdd = document.createElement("button");
    addButtonAdd(form, buttonAdd, addItemClass);
    app(divApp, divContent, form);
}

function onClickAddMount(){
    const divContent = document.createElement("div");

    const form = document.createElement("form");

    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    name(form, labelName, inputName);

    const labelDescription = document.createElement("label");
    labelDescription.innerText = "Description :";
    labelDescription.setAttribute("for", "description");

    const textareaDescription = document.createElement("textarea");
    textareaDescription.setAttribute("id", "description");

    form.appendChild(labelDescription);
    form.appendChild(textareaDescription);
    form.appendChild(document.createElement("br"));

    const labelSource = document.createElement("label");
    labelSource.innerText = "Source :";
    labelSource.setAttribute("for", "source");

    const selectSource = document.createElement("select");
    selectSource.setAttribute("id", "source");

    const optionSelectSource1 = document.createElement("option");
    optionSelectSource1.innerText = "Achievement";
    optionSelectSource1.setAttribute("value", "Achievement");

    const optionSelectSource2 = document.createElement("option");
    optionSelectSource2.innerText = "Drop";
    optionSelectSource2.setAttribute("value", "Drop");

    const optionSelectSource3 = document.createElement("option");
    optionSelectSource3.innerText = "Profession";
    optionSelectSource3.setAttribute("value", "Profession");

    const optionSelectSource4 = document.createElement("option");
    optionSelectSource4.innerText = "Quest";
    optionSelectSource4.setAttribute("value", "Quest");

    const optionSelectSource5 = document.createElement("option");
    optionSelectSource5.innerText = "Vendor";
    optionSelectSource5.setAttribute("value", "Vendor");

    selectSource.appendChild(optionSelectSource1);
    selectSource.appendChild(optionSelectSource2);
    selectSource.appendChild(optionSelectSource3);
    selectSource.appendChild(optionSelectSource4);
    selectSource.appendChild(optionSelectSource5);

    form.appendChild(labelSource);
    form.appendChild(selectSource);
    form.appendChild(document.createElement("br"));

    const labelFaction = document.createElement("label");
    const selectFaction = document.createElement("select");
    faction(form, labelFaction, selectFaction); 

    const labelMedia = document.createElement("label");
    const inputMedia = document.createElement("input");
    media(form, labelMedia, inputMedia);

    const labelPlayer = document.createElement("label");
    labelPlayer.innerText = "Player :";
    labelPlayer.setAttribute("for", "player");

    const selectPlayer = document.createElement("select");
    selectPlayer.setAttribute("id", "player");

    fetch("http://localhost:3000/players").then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(element => {
            const option = document.createElement("option");
            option.setAttribute("value", element.id);
            option.innerText = element.username;
            selectPlayer.appendChild(option);
        });
    });

    form.appendChild(labelPlayer);
    form.appendChild(selectPlayer);
    form.appendChild(document.createElement("br"));

    const buttonAdd = document.createElement("button");
    addButtonAdd(form, buttonAdd, addMount);
    app(divApp, divContent, form);
}

function onClickAddPlayer(){
    const divContent = document.createElement("div");

    const form = document.createElement("form");

    const labelUsername = document.createElement("label");
    labelUsername.innerText = "Username :";
    labelUsername.setAttribute("for", "username");

    const inputUsername = document.createElement("input");
    inputUsername.setAttribute("type", "text");
    inputUsername.setAttribute("id", "username");

    form.appendChild(labelUsername);
    form.appendChild(inputUsername);
    form.appendChild(document.createElement("br"));

    const labelIsConnected = document.createElement("label");
    labelIsConnected.innerText = "Connected :";
    labelIsConnected.setAttribute("for", "isConnected");

    const selectIsConnected = document.createElement("select");
    selectIsConnected.setAttribute("id", "isConnected");

    const optionSelectIsConnected1 = document.createElement("option");
    optionSelectIsConnected1.innerText = "True";
    optionSelectIsConnected1.setAttribute("value", "1");

    const optionSelectIsConnected2 = document.createElement("option");
    optionSelectIsConnected2.innerText = "False";
    optionSelectIsConnected2.setAttribute("value", "0");

    selectIsConnected.appendChild(optionSelectIsConnected1);
    selectIsConnected.appendChild(optionSelectIsConnected2);

    form.appendChild(labelIsConnected);
    form.appendChild(selectIsConnected);
    form.appendChild(document.createElement("br"));

    const labelLevel = document.createElement("label");
    const inputLevel = document.createElement("input");
    level(form, labelLevel, inputLevel);

    const labelIcon = document.createElement("label");
    labelIcon.innerText = "Icon :";
    labelIcon.setAttribute("for", "icon");

    const inputIcon = document.createElement("input");
    inputIcon.setAttribute("type", "text");
    inputIcon.setAttribute("id", "icon");

    form.appendChild(labelIcon);
    form.appendChild(inputIcon);
    form.appendChild(document.createElement("br"));

    const labelClass = document.createElement("label");
    labelClass.innerText = "Class :";
    labelClass.setAttribute("for", "class");

    const selectClass = document.createElement("select");
    selectClass.setAttribute("id", "class");

    fetch("http://localhost:3000/classes").then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(element => {
            const option = document.createElement("option");
            option.setAttribute("value", element.id);
            option.innerText = element.name;
            selectClass.appendChild(option);
        });
    });

    form.appendChild(labelClass);
    form.appendChild(selectClass);
    form.appendChild(document.createElement("br"));

    const labelRace = document.createElement("label");
    labelRace.innerText = "Race :";
    labelRace.setAttribute("for", "race");

    const selectRace = document.createElement("select");
    selectRace.setAttribute("id", "race");

    fetch("http://localhost:3000/races").then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(element => {
            const option = document.createElement("option");
            option.setAttribute("value", element.id);
            option.innerText = element.name;
            selectRace.appendChild(option);
        });
    });

    form.appendChild(labelRace);
    form.appendChild(selectRace);
    form.appendChild(document.createElement("br"));

    const labelProfession = document.createElement("label");
    labelProfession.innerText = "Profession :";
    labelProfession.setAttribute("for", "profession");

    const selectProfession = document.createElement("select");
    selectProfession.setAttribute("id", "profession");

    fetch("http://localhost:3000/professions").then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(element => {
            const option = document.createElement("option");
            option.setAttribute("value", element.id);
            option.innerText = element.name;
            selectProfession.appendChild(option);
        });
    });

    form.appendChild(labelProfession);
    form.appendChild(selectProfession);
    form.appendChild(document.createElement("br"));

    const buttonAdd = document.createElement("button");
    addButtonAdd(form, buttonAdd, addPlayer);
    app(divApp, divContent, form);
}

function onClickAddPlayerItem(){
    const divContent = document.createElement("div");

    const form = document.createElement("form");

    const labelItem = document.createElement("label");
    labelItem.innerText = "Item :";
    labelItem.setAttribute("for", "item");

    const selectItem = document.createElement("select");
    selectItem.setAttribute("id", "item");

    fetch("http://localhost:3000/items").then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(element => {
            const option = document.createElement("option");
            option.setAttribute("value", element.id);
            option.innerText = element.name;
            selectItem.appendChild(option);
        });
    });

    form.appendChild(labelItem);
    form.appendChild(selectItem);
    form.appendChild(document.createElement("br"));

    const labelPlayer = document.createElement("label");
    labelPlayer.innerText = "Player :";
    labelPlayer.setAttribute("for", "player");

    const selectPlayer = document.createElement("select");
    selectPlayer.setAttribute("id", "player");

    fetch("http://localhost:3000/players").then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(element => {
            const option = document.createElement("option");
            option.setAttribute("value", element.id);
            option.innerText = element.username;
            selectPlayer.appendChild(option);
        });
    });

    form.appendChild(labelPlayer);
    form.appendChild(selectPlayer);
    form.appendChild(document.createElement("br"));

    const labelNumberInInventory = document.createElement("label");
    labelNumberInInventory.innerText = "Number in inventory :";
    labelNumberInInventory.setAttribute("for", "numberInInventory");

    const inputNumberInInventory = document.createElement("input");
    inputNumberInInventory.setAttribute("type", "number");
    inputNumberInInventory.setAttribute("id", "numberInInventory");

    form.appendChild(labelNumberInInventory);
    form.appendChild(inputNumberInInventory);
    form.appendChild(document.createElement("br"));

    const buttonAdd = document.createElement("button");
    addButtonAdd(form, buttonAdd, addPlayerItem);
    app(divApp, divContent, form);
}

function onClickAddProfession(){
    const divContent = document.createElement("div");

    const form = document.createElement("form");

    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    name(form, labelName, inputName);

    const labelDescription = document.createElement("label");
    labelDescription.innerText = "Description :";
    labelDescription.setAttribute("for", "description");

    const textareaDescription = document.createElement("textarea");
    textareaDescription.setAttribute("id", "description");

    form.appendChild(labelDescription);
    form.appendChild(textareaDescription);
    form.appendChild(document.createElement("br"));

    const labelType = document.createElement("label");
    labelType.innerText = "Type :";
    labelType.setAttribute("for", "type");

    const selectType = document.createElement("select");
    selectType.setAttribute("id", "type");

    const optionSelectType1 = document.createElement("option");
    optionSelectType1.innerText = "Primary";
    optionSelectType1.setAttribute("value", "Primary");

    const optionSelectType2 = document.createElement("option");
    optionSelectType2.innerText = "Secondary";
    optionSelectType2.setAttribute("value", "Secondary");

    selectType.appendChild(optionSelectType1);
    selectType.appendChild(optionSelectType2);

    form.appendChild(labelType);
    form.appendChild(selectType);
    form.appendChild(document.createElement("br"));

    const labelFaction = document.createElement("label");
    const selectFaction = document.createElement("select");
    faction(form, labelFaction, selectFaction); 

    const labelMedia = document.createElement("label");
    const inputMedia = document.createElement("input");
    media(form, labelMedia, inputMedia);

    const buttonAdd = document.createElement("button");
    addButtonAdd(form, buttonAdd, addProfession);
    app(divApp, divContent, form);
}

function onClickAddRace(){
    const divContent = document.createElement("div");
    const form = document.createElement("form");
    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    const labelFaction = document.createElement("label");
    const selectFaction = document.createElement("select");
    const buttonAdd = document.createElement("button");
    name(form, labelName, inputName);
    faction(form, labelFaction, selectFaction);
    addButtonAdd(form, buttonAdd, addRace);
    app(divApp, divContent, form);
}

/* form components */
function name(form, labelName, inputName){
    labelName.innerText = "Name :";
    labelName.setAttribute("for", "name");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", "name");
    addForm(form, labelName, inputName);
}

function powerType(form, labelPowerType, selectPowerType){
    labelPowerType.innerText = "Power type :";
    labelPowerType.setAttribute("for", "powerType");
    selectPowerType.setAttribute("id", "powerType");
    const optionSelectPowerType1 = document.createElement("option");
    optionSelectPowerType1.innerText = "Energy";
    optionSelectPowerType1.setAttribute("value", "Energy");
    const optionSelectPowerType2 = document.createElement("option");
    optionSelectPowerType2.innerText = "Fury";
    optionSelectPowerType2.setAttribute("value", "Fury");
    const optionSelectPowerType3 = document.createElement("option");
    optionSelectPowerType3.innerText = "Focus";
    optionSelectPowerType3.setAttribute("value", "Focus");
    const optionSelectPowerType4 = document.createElement("option");
    optionSelectPowerType4.innerText = "Mana";
    optionSelectPowerType4.setAttribute("value", "Mana");
    const optionSelectPowerType5 = document.createElement("option");
    optionSelectPowerType5.innerText = "Rage";
    optionSelectPowerType5.setAttribute("value", "Rage");
    const optionSelectPowerType6 = document.createElement("option");
    optionSelectPowerType6.innerText = "Runic Power";
    optionSelectPowerType6.setAttribute("value", "Runic Power");
    selectPowerType.appendChild(optionSelectPowerType1);
    selectPowerType.appendChild(optionSelectPowerType2);
    selectPowerType.appendChild(optionSelectPowerType3);
    selectPowerType.appendChild(optionSelectPowerType4);
    selectPowerType.appendChild(optionSelectPowerType5);
    selectPowerType.appendChild(optionSelectPowerType6);
    addForm(form, labelPowerType, selectPowerType);
}

function media(form, labelMedia, inputMedia){
    labelMedia.innerText = "Media :";
    labelMedia.setAttribute("for", "media");
    inputMedia.setAttribute("type", "text");
    inputMedia.setAttribute("id", "media");
    addForm(form, labelMedia, inputMedia);
}

function faction(form, labelFaction, selectFaction){
    labelFaction.innerText = "Faction :";
    labelFaction.setAttribute("for", "faction");
    selectFaction.setAttribute("id", "faction");
    const optionSelectFaction1 = document.createElement("option");
    optionSelectFaction1.innerText = "Alliance";
    optionSelectFaction1.setAttribute("value", "Alliance");
    const optionSelectFaction2 = document.createElement("option");
    optionSelectFaction2.innerText = "Horde";
    optionSelectFaction2.setAttribute("value", "Horde");
    selectFaction.appendChild(optionSelectFaction1);
    selectFaction.appendChild(optionSelectFaction2);
    addForm(form, selectFaction, selectFaction);
}

function quality(form, labelQuality, selectQuality){
    labelQuality.innerText = "Quality :";
    labelQuality.setAttribute("for", "quality");
    selectQuality.setAttribute("id", "quality");
    const optionSelectQuality1 = document.createElement("option");
    optionSelectQuality1.innerText = "Poor";
    optionSelectQuality1.setAttribute("value", "Poor");
    const optionSelectQuality2 = document.createElement("option");
    optionSelectQuality2.innerText = "Common";
    optionSelectQuality2.setAttribute("value", "Common");
    const optionSelectQuality3 = document.createElement("option");
    optionSelectQuality3.innerText = "Uncommon";
    optionSelectQuality3.setAttribute("value", "Uncommon");
    const optionSelectQuality4 = document.createElement("option");
    optionSelectQuality4.innerText = "Rare";
    optionSelectQuality4.setAttribute("value", "Rare");
    const optionSelectQuality5 = document.createElement("option");
    optionSelectQuality5.innerText = "Epic";
    optionSelectQuality5.setAttribute("value", "Epic");
    selectQuality.appendChild(optionSelectQuality1);
    selectQuality.appendChild(optionSelectQuality2);
    selectQuality.appendChild(optionSelectQuality3);
    selectQuality.appendChild(optionSelectQuality4);
    selectQuality.appendChild(optionSelectQuality5);
    addForm(form, labelQuality, selectQuality);
}

function level(form, labelLevel, inputLevel){
    labelLevel.innerText = "Level :";
    labelLevel.setAttribute("for", "level");
    inputLevel.setAttribute("type", "number");
    inputLevel.setAttribute("id", "level");
    addForm(form, labelLevel, inputLevel);
}

function addButtonAdd(form, buttonAdd, fonction){
    buttonAdd.addEventListener("click", (event) => {
        event.preventDefault();
        fonction();
    });
    buttonAdd.innerText = "Add";

    form.appendChild(buttonAdd);
}

function addForm(form, label, component){
    form.appendChild(label);
    form.appendChild(component);
    form.appendChild(document.createElement("br"));
}

function app(divApp, divContent, form){
    divContent.appendChild(form);
    divApp.removeChild(divApp.children[0]);
    divApp.appendChild(divContent);
}

/* end form components */

function addClass(){
    console.log("class added");
}

function addItem(){
    console.log("item added");
}

function addItemClass(){
    console.log("item class added");
}

function addMount(){
    console.log("mount added");
}

function addPlayer(){
    console.log("player added");
}

function addPlayerItem(){
    console.log("player item added");
}

function addProfession(){
    console.log("profession added");
}

function addRace(){
    console.log("race added");
}