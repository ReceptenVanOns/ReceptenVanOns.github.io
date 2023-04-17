//functions for the seperate page below:
function bekijkReceptenPaginaLaden() {
    var row = getReceptOmTeBekijken();
    bekijkReceptenTitelLaden(row);
    bekijkReceptenDetailsLaden(row);
    bekijkReceptenFotoLaden(row);
    bekijkReceptenIngredientenLaden(row);
}

function getReceptOmTeBekijken() {
    console.log(JSON.parse(document.cookie.split("=")[1]));
    let row = JSON.parse(document.cookie.split("=")[1]);
    return row;
}

function bekijkReceptenTitelLaden(row) {
    var bekRecTitel = document.getElementById("ReceptenTitel");
    var bekRecTitelH = document.getElementById("ReceptenTitelH");
    bekRecTitel.innerHTML = "Recepten van ons - " + row['Naam recept'];
    bekRecTitelH.innerHTML = "Recepten van ons - " + row['Naam recept'];
}

function bekijkReceptenDetailsLaden(row) {
    var bekRecDetails = document.getElementById("ReceptenDetails");
    var keywords = getKeywords(row);
    var htmlCode = "<p>Recept keywords:";
    for (var i=0; i<keywords.length; i++) {
        htmlCode += " <span>" + keywords[i] + "</span> ";
    }
    htmlCode+= "</p><br>";

    htmlCode+= "<p>Bereiding:</p>";
    var bereidingList = row['Bereiding'].split("][");
    for (var i=0; i<bereidingList.length; i++) {
        htmlCode+= "<p>" + bereidingList[i] + "</p>";
    }

    bekRecDetails.innerHTML = htmlCode;
    //console.log("done details");
}

function bekijkReceptenFotoLaden(row) {
    //console.log("set foto");
    var bekRecfotoHolder = document.getElementById("ReceptenfotoHolder");
    bekRecfotoHolder.innerHTML = "<img src='" + row["Foto"] + "' alt='Foto van " + row['Naam recept'] + "'>";
    //console.log("done foto");
}

function bekijkReceptenIngredientenLaden(row) {
    //console.log("set ingredienten");
    var bekRecIngredienten = document.getElementById("ReceptenIngredienten");
    var ingredientenRecept = row['Ingredienten met aantallen'];
    var ingredientenReceptList = ingredientenRecept.split(",");
    var htmlCode = "<p>Ingredienten</p><table id='ingredientenTabel'>";
    for (var i=0; i<ingredientenReceptList.length; i++) {
        var ingredientMetAantal = ingredientenReceptList[i];
        htmlCode += '<tr><td>' + ingredientMetAantal.split(":")[0] + '</td><td>' + ingredientMetAantal.split(":")[1] + "</td></tr>";
    }
    bekRecIngredienten.innerHTML = htmlCode;
    //console.log("done ingredienten");
}

function getKeywords(row) {
    var keywordsList = [];
    if (row['Gezond'] == "Gezond") {
        keywordsList.push("Gezond");
    }
    if (row['Budget'] == "Ja") {
        keywordsList.push("Budget");
    }
    if (row['Alcohol'] == "Ja") {
        keywordsList.push("Alcohol");
    }
    keywordsList.push(row['Vlees of']);
    if (row['Soort'] != "Onbekend") {
        keywordsList.push(row['Soort']);
    } 
    if (row['Keuken'] != "Niet specifiek") {
        keywordsList.push(row['Keuken']);
    } 
    if (row['Oven / frituur / wok'] != "Niet specifiek") {
        keywordsList.push(row['Oven / frituur / wok']);
    } 
    if (row['Seizoen'] != "All-Round") {
        keywordsList.push(row['Seizoen']);
    } 
    return keywordsList;
}
