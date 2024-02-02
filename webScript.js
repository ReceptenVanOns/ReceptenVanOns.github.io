var jsonData;
var gekozenReceptenLijst = [];
var gekozenReceptenDict = {};
var ingredintenDict = {};
var fileLoaded = false;
// var pressHoldDuration = 300;
// let pressHoldCounter = 0;
// let pressHoldEvent = new CustomEvent("pressHold");
// let timerID;


// function init_links(visibleIDs) {
//    for (var i = 0; i<visibleIDs.length;i++) {
//        let currentIDvisible = "#receptLink" + visibleIDs[i]
//        let item = document.querySelector(currentIDvisible);
//        item.addEventListener("mousedown", pressingDown(), false);
//        item.addEventListener("mouseup", notPressingDown(), false);
//        item.addEventListener("pressHold", launchReceptPage(visibleIDs[i]), false);
//    }
// }

// function pressingDown(e) {
//    // Start the timer
//    requestAnimationFrame(timer);
//    e.preventDefault();
//    //console.log("Pressing!");
// }

// function notPressingDown(e) {
//     // Stop the timer
//     cancelAnimationFrame(timerID);
//     pressHoldCounter = 0;
//     //console.log("Not pressing!");
// }

// function timer() {
//     //console.log("Timer tick!");
//     if (pressHoldCounter < pressHoldDuration) {
//       timerID = requestAnimationFrame(timer);
//       pressHoldCounter++;
//     } else {
//       //console.log("Press threshold reached!");
//       item.dispatchEvent(pressHoldEvent);
//     }
// }

// function launchReceptPage(e, rowNr) {
//     pressHoldCounter = 0;
//     console.log("pressHold event fired!");
//     window.open('test.html', '_blank');
// }

function automaticUpload(){
    jsonData = jsonDataStringify;
    displayJsonToHtmlTable(jsonData);
}

function excelFileToJSON(file){
    //console.log(file)
    //var file = "recepten_automatisch.xlsx";
    try {
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function(e) {

          var data = e.target.result;
          var workbook = XLSX.read(data, {
              type : 'binary'
          });
          var result = {};
          var firstSheetName = workbook.SheetNames[0];
          //reading only first sheet data
          jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
          //alert(JSON.stringify(jsonData));
          //displaying the json result into HTML table
          displayJsonToHtmlTable(jsonData);
          }
      }catch(e){
          console.error(e);
      }
}

function displayJsonToHtmlTable(jsonData){
    var table_div=document.getElementById("recepten");
    var jsonCounter = 0;
    //var jsonIDsList = []
    if(jsonData.length>0){
        var htmlData='<p id="aantal_gevonden"> Er zitten ' + jsonData.length + ' recepten in het excel bestand</p><br>';
        //htmlData+='<table><tr><th>Foto</th><th>Naam recept</th><th>Duur</th><th>Soort</th><th>Keuken</th><th>Menugang</th></tr>';
        //htmlData += '<table class="recept_box" id="recept_table">';
        test_data = "";
        for(var i=0;i<jsonData.length;i++){
            jsonCounter++;
            var row=jsonData[i];
            //if (jsonCounter == 1) {
                // test_data += '<div class="recept_box">';
                // test_data += '<a class="receptLink" id="receptLink' + jsonCounter + '" href="'+row['Waar te vinden']+'" target="_blank"><img src="Recepten_fotos/' + row['Naam recept'] + ' foto.jpg"></a>'; 
                // test_data += '<div class="receptDet">';
                // test_data += '<p class="receptTitle">' + row['Naam recept'] + '</p>';
                // test_data += '<p>Duur: ' + row["Duur"] + '<br>Soort: ' + row["Soort"] + '<br>Keuken: ' + row["Keuken"] + '</p>';
                // test_data += '</div><div class="receptButton"><input onclick="addOrRemoveRecept(' + jsonCounter + ')" type="checkbox" class="check" id="addRemoveButton">';
                // test_data += '<div class="persChange" id="persChangeRecept' + jsonCounter + '"><button class="persButton" onclick="changePersonen(' + jsonCounter + ', false)">-</button>' 
                //             + '<p class="persNr" id="PersChangeNr' + jsonCounter + '">' + row['Personen'] + '</p>'
                //             + '<button class="persButton" onclick="changePersonen(' + jsonCounter + ', true)">+</button></div>';
                // test_data += '</div></div>';
            // htmlData += '<tr>';
            // htmlData += '<td><a class="receptLink" id="receptLink' + jsonCounter + '" href="'+row['Waar te vinden']+'" target="_blank"><img src="Recepten_fotos/' + row['Naam recept'] + ' foto.jpg"></a></td>'; 
            // htmlData += '<td class="receptDet">';
            // htmlData += '<p class="receptTitle">' + row['Naam recept'] + '</p>';
            // htmlData += '<p>Duur: <span class="recDuurId">' + row["Duur"] + '</span>Soort: <span class="recSoortId">' + row["Soort"] + '</span>Keuken: <span class="recKeukenId">' + row["Keuken"] + '</span></p>';
            // htmlData += '</td></tr>';
            htmlData += '<div class="recept_box">';
            htmlData += '<a class="receptLink" id="receptLink' + jsonCounter + '" href="'+row['Waar te vinden']+'" target="_blank"><img src="' + row['Foto'] + '">';
            htmlData += '<div class="receptDet">';
            htmlData += row['Naam recept'] + '<br>';
            htmlData += '&#128337;' + row['Duur'];
            htmlData += '</div></a></div>'; 
            //}
            //jsonIDsList.push(jsonCounter);
            //htmlData+='<tr><td><a class="receptLink" id="receptLink' + jsonCounter + '" href="'+row['Waar te vinden']+'" target="_blank"><img src="Recepten_fotos/' + row['Naam recept'] + ' foto.jpg' //+row["Foto"]
            //        +'"></a></td><td>'+row["Naam recept"]
            //        +'</td><td>'+row["Duur"]+'</td><td>'+row["Soort"]+'</td><td>'+row["Keuken"]+'</td><td>'+row["Menugang"]
            //        +'</td></tr>';
        }
        //htmlData += '</table>';
        table_div.innerHTML= htmlData;
        fileLoaded = true;
        //init_links(jsonIDsList);
        setCookie();
        console.log(jsonData[3]);
        console.log(decodeURIComponent(document.cookie));
    }else{
        table_div.innerHTML='There is no data in Excel';
    }
}

function upload() {
    var files = document.getElementById('file_upload').files;
    //console.log(files)
    if(files.length==0){
      alert("Please choose any file...");
      return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.XLS' || extension == '.XLSX') {
        //Here calling another method to read excel file into json
        excelFileToJSON(files[0]);
    }else{
        alert("Please select a valid excel file.");
    }
}


function search() {
    console.log("searching...");
    if (!fileLoaded) {
        alert("Zorg dat je eerst het excel bestand laad!");
        return;
    }

    //console.log(jsonData);
    var maxDuur = document.getElementById('max_duur').value;
    if (maxDuur < 0) {
        maxDuur = 0;
    }
    var maxIngredienten = document.getElementById('max_ingredienten').value;
    if (maxIngredienten < 0) {
        maxIngredienten = 0;
    }
    var gezond = document.getElementById('gezond').checked;
    var budget = document.getElementById('budget').checked;
    var moeilijkheidsgraad_element = document.getElementById('moeilijkheidsgraad')//.selected;
    var moeilijkheidsgraad = moeilijkheidsgraad_element.options[moeilijkheidsgraad_element.selectedIndex].value;
    var selectedSoort = [];
    for (var option of document.getElementById('soort').options)
    {
        if (option.selected) {
            selectedSoort.push(option.value);
        }
    }
    var selectedKeuken = [];
    for (var option of document.getElementById('keuken').options)
    {
        if (option.selected) {
            selectedKeuken.push(option.value);
        }
    }
    var selectedMenugang = [];
    for (var option of document.getElementById('menugang').options)
    {
        if (option.selected) {
            if (option.value == "lunch") {
                selectedMenugang.push("brunch");
            }
            else if (option.value == "bijgerecht") {
                selectedMenugang.push("tussengerecht");
                selectedMenugang.push("klein gerecht");
            }
            else if (option.value == "snack") {
                selectedMenugang.push("tussendoortje");
                selectedMenugang.push("hapje");
            }
            selectedMenugang.push(option.value);
        }
    }
    var selectedVVV = [];
    for (var option of document.getElementById('vvv').options)
    {
        if (option.selected) {
            selectedVVV.push(option.value);
        }
    }
    var selectedCook = [];
    for (var option of document.getElementById('cook').options)
    {
        if (option.selected) {
            selectedCook.push(option.value);
        }
    }
    var selectedSeizoen = [];
    for (var option of document.getElementById('seizoen').options)
    {
        if (option.selected) {
            selectedSeizoen.push(option.value);
        }
    }
    var selectedGelegenheid = [];
    for (var option of document.getElementById('gelegenheid').options)
    {
        if (option.selected) {
            selectedGelegenheid.push(option.value);
        }
    }
    var benodigdeIngredientenKeus = document.getElementById('benodigdeIngredienten').value
    var verbodenIngredientenKeus = document.getElementById('verbodenIngredienten').value
    //console.log(benodigdeIngredientenKeus);

    var table_div=document.getElementById("recepten");
    var counterLength = 0;
    //var htmlData='<table><tr><th>Foto</th><th>Naam recept</th><th>Duur</th><th>Soort</th><th>Keuken</th><th>Menugang</th><th>Boodschappenlijst</th></tr>';
    //htmlData = '<table class="recept_box" id="recept_table">';
    htmlData = "";
    var jsonCounter = 0;
    for(var i=0;i<jsonData.length;i++){
        var row=jsonData[i];
        var timeFilter = searchOnMinutes(row, maxDuur);
        var aantalIngredientenFilter = searchOnAantalIngredienten(row, maxIngredienten);
        var gezondFilter = searchOnGezond(row, gezond);
        var budgetFilter = searchOnBudget(row, budget);
        var moeilijkheidsgraadFilter = seachOnMoeilijkheidsgraad(row, moeilijkheidsgraad);
        var soortFilter = searchOnSoort(row, selectedSoort);
        var keukenFilter = searchOnKeuken(row, selectedKeuken);
        var menugangFilter = searchOnMenugang(row, selectedMenugang);
        var vvvFilter = searchOnVVV(row, selectedVVV);
        var cookFilter = searchOnCook(row, selectedCook);
        var seizoenFilter = searchOnSeizoen(row, selectedSeizoen);
        var gelegenheidFilter = searchOnGelegenheid(row, selectedGelegenheid);
        var ingredientFilter = searchOnIngredient(row, benodigdeIngredientenKeus);
        var ingredientNotFilter = searchOnIngredientNot(row, verbodenIngredientenKeus);
        jsonCounter++;
        if (timeFilter && aantalIngredientenFilter && gezondFilter && budgetFilter && moeilijkheidsgraadFilter && soortFilter && keukenFilter && menugangFilter && vvvFilter && cookFilter && seizoenFilter && gelegenheidFilter && ingredientFilter && ingredientNotFilter) {
            //htmlData+='<tr><td><a class="receptLink" id="receptLink' + jsonCounter + '" href="'+row['Waar te vinden']+'" target="_blank"><img src="Recepten_fotos/' + row['Naam recept'] + ' foto.jpg' //+ row["Foto"]
            //    +'"></a></td><td>'+row["Naam recept"]
            //    +'</td><td>'+row["Duur"]+'</td><td>'+row["Soort"]+'</td><td>'+row["Keuken"]+'</td><td>'+row["Menugang"]
            //    +'</td><td><input onclick="addOrRemoveRecept(' + jsonCounter + ')" type="checkbox" class="check" id="addRemoveButton"';
            // htmlData += '<tr>';
            // htmlData += '<td><a class="receptLink" id="receptLink' + jsonCounter + '" href="'+row['Waar te vinden']+'" target="_blank"><img src="Recepten_fotos/' + row['Naam recept'] + ' foto.jpg"></a></td>'; 
            // htmlData += '<td class="receptDet">';
            // htmlData += '<p class="receptTitle">' + row['Naam recept'] + '</p>';
            // //htmlData += '<p>Duur: ' + row["Duur"] + '<br>Soort: ' + row["Soort"] + '<br>Keuken: ' + row["Keuken"] + '</p>';
            // htmlData += '<p>Duur: <span class="recDuurId">' + row["Duur"] + '</span>Soort: <span class="recSoortId">' + row["Soort"] + '</span>Keuken: <span class="recKeukenId">' + row["Keuken"] + '</span></p>';
            // htmlData += '</td><td class="receptButton"><input onclick="addOrRemoveRecept(' + jsonCounter + ')" type="checkbox" class="check" id="addRemoveButton"';
            htmlData += '<div class="recept_box">';
            htmlData += '<a class="receptLink" id="receptLink' + jsonCounter + '" href="'+row['Waar te vinden']+'" target="_blank"><img src="' + row['Foto'] + '">';
            htmlData += '<div class="receptDet">';
            htmlData += row['Naam recept'] + '<br>';
            htmlData += '&#128337;' + row['Duur'];
            htmlData += '</div></a>';
            htmlData += '<div class="receptButton">';
            //add personen
            htmlData += '<div class="persChange" id="persChangeRecept' + jsonCounter + '"><button class="persButton" onclick="changePersonen(' + jsonCounter + ', false)">-</button>' 
            + '<p class="persNr" id="PersChangeNr' + jsonCounter + '">' + row['Personen'] + '</p>'
            + '<button class="persButton" onclick="changePersonen(' + jsonCounter + ', true)">+</button></div>';
            //check button
            htmlData += '<input onclick="addOrRemoveRecept(' + jsonCounter + ')" type="checkbox" class="check" id="addRemoveButton"';
            var checkChange = false;
            for (var r=0; r<gekozenReceptenLijst.length;r++) {
                if (gekozenReceptenLijst[r] == jsonCounter) {
                    checkChange = true;
                    htmlData+=' checked >';
                }
            }
            if (!checkChange) {
                htmlData+='>';
            }
            //add personen
            // htmlData += '<div class="persChange" id="persChangeRecept' + jsonCounter + '"><button class="persButton" onclick="changePersonen(' + jsonCounter + ', false)">-</button>' 
            // + '<p class="persNr" id="PersChangeNr' + jsonCounter + '">' + row['Personen'] + '</p>'
            // + '<button class="persButton" onclick="changePersonen(' + jsonCounter + ', true)">+</button></div>';
            // htmlData += '</td></tr>';
            htmlData += '</div></div>'; 
            counterLength++;
        }
    }
    //<input onclick="console.log('echo')" type="checkbox" class="check" id="test" name="tes" value="test">
    var foundData='<div> <p id="aantal_gevonden">' + counterLength + ' van de ' + jsonData.length + ' recepten matchen met je zoekopdracht</p>' + '<select name="sorteren" id="sorteren" onchange="sortTable()">' +
                '<option value="none" selected disabled hidden>Sorteren op...</option> <option value="Naam">Naam</option> <option value="Duur">Duur</option> <option value="Soort">Soort</option> <option value="Keuken">Keuken</option> </select> </div>';
    htmlData = foundData + htmlData;
    //htmlData += '</table>';
    table_div.innerHTML= htmlData;

    //hide personen on default
    var personenClasses = document.getElementsByClassName("persChange");
    for (var i=0; i<personenClasses.length;i++) {
        personenClasses[i].style.display = "none";
    }
}

