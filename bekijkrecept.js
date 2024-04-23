persAantal = 0;
row = Nan;

//functions for the seperate page below:
function bekijkReceptenPaginaLaden() {
    row = getReceptOmTeBekijken();
    bekijkReceptenTitelLaden(row);
    bekijkReceptenDetailsLaden(row);
    bekijkReceptenFotoLaden(row);
    bekijkReceptenIngredientenLaden(row);
}

function getReceptOmTeBekijken() {
    console.log(document.cookie);
    console.log(JSON.parse(document.cookie.split("=")[1]));
    row = JSON.parse(document.cookie.split("=")[1]);
    persAantal = parseInt(row['Personen'].split(" ")[0]);
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
    var htmlCode = "<p>Duur: " + row["Duur"] + "</p>";
    htmlCode += "<p>Keywords: <br>";
    for (var i=0; i<keywords.length; i++) {
        htmlCode += " <span class='keywordDiv'>" + keywords[i] + "</span> ";
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
    var htmlCode = '<div class="persChange"><button class="persButton" onclick="changePersonen(false)">-</button>' 
    + '<p class="persNr">' + persAantal + ' personen</p>'
    + '<button class="persButton" onclick="changePersonen(true)">+</button></div><br><br>';
    htmlCode += "<p>Ingredienten</p><table id='ingredientenTabel'>";
    for (var i=0; i<ingredientenReceptList.length; i++) {
        var ingredientMetAantal = ingredientenReceptList[i];
        var aantal = ingredientMetAantal.split(":")[1];
        console.log(aantal);
        if (aantal.split(" ").length > 3) {
            var aantalSoort = aantal.split(" ")[2];
        }
        else {
            var aantalSoort = "";
        } 
        console.log(aantalSoort);
        var aantalGetal = stringToFloat(aantal.split(" ")[1]);
        console.log(aantalGetal);
        aantalGetal = aantalGetal * (persAantal / parseInt(row['Personen'].split(" ")[0])).toString();
        htmlCode += '<tr><td>' + ingredientMetAantal.split(":")[0] + '</td><td>' + aantalGetal + " " + aantalSoort + "</td></tr>";
    }
    bekRecIngredienten.innerHTML = htmlCode;
    //console.log("done ingredienten");
}

function stringToFloat(str) {
    // First try parsing normally
    const parsed = parseFloat(str);
    if (!isNaN(parsed)) {
        return parsed;
    }

    // If normal parsing fails, try the fractional character conversion
    return convertFraction(str);
}

function convertFraction(fraction) {
    const fractionMap = {
        '¼': 0.25, '½': 0.5, '¾': 0.75,
        '⅓': 1/3, '⅔': 2/3,
        '⅕': 0.2, '⅖': 0.4, '⅗': 0.6, '⅘': 0.8,
        '⅙': 1/6, '⅚': 5/6,
        '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875
    };

    return fractionMap[fraction] || NaN;  // Return NaN if the fraction is not found
}

function changePersonen(upwards) {
    if (upwards) {
        persAantal += 1;
    }
    else {
        if (persAantal > 1) {
            persAantal -= 1;
        }
        else {
            alert("Je kunt niet minder dan 1 persoon selecteren");
        }
    }
    bekijkReceptenIngredientenLaden(row);
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
    if (row['Vlees of'] != "Onbekend") {
        keywordsList.push(row['Vlees of']);
    }
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
    if (row['Gelegenheid'] != "Geen") {
        keywordsList.push(row['Gelegenheid']);
    }
    if (row['Alcohol'] != "Nee") {
        keywordsList.push("Bevat Alcohol");
    }
    for (var i=0;i < row['Menugang'].split(",").length; i++) {
        keywordsList.push(row['Menugang'].split(",")[i]);
    }
    return keywordsList;
}
