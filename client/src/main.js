const API_URL = "http://localhost:3000/";
const divApp = document.querySelector("#app");

const buttonAdmin = document.getElementById("buttonAdministration");

fetch("./src/views/default.html").then(response => response.text()).then(data => divApp.innerHTML = data);

/* data */
const dataSelectPowerType= [ { "value":"Energy", "text":"Energy" }, {"value":"Fury", "text":"Fury"},
    {"value":"Focus", "text":"Focus"}, {"value":"Mana", "text":"Mana"}, {"value":"Rage", "text":"Rage"},
    {"value":"Runic Power", "text":"Runic Power"} ];
const dataSelectQuality = [ { "value": "Poor", "text": "Poor" },  { "value": "Common", "text": "Common" },
        { "value": "Uncommon", "text": "Uncommon" }, { "value": "Rare", "text": "Rare" }, { "value": "Epic", "text": "Epic" } ];
const dataSelectTrueFalse = [ { "value":"1", "text":"True" }, {"value":"0", "text":"False"}];
const dataSelectSource = [ { "value": "Achievement", "text": "Achievement" }, { "value": "Drop", "text": "Drop" },
        { "value": "Profession", "text": "Profession" }, { "value": "Quest", "text": "Quest" }, { "value": "Vendor", "text": "Vendor" } ];
const dataSelectFaction = [ { "value": "Alliance", "text": "Alliance" }, { "value": "Horde", "text": "Horde" } ];
const dataSelectType = [ { "value":"Primary", "text":"Primary" }, {"value":"Secondary", "text":"Secondary"}];
/* end data */

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
    onClickLink("players", true);
}

function onClickLink(link, hasAnImage){
    const LINK_API_URL = API_URL + link;
    fetch(LINK_API_URL)
    .then(response => response.json())
    .then(data => {
        const divGridContainer = document.createElement("div");
        divGridContainer.classList.add("grid-container");
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
                imgFlipCardFront.src = element.media ? element.media : element.icon;

                divFlipCardFront.appendChild(imgFlipCardFront);
            }else{
                const noImgFlipCardFront = document.createElement("p");
                noImgFlipCardFront.textContent = element.name ? element.name : element.username;
                
                divFlipCardFront.appendChild(noImgFlipCardFront);
            }

            const divFlipCardBack = document.createElement("div");
            divFlipCardBack.classList.add("flip-card-back");

            const divFlipCardBackContent = document.createElement("p");
            divFlipCardBackContent.textContent = element.name ? element.name : element.username;
            
            divFlipCardBack.appendChild(divFlipCardBackContent);

            divFlipCardInner.appendChild(divFlipCardFront);
            divFlipCardInner.appendChild(divFlipCardBack);
            divFlipCard.appendChild(divFlipCardInner);

            divGridItem.appendChild(divFlipCard);
            
            if(localStorage.getItem("token")!="token"){
                const divGridItemContainer = document.createElement("div");

                const buttonEdit = document.createElement("button");
                buttonEdit.innerText = "Edit";
                buttonEdit.addEventListener("click", () => {
                    switch(link){
                        case "classes":
                            onClickAddClass(element.id);
                            break;
                        case "itemClasses":
                            onClickAddItemClass(element.id);
                            break;
                        case "items":
                            onClickAddItem(element.id);
                            break;
                        case "mounts":
                            onClickAddMount(element.id);
                            break;
                        case "professions":
                            onClickAddProfession(element.id);
                            break;
                        case "races":
                            onClickAddRace(element.id);
                            break;
                        case "players":
                            onClickAddPlayer(element.id); 
                            break;
                    }
                });

                divGridItemContainer.appendChild(buttonEdit);
    
                const buttonDelete = document.createElement("button");
                buttonDelete.innerText = "Delete";
                buttonDelete.addEventListener("click", () => {
                    fetch(API_URL+link+"/"+element.id, {
                        method: 'DELETE',
                    });
                    //window.location.reload(true);
                    window.location.href = "index.html";
                    //onClickLink(link, hasAnImage);
                });

                divGridItemContainer.appendChild(buttonDelete);

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
                    case "players":
                        onClickAddPlayer(); 
                        break;
                }
                
            });
            const div = document.createElement("div");
            div.setAttribute("id", "divButton");
            div.appendChild(buttonAdd)
            divContent.appendChild(div);
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
    const divAdministration = document.createElement("div");
    divAdministration.setAttribute("id", "administration");
    const form = document.createElement("form");
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    const labelUsername = document.createElement("label");
    labelUsername.setAttribute("for", "uname");
    const labelUsernameText = document.createElement("b");
    labelUsernameText.innerText = "Username";
    const inputUsername = document.createElement("input");
    inputUsername.setAttribute("id", "uname");
    inputUsername.setAttribute("type", "text");
    inputUsername.setAttribute("placeholder", "Enter Username");
    inputUsername.setAttribute("required", true);
    const labelPassword = document.createElement("label");
    labelPassword.setAttribute("for", "psw");
    const labelPasswordText = document.createElement("b");
    labelPasswordText.innerText = "Password";
    const inputPassword = document.createElement("input");
    inputPassword.setAttribute("id", "psw");
    inputPassword.setAttribute("type", "password");
    inputPassword.setAttribute("placeholder", "Enter password");
    inputPassword.setAttribute("required", true);
    const submitButton = document.createElement("button");
    submitButton.innerText = "Login";
    
    labelUsername.appendChild(labelUsernameText);
    labelPassword.appendChild(labelPasswordText);

    divContainer.appendChild(labelUsername);
    divContainer.appendChild(inputUsername);
    divContainer.appendChild(labelPassword);
    divContainer.appendChild(inputPassword);
    divContainer.appendChild(submitButton);

    form.appendChild(divContainer);
    divAdministration.appendChild(form);
    divApp.removeChild(divApp.children[0]);
    divApp.appendChild(divAdministration);
}