function searchOnMinutes(row, maxDuur) {
    if (maxDuur > 0) {
        var currentMin = row["Duur"];
        currentMin = currentMin.replace("min", " ");
        currentMin = currentMin.trim();
        return parseInt(currentMin) <= maxDuur;
    }
    else {
        return true;
    }
}

function searchOnAantalIngredienten(row, maxIngredienten) {
    //console.log(maxIngredienten);
    //console.log(row["Hoeveelheid ingredienten"]);
    if (maxIngredienten > 0) {
        var currentAantal = row["Hoeveelheid ingredienten"];
        return parseInt(currentAantal) <= maxIngredienten;
    }
    else {
        return true;
    }
}

function searchOnGezond(row, gezond) {
    if (gezond) {
        return row["Gezond"] == "Gezond";
    }
    else {
        return true;
    }
}

function searchOnBudget(row, budget) {
    if (budget) {
        return row["Budget"] == "Ja";
    }
    else {
        return true;
    }
}

function seachOnMoeilijkheidsgraad(row, moeilijkheidsgraad) {
    var currentMoeilijkhedsgraad = row["Moeilijkheidsgraad"];
    if (moeilijkheidsgraad == "eenvoudig") {
        if (currentMoeilijkhedsgraad == "eenvoudig") {
            return true;
        }
        else {
            return false;
        }
    }
    else if (moeilijkheidsgraad == "gemiddeld") {
        if (currentMoeilijkhedsgraad == "eenvoudig" || currentMoeilijkhedsgraad == "gemiddeld" ) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return true;
    }
}

function searchOnSoort(row, selectedSoort) {
    //console.log(selectedSoort);
    if (selectedSoort.length == 0 || (selectedSoort.length == 1 && selectedSoort[0] == "Alles")) {
        //console.log("empty");
        return true;
    }
    else {
        var currentSoort = row["Soort"];
        for (var i=0;i < selectedSoort.length;i++) {
            //console.log(currentSoort);
            //console.log(selectedSoort[i]);
            if (selectedSoort[i] == currentSoort) {
                //console.log("found");
                return true;
            }
        }
        //console.log("lost");
        return false;
    }
}

function searchOnKeuken(row, selectedKeuken) {
    //console.log("selected keuken is: " + selectedKeuken);
    if (selectedKeuken.length == 0) {
        //console.log("empty");
        return true;
    }
    else {
        var currentKeuken = row["Keuken"];
        for (var i=0;i < selectedKeuken.length;i++) {
            if (selectedKeuken[i] == "Europees") {
                selectedKeuken.push("Belgisch");
                selectedKeuken.push("Duits");
                selectedKeuken.push("Frans");
                selectedKeuken.push("Grieks");
                selectedKeuken.push("Hollands");
                selectedKeuken.push("Italiaans");
                selectedKeuken.push("Spaans");
            }
            else if (selectedKeuken[i] == "Aziatisch") {
                selectedKeuken.push("Chinees");
                selectedKeuken.push("Japans");
                selectedKeuken.push("Koreaans");
            }
            console.log("index is", i, "and", selectedKeuken[i]);
            console.log(selectedKeuken);
            if (selectedKeuken[i] == currentKeuken) {
                //console.log("found");
                return true;
            }
        }
        //console.log("lost");
        return false;
    }
}

function searchOnMenugang(row, selectedMenugang) {
    //console.log("selected menugang is: " + selectedMenugang);
    if (selectedMenugang.length == 0) {
        //console.log("empty");
        return true;
    }
    else {
        var currentMenugang = row["Menugang"];
        var currentMenugangList = currentMenugang.split(", ");
        //console.log("currentMenugang is: " + currentMenugang);
        //console.log("currentMenugangList is: " + currentMenugangList);
        //return true;
        for (var j=0;j < currentMenugangList.length;j++) {
            for (var i=0;i < selectedMenugang.length;i++) {
                //console.log("j = " + j);
                //console.log("i = " + i);
                if (selectedMenugang[i] == currentMenugangList[j]) {
                    //console.log("found");
                    return true;
                }
            }
        }
        //console.log("lost");
        return false;
    }
}

function searchOnVVV(row, selectedVVV) {
    //console.log(selectedVVV);
    if (selectedVVV.length == 0) {
        //console.log("empty");
        return true;
    }
    else {
        var currentVVV = row["Vlees of"];
        for (var i=0;i < selectedVVV.length;i++) {
            //console.log(currentVVV);
            //console.log(selectedVVV[i]);
            if (selectedVVV[i] == currentVVV) {
                //console.log("found");
                return true;
            }
        }
        //console.log("lost");
        return false;
    }
}

function searchOnCook(row, selectedCook) {
    //console.log(selectedVVV);
    if (selectedCook.length == 0) {
        //console.log("empty");
        return true;
    }
    else {
        var currentCook = row["Oven / frituur / wok"];
        for (var i=0;i < selectedCook.length;i++) {
            //console.log(currentVVV);
            //console.log(selectedVVV[i]);
            if (selectedCook[i] == currentCook) {
                //console.log("found");
                return true;
            }
        }
        //console.log("lost");
        return false;
    }
}

function searchOnSeizoen(row, selectedSeizoen) {
    //console.log(selectedSoort);
    if (selectedSeizoen.length == 0) {
        //console.log("empty");
        return true;
    }
    else {
        var currentSeizoen = row["Seizoen"];
        for (var i=0;i < selectedSeizoen.length;i++) {
            //console.log(currentSoort);
            //console.log(selectedSoort[i]);
            if (selectedSeizoen[i] == currentSeizoen) {
                //console.log("found");
                return true;
            }
        }
        //console.log("lost");
        return false;
    }
}

function searchOnGelegenheid(row, selectedGelegenheid) {
    //console.log(selectedSoort);
    if (selectedGelegenheid.length == 0) {
        //console.log("empty");
        return true;
    }
    else {
        var currentGelegenheid = row["Gelegenheid"];
        for (var i=0;i < selectedGelegenheid.length;i++) {
            //console.log(currentSoort);
            //console.log(selectedSoort[i]);
            if (selectedGelegenheid[i] == currentGelegenheid) {
                //console.log("found");
                return true;
            }
        }
        //console.log("lost");
        return false;
    }
}


