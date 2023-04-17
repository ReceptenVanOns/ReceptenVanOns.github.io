//functions for the seperate page below:
function bekijkReceptenPaginaLaden() {
    var row = getReceptOmTeBekijken(3);
    bekijkReceptenTitelLaden(row);
    bekijkReceptenDetailsLaden(row);
    bekijkReceptenFotoLaden(row);
    bekijkReceptenIngredientenLaden(row);
}

function getReceptOmTeBekijken(receptID) {
    console.log(document.cookie);
    console.log(document.cookie.split("=")[1]);
    console.log(JSON.parse(document.cookie.split("=")[1]));
    let row = JSON.parse(document.cookie.split("=")[1])-1;
    return row;
}

function bekijkReceptenTitelLaden(row) {
    var bekRecTitel = document.getElementById("ReceptenTitel");
    var bekRecTitelH = document.getElementById("ReceptenTitelH");
    bekRecTitel.innerHTML = "Recepten van ons - " + row['Naam recept'];
    bekRecTitelH.innerHTML = "Recepten van ons - " + row['Naam recept'];
}

function bekijkReceptenDetailsLaden(row) {
    //console.log("set details");
    //console.log(row);
    //console.log(row['Gezond']);
    var bekRecDetails = document.getElementById("ReceptenDetails");
    bekRecDetails.innerHTML = row['Gezond'];
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
    bekRecIngredienten.innerHTML = row['Ingredienten met aantallen'];
    //console.log("done ingredienten");
}