function onClickStatistics(){
    const divContent = document.createElement("div");
    const divGridContainer = document.createElement("div");
    divGridContainer.classList.add("grid-container");
    
    const divGridItem1 = document.createElement("div");
    divGridItem1.classList.add("grid-item");
    const divCard1 = document.createElement("div");
    divCard1.classList.add("card");
    const divContainer1= document.createElement("div");
    
    const h1Statistic1 = document.createElement("h1");
    h1Statistic1.innerText = "Statistic 1";

    const pStatistic1 = document.createElement("p");
    fetch("http://localhost:3000/statistics/playerMostItemInInventory").then(response => response.json())
    .then(data => {
        pStatistic1.innerText = "The player who has the most items in their inventory is "+data.username+" with "+data.numberOfItems+" items";
    });

    divContainer1.appendChild(h1Statistic1);
    divContainer1.appendChild(pStatistic1);

    divCard1.appendChild(divContainer1);
    divGridItem1.appendChild(divCard1);

    divGridContainer.appendChild(divGridItem1);

    const divGridItem2 = document.createElement("div");
    divGridItem2.classList.add("grid-item");
    const divCard2 = document.createElement("div");
    divCard2.classList.add("card");
    const divContainer2= document.createElement("div");
    
    const h1Statistic2 = document.createElement("h1");
    h1Statistic2.innerText = "Statistic 2";
    divContainer2.appendChild(h1Statistic2);
    
    fetch("http://localhost:3000/statistics/differenceBetweenSellPriceAndPurchasePriceItem").then(response => response.json())
    .then(data => {
        data.forEach((element) => {
            const pStatistic2 = document.createElement("p");
            pStatistic2.innerText = "Price difference between sell and purchase for the item "+element.name+" is "+element.difference;
            divContainer2.appendChild(pStatistic2);
        });
    });   

    divCard2.appendChild(divContainer2);
    divGridItem2.appendChild(divCard2);

    divGridContainer.appendChild(divGridItem2);

    const divGridItem3 = document.createElement("div");
    divGridItem3.classList.add("grid-item");
    const divCard3 = document.createElement("div");
    divCard3.classList.add("card");
    const divContainer3= document.createElement("div");
    
    const h1Statistic3 = document.createElement("h1");
    h1Statistic3.innerText = "Statistic 3";
    divContainer3.appendChild(h1Statistic3);

    
    fetch("http://localhost:3000/statistics/numberOfMountsByPlayer").then(response => response.json())
    .then(data => {
        data.forEach((element) => {
            const pStatistic3 = document.createElement("p");
            pStatistic3.innerText = element.username+" has "+element.numberOfMounts+" mounts";
            divContainer3.appendChild(pStatistic3);
        });
    });   

    divCard3.appendChild(divContainer3);
    divGridItem3.appendChild(divCard3);

    divGridContainer.appendChild(divGridItem3);


    divContent.appendChild(divGridContainer);
    divApp.removeChild(divApp.children[0]);
    divApp.appendChild(divContent);
}