function completeSearchOnIngredient(gekozenIngredient) {
    gekozenIngredient = gekozenIngredient.toLowerCase();
    if (gekozenIngredient == "aardappel") {
        gekozenIngredient += " " + "aardappelblok";
        gekozenIngredient += " " + "aardappelblokje";
        gekozenIngredient += " " + "aardappelblokjes";
        gekozenIngredient += " " + "aardappelblokken";

        gekozenIngredient += " " + "aardappelen";

        gekozenIngredient += " " + "aardappelpart";
        gekozenIngredient += " " + "aardappelparten";
        gekozenIngredient += " " + "aardappelpartje";
        gekozenIngredient += " " + "aardappelpartjes";

        gekozenIngredient += " " + "aardappels";

        gekozenIngredient += " " + "aardappelschijf";
        gekozenIngredient += " " + "aardappelschijfje";
        gekozenIngredient += " " + "aardappelschijfjes";

        gekozenIngredient += " " + "aardappeltje";
        gekozenIngredient += " " + "aardappeltjes";

        gekozenIngredient += " " + "bakaardappel";
        gekozenIngredient += " " + "bakaardappeltje";
        gekozenIngredient += " " + "bakaardappelen";
        gekozenIngredient += " " + "bakaardappeltjes";

        gekozenIngredient += " " + "frieten";

        gekozenIngredient += " " + "kriel";
        gekozenIngredient += " " + "krieltje";
        gekozenIngredient += " " + "krieltjes";
        gekozenIngredient += " " + "minikrieltje";
        gekozenIngredient += " " + "minikrieltjes";

        gekozenIngredient += " " + "krielaardappel";
        gekozenIngredient += " " + "krielaardappeltje";
        gekozenIngredient += " " + "krielaardappelen";
        gekozenIngredient += " " + "krielaardappeltjes";

        gekozenIngredient += " " + "stoomaardappelmix";
    }
    else if (gekozenIngredient == "alcohol") {
        gekozenIngredient += " " + "bier";
        gekozenIngredient += " " + "bokbier";
        gekozenIngredient += " " + "witbier";
        gekozenIngredient += " " + "gemberbier";
        gekozenIngredient += " " + "likeur";
        gekozenIngredient += " " + "likeuren";
        gekozenIngredient += " " + "likeurtje";
        gekozenIngredient += " " + "likeurtjes";

        gekozenIngredient += " " + "amandellikeur";
        gekozenIngredient += " " + "citroenlikeur";
        gekozenIngredient += " " + "sinaasappellikeur";
        gekozenIngredient += " " + "koffielikeur";
        gekozenIngredient += " " + "kokoslikeur";
        gekozenIngredient += " " + "perzikenlikeur";

        gekozenIngredient += " " + "rum";
        gekozenIngredient += " " + "wodka";
        gekozenIngredient += " " + "limoncello";
        gekozenIngredient += " " + "gin";
        gekozenIngredient += " " + "bourbon";

        gekozenIngredient += " " + "tequila";

        gekozenIngredient += " " + "wijn";
    }
    else if (gekozenIngredient == "avocado") {
        gekozenIngredient += " " + "avocado's";
        gekozenIngredient += " " + "avocados";
    }
    else if (gekozenIngredient == "basilicum") {
        gekozenIngredient += " " + "basilicumblaadje";
        gekozenIngredient += " " + "basilicumblaadjes";
    }
    else if (gekozenIngredient == "bloemkool") {
        gekozenIngredient += " " + "bloemkool-";
        gekozenIngredient += " " + "bloemkolen";
        gekozenIngredient += " " + "bloemkool ";
        gekozenIngredient += " " + "bloemkoolrijst";
        gekozenIngredient += " " + "bloemkoolroos";
        gekozenIngredient += " " + "bloemkoolroosje";
        gekozenIngredient += " " + "bloemkoolroosjes";
    }
    else if (gekozenIngredient == "boontjes") {
        gekozenIngredient += " " + "boontje";
        gekozenIngredient += " " + "boon";
        gekozenIngredient += " " + "bonen";

        gekozenIngredient += " " + "borlottiboontjes";
        gekozenIngredient += " " + "borlottiboontje";
        gekozenIngredient += " " + "borlottiboon";
        gekozenIngredient += " " + "borlottibonen";

        gekozenIngredient += " " + "cannelliniboontjes";
        gekozenIngredient += " " + "cannelliniboontje";
        gekozenIngredient += " " + "cannelliniboon";
        gekozenIngredient += " " + "cannellinibonen";

        gekozenIngredient += " " + "chiliboontjes";
        gekozenIngredient += " " + "chiliboontje";
        gekozenIngredient += " " + "chiliboon";
        gekozenIngredient += " " + "chilibonen";

        gekozenIngredient += " " + "kidneyboontjes";
        gekozenIngredient += " " + "kidneyboontje";
        gekozenIngredient += " " + "kidneyboon";
        gekozenIngredient += " " + "kidneybonen";

        gekozenIngredient += " " + "koffiebonen";
        gekozenIngredient += " " + "mokkaboontjes";

        gekozenIngredient += " " + "sojaboontjes";
        gekozenIngredient += " " + "sojaboontje";
        gekozenIngredient += " " + "sojaboon";
        gekozenIngredient += " " + "sojabonen";

        gekozenIngredient += " " + "sperzieboontjes";
        gekozenIngredient += " " + "sperzieboontje";
        gekozenIngredient += " " + "sperzieboon";
        gekozenIngredient += " " + "sperziebonen";

        gekozenIngredient += " " + "snijboontjes";
        gekozenIngredient += " " + "snijboontje";
        gekozenIngredient += " " + "snijboon";
        gekozenIngredient += " " + "snijbonen";

        gekozenIngredient += " " + "tuinboontjes";
        gekozenIngredient += " " + "tuinboontje";
        gekozenIngredient += " " + "tuinboon";
        gekozenIngredient += " " + "tuinbonen";

        gekozenIngredient += " " + "diepvriestuinboontjes";
        gekozenIngredient += " " + "diepvriestuinboontje";
        gekozenIngredient += " " + "diepvriestuinboon";
        gekozenIngredient += " " + "diepvriestuinbonen";

        gekozenIngredient += " " + "veldboontjes";
        gekozenIngredient += " " + "veldboontje";
        gekozenIngredient += " " + "veldboon";
        gekozenIngredient += " " + "veldbonen";

    }
    else if (gekozenIngredient == "bosui") {
        gekozenIngredient += " " + "bosuien";
        gekozenIngredient += " " + "bosuitje";
        gekozenIngredient += " " + "bosuitjes";

        gekozenIngredient += " " + "lente-/bosui";
        gekozenIngredient += " " + "lente-/bosuien";
        gekozenIngredient += " " + "lente-/bosuitje";
        gekozenIngredient += " " + "lente-/bosuitjes";

    }
    else if (gekozenIngredient == "bouillon") {
        gekozenIngredient += " " + "bouillonblok";
        gekozenIngredient += " " + "bouillonblokje";
        gekozenIngredient += " " + "bouillonblokjes";
        gekozenIngredient += " " + "bouillonblokken";

        gekozenIngredient += " " + "bouillontablet";
        gekozenIngredient += " " + "bouillontabletje";
        gekozenIngredient += " " + "bouillontabletjes";
        gekozenIngredient += " " + "bouillontablets";
        gekozenIngredient += " " + "bouillontabletten";

        gekozenIngredient += " " + "groentebouillon";
        gekozenIngredient += " " + "groentebouillonblok";
        gekozenIngredient += " " + "groentebouillonblokje";
        gekozenIngredient += " " + "groentebouillonblokjes";
        gekozenIngredient += " " + "groentebouillonblokken";

        gekozenIngredient += " " + "groentebouillontablet";
        gekozenIngredient += " " + "groentebouillontabletje";
        gekozenIngredient += " " + "groentebouillontabletjes";
        gekozenIngredient += " " + "groentebouillontablets";
        gekozenIngredient += " " + "groentebouillontabletten";

        gekozenIngredient += " " + "kipbouillon";
        gekozenIngredient += " " + "kipbouillonblok";
        gekozenIngredient += " " + "kipbouillonblokje";
        gekozenIngredient += " " + "kipbouillonblokjes";
        gekozenIngredient += " " + "kipbouillonblokken";

        gekozenIngredient += " " + "kipbouillontablet";
        gekozenIngredient += " " + "kipbouillontabletje";
        gekozenIngredient += " " + "kipbouillontabletjes";
        gekozenIngredient += " " + "kipbouillontablets";
        gekozenIngredient += " " + "kipbouillontabletten";

        gekozenIngredient += " " + "kippenbouillon";
        gekozenIngredient += " " + "kippenbouillonblok";
        gekozenIngredient += " " + "kippenbouillonblokje";
        gekozenIngredient += " " + "kippenbouillonblokjes";
        gekozenIngredient += " " + "kippenbouillonblokken";

        gekozenIngredient += " " + "kippenbouillontablet";
        gekozenIngredient += " " + "kippenbouillontabletje";
        gekozenIngredient += " " + "kippenbouillontabletjes";
        gekozenIngredient += " " + "kippenbouillontablets";
        gekozenIngredient += " " + "kippenbouillontabletten";

        gekozenIngredient += " " + "kruidenbouillon";
        gekozenIngredient += " " + "kruidenbouillonblok";
        gekozenIngredient += " " + "kruidenbouillonblokje";
        gekozenIngredient += " " + "kruidenbouillonblokjes";
        gekozenIngredient += " " + "kruidenbouillonblokken";

        gekozenIngredient += " " + "kruidenbouillontablet";
        gekozenIngredient += " " + "kruidenbouillontabletje";
        gekozenIngredient += " " + "kruidenbouillontabletjes";
        gekozenIngredient += " " + "kruidenbouillontablets";
        gekozenIngredient += " " + "kruidenbouillontabletten";

        gekozenIngredient += " " + "paddenstoelbouillon";
        gekozenIngredient += " " + "paddenstoelbouillonblok";
        gekozenIngredient += " " + "paddenstoelbouillonblokje";
        gekozenIngredient += " " + "paddenstoelbouillonblokjes";
        gekozenIngredient += " " + "paddenstoelbouillonblokken";

        gekozenIngredient += " " + "paddenstoelbouillontablet";
        gekozenIngredient += " " + "paddenstoelbouillontabletje";
        gekozenIngredient += " " + "paddenstoelbouillontabletjes";
        gekozenIngredient += " " + "paddenstoelbouillontablets";
        gekozenIngredient += " " + "paddenstoelbouillontabletten";

        gekozenIngredient += " " + "paddenstoelenbouillon";
        gekozenIngredient += " " + "paddenstoelenbouillonblok";
        gekozenIngredient += " " + "paddenstoelenbouillonblokje";
        gekozenIngredient += " " + "paddenstoelenbouillonblokjes";
        gekozenIngredient += " " + "paddenstoelenbouillonblokken";

        gekozenIngredient += " " + "paddenstoelenbouillontablet";
        gekozenIngredient += " " + "paddenstoelenbouillontabletje";
        gekozenIngredient += " " + "paddenstoelenbouillontabletjes";
        gekozenIngredient += " " + "paddenstoelenbouillontablets";
        gekozenIngredient += " " + "paddenstoelenbouillontabletten";

        gekozenIngredient += " " + "runderbouillon";
        gekozenIngredient += " " + "runderbouillonblok";
        gekozenIngredient += " " + "runderbouillonblokje";
        gekozenIngredient += " " + "runderbouillonblokjes";
        gekozenIngredient += " " + "runderbouillonblokken";

        gekozenIngredient += " " + "runderbouillontablet";
        gekozenIngredient += " " + "runderbouillontabletje";
        gekozenIngredient += " " + "runderbouillontabletjes";
        gekozenIngredient += " " + "runderbouillontablets";
        gekozenIngredient += " " + "runderbouillontabletten";

        gekozenIngredient += " " + "rundvleesbouillontablet";
        gekozenIngredient += " " + "rundvleesbouillontabletje";
        gekozenIngredient += " " + "rundvleesbouillontabletjes";
        gekozenIngredient += " " + "rundvleesbouillontablets";
        gekozenIngredient += " " + "rundvleesbouillontabletten";

        gekozenIngredient += " " + "visbouillon";
        gekozenIngredient += " " + "visbouillonblok";
        gekozenIngredient += " " + "visbouillonblokje";
        gekozenIngredient += " " + "visbouillonblokjes";
        gekozenIngredient += " " + "visbouillonblokken";

        gekozenIngredient += " " + "visbouillontablet";
        gekozenIngredient += " " + "visbouillontabletje";
        gekozenIngredient += " " + "visbouillontabletjes";
        gekozenIngredient += " " + "visbouillontablets";
        gekozenIngredient += " " + "visbouillontabletten";

        gekozenIngredient += " " + "vleesbouillon";
        gekozenIngredient += " " + "vleesbouillonblok";
        gekozenIngredient += " " + "vleesbouillonblokje";
        gekozenIngredient += " " + "vleesbouillonblokjes";
        gekozenIngredient += " " + "vleesbouillonblokken";

        gekozenIngredient += " " + "vleesbouillontablet";
        gekozenIngredient += " " + "vleesbouillontabletje";
        gekozenIngredient += " " + "vleesbouillontabletjes";
        gekozenIngredient += " " + "vleesbouillontablets";
        gekozenIngredient += " " + "vleesbouillontabletten";
    }
    else if (gekozenIngredient == "broccoli") {
        gekozenIngredient += " " + "broccolirijst";
        gekozenIngredient += " " + "broccoliroosje";
        gekozenIngredient += " " + "broccoliroosjes";
        gekozenIngredient += " " + "broccoli,";
    }
    else if (gekozenIngredient == "champignon") {
        gekozenIngredient += " " + "champignons";
        gekozenIngredient += " " + "kastanjechampignon";
        gekozenIngredient += " " + "kastanjechampignons";
        gekozenIngredient += " " + "champignonsoep";
    }
    else if (gekozenIngredient == "citroen") {
        gekozenIngredient += " " + "citroenen";
        gekozenIngredient += " " + "citroenrasp";
        gekozenIngredient += " " + "citroensap";
    }
    else if (gekozenIngredient == "courgette") {
        gekozenIngredient += " " + "courgettes";
        gekozenIngredient += " " + "courgetten";
        gekozenIngredient += " " + "courgettespaghetti";
    }
    else if (gekozenIngredient == "cremefraiche") {
        gekozenIngredient += " " + "fraîche";
    }
    else if (gekozenIngredient == "diepvriesingredienten") {
        gekozenIngredient += " " + "diepvries";
        gekozenIngredient += " " + "bevroren";

        gekozenIngredient += " " + "diepvriesbladerdeeg";

        gekozenIngredient += " " + "diepvriestuinboontjes";
        gekozenIngredient += " " + "diepvriestuinboontje";
        gekozenIngredient += " " + "diepvriestuinboon";
        gekozenIngredient += " " + "diepvriestuinbonen";

        gekozenIngredient += " " + "diepvriesdoperwtje";
        gekozenIngredient += " " + "diepvriesdoperwtjes";
        gekozenIngredient += " " + "diepvriesdoperwt";
        gekozenIngredient += " " + "diepvriesdoperwten";

        gekozenIngredient += " " + "diepvriesrösti";

        gekozenIngredient += " " + "diepvriesspinazie";

        gekozenIngredient += " " + "diepvriessperzieboontje";
        gekozenIngredient += " " + "diepvriessperzieboontjes";
        gekozenIngredient += " " + "diepvriessperzieboon";
        gekozenIngredient += " " + "diepvriessperziebonen";

        gekozenIngredient += " " + "diepvriestuinerwtje";
        gekozenIngredient += " " + "diepvriestuinerwtjes";
        gekozenIngredient += " " + "diepvriestuinerwt";
        gekozenIngredient += " " + "diepvriestuinerwten";

        gekozenIngredient += " " + "diepvriesaardbei";
        gekozenIngredient += " " + "diepvriesaardbeien";
        gekozenIngredient += " " + "diepvriesaardbeitje";
        gekozenIngredient += " " + "diepvriesaardbeitjes";

        gekozenIngredient += " " + "diepvriesbosvrucht";
        gekozenIngredient += " " + "diepvriesbosvruchten";
        gekozenIngredient += " " + "diepvriesbosvruchtje";
        gekozenIngredient += " " + "diepvriesbosvruchtjes";

        gekozenIngredient += " " + "diepvriesframboos";
        gekozenIngredient += " " + "diepvriesframbozen";

        gekozenIngredient += " " + "diepvrieswokgarnaal";
        gekozenIngredient += " " + "diepvrieswokgarnalen";
        gekozenIngredient += " " + "diepvrieswokgarnaaltje";
        gekozenIngredient += " " + "diepvrieswokgarnaaltjes";
    }
    else if (gekozenIngredient == "dureingredienten") {
        gekozenIngredient += " " + "pistache";
        gekozenIngredient += " " + "pistaches";
        gekozenIngredient += " " + "pistachenoot";
        gekozenIngredient += " " + "pistachenoten";
        gekozenIngredient += " " + "pistachenootje";
        gekozenIngredient += " " + "pistachenootjes";

        gekozenIngredient += " " + "garnaal";
        gekozenIngredient += " " + "garnalen";
        gekozenIngredient += " " + "garnaaltje";
        gekozenIngredient += " " + "garnaaltjes";

        gekozenIngredient += " " + "garnaalspies";
        gekozenIngredient += " " + "garnaalspiesje";
        gekozenIngredient += " " + "garnaalspiezen";
        gekozenIngredient += " " + "garnaalspiesjes";
        gekozenIngredient += " " + "garnalenspies";
        gekozenIngredient += " " + "garnalenspiesje";
        gekozenIngredient += " " + "garnalenspiezen";
        gekozenIngredient += " " + "garnalenspiesjes";

        gekozenIngredient += " " + "cocktailgarnaal";
        gekozenIngredient += " " + "cocktailgarnalen";
        gekozenIngredient += " " + "cocktailgarnaaltje";
        gekozenIngredient += " " + "cocktailgarnaaltjes";

        gekozenIngredient += " " + "diepvrieswokgarnaal";
        gekozenIngredient += " " + "diepvrieswokgarnalen";
        gekozenIngredient += " " + "diepvrieswokgarnaaltje";
        gekozenIngredient += " " + "diepvrieswokgarnaaltjes";

        gekozenIngredient += " " + "knoflookgarnaal";
        gekozenIngredient += " " + "knoflookgarnalen";
        gekozenIngredient += " " + "knoflookgarnaaltje";
        gekozenIngredient += " " + "knoflookgarnaaltjes";

        gekozenIngredient += " " + "tijgergarnaal";
        gekozenIngredient += " " + "tijgergarnalen";
        gekozenIngredient += " " + "tijgergarnaaltje";
        gekozenIngredient += " " + "tijgergarnaaltjes";

        gekozenIngredient += " " + "wokgarnaal";
        gekozenIngredient += " " + "wokgarnalen";
        gekozenIngredient += " " + "wokgarnaaltje";
        gekozenIngredient += " " + "wokgarnaaltjes";

        gekozenIngredient += " " + "avocado";
        gekozenIngredient += " " + "avocado's";
        gekozenIngredient += " " + "avocados";

        gekozenIngredient += " " + "pijnboompitten";
        gekozenIngredient += " " + "saladepijnboompitten";

        gekozenIngredient += " " + "truffel";
        gekozenIngredient += " " + "zomertruffel";
        gekozenIngredient += " " + "truffelolie";

        gekozenIngredient += " " + "zonnebloempitten";
        gekozenIngredient += " " + "kalfsvlees";

        gekozenIngredient += " " + "lamsvlees";
        gekozenIngredient += " " + "lamsboutlapje";
        gekozenIngredient += " " + "lamsboutlapjes";
        gekozenIngredient += " " + "lamsboutlap";
        gekozenIngredient += " " + "lamsboutlappen";
        gekozenIngredient += " " + "lamsgehakt";
        gekozenIngredient += " " + "lamskotelet";
        gekozenIngredient += " " + "lamskoteletten";
        gekozenIngredient += " " + "lamskoteletje";
        gekozenIngredient += " " + "lamskoteletjes";

        gekozenIngredient += " " + "zalm";
        gekozenIngredient += " " + "wilde-zalmeitjes";
        gekozenIngredient += " " + "zalmfilets";
    }
    else if (gekozenIngredient == "ei") {
        gekozenIngredient += " " + "eieren";
        gekozenIngredient += " " + "eitjes";
        gekozenIngredient += " " + "eitje";

        gekozenIngredient += " " + "eiwit";
        gekozenIngredient += " " + "eiwitten";
        gekozenIngredient += " " + "eigeel";

        gekozenIngredient += " " + "eidooier";
        gekozenIngredient += " " + "eidooiers";

        gekozenIngredient += " " + "scharrelei";
        gekozenIngredient += " " + "scharreleieren";
        gekozenIngredient += " " + "scharreleitjes";
        gekozenIngredient += " " + "scharreleitje";

        gekozenIngredient += " " + "uitloopei";
        gekozenIngredient += " " + "uitloopeieren";
        gekozenIngredient += " " + "uitloopeitjes";
        gekozenIngredient += " " + "uitloopeitje";

        gekozenIngredient += " " + "wilde-zalmei";
        gekozenIngredient += " " + "wilde-zalmeieren";
        gekozenIngredient += " " + "wilde-zalmeitjes";
        gekozenIngredient += " " + "wilde-zalmeitje";

    }
    else if (gekozenIngredient == "erwtjes") {
        gekozenIngredient += " " + "erwtje";
        gekozenIngredient += " " + "erwt";
        gekozenIngredient += " " + "erwten";

        gekozenIngredient += " " + "doperwtje";
        gekozenIngredient += " " + "doperwtjes";
        gekozenIngredient += " " + "doperwt";
        gekozenIngredient += " " + "doperwten";

        gekozenIngredient += " " + "diepvriesdoperwtje";
        gekozenIngredient += " " + "diepvriesdoperwtjes";
        gekozenIngredient += " " + "diepvriesdoperwt";
        gekozenIngredient += " " + "diepvriesdoperwten";

        gekozenIngredient += " " + "tuinerwtje";
        gekozenIngredient += " " + "tuinerwtjes";
        gekozenIngredient += " " + "tuinerwt";
        gekozenIngredient += " " + "tuinerwten";

        gekozenIngredient += " " + "diepvriestuinerwtje";
        gekozenIngredient += " " + "diepvriestuinerwtjes";
        gekozenIngredient += " " + "diepvriestuinerwt";
        gekozenIngredient += " " + "diepvriestuinerwten";

    }
    else if (gekozenIngredient == "fruit") {
        gekozenIngredient += " " + "fruits";
        gekozenIngredient += " " + "fruitpunch";
        gekozenIngredient += " " + "fruitpunchpakket";
        gekozenIngredient += " " + "fruitpunchpakketten";

        gekozenIngredient += " " + "aardbei";
        gekozenIngredient += " " + "aardbeien";
        gekozenIngredient += " " + "aardbeitje";
        gekozenIngredient += " " + "aardbeitjes";

        gekozenIngredient += " " + "diepvriesaardbei";
        gekozenIngredient += " " + "diepvriesaardbeien";
        gekozenIngredient += " " + "diepvriesaardbeitje";
        gekozenIngredient += " " + "diepvriesaardbeitjes";

        gekozenIngredient += " " + "abrikoos";
        gekozenIngredient += " " + "abrikozen";

        gekozenIngredient += " " + "ananas";
        gekozenIngredient += " " + "ananas-";
        gekozenIngredient += " " + "ananasblok";
        gekozenIngredient += " " + "ananasblokken";
        gekozenIngredient += " " + "ananasblokje";
        gekozenIngredient += " " + "ananasblokjes";

        gekozenIngredient += " " + "ananasschijf";
        gekozenIngredient += " " + "ananasschijven";
        gekozenIngredient += " " + "ananasschijfje";
        gekozenIngredient += " " + "ananasschijfjes";

        gekozenIngredient += " " + "ananasstuk";
        gekozenIngredient += " " + "ananasstukken";
        gekozenIngredient += " " + "ananasstukje";
        gekozenIngredient += " " + "ananasstukjes";

        gekozenIngredient += " " + "ananassap";

        gekozenIngredient += " " + "appel";
        gekozenIngredient += " " + "appels";
        gekozenIngredient += " " + "appelpart";
        gekozenIngredient += " " + "appelpartje";
        gekozenIngredient += " " + "appelpartjes";

        gekozenIngredient += " " + "banaan";
        gekozenIngredient += " " + "bananen";
        gekozenIngredient += " " + "banaantje";
        gekozenIngredient += " " + "banaantjes";
        gekozenIngredient += " " + "bakbanaan";
        gekozenIngredient += " " + "bakbananen";
        gekozenIngredient += " " + "bakbanaantje";
        gekozenIngredient += " " + "bakbanaantjes";

        gekozenIngredient += " " + "bessen";
        gekozenIngredient += " " + "besje";
        gekozenIngredient += " " + "besjes";

        gekozenIngredient += " " + "bosbessen";
        gekozenIngredient += " " + "bosbesje";
        gekozenIngredient += " " + "bosbesjes";

        gekozenIngredient += " " + "goudbessen";
        gekozenIngredient += " " + "goudbesje";
        gekozenIngredient += " " + "goudbesjes";

        gekozenIngredient += " " + "braam";
        gekozenIngredient += " " + "bramen";

        gekozenIngredient += " " + "bosvrucht";
        gekozenIngredient += " " + "bosvruchten";
        gekozenIngredient += " " + "bosvruchtje";
        gekozenIngredient += " " + "bosvruchtjes";
        gekozenIngredient += " " + "diepvriesbosvrucht";
        gekozenIngredient += " " + "diepvriesbosvruchten";
        gekozenIngredient += " " + "diepvriesbosvruchtje";
        gekozenIngredient += " " + "diepvriesbosvruchtjes";

        gekozenIngredient += " " + "druif";
        gekozenIngredient += " " + "druiven";
        gekozenIngredient += " " + "druifje";
        gekozenIngredient += " " + "druifjes";

        gekozenIngredient += " " + "framboos";
        gekozenIngredient += " " + "frambozen";
        gekozenIngredient += " " + "diepvriesframboos";
        gekozenIngredient += " " + "diepvriesframbozen";

        gekozenIngredient += " " + "grapefruit";
        gekozenIngredient += " " + "grapefruits";
        gekozenIngredient += " " + "grapefruitsap";


        gekozenIngredient += " " + "kiwi";
        gekozenIngredient += " " + "kiwi's";

        gekozenIngredient += " " + "mango";
        gekozenIngredient += " " + "mango's";

        gekozenIngredient += " " + "meloen";
        gekozenIngredient += " " + "meloenen";
        gekozenIngredient += " " + "cantaloupemeloen";
        gekozenIngredient += " " + "cantaloupemeloenen";
        gekozenIngredient += " " + "galiameloen";
        gekozenIngredient += " " + "galiameloenen";
        gekozenIngredient += " " + "honingmeloen";
        gekozenIngredient += " " + "honingmeloenen";
        gekozenIngredient += " " + "watermeloen";
        gekozenIngredient += " " + "watermeloenen";

        gekozenIngredient += " " + "nectarine";
        gekozenIngredient += " " + "nectarines";

        gekozenIngredient += " " + "passievrucht";
        gekozenIngredient += " " + "passievruchtje";
        gekozenIngredient += " " + "passievruchten";
        gekozenIngredient += " " + "passievruchtjes";

        gekozenIngredient += " " + "passievruchtblok";
        gekozenIngredient += " " + "passievruchtblokje";
        gekozenIngredient += " " + "passievruchtblokken";
        gekozenIngredient += " " + "passievruchtblokjes";

        gekozenIngredient += " " + "peer";
        gekozenIngredient += " " + "peertje";
        gekozenIngredient += " " + "peren";
        gekozenIngredient += " " + "peertjes";
        gekozenIngredient += " " + "stoofpeer";
        gekozenIngredient += " " + "stoofpeertje";
        gekozenIngredient += " " + "stoofperen";
        gekozenIngredient += " " + "stoofpeertjes";
        gekozenIngredient += " " + "handpeer";
        gekozenIngredient += " " + "handpeertje";
        gekozenIngredient += " " + "handperen";
        gekozenIngredient += " " + "handpeertjes";
        gekozenIngredient += " " + "handstoofpeer";
        gekozenIngredient += " " + "handstoofpeertje";
        gekozenIngredient += " " + "handstoofperen";
        gekozenIngredient += " " + "handstoofpeertjes";

        gekozenIngredient += " " + "perzik";
        gekozenIngredient += " " + "perziken";
        gekozenIngredient += " " + "perzikstuk";
        gekozenIngredient += " " + "perzikstukje";
        gekozenIngredient += " " + "perzikstukken";
        gekozenIngredient += " " + "perzikstukjes";

        gekozenIngredient += " " + "pruim";
        gekozenIngredient += " " + "pruimen";

        gekozenIngredient += " " + "sinaasappel";
        gekozenIngredient += " " + "sinaasappelen";
        gekozenIngredient += " " + "sinaasappels";

        gekozenIngredient += " " + "perssinaasappel";
        gekozenIngredient += " " + "perssinaasappelen";
        gekozenIngredient += " " + "perssinaasappels";

        gekozenIngredient += " " + "handsinaasappel";
        gekozenIngredient += " " + "handsinaasappelen";
        gekozenIngredient += " " + "handsinaasappels";
        gekozenIngredient += " " + "bloedsinaasappel";
        gekozenIngredient += " " + "bloedsinaasappelen";
        gekozenIngredient += " " + "bloedsinaasappels";

        gekozenIngredient += " " + "granaatappel";
        gekozenIngredient += " " + "granaatappelen";
        gekozenIngredient += " " + "granaatappels";

        gekozenIngredient += " " + "granaatappelpit";
        gekozenIngredient += " " + "granaatappelpitten";
        gekozenIngredient += " " + "granaatappelpitjes";


    }
    else if (gekozenIngredient == "garnaal") {
        gekozenIngredient += " " + "garnalen";
        gekozenIngredient += " " + "garnaaltje";
        gekozenIngredient += " " + "garnaaltjes";

        gekozenIngredient += " " + "garnaalspies";
        gekozenIngredient += " " + "garnaalspiesje";
        gekozenIngredient += " " + "garnaalspiezen";
        gekozenIngredient += " " + "garnaalspiesjes";
        gekozenIngredient += " " + "garnalenspies";
        gekozenIngredient += " " + "garnalenspiesje";
        gekozenIngredient += " " + "garnalenspiezen";
        gekozenIngredient += " " + "garnalenspiesjes";

        gekozenIngredient += " " + "cocktailgarnaal";
        gekozenIngredient += " " + "cocktailgarnalen";
        gekozenIngredient += " " + "cocktailgarnaaltje";
        gekozenIngredient += " " + "cocktailgarnaaltjes";

        gekozenIngredient += " " + "diepvrieswokgarnaal";
        gekozenIngredient += " " + "diepvrieswokgarnalen";
        gekozenIngredient += " " + "diepvrieswokgarnaaltje";
        gekozenIngredient += " " + "diepvrieswokgarnaaltjes";

        gekozenIngredient += " " + "knoflookgarnaal";
        gekozenIngredient += " " + "knoflookgarnalen";
        gekozenIngredient += " " + "knoflookgarnaaltje";
        gekozenIngredient += " " + "knoflookgarnaaltjes";

        gekozenIngredient += " " + "tijgergarnaal";
        gekozenIngredient += " " + "tijgergarnalen";
        gekozenIngredient += " " + "tijgergarnaaltje";
        gekozenIngredient += " " + "tijgergarnaaltjes";

        gekozenIngredient += " " + "wokgarnaal";
        gekozenIngredient += " " + "wokgarnalen";
        gekozenIngredient += " " + "wokgarnaaltje";
        gekozenIngredient += " " + "wokgarnaaltjes";
    }
    else if (gekozenIngredient == "gehakt") {
        gekozenIngredient += " " + "gehaktbal";
        gekozenIngredient += " " + "gehaktballen";
        gekozenIngredient += " " + "gehaktballetje";
        gekozenIngredient += " " + "gehaktballetjes";

        gekozenIngredient += " " + "rundergehaktbal";
        gekozenIngredient += " " + "rundergehaktballen";
        gekozenIngredient += " " + "rundergehaktballetje";
        gekozenIngredient += " " + "rundergehaktballetjes";

        gekozenIngredient += " " + "half-om-halfgehakt";
        gekozenIngredient += " " + "kipgehakt";
        gekozenIngredient += " " + "lamsgehakt";
        gekozenIngredient += " " + "rundergehakt";
        gekozenIngredient += " " + "roerbakgehakt";
    }
    else if (gekozenIngredient == "gember") {
        gekozenIngredient += " " + "gemberbolletje";
        gekozenIngredient += " " + "gembersnippers";
        gekozenIngredient += " " + "gemberwortel";
    }
    else if (gekozenIngredient == "groentemix") {
        gekozenIngredient += " " + "groentenmix";

        gekozenIngredient += " " + "bamigroente";
        gekozenIngredient += " " + "bamigroentemix";
        gekozenIngredient += " " + "bamigroenten";
        gekozenIngredient += " " + "bamigroentenmix";

        gekozenIngredient += " " + "bami-nasigroente";
        gekozenIngredient += " " + "bami-nasigroentemix";
        gekozenIngredient += " " + "bami-nasigroenten";
        gekozenIngredient += " " + "bami-nasigroentenmix";

        gekozenIngredient += " " + "boerensoepgroente";
        gekozenIngredient += " " + "boerensoepgroentemix";
        gekozenIngredient += " " + "boerensoepgroenten";
        gekozenIngredient += " " + "boerensoepgroentenmix";

        gekozenIngredient += " " + "groentepannetje";

        gekozenIngredient += " " + "macaronigroente";
        gekozenIngredient += " " + "macaronigroentemix";
        gekozenIngredient += " " + "macaronigroenten";
        gekozenIngredient += " " + "macaronigroentenmix";

        gekozenIngredient += " " + "macaroni-spaghettigroente";
        gekozenIngredient += " " + "macaroni-spaghettigroentemix";
        gekozenIngredient += " " + "macaroni-spaghettigroenten";
        gekozenIngredient += " " + "macaroni-spaghettigroentenmix";

        gekozenIngredient += " " + "nasi-bamigroente";
        gekozenIngredient += " " + "nasi-bamigroentemix";
        gekozenIngredient += " " + "nasi-bamigroenten";
        gekozenIngredient += " " + "nasi-bamigroentenmix";

        gekozenIngredient += " " + "nasigroente";
        gekozenIngredient += " " + "nasigroentemix";
        gekozenIngredient += " " + "nasigroenten";
        gekozenIngredient += " " + "nasigroentenmix";

        gekozenIngredient += " " + "roerbakgroente";
        gekozenIngredient += " " + "roerbakgroentemix";
        gekozenIngredient += " " + "roerbakgroenten";
        gekozenIngredient += " " + "roerbakgroentenmix";
        gekozenIngredient += " " + "roerbakmix";

        gekozenIngredient += " " + "salademix";

        gekozenIngredient += " " + "soepgroente";
        gekozenIngredient += " " + "soepgroentemix";
        gekozenIngredient += " " + "soepgroenten";
        gekozenIngredient += " " + "soepgroentenmix";

        gekozenIngredient += " " + "spaghettigroente";
        gekozenIngredient += " " + "spaghettigroentemix";
        gekozenIngredient += " " + "spaghettigroenten";
        gekozenIngredient += " " + "spaghettigroentenmix";

        gekozenIngredient += " " + "spaghetti-macaronigroente";
        gekozenIngredient += " " + "spaghetti-macaronigroentemix";
        gekozenIngredient += " " + "spaghetti-macaronigroenten";
        gekozenIngredient += " " + "spaghetti-macaronigroentenmix";

        gekozenIngredient += " " + "wokgroente";
        gekozenIngredient += " " + "wokgroentemix";
        gekozenIngredient += " " + "wokgroenten";
        gekozenIngredient += " " + "wokgroentenmix";
    }
    else if (gekozenIngredient == "ham") {
        gekozenIngredient += " " + "hamblokjes";
        gekozenIngredient += " " + "achterham";
        gekozenIngredient += " " + "hamlappen";
        gekozenIngredient += " " + "hamreepjes";
        gekozenIngredient += " " + "parmaham";
        gekozenIngredient += " " + "hammen";
        gekozenIngredient += " " + "schouderham";
        gekozenIngredient += " " + "yorkham";
    }
    else if (gekozenIngredient == "hamburger") {
        gekozenIngredient += " " + "hamburgers";
        gekozenIngredient += " " + "runderhamburger";
        gekozenIngredient += " " + "runderhamburgers";
    }
    else if (gekozenIngredient == "ijs") {
        gekozenIngredient += " " + "chocolade-ijs";
        gekozenIngredient += " " + "citroensorbetijs";
        gekozenIngredient += " " + "pecan-karamelijs";
        gekozenIngredient += " " + "pistache-ijs";
        gekozenIngredient += " " + "roomijs";
        gekozenIngredient += " " + "slagroomijs";
        gekozenIngredient += " " + "stracciatella-ijs";
        gekozenIngredient += " " + "vanille-ijs";
    }
    else if (gekozenIngredient == "kaas") {
        gekozenIngredient += " " + "boerderijkaas";
        gekozenIngredient += " " + "boerenkaas";
        gekozenIngredient += " " + "brie";
        gekozenIngredient += " " + "brokkelkaas";
        gekozenIngredient += " " + "cheddar";
        gekozenIngredient += " " + "cheddarkaas";
        gekozenIngredient += " " + "emmentaler";
        gekozenIngredient += " " + "feta";
        gekozenIngredient += " " + "geitenkaas";
        gekozenIngredient += " " + "kazen";
        gekozenIngredient += " " + "komijnekaas";
        gekozenIngredient += " " + "kruidenkaas";
        gekozenIngredient += " " + "kruidenroomkaas";
        gekozenIngredient += " " + "mozzarella";
        gekozenIngredient += " " + "padano";
        gekozenIngredient += " " + "padano-kaas";
        gekozenIngredient += " " + "parmigiano";
        gekozenIngredient += " " + "pecorino";
        gekozenIngredient += " " + "pecorinokaas";
        gekozenIngredient += " " + "roomkaas";
        gekozenIngredient += " " + "viking";
        gekozenIngredient += " " + "zaanlander";
    }
    else if (gekozenIngredient == "kaneel") {
        gekozenIngredient += " " + "kaneelpoeder";
        gekozenIngredient += " " + "kaneelstokje";
        gekozenIngredient += " " + "kaneelstokjes";
    }
    else if (gekozenIngredient == "kipfilet") {
        gekozenIngredient += " " + "kipfilets";
        gekozenIngredient += " " + "kipfiletblokjes";
        gekozenIngredient += " " + "kipfilethaasjes";
        gekozenIngredient += " " + "kipfiletreepjes";

        gekozenIngredient += " " + "scharrelkipfilets";
        gekozenIngredient += " " + "scharrelkipfilets";
        gekozenIngredient += " " + "scharrelkipfiletblokjes";
        gekozenIngredient += " " + "scharrelkipfilethaasjes";
        gekozenIngredient += " " + "scharrelkipfiletreepjes";
    }
    else if (gekozenIngredient == "knoflook") {
        gekozenIngredient += " " + "knoflookteen";
        gekozenIngredient += " " + "knoflooktenen";
        gekozenIngredient += " " + "knoflookteentje";
        gekozenIngredient += " " + "knoflookteentjes";
    }
    else if (gekozenIngredient == "kokos"){
        gekozenIngredient += " " + "kokosrasp";
        gekozenIngredient += " " + "kokosmelk";
        gekozenIngredient += " " + "kokoswater";
        gekozenIngredient += " " + "kokosschaafsel";
        gekozenIngredient += " " + "kokosroom";
    }
    else if (gekozenIngredient == "koriander"){
        gekozenIngredient += " " + "korianderzaad";
        gekozenIngredient += " " + "korianderzaadje";
        gekozenIngredient += " " + "korianderzaden";
        gekozenIngredient += " " + "korianderzaadjes";
    }
    else if (gekozenIngredient == "limoen"){
        gekozenIngredient += " " + "limoenen";
        gekozenIngredient += " " + "limoenrasp";
        gekozenIngredient += " " + "limoensap";
    }
    else if (gekozenIngredient == "macaroni"){
        gekozenIngredient += " " + "volkorenmacaroni";
    }
    else if (gekozenIngredient == "mais"){
        gekozenIngredient += " " + "maiskolf";
        gekozenIngredient += " " + "maiskolfje";
        gekozenIngredient += " " + "maiskolven";
        gekozenIngredient += " " + "maiskolfjes";
        gekozenIngredient += " " + "maiskorrels";
    }
    else if (gekozenIngredient == "mozzarella") {
        gekozenIngredient += " " + "mozzarella's";
        gekozenIngredient += " " + "mozarella";
        gekozenIngredient += " " + "mozarella's";

        gekozenIngredient += " " + "buffelmozzarella";
        gekozenIngredient += " " + "buffelmozzarella's";
        gekozenIngredient += " " + "buffelmozarella";
        gekozenIngredient += " " + "buffelmozarella's";

        gekozenIngredient += " " + "mini-buffelmozzarella";
        gekozenIngredient += " " + "mini-buffelmozzarella's";
        gekozenIngredient += " " + "mini-buffelmozarella";
        gekozenIngredient += " " + "mini-buffelmozarella's";

        gekozenIngredient += " " + "mini-mozzarellabol";
        gekozenIngredient += " " + "mini-mozzarellabollen";
        gekozenIngredient += " " + "mini-mozzarellabolletje";
        gekozenIngredient += " " + "mini-mozzarellabolletjes";

        gekozenIngredient += " " + "minimozzarellabol";
        gekozenIngredient += " " + "minimozzarellabollen";
        gekozenIngredient += " " + "minimozzarellabolletje";
        gekozenIngredient += " " + "minimozzarellabolletjes";

//oregano heeft geen alternatief

    }
    else if (gekozenIngredient == "olieofboter") {
        gekozenIngredient += " " + "arachideolie";
        gekozenIngredient += " " + "(arachide)olie";
        gekozenIngredient += " " + "bakboter";
        gekozenIngredient += " " + "boter";
        gekozenIngredient += " " + "roomboter";

        gekozenIngredient += " " + "frituurolie";
        gekozenIngredient += " " + "(frituur)olie";
        gekozenIngredient += " " + "kokosolie";
        gekozenIngredient += " " + "(kokos)olie";
        gekozenIngredient += " " + "koolzaadolie";
        gekozenIngredient += " " + "(koolzaad)olie";

        gekozenIngredient += " " + "notenolie";
        gekozenIngredient += " " + "(noten)olie";
        gekozenIngredient += " " + "rijstolie";
        gekozenIngredient += " " + "(rijst)olie";
        gekozenIngredient += " " + "olie";
        gekozenIngredient += " " + "olijfolie";
        gekozenIngredient += " " + "(olijf)olie";
        gekozenIngredient += " " + "roomboter";
        gekozenIngredient += " " + "sesamolie";
        gekozenIngredient += " " + "(sesam)olie";
        gekozenIngredient += " " + "truffelolie";
        gekozenIngredient += " " + "(truffel)olie";

        gekozenIngredient += " " + "walnotenolie";
        gekozenIngredient += " " + "(walnoten)olie";
        gekozenIngredient += " " + "wokolie";
        gekozenIngredient += " " + "(wok)olie";
        gekozenIngredient += " " + "zonnebloemolie";
        gekozenIngredient += " " + "(zonnebloem)olie";
    }
    else if (gekozenIngredient == "paprika") {
        gekozenIngredient += " " + "paprika's";
        gekozenIngredient += " " + "paprikas";
        gekozenIngredient += " " + "puntpaprikamix";
        gekozenIngredient += " " + "puntpaprika";
        gekozenIngredient += " " + "puntpaprika's";
        gekozenIngredient += " " + "puntpaprikas";
        gekozenIngredient += " " + "paprikareep";
        gekozenIngredient += " " + "paprikareepje";
        gekozenIngredient += " " + "paprikarepen";
        gekozenIngredient += " " + "paprikareepjes";
        gekozenIngredient += " " + "paprikamix";
        gekozenIngredient += " " + "snoeppaprika";
        gekozenIngredient += " " + "snoeppaprika's";
        gekozenIngredient += " " + "snoeppaprikas";
//pesto heeft geen alternatief
    }
    else if (gekozenIngredient == "peterselie") {
        gekozenIngredient += " " + "krulpeterselie";
    }
    else if (gekozenIngredient == "pijnboompitten") {
        gekozenIngredient += " " + "saladepijnboompitten";
    }
    else if (gekozenIngredient == "pistache") {
        gekozenIngredient += " " + "pistaches";
        gekozenIngredient += " " + "pistachenoot";
        gekozenIngredient += " " + "pistachenoten";
        gekozenIngredient += " " + "pistachenootje";
        gekozenIngredient += " " + "pistachenootjes";
    }
    else if (gekozenIngredient == "prei"){
        gekozenIngredient += " " + "preien";

//ravioli, rucola en rum hebben geen alternatief

    }
    else if (gekozenIngredient == "satesaus") {
        gekozenIngredient += " " + "satésaus";
        gekozenIngredient += " " + "pindasaus";
    }
    else if (gekozenIngredient == "saus") {
        gekozenIngredient += " " + "adobosaus";
        gekozenIngredient += " " + "barbecuesaus";
        gekozenIngredient += " " + "bechamelsaus";
        gekozenIngredient += " " + "chilisaus";
        gekozenIngredient += " " + "chipotlesaus";
        gekozenIngredient += " " + "chocoladesaus";
        gekozenIngredient += " " + "dessertsaus";

        gekozenIngredient += " " + "hoisinsaus";
        gekozenIngredient += " " + "knoflooksaus";
        gekozenIngredient += " " + "oestersaus";
        gekozenIngredient += " " + "ovensaus";
        gekozenIngredient += " " + "pastasaus";
        gekozenIngredient += " " + "pepersaus";
        gekozenIngredient += " " + "pestosaus";
        gekozenIngredient += " " + "pindasaus";
        gekozenIngredient += " " + "pizzasaus";

        gekozenIngredient += " " + "salsasaus";
        gekozenIngredient += " " + "satésaus";
        gekozenIngredient += " " + "slasaus";
        gekozenIngredient += " " + "sojasaus";
        gekozenIngredient += " " + "srirachasaus";
        gekozenIngredient += " " + "tacosaus";
        gekozenIngredient += " " + "tomatensaus";
        gekozenIngredient += " " + "vissaus";
        gekozenIngredient += " " + "woksaus";
        gekozenIngredient += " " + "worcestershiresaus";
    }
    else if (gekozenIngredient == "simonenogo") {
        gekozenIngredient += " " + "peer";
        gekozenIngredient += " " + "peertje";
        gekozenIngredient += " " + "peren";
        gekozenIngredient += " " + "peertjes";
        gekozenIngredient += " " + "handpeer";
        gekozenIngredient += " " + "handpeertje";
        gekozenIngredient += " " + "handperen";
        gekozenIngredient += " " + "handpeertjes";

        gekozenIngredient += " " + "spek";
        gekozenIngredient += " " + "ontbijtspek";
        gekozenIngredient += " " + "ontbijtspekblok";
        gekozenIngredient += " " + "ontbijtspekblokjes";
        gekozenIngredient += " " + "ontbijtspekjes";
        gekozenIngredient += " " + "spekblok";
        gekozenIngredient += " " + "spekblokje";
        gekozenIngredient += " " + "spekblokjes";
        gekozenIngredient += " " + "spekblokken";
        gekozenIngredient += " " + "spekjes";
        gekozenIngredient += " " + "spekreep";
        gekozenIngredient += " " + "spekreepje";
        gekozenIngredient += " " + "spekreepjes";

//groente
        gekozenIngredient += " " + "boerenkool";
        gekozenIngredient += " " + "babyboerenkool";
        gekozenIngredient += " " + "witlof";

//vlees of vis
        gekozenIngredient += " " + "gerookte";
        gekozenIngredient += " " + "rookworst";
        gekozenIngredient += " " + "runderrookvlees";

        gekozenIngredient += " " + "zalm";
        gekozenIngredient += " " + "wilde-zalmeitjes";
        gekozenIngredient += " " + "zalmfilets";

//overig
        gekozenIngredient += " " + "barbecuesaus";
        gekozenIngredient += " " + "truffelmayonaise";
        gekozenIngredient += " " + "cranberry";
        gekozenIngredient += " " + "cranberry's";
        gekozenIngredient += " " + "cranberrysap";
        gekozenIngredient += " " + "rozijn";
        gekozenIngredient += " " + "rozijnen";

    }
    else if (gekozenIngredient == "Sjalotten") {
        gekozenIngredient += " " + "Sjalot";
        gekozenIngredient += " " + "Sjalotje";
        gekozenIngredient += " " + "Sjalotjes";
    }
    else if (gekozenIngredient == "sla") {
        gekozenIngredient += " " + "bladsla";
        gekozenIngredient += " " + "botersla";
        gekozenIngredient += " " + "eikenbladslamelange";
        gekozenIngredient += " " + "ijsbergsla";
        gekozenIngredient += " " + "kropsla";
        gekozenIngredient += " " + "romainesla";
        gekozenIngredient += " " + "slamelange";
        gekozenIngredient += " " + "veldsla";
        gekozenIngredient += " " + "veldslamelange";
    }
    else if (gekozenIngredient == "spaghetti") {
        gekozenIngredient += " " + "volkorenspaghetti";
    }
    else if (gekozenIngredient == "spek") {
        gekozenIngredient += " " + "ontbijtspek";
        gekozenIngredient += " " + "ontbijtspekblok";
        gekozenIngredient += " " + "ontbijtspekblokjes";
        gekozenIngredient += " " + "ontbijtspekjes";
        gekozenIngredient += " " + "spekblok";
        gekozenIngredient += " " + "spekblokje";
        gekozenIngredient += " " + "spekblokjes";
        gekozenIngredient += " " + "spekblokken";
        gekozenIngredient += " " + "spekjes";
        gekozenIngredient += " " + "speklap";
        gekozenIngredient += " " + "speklapje";
        gekozenIngredient += " " + "speklapjes";
        gekozenIngredient += " " + "speklappen";
        gekozenIngredient += " " + "spekreep";
        gekozenIngredient += " " + "spekreepje";
        gekozenIngredient += " " + "spekreepjes";
    }
    else if (gekozenIngredient == "stannogo") {
//vrijwel elk soort fruit
        gekozenIngredient += " " + "fruit";
        gekozenIngredient += " " + "fruits";
        gekozenIngredient += " " + "fruitpunch";
        gekozenIngredient += " " + "fruitpunchpakket";
        gekozenIngredient += " " + "fruitpunchpakketten";

        gekozenIngredient += " " + "abrikoos";
        gekozenIngredient += " " + "abrikozen";

        gekozenIngredient += " " + "appel";
        gekozenIngredient += " " + "appels";
        gekozenIngredient += " " + "appelpart";
        gekozenIngredient += " " + "appelpartje";
        gekozenIngredient += " " + "appelpartjes";

        gekozenIngredient += " " + "banaan";
        gekozenIngredient += " " + "bananen";
        gekozenIngredient += " " + "banaantje";
        gekozenIngredient += " " + "banaantjes";
        gekozenIngredient += " " + "bakbanaan";
        gekozenIngredient += " " + "bakbananen";
        gekozenIngredient += " " + "bakbanaantje";
        gekozenIngredient += " " + "bakbanaantjes";

        gekozenIngredient += " " + "bessen";
        gekozenIngredient += " " + "besje";
        gekozenIngredient += " " + "besjes";

        gekozenIngredient += " " + "bosbessen";
        gekozenIngredient += " " + "bosbesje";
        gekozenIngredient += " " + "bosbesjes";

        gekozenIngredient += " " + "goudbessen";
        gekozenIngredient += " " + "goudbesje";
        gekozenIngredient += " " + "goudbesjes";

        gekozenIngredient += " " + "braam";
        gekozenIngredient += " " + "bramen";

        gekozenIngredient += " " + "bosvrucht";
        gekozenIngredient += " " + "bosvruchten";
        gekozenIngredient += " " + "bosvruchtje";
        gekozenIngredient += " " + "bosvruchtjes";
        gekozenIngredient += " " + "diepvriesbosvrucht";
        gekozenIngredient += " " + "diepvriesbosvruchten";
        gekozenIngredient += " " + "diepvriesbosvruchtje";
        gekozenIngredient += " " + "diepvriesbosvruchtjes";

        gekozenIngredient += " " + "druif";
        gekozenIngredient += " " + "druiven";
        gekozenIngredient += " " + "druifje";
        gekozenIngredient += " " + "druifjes";

        gekozenIngredient += " " + "framboos";
        gekozenIngredient += " " + "frambozen";
        gekozenIngredient += " " + "diepvriesframboos";
        gekozenIngredient += " " + "diepvriesframbozen";

        gekozenIngredient += " " + "grapefruit";
        gekozenIngredient += " " + "grapefruits";
        gekozenIngredient += " " + "grapefruitsap";


        gekozenIngredient += " " + "kiwi";
        gekozenIngredient += " " + "kiwi's";

        gekozenIngredient += " " + "mango";
        gekozenIngredient += " " + "mango's";

        gekozenIngredient += " " + "meloen";
        gekozenIngredient += " " + "meloenen";
        gekozenIngredient += " " + "cantaloupemeloen";
        gekozenIngredient += " " + "cantaloupemeloenen";
        gekozenIngredient += " " + "galiameloen";
        gekozenIngredient += " " + "galiameloenen";
        gekozenIngredient += " " + "honingmeloen";
        gekozenIngredient += " " + "honingmeloenen";

        gekozenIngredient += " " + "nectarine";
        gekozenIngredient += " " + "nectarines";

        gekozenIngredient += " " + "passievrucht";
        gekozenIngredient += " " + "passievruchtje";
        gekozenIngredient += " " + "passievruchten";
        gekozenIngredient += " " + "passievruchtjes";

        gekozenIngredient += " " + "passievruchtblok";
        gekozenIngredient += " " + "passievruchtblokje";
        gekozenIngredient += " " + "passievruchtblokken";
        gekozenIngredient += " " + "passievruchtblokjes";

        gekozenIngredient += " " + "peer";
        gekozenIngredient += " " + "peertje";
        gekozenIngredient += " " + "peren";
        gekozenIngredient += " " + "peertjes";
        gekozenIngredient += " " + "stoofpeer";
        gekozenIngredient += " " + "stoofpeertje";
        gekozenIngredient += " " + "stoofperen";
        gekozenIngredient += " " + "stoofpeertjes";
        gekozenIngredient += " " + "handpeer";
        gekozenIngredient += " " + "handpeertje";
        gekozenIngredient += " " + "handperen";
        gekozenIngredient += " " + "handpeertjes";
        gekozenIngredient += " " + "handstoofpeer";
        gekozenIngredient += " " + "handstoofpeertje";
        gekozenIngredient += " " + "handstoofperen";
        gekozenIngredient += " " + "handstoofpeertjes";

        gekozenIngredient += " " + "perzik";
        gekozenIngredient += " " + "perziken";
        gekozenIngredient += " " + "perzikstuk";
        gekozenIngredient += " " + "perzikstukje";
        gekozenIngredient += " " + "perzikstukken";
        gekozenIngredient += " " + "perzikstukjes";

        gekozenIngredient += " " + "pruim";
        gekozenIngredient += " " + "pruimen";

        gekozenIngredient += " " + "sinaasappel";
        gekozenIngredient += " " + "sinaasappelen";
        gekozenIngredient += " " + "sinaasappels";

        gekozenIngredient += " " + "perssinaasappel";
        gekozenIngredient += " " + "perssinaasappelen";
        gekozenIngredient += " " + "perssinaasappels";

        gekozenIngredient += " " + "handsinaasappel";
        gekozenIngredient += " " + "handsinaasappelen";
        gekozenIngredient += " " + "handsinaasappels";
        gekozenIngredient += " " + "bloedsinaasappel";
        gekozenIngredient += " " + "bloedsinaasappelen";
        gekozenIngredient += " " + "bloedsinaasappels";

        gekozenIngredient += " " + "granaatappel";
        gekozenIngredient += " " + "granaatappelen";
        gekozenIngredient += " " + "granaatappels";

        gekozenIngredient += " " + "granaatappelpit";
        gekozenIngredient += " " + "granaatappelpitten";
        gekozenIngredient += " " + "granaatappelpitjes";

//groente
        gekozenIngredient += " " + "courgette";
        gekozenIngredient += " " + "courgettes";
        gekozenIngredient += " " + "courgetten";
        gekozenIngredient += " " + "courgettespaghetti";

        gekozenIngredient += " " + "taugé";

//verder
        gekozenIngredient += " " + "pesto";
        gekozenIngredient += " " + "pestosaus";
        gekozenIngredient += " " + "mayonaise";
        gekozenIngredient += " " + "citroenmayonaise";
        gekozenIngredient += " " + "truffelmayonaise";

//vond zure room geen succes maar 2 woorden dus dan maar zo
        gekozenIngredient += " " + "zure";

//tijm heeft geen alternatief
    }
    else if (gekozenIngredient == "tomaat") {
        gekozenIngredient += " " + "cherry-/kerstomaat";
        gekozenIngredient += " " + "cherry-/kerstomaatblok";
        gekozenIngredient += " " + "cherry-/kerstomaatblokje";
        gekozenIngredient += " " + "cherry-/kerstomaatblokjes";
        gekozenIngredient += " " + "cherry-/kerstomaatblokken";
        gekozenIngredient += " " + "cherry-/kerstomaatje";
        gekozenIngredient += " " + "cherry-/kerstomaatjes";
        gekozenIngredient += " " + "cherry-/kerstomaatjesblok";
        gekozenIngredient += " " + "cherry-/kerstomaatjesblokken";
        gekozenIngredient += " " + "cherry-/kerstomaten";
        gekozenIngredient += " " + "cherry-/kerstomatenblok";
        gekozenIngredient += " " + "cherry-/kerstomatenblokje";
        gekozenIngredient += " " + "cherry-/kerstomatenblokken";

        gekozenIngredient += " " + "cherrytomaat";
        gekozenIngredient += " " + "cherrytomaatblok";
        gekozenIngredient += " " + "cherrytomaatblokje";
        gekozenIngredient += " " + "cherrytomaatblokjes";
        gekozenIngredient += " " + "cherrytomaatblokken";
        gekozenIngredient += " " + "cherrytomaatjes";
        gekozenIngredient += " " + "cherrytomaatjesblok";
        gekozenIngredient += " " + "cherrytomaatjesblokken";
        gekozenIngredient += " " + "cherrytomaten";
        gekozenIngredient += " " + "cherrytomatenblok";
        gekozenIngredient += " " + "cherrytomatenblokje";
        gekozenIngredient += " " + "cherrytomatenblokjes";
        gekozenIngredient += " " + "cherrytomatenblokken";

        gekozenIngredient += " " + "cocktailtomaat";
        gekozenIngredient += " " + "cocktailtomaatblok";
        gekozenIngredient += " " + "cocktailtomaatblokje";
        gekozenIngredient += " " + "cocktailtomaatblokjes";
        gekozenIngredient += " " + "cocktailtomaatblokken";
        gekozenIngredient += " " + "cocktailtomaatjes";
        gekozenIngredient += " " + "cocktailtomaatjesblok";
        gekozenIngredient += " " + "cocktailtomaatjesblokken";
        gekozenIngredient += " " + "cocktailtomaten";
        gekozenIngredient += " " + "cocktailtomatenblok";
        gekozenIngredient += " " + "cocktailtomatenblokje";
        gekozenIngredient += " " + "cocktailtomatenblokjes";
        gekozenIngredient += " " + "cocktailtomatenblokken";

        gekozenIngredient += " " + "kerstomaat";
        gekozenIngredient += " " + "kerstomaatblok";
        gekozenIngredient += " " + "kerstomaatblokje";
        gekozenIngredient += " " + "kerstomaatblokjes";
        gekozenIngredient += " " + "kerstomaatblokken";
        gekozenIngredient += " " + "kerstomaatje";
        gekozenIngredient += " " + "kerstomaatjes";
        gekozenIngredient += " " + "kerstomaatjesblok";
        gekozenIngredient += " " + "kerstomaatjesblokken";
        gekozenIngredient += " " + "kerstomaten";
        gekozenIngredient += " " + "kerstomatenblok";
        gekozenIngredient += " " + "kerstomatenblokje";
        gekozenIngredient += " " + "kerstomatenblokjes";
        gekozenIngredient += " " + "kerstomatenblokken";

        gekozenIngredient += " " + "pruimtomaat";
        gekozenIngredient += " " + "pruimtomaatblok";
        gekozenIngredient += " " + "pruimtomaatblokje";
        gekozenIngredient += " " + "pruimtomaatblokjes";
        gekozenIngredient += " " + "pruimtomaatblokken";
        gekozenIngredient += " " + "pruimtomaatje";
        gekozenIngredient += " " + "pruimtomaatjes";
        gekozenIngredient += " " + "pruimtomaatjesblok";
        gekozenIngredient += " " + "pruimtomaatjesblokken";
        gekozenIngredient += " " + "pruimtomaten";
        gekozenIngredient += " " + "pruimtomatenblok";
        gekozenIngredient += " " + "pruimtomatenblokje";
        gekozenIngredient += " " + "pruimtomatenblokjes";
        gekozenIngredient += " " + "pruimtomatenblokken";

        gekozenIngredient += " " + "romatomaat";
        gekozenIngredient += " " + "romatomaatblok";
        gekozenIngredient += " " + "romatomaatblokje";
        gekozenIngredient += " " + "romatomaatblokjes";
        gekozenIngredient += " " + "romatomaatblokken";
        gekozenIngredient += " " + "romatomaatje";
        gekozenIngredient += " " + "romatomaatjes";
        gekozenIngredient += " " + "romatomaatjesblok";
        gekozenIngredient += " " + "romatomaatjesblokken";
        gekozenIngredient += " " + "romatomaten";
        gekozenIngredient += " " + "romatomatenblok";
        gekozenIngredient += " " + "romatomatenblokje";
        gekozenIngredient += " " + "romatomatenblokjes";
        gekozenIngredient += " " + "romatomatenblokken";

        gekozenIngredient += " " + "snoeptomaat";
        gekozenIngredient += " " + "snoeptomaatblok";
        gekozenIngredient += " " + "snoeptomaatblokje";
        gekozenIngredient += " " + "snoeptomaatblokjes";
        gekozenIngredient += " " + "snoeptomaatblokken";
        gekozenIngredient += " " + "snoeptomaatje";
        gekozenIngredient += " " + "snoeptomaatjes";
        gekozenIngredient += " " + "snoeptomaatjesblok";
        gekozenIngredient += " " + "snoeptomaatjesblokken";
        gekozenIngredient += " " + "snoeptomaten";
        gekozenIngredient += " " + "snoeptomatenblok";
        gekozenIngredient += " " + "snoeptomatenblokje";
        gekozenIngredient += " " + "snoeptomatenblokjes";
        gekozenIngredient += " " + "snoeptomatenblokken";

        gekozenIngredient += " " + "tomaatblok";
        gekozenIngredient += " " + "tomaatblokje";
        gekozenIngredient += " " + "tomaatblokjes";
        gekozenIngredient += " " + "tomaatblokken";
        gekozenIngredient += " " + "tomaatje";
        gekozenIngredient += " " + "tomaatjes";
        gekozenIngredient += " " + "tomaatjesblok";
        gekozenIngredient += " " + "tomaatjesblokken";
        gekozenIngredient += " " + "tomaten";
        gekozenIngredient += " " + "tomatenblok";
        gekozenIngredient += " " + "tomatenblokje";
        gekozenIngredient += " " + "tomatenblokjes";
        gekozenIngredient += " " + "tomatenblokken";

        gekozenIngredient += " " + "trostomaat";
        gekozenIngredient += " " + "trostomaatblok";
        gekozenIngredient += " " + "trostomaatblokje";
        gekozenIngredient += " " + "trostomaatblokjes";
        gekozenIngredient += " " + "trostomaatblokken";
        gekozenIngredient += " " + "trostomaatje";
        gekozenIngredient += " " + "trostomaatjes";
        gekozenIngredient += " " + "trostomaatjesblok";
        gekozenIngredient += " " + "trostomaatjesblokken";
        gekozenIngredient += " " + "trostomaten";
        gekozenIngredient += " " + "trostomatenblok ";
        gekozenIngredient += " " + "trostomatenblokje";
        gekozenIngredient += " " + "trostomatenblokjes";
        gekozenIngredient += " " + "trostomatenblokken";

        gekozenIngredient += " " + "tastytom-trostomaat";
        gekozenIngredient += " " + "tastytom-trostomaatblok";
        gekozenIngredient += " " + "tastytom-trostomaatblokje";
        gekozenIngredient += " " + "tastytom-trostomaatblokjes";
        gekozenIngredient += " " + "tastytom-trostomaatblokken";
        gekozenIngredient += " " + "tastytom-trostomaatje";
        gekozenIngredient += " " + "tastytom-trostomaatjes";
        gekozenIngredient += " " + "tastytom-trostomaatjesblok";
        gekozenIngredient += " " + "tastytom-trostomaatjesblokken";
        gekozenIngredient += " " + "tastytom-trostomaten";
        gekozenIngredient += " " + "tastytom-trostomatenblok ";
        gekozenIngredient += " " + "tastytom-trostomatenblokje";
        gekozenIngredient += " " + "tastytom-trostomatenblokjes";
        gekozenIngredient += " " + "tastytom-trostomatenblokken";

        gekozenIngredient += " " + "tastytomtrostomaat";
        gekozenIngredient += " " + "tastytomtrostomaatblok";
        gekozenIngredient += " " + "tastytomtrostomaatblokje";
        gekozenIngredient += " " + "tastytomtrostomaatblokjes";
        gekozenIngredient += " " + "tastytomtrostomaatblokken";
        gekozenIngredient += " " + "tastytomtrostomaatje";
        gekozenIngredient += " " + "tastytomtrostomaatjes";
        gekozenIngredient += " " + "tastytomtrostomaatjesblok";
        gekozenIngredient += " " + "tastytomtrostomaatjesblokken";
        gekozenIngredient += " " + "tastytomtrostomaten";
        gekozenIngredient += " " + "tastytomtrostomatenblok ";
        gekozenIngredient += " " + "tastytomtrostomatenblokje";
        gekozenIngredient += " " + "tastytomtrostomatenblokjes";
        gekozenIngredient += " " + "tastytomtrostomatenblokken";

        gekozenIngredient += " " + "minitrostomaat";
        gekozenIngredient += " " + "minitrostomaatblok";
        gekozenIngredient += " " + "minitrostomaatblokje";
        gekozenIngredient += " " + "minitrostomaatblokjes";
        gekozenIngredient += " " + "minitrostomaatblokken";
        gekozenIngredient += " " + "minitrostomaatje";
        gekozenIngredient += " " + "minitrostomaatjes";
        gekozenIngredient += " " + "minitrostomaatjesblok";
        gekozenIngredient += " " + "minitrostomaatjesblokken";
        gekozenIngredient += " " + "minitrostomaten";
        gekozenIngredient += " " + "minitrostomatenblok ";
        gekozenIngredient += " " + "minitrostomatenblokje";
        gekozenIngredient += " " + "minitrostomatenblokjes";
        gekozenIngredient += " " + "minitrostomatenblokken";

        gekozenIngredient += " " + "vleestomaat";
        gekozenIngredient += " " + "vleestomaatblok";
        gekozenIngredient += " " + "vleestomaatblokje";
        gekozenIngredient += " " + "vleestomaatblokjes";
        gekozenIngredient += " " + "vleestomaatblokken";
        gekozenIngredient += " " + "vleestomaatje";
        gekozenIngredient += " " + "vleestomaatjes";
        gekozenIngredient += " " + "vleestomaatjesblok";
        gekozenIngredient += " " + "vleestomaatjesblokken";
        gekozenIngredient += " " + "vleestomaten";
        gekozenIngredient += " " + "vleestomatenblok";
        gekozenIngredient += " " + "vleestomatenblokje";
        gekozenIngredient += " " + "vleestomatenblokjes";
        gekozenIngredient += " " + "vleestomatenblokken";
    }
    else if (gekozenIngredient == "ui") {
        gekozenIngredient += " " + "uitje";
        gekozenIngredient += " " + "uitjes";
        gekozenIngredient += " " + "uien";

        gekozenIngredient += " " + "bosui";
        gekozenIngredient += " " + "bosuitje";
        gekozenIngredient += " " + "bosuitjes";
        gekozenIngredient += " " + "bosuien";

        gekozenIngredient += " " + "lente-ui";
        gekozenIngredient += " " + "lente-uitje";
        gekozenIngredient += " " + "lente-uitjes";
        gekozenIngredient += " " + "lente-uien";

        gekozenIngredient += " " + "lente-/bosui";
        gekozenIngredient += " " + "lente-/bosuitje";
        gekozenIngredient += " " + "lente-/bosuitjes";
        gekozenIngredient += " " + "lente-/bosuien";

       gekozenIngredient += " " + "salade-ui";
        gekozenIngredient += " " + "salade-uitje";
        gekozenIngredient += " " + "salade-uitjes";
        gekozenIngredient += " " + "salade-uien";
    }
    else if (gekozenIngredient == "vanille") {
        gekozenIngredient += " " + "vanillestok";
        gekozenIngredient += " " + "vanillestokje";
        gekozenIngredient += " " + "vanillestokken";
        gekozenIngredient += " " + "vanillestokjes";
        gekozenIngredient += " " + "vanillepoeder";
        gekozenIngredient += " " + "vanille-extract";
        gekozenIngredient += " " + "vanille-essence";
        gekozenIngredient += " " + "vanillesuiker";
//witlof heeft geen alternatief
    }
    else if (gekozenIngredient == "wortel") {
        gekozenIngredient += " " + "worteltje";
        gekozenIngredient += " " + "worteltjes";
        gekozenIngredient += " " + "wortels";
        gekozenIngredient += " " + "wortelen";
        gekozenIngredient += " " + "peen";
        gekozenIngredient += " " + "peentje";
        gekozenIngredient += " " + "peentjes";

        gekozenIngredient += " " + "winterwortel";
        gekozenIngredient += " " + "winterworteltje";
        gekozenIngredient += " " + "winterworteltjes";
        gekozenIngredient += " " + "winterwortels";
        gekozenIngredient += " " + "winterwortelen";
        gekozenIngredient += " " + "winterpeen";
        gekozenIngredient += " " + "winterpeentje";
        gekozenIngredient += " " + "winterpeentjes";

        gekozenIngredient += " " + "wortelreep";
        gekozenIngredient += " " + "wortelreepje";
        gekozenIngredient += " " + "wortelreepjes";
        gekozenIngredient += " " + "wortelrepen";

        gekozenIngredient += " " + "wortelpeterselie";
    }
    else if (gekozenIngredient == "zalm") {
        gekozenIngredient += " " + "wilde-zalmeitjes";
        gekozenIngredient += " " + "zalmfilets";
    }
//als je wilt zoeken naar zoetzure saus moet je zoeken naar dit onderstaande en ook de saus ingredienten filteranders krijg je bv ook augurk
    else if (gekozenIngredient == "zoetzuresaus") {
        gekozenIngredient += " " + "zoetzure";
        gekozenIngredient += " " + "sweet";
    }

    return gekozenIngredient;
}

function searchOnIngredient(row, gekozenIngredienten) {
    var checkListIngred = [];
    gekozenIngredienten = gekozenIngredienten.replace(/\n/g, "");
    var getypteIngredientenLijst = gekozenIngredienten.split(" ");
    for (var i = 0; i<getypteIngredientenLijst.length; i++) {
        var gekozenIngredient = getypteIngredientenLijst[i];
        checkListIngred.push(searchOnSingleIngredient(row, gekozenIngredient));
    }
    //console.log(checkListIngred);
    for (var j = 0; j<checkListIngred.length; j++) {
        if (!checkListIngred[j]) {
            return false;
        }
    }
    return true;
}

function searchOnSingleIngredient(row, gekozenIngredient) {
    gekozenIngredient = completeSearchOnIngredient(gekozenIngredient);
    var gekozenIngredientLijst = gekozenIngredient.split(" ");
    var receptIngredientLijst = row["Ingredienten"].split(" ");
    for (var i = 0; i < gekozenIngredientLijst.length; i++) {
        for (var j = 0; j < receptIngredientLijst.length; j++) {
        //console.log(gekozenIngredientLijst[i]);
        //console.log(row["Ingredienten"]);
            //var gekIngredLoc = row["Ingredienten"].search(gekozenIngredientLijst[i]);
           // if (gekIngredLoc != -1) {
            if (gekozenIngredientLijst[i] == receptIngredientLijst[j]) {
                return true;
            }
        }
    }
    //console.log(row["Ingredienten"]);
    return false;
}