function onClickReports(){
    
}

function onClickAbout(){
    const divContent = document.createElement("div");

    const aboutContent = document.createElement("p");
    aboutContent.innerText = "about page";

    divContent.appendChild(aboutContent);

    divApp.removeChild(divApp.children[0]);
    divApp.appendChild(divContent);
}

function onClickAddClass(id=null){
    const divContent = document.createElement("div");
    const form = document.createElement("form");
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    const labelPowerType = document.createElement("label");
    const selectPowerType = document.createElement("select");
    const labelMedia = document.createElement("label");
    const inputMedia = document.createElement("input");
    const buttonAdd = document.createElement("button");
    const objects = [ inputName, selectPowerType, inputMedia ];

    if(id!=null){
        fetch("http://localhost:3000/classes/"+id).then(response => response.json()).then(data => {
            inputName.value = data[0].name;
            selectPowerType.value = data[0].powerType;
            inputMedia.value = data[0].media;
        });
    }

    componentLabelInput(form, divContainer, labelName, inputName, "Name", "name", "text");
    componentLabelSelect(form, divContainer, labelPowerType,selectPowerType, "Power Type", "powerType", dataSelectPowerType);
    componentLabelInput(form, divContainer, labelMedia, inputMedia, "Media", "media", "text");
    addButtonAdd(form, divContainer, buttonAdd, "classes", id, objects);
    app(divApp, divContent, form, "class");
}

function onClickAddItem(id=null){
    const divContent = document.createElement("div");
    const form = document.createElement("form");
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    const labelQuality = document.createElement("label");
    const selectQuality = document.createElement("select");
    const labelLevel = document.createElement("label");
    const inputLevel = document.createElement("input");
    const labelRequiredLevel = document.createElement("label");
    const inputRequiredLevel = document.createElement("input");
    const labelPurchasePrice = document.createElement("label");
    const inputPurchasePrice = document.createElement("input");
    const labelSellPrice = document.createElement("label");
    const inputSellPrice = document.createElement("input");
    const labelIsEquippable = document.createElement("label");
    const selectIsEquippable = document.createElement("select");
    const labelIsStackable = document.createElement("label");
    const selectIsStackable = document.createElement("select");
    const labelMedia = document.createElement("label");
    const inputMedia = document.createElement("input");
    const labelItemClass = document.createElement("label");
    const selectItemClass = document.createElement("select");
    const buttonAdd = document.createElement("button");
    const objects = [ inputName, selectQuality, inputLevel, inputRequiredLevel, inputPurchasePrice, inputSellPrice, selectIsEquippable, selectIsStackable, inputMedia, selectItemClass];

    if(id!=null){
        fetch("http://localhost:3000/items/"+id).then(response => response.json()).then(data => {
            inputName.value = data[0].name;
            selectQuality.value = data[0].quality;
            inputLevel.value = data[0].level;
            inputRequiredLevel.value = data[0].requiredLevel;
            inputPurchasePrice.value = data[0].purchasePrice;
            inputSellPrice.value = data[0].sellPrice;
            selectIsEquippable.value = data[0].isEquippable;
            selectIsStackable.value = data[0].isStackable;
            inputMedia.value = data[0].media;
            selectItemClass.value = data[0].itemClass;
        });
    }

    componentLabelInput(form, divContainer, labelName, inputName, "Name", "name", "text");
    componentLabelSelect(form, divContainer, labelQuality, selectQuality, "Quality", "quality", dataSelectQuality);
    componentLabelInput(form, divContainer, labelLevel, inputLevel, "Level", "level", "number");
    componentLabelInput(form, divContainer, labelRequiredLevel, inputRequiredLevel, "Required level", "requiredLevel", "number");
    componentLabelInput(form, divContainer, labelPurchasePrice, inputPurchasePrice, "Purchase price", "purchasePrice", "number");
    componentLabelInput(form, divContainer, labelSellPrice, inputSellPrice, "Sell price", "sellPrice", "number");
    componentLabelSelect(form, divContainer, labelIsEquippable,selectIsEquippable, "Equippable", "isEquippable", dataSelectTrueFalse);
    componentLabelSelect(form, divContainer, labelIsStackable,selectIsStackable, "Stackable", "isStackable", dataSelectTrueFalse);
    componentLabelInput(form, divContainer, labelMedia, inputMedia, "Media", "media", "text");
    componentLabelSelectFromApi(form, divContainer, labelItemClass, selectItemClass, "Item class", "itemClass", "http://localhost:3000/itemClasses");
    addButtonAdd(form, divContainer, buttonAdd, "items", id, objects);
    app(divApp, divContent, form, "item");
}