function searchOnIngredientNot(row, gekozenIngredienten) {
    if (gekozenIngredienten == "") {
        return true;
    }
    var checkListIngred = [];
    gekozenIngredienten = gekozenIngredienten.replace(/\n/g, "");
    var getypteIngredientenLijst = gekozenIngredienten.split(" ");
    for (var i = 0; i<getypteIngredientenLijst.length; i++) {
        var gekozenIngredient = getypteIngredientenLijst[i];
        checkListIngred.push(searchOnSingleIngredientNOT(row, gekozenIngredient));
    }
    //console.log(checkListIngred);
    for (var j = 0; j<checkListIngred.length; j++) {
        if (checkListIngred[j]) {
            return false;
        }
    }
    return true;
}

function searchOnSingleIngredientNOT(row, gekozenIngredient) {
    gekozenIngredient = completeSearchOnIngredient(gekozenIngredient);
    var gekozenIngredientLijst = gekozenIngredient.split(" ");
    var receptIngredientLijst = row["Ingredienten"].split(" ");
    for (var i = 0; i < gekozenIngredientLijst.length; i++) {
        for (var j = 0; j < receptIngredientLijst.length; j++) {
            if (gekozenIngredientLijst[i] == receptIngredientLijst[j]) {
                return true;
            }
        }
    }
    return false;
}



function toggleBoodschappenBox() {
    var boodschappenBox = document.getElementById("bood_box");
    if (boodschappenBox.style.display === "none") {
        boodschappenBox.style.display = "block";
    } else {
        boodschappenBox.style.display = "none";
    }
}

function toggleAndShow() {
    showBoodschappenLijst();
    toggleBoodschappenBox();
}

function addOrRemoveRecept(rowNr) {
    var checkChange = false;
    for (var i = 0; i < gekozenReceptenLijst.length;i++) {
        //console.log("gekozenRecept= " + gekozenReceptenLijst[i]);
        //console.log("rowNr = " + rowNr);
        if (rowNr == gekozenReceptenLijst[i]) {
            gekozenReceptenLijst.splice(i,1)
            var personenAantal = gekozenReceptenDict[rowNr];
            delete gekozenReceptenDict[rowNr];
            var personenZicht = document.getElementById("persChangeRecept" + rowNr);
            personenZicht.style.display = "none";
            //gekozenReceptenLijst.pop(rowNr);
            checkChange = true;
            personenAantal = personenAantal.split("/")[1] + " pers";
            var currentID = "PersChangeNr" + String(rowNr);
            document.getElementById(currentID).innerHTML = personenAantal;
        }
    }
    if (!checkChange) {
        gekozenReceptenLijst.push(rowNr);
        var personenZicht = document.getElementById("persChangeRecept" + rowNr);
        personenZicht.style.display = "block";
        var currentID = "PersChangeNr" + String(rowNr);
        var personenAantal = document.getElementById(currentID).innerHTML.split(" ")[0];
        gekozenReceptenDict[rowNr] = personenAantal + "/" + personenAantal;
    }
    //console.log(gekozenReceptenLijst);
    console.log(gekozenReceptenDict);
}