function onClickAddItemClass(id=null){
    const divContent = document.createElement("div");
    const form = document.createElement("form");
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    const buttonAdd = document.createElement("button");
    const objects = [ inputName ];

    if(id!=null){
        fetch("http://localhost:3000/itemClasses/"+id).then(response => response.json()).then(data => {
            inputName.value = data[0].name;
        });
    }

    componentLabelInput(form, divContainer, labelName, inputName, "Name", "name", "text");
    addButtonAdd(form, divContainer, buttonAdd, "itemClasses", id, objects);
    app(divApp, divContent, form, "item class");
}

function onClickAddMount(id=null){
    const divContent = document.createElement("div");
    const form = document.createElement("form");
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    const labelDescription = document.createElement("label");
    const textareaDescription = document.createElement("textarea");
    const labelSource = document.createElement("label");
    const selectSource = document.createElement("select");
    const labelFaction = document.createElement("label");
    const selectFaction = document.createElement("select");
    const labelMedia = document.createElement("label");
    const inputMedia = document.createElement("input");
    const labelPlayer = document.createElement("label");
    const selectPlayer = document.createElement("select");
    const buttonAdd = document.createElement("button");

    const objects = [ inputName, textareaDescription, selectSource, selectFaction, inputMedia, selectPlayer ];

    if(id!=null){
        fetch("http://localhost:3000/mounts/"+id).then(response => response.json()).then(data => {
            inputName.value = data[0].name;
            textareaDescription.value = data[0].description;
            selectSource.value = data[0].source;
            selectFaction.value = data[0].faction;
            inputMedia.value = data[0].media;
            selectPlayer.value = data[0].player;
        });
    }

    componentLabelInput(form, divContainer, labelName, inputName, "Name", "name", "text");
    
    labelDescription.innerText = "Description";
    labelDescription.setAttribute("for", "description");
    textareaDescription.setAttribute("id", "description");
    divContainer.appendChild(labelDescription);
    divContainer.appendChild(textareaDescription);
    divContainer.appendChild(document.createElement("br"));
    form.appendChild(divContainer);

    componentLabelSelect(form, divContainer, labelSource, selectSource, "Source", "source", dataSelectSource);
    componentLabelSelect(form, divContainer, labelFaction, selectFaction, "Faction", "faction", dataSelectFaction);
    componentLabelInput(form, divContainer, labelMedia, inputMedia, "Media", "media", "text");
    componentLabelSelectFromApi(form, divContainer, labelPlayer, selectPlayer, "Player", "player", "http://localhost:3000/players");
    addButtonAdd(form, divContainer, buttonAdd, "mounts", id, objects);
    app(divApp, divContent, form, "mount");
}