function showBoodschappenLijst() {
    if (!fileLoaded) {
        return;
    }
    //if (gekozenReceptenLijst.length == 0) {
    //    return;
    //}
    var receptenBox = document.getElementById("boodschappen_box");
    htmlData = '<div class="recept_lijst"><table>'
    var jsonCounter = 0;
    var itemCounter = 0;
    var ingredientenLijst = [];
    for(var i=0;i<jsonData.length;i++){
        jsonCounter++;
        for (var j=0;j<gekozenReceptenLijst.length;j++) {
            if (jsonCounter == gekozenReceptenLijst[j]) {
                itemCounter++;
                var row=jsonData[i];
                htmlData += '<tr class="gek_recept"><td>' + itemCounter + '</td><td><a href="' + row['Waar te vinden'] 
                            + '" target="_blank"> ' + row['Naam recept'] + '</a></td><td>' 
                            + gekozenReceptenDict[jsonCounter].split("/")[0] + ' pers</td></tr>';
                //htmlData += '<div class="gek_recept"><a href="' + row['Waar te vinden'] + '" target="_blank"> ' 
                //            + row['Naam recept'] + '</a></div>';
                ingredientenLijst.push(fixIngredienten(jsonCounter, row['Ingredienten met aantallen']));
                //console.log(ingredientenLijst);
            }
        }
    }
    htmlData += '</table></div>';
    htmlData += insertIngredienten(ingredientenLijst);
    receptenBox.innerHTML= htmlData;
    //ingredientenOpties = ["vis"]
    //autocomplete(document.getElementById("benodigdeIngredienten"), ingredientenOpties);
}

function fixIngredienten(jsonCounter, ingreds) {
    var ingredFixPers = eval(gekozenReceptenDict[jsonCounter]);
    //console.log(ingredFixPers);
    //console.log(ingreds);
    var ingreds_list = ingreds.split(" , ");
    var ingreds_new = "";
    for (var i=0; i<ingreds_list.length;i++) {
        var thisIngred = ingreds_list[i].split(" : ");
        var thisAmount = thisIngred[1].split(" ");
        var newAmount = String(Number(thisAmount[0]) * ingredFixPers);
        //console.log(thisIngred);
        for (var j=1; j<thisAmount.length;j++) {
            newAmount += " " + thisAmount[j];
        }
        if (ingreds_new != "") {
            ingreds_new += " , " + thisIngred[0] + " : " + newAmount;
        }
        else {
            ingreds_new += thisIngred[0] + " : " + newAmount;
        }
    }
    //first add code to split all the ingredients into small sub sections.
    //then add code to fix the amount with the ingredFixPers number.
    //then combine them again together.
    //console.log(ingreds_new);
    return ingreds_new;
}

function insertIngredienten(ingredientenLijst) {
    //console.log(ingredientenLijst);
    ingredintenDict = {};
    var htmlInsertData = '<div class="ingred_lijst">'
    if (gekozenReceptenLijst.length != 0) {
        htmlInsertData += '<table><tr><th>Ingredient nodig</th><th>Hoeveelheid</th></tr>';
    }
    for (var i=0; i<ingredientenLijst.length;i++) {
        var huidigReceptIngredientenLijst = ingredientenLijst[i].split(" , ");
        for (var j=0; j<huidigReceptIngredientenLijst.length;j++) {
            var huidigIngredientenLijst = huidigReceptIngredientenLijst[j].split(" : ");
            if (huidigIngredientenLijst[0] in ingredintenDict) {
                console.log("double trouble!");
                var currentAmountInDic = Number(ingredintenDict[huidigIngredientenLijst[0]].split(" ")[0]);
                var currentAmountToAdd = Number(huidigIngredientenLijst[1].split(" ")[0]);
                var currentAmountToDic = currentAmountInDic + currentAmountToAdd;
                var currentStringLeft = huidigIngredientenLijst[1].split(" ");
                currentStringLeft.shift();
                var currentStringToDic = "";
                console.log(currentAmountInDic, currentAmountToAdd, currentAmountToDic, currentStringLeft);
                for (var k=0; k < currentStringLeft.length;k++) {
                    currentStringToDic+= currentStringLeft[k] + " ";
                }
                currentStringToDic = String(currentAmountToDic) + " " + currentStringToDic;
                ingredintenDict[huidigIngredientenLijst[0]] = currentStringToDic;
            }
            else {
                ingredintenDict[huidigIngredientenLijst[0]] = huidigIngredientenLijst[1];
            }
            
            //htmlInsertData += '<tr><td>' + huidigIngredientenLijst[0] + '</td><td>' + huidigIngredientenLijst[1]
            //                + '</td></tr>';
        }
        //htmlInsertData += '' + huidigReceptIngredientenLijst;
    }
    //console.log(Object.keys(ingredintenDict));
    ingrenKeys = Object.keys(ingredintenDict);
    for (var i=0; i<ingrenKeys.length;i++) {
        htmlInsertData += '<tr><td>' + ingrenKeys[i] + '</td><td>' + ingredintenDict[ingrenKeys[i]]
                            + '</td></tr>';
    }
    //console.log(ingredintenDict);
    htmlInsertData += '</table></div>';
    return htmlInsertData;
}

function changePersonen(rowNr, changeUp) {
    if (!changeUp) {
        //alert(" gaat met 1 omlaag");
        var changePers = -1;
    }
    else {
        //alert(" gaat met 1 omhoog");
        var changePers = 1;
    }
    var currentID = "PersChangeNr" + String(rowNr);
    var currentPersonen = document.getElementById(currentID).innerHTML;
    var currentPersonenList = currentPersonen.split(" ");
    //console.log(currentPersonenList);
    if (currentPersonenList[0] == 1 && changePers == -1) {
        alert("Je kunt niet minder dan 1 persoon selecteren");
        return;
    }
    var newPersonen = parseInt(currentPersonenList[0]) + changePers;
    var originelePersonen = gekozenReceptenDict[rowNr].split("/")[1];
    gekozenReceptenDict[rowNr] = String(newPersonen) + "/" + originelePersonen;
    var newPersonenHTML = String(newPersonen) + " " + currentPersonenList[1];
    console.log(gekozenReceptenDict);
    document.getElementById(currentID).innerHTML = newPersonenHTML;
}




function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);

        //next lines are for testing, remove when done
        //takes the last word typed instead of the whole input
        //arr_val = val.split(" ");
        arr_val = val.split(" ");
        val = arr_val[arr_val.length - 1];
        //console.log(val);
        height_counter = 40;
        for (j = 0; j < arr_val.length-1; j++) {
            height_counter += 24;
        }
        this.style.height = height_counter.toString() +'px';
        arr_val_check = arr_val.slice(0, arr_val.length - 1);
        arr_val_check.forEach(function(element, index) {
            this[index] = element.replace(/\n/g,"");
          }, arr_val_check);
        //arr_val_check = arr_val_check.replace(/\n/g,"");

        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
            //console.log(arr_val_check);
            //console.log(arr[i]);

          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase() && !arr_val_check.includes(arr[i])) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                //inp.value = this.getElementsByTagName("input")[0].value;

                //i changed this tooo
                //console.log(this.getElementsByTagName("input")[0].value);
                if (arr_val.length <= 1) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                }
                else {
                    next_inp_value = this.getElementsByTagName("input")[0].value;
                    current_inp_values = "";
                    for (j = 0; j < arr_val.length-1; j++) {
                        if (arr_val[j].includes("\n")) {
                            current_inp_values += arr_val[j] + " ";
                        }
                        else {
                            current_inp_values += arr_val[j] + "\n ";
                        }
                    }
                    inp.value = current_inp_values + this.getElementsByTagName("input")[0].value;
                }
                

                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*An array containing all the ingredients:*/
var ingredientenOpties = ["Aardappel", "Alcohol", "Avocado", "Basilicum", "Bieslook", "Bloemkool", "Boontjes", "Bosui", "Bouillon", "Champignon", "Citroen", "Courgette", "Cremefraiche", 
			"Diepvriesingredienten", "Dureingredienten", "Ei", "Erwtjes", "Fruit", "Garnaal", "Gehakt", "Gember", "Gnocchi", "Groentemix", 
			"Ham", "Hamburger","Hoisinsaus","Honing", "Ijs", "Kaas", "Kaneel", "Kipfilet", "Knoflook", "Kokos", "Koriander", 
			"Limoen", "Macaroni", "Mais", "Mozzarella", "Olieofboter", "Oregano", "Paprika", "Pesto", "Peterselie", "Pijnboompitten", "Pistache", "Prei", 
			"Ravioli", "Rucola", "Rum", "Satesaus", "Saus", "Simonenogo", "Sjalotten","Sla", "Spaghetti", "Spek", "Stannogo", "Tijm", "Tomaat", 
			"Ui", "Vanille", "Witlof", "Wortel", "Zoetzuresaus"];







function setCookie() {
    let exdays = 1;
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = "jsonData=" + jsonData[3] + "; expires=" + expires + "; path=/";
}

function getCookie() {
    console.log("get cookie");
}

//functions for the seperate page below:
function bekijkReceptenPaginaLaden() {
    var row = getReceptOmTeBekijken(3);
    bekijkReceptenDetailsLaden(row);
    bekijkReceptenFotoLaden(row);
    bekijkReceptenIngredientenLaden(row);
}

function getReceptOmTeBekijken(receptID) {
    let jsonData = document.cookie;
    console.log(JSON.stringify(jsonData));
    for(var i=0;i<jsonData.length;i++){
        var row=jsonData[i];
        if (i == receptID) {
            return row;
        }
    }
    return NaN;
}

function bekijkReceptenDetailsLaden(row) {
    var bekRecDetails = document.getElementById("ReceptenDetails");
    bekRecDetails.innerHTML = row['Gezond'];
}

function bekijkReceptenFotoLaden(row) {
    var bekRecfotoHolder = document.getElementById("ReceptenfotoHolder");
    bekRecfotoHolder.innerHTML = "<img src='Recepten_fotos/" + row['Naam recept'] + " foto.jpg' alt='Foto van " + row['Naam recept'] + "'>";
}

function bekijkReceptenIngredientenLaden(row) {
    var bekRecIngredienten = document.getElementById("ReceptenIngredienten");
    bekRecIngredienten.innerHTML = row['Ingredienten met aantallen'];
}

function sortTable() {
    var chosenSorting = document.getElementById("sorteren").value;
    var table, rows, switching, i, x, y, xSpec, ySpec, shouldSwitch;
    table = document.getElementById("recept_table");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 0; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[1];
        y = rows[i + 1].getElementsByTagName("TD")[1];
        //get the correct elements from each row
        if (chosenSorting == "Naam") {
            xSpec = x.getElementsByClassName("receptTitle")[0].innerHTML.toLowerCase();
            ySpec = y.getElementsByClassName("receptTitle")[0].innerHTML.toLowerCase();
        }
        else if (chosenSorting == "Duur") {
            xSpec = parseInt(x.getElementsByClassName("recDuurId")[0].innerHTML.toLowerCase());
            ySpec = parseInt(y.getElementsByClassName("recDuurId")[0].innerHTML.toLowerCase());
        }
        else if (chosenSorting == "Soort") {
            xSpec = x.getElementsByClassName("recSoortId")[0].innerHTML.toLowerCase();
            ySpec = y.getElementsByClassName("recSoortId")[0].innerHTML.toLowerCase();
        }
        else { // Keuken    recKeukenId
            xSpec = x.getElementsByClassName("recKeukenId")[0].innerHTML.toLowerCase();
            ySpec = y.getElementsByClassName("recKeukenId")[0].innerHTML.toLowerCase();
        }
        //check if the two rows should switch place:
        if (xSpec > ySpec) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