function onClickAddPlayer(id=null){
    const divContent = document.createElement("div");
    const form = document.createElement("form");
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    const labelUsername = document.createElement("label");
    const inputUsername = document.createElement("input");
    const labelIsConnected = document.createElement("label");
    const selectIsConnected = document.createElement("select");
    const labelLevel = document.createElement("label");
    const inputLevel = document.createElement("input");
    const labelIcon = document.createElement("label");
    const inputIcon = document.createElement("input");
    const labelClass = document.createElement("label");
    const selectClass = document.createElement("select");
    const labelRace = document.createElement("label");
    const selectRace = document.createElement("select");
    const labelProfession = document.createElement("label");
    const selectProfession = document.createElement("select");
    const buttonAdd = document.createElement("button");
    const objects = [ inputUsername, selectIsConnected, inputLevel, inputIcon, selectClass, selectRace, selectProfession ];

    if(id!=null){
        fetch("http://localhost:3000/players/"+id).then(response => response.json()).then(data => {
            inputUsername.value = data[0].username;
            selectIsConnected.value = data[0].isConnected;
            inputLevel.value = data[0].level;
            inputIcon.value = data[0].icon;
            selectClass.value = data[0].class;
            selectRace.value = data[0].race;
            selectProfession.value = data[0].profession;
        });
    }

    componentLabelInput(form, divContainer, labelUsername, inputUsername, "Username", "username", "text");
    componentLabelSelect(form, divContainer, labelIsConnected, selectIsConnected, "Connected", "isConnected", dataSelectTrueFalse);
    componentLabelInput(form, divContainer, labelLevel, inputLevel, "Level", "level", "number");
    componentLabelInput(form, divContainer, labelIcon, inputIcon, "Icon", "icon", "text");
    componentLabelSelectFromApi(form, divContainer, labelClass, selectClass, "Class", "class", "http://localhost:3000/classes");
    componentLabelSelectFromApi(form, divContainer, labelRace, selectRace, "Race", "race", "http://localhost:3000/races");
    componentLabelSelectFromApi(form, divContainer, labelProfession, selectProfession, "Profession", "profession", "http://localhost:3000/professions");
    addButtonAdd(form, divContainer, buttonAdd, "players", id, objects);
    app(divApp, divContent, form, "player");
}

function onClickAddPlayerItem(id=null){
    const divContent = document.createElement("div");
    const form = document.createElement("form");
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    const labelItem = document.createElement("label");
    const selectItem = document.createElement("select");
    const labelPlayer = document.createElement("label");
    const selectPlayer = document.createElement("select");
    const labelNumberInInventory = document.createElement("label");
    const inputNumberInInventory = document.createElement("input");
    const buttonAdd = document.createElement("button");
    componentLabelSelectFromApi(form, divContainer, labelItem, selectItem, "Item", "item", "http://localhost:3000/items");
    componentLabelSelectFromApi(form, divContainer, labelPlayer, selectPlayer, "Player", "player", "http://localhost:3000/players");
    componentLabelInput(form, divContainer, labelNumberInInventory, inputNumberInInventory, "Number in inventory", "numberInInventory", "number");
    addButtonAdd(form, divContainer, buttonAdd, "playersItems", id, objects);
    app(divApp, divContent, form, "player item");
}

function onClickAddProfession(id=null){
    const divContent = document.createElement("div");
    const form = document.createElement("form");
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    const labelDescription = document.createElement("label");
    const textareaDescription = document.createElement("textarea");
    const labelType = document.createElement("label");
    const selectType = document.createElement("select");
    const labelFaction = document.createElement("label");
    const selectFaction = document.createElement("select");
    const labelMedia = document.createElement("label");
    const inputMedia = document.createElement("input");
    const buttonAdd = document.createElement("button");
    const objects = [ inputName, textareaDescription, selectType, selectFaction, inputMedia ];

    if(id!=null){
        fetch("http://localhost:3000/professions/"+id).then(response => response.json()).then(data => {
            inputName.value = data[0].name;
            textareaDescription.value = data[0].description;
            selectType.value = data[0].type;
            selectFaction.value = data[0].faction;
            inputMedia.value = data[0].media;
        });
    }

    componentLabelInput(form, divContainer, labelName, inputName, "Name", "name", "text");
    
    labelDescription.innerText = "Description";
    labelDescription.setAttribute("for", "description");   
    textareaDescription.setAttribute("id", "description");
    divContainer.appendChild(labelDescription);
    divContainer.appendChild(textareaDescription);
    divContainer.appendChild(document.createElement("br"));
    form.appendChild(divContainer);

    componentLabelSelect(form, divContainer, labelType, selectType, "Type", "type", dataSelectType);
    componentLabelSelect(form, divContainer, labelFaction, selectFaction, "Faction", "faction", dataSelectFaction);
    componentLabelInput(form, divContainer, labelMedia, inputMedia, "Media", "media", "text");
    addButtonAdd(form, divContainer, buttonAdd, "professions", id, objects);
    app(divApp, divContent, form, "profession");
}

function onClickAddRace(id=null){
    const divContent = document.createElement("div");
    const form = document.createElement("form");
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    const labelFaction = document.createElement("label");
    const selectFaction = document.createElement("select");
    const buttonAdd = document.createElement("button");
    const objects = [ inputName, selectFaction ];

    if(id!=null){
        fetch("http://localhost:3000/races/"+id).then(response => response.json()).then(data => {
            inputName.value = data[0].name;
            selectFaction.value = data[0].faction;
        });
    }

    componentLabelInput(form, divContainer, labelName, inputName, "Name", "name", "text");
    componentLabelSelect(form, divContainer, labelFaction, selectFaction, "Faction", "faction", dataSelectFaction);
    addButtonAdd(form, divContainer, buttonAdd, "races", id, objects);
    app(divApp, divContent, form, "race");
}

/* form components */
function componentLabelInput(form, divContainer, label, input, textLabel, idInput, typeInput){
    label.innerText = textLabel;
    label.setAttribute("for", idInput);
    input.setAttribute("type", typeInput);
    input.setAttribute("id", idInput);
    addForm(form, divContainer, label, input);
}

function componentLabelSelect(form, divContainer, label, select, textLabel, idSelect, data){
    label.innerText = textLabel;
    label.setAttribute("for", idSelect);
    select.setAttribute("id", idSelect);
    data.forEach(element => {
        const option = document.createElement("option");
        option.setAttribute("value", element.value);
        option.innerText = element.text;
        select.appendChild(option);
    });
    addForm(form, divContainer, label, select);
}

function componentLabelSelectFromApi(form, divContainer, label, select, textLabel, idSelect, apiLink){
    label.innerText = textLabel;
    label.setAttribute("for", idSelect);
    select.setAttribute("id", idSelect);
    fetch(apiLink).then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const option = document.createElement("option");
            option.setAttribute("value", element.id);
            option.innerText = element.name ? element.name : element.username;
            select.appendChild(option);
        });
    });
    addForm(form, divContainer, label, select);
}

function addButtonAdd(form, divContainer, buttonAdd, link, id=null, objects){
    buttonAdd.addEventListener("click", (event) => {
        event.preventDefault();
        const object = new Object();
        switch(link){
            case "classes":
                object.name = objects[0].value;
                object.powerType = objects[1].value;
                object.media = objects[2].value;
                break;
            case "itemClasses":
                object.name = objects[0].value;
                break;
            case "items":
                object.name = objects[0].value;
                object.quality = objects[1].value;
                object.level = Number(objects[2].value);
                object.requiredLevel = Number(objects[3].value);
                object.purchasePrice = Number(objects[4].value);
                object.sellPrice = Number(objects[5].value);
                object.isEquippable = Number(objects[6].value);
                object.isStackable = Number(objects[7].value);
                object.media = objects[8].value;
                object.itemClass = Number(objects[9].value);
                break;
            case "mounts":
                object.name = objects[0].value;
                object.description = objects[1].value;
                object.source = objects[2].value;
                object.faction = objects[3].value;
                object.media = objects[4].value;
                object.player =Number( objects[5].value);
                break;
            case "players":
                object.username = objects[0].value;
                object.isConnected = Number(objects[1].value);
                object.level = Number(objects[2].value);
                object.icon = objects[3].value;
                object.class = Number(objects[4].value);
                object.race = Number(objects[5].value);
                object.profession = Number(objects[6].value);
                break;
            case "professions":
                object.name = objects[0].value;
                object.description = objects[1].value;
                object.type = objects[2].value;
                object.faction = objects[3].value;
                object.media = objects[4].value;
                break;
            case "races":
                object.name = objects[0].value;
                object.faction = objects[1].value;
                break;
            
        }
        if(id){
            fetch("http://localhost:3000/"+link+"/"+id, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(object)
            });
        }else{
            fetch("http://localhost:3000/"+link, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(object)
            });
        }
        window.location.href = "index.html";
    });
    buttonAdd.innerText = "Add/Modify";
    divContainer.appendChild(buttonAdd);
    form.appendChild(divContainer);
}

function addForm(form, divContainer, label, component){
    divContainer.appendChild(label);
    divContainer.appendChild(component);
    divContainer.appendChild(document.createElement("br"));
    form.appendChild(divContainer);
}

function app(divApp, divContent, form, text){
    const h1 = document.createElement("h1");
    h1.innerText = "Add/Modify "+text;
    const divH1 = document.createElement("div");
    divH1.classList.add("divH1");
    divH1.appendChild(h1);
    divContent.appendChild(divH1);
    divContent.appendChild(form);
    divContent.setAttribute("id", "form");
    divApp.removeChild(divApp.children[0]);
    divApp.appendChild(divContent);
}
/* end form components */