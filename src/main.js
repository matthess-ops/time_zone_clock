//GOAL

// Render two tables, one containing all the different timezones of
// all countries (allTimeZones). The other one only contains user selected timezones
// of interest aka their favorite timezones (favoriteTimeZones). These Favorite timezones
// are saved to localstorage, thus ensuring that at a next page reload
// the user still has his/her favorite time zones. AllTimeZones table
// contains for each row a button to add the timeZone to the favoriteTimeZones.
// FavoriteTimeZones contains for each row a button to remove the timeZone,
// from favoriteTimeZones. localstorage is then also updated to reflect
// the new favorite time zones at a new page reload.
// To make the search of timeZones of interest in the big list of allTimeZones
// easier an search box is included.

//IMPROVEMENTS: dont rerender/caculate  the whole allTimeZonesRerender table each time a search is
//performed or time is increase. For performance just hide the rows that are not relevant and collapse the table.abs
// this would increase performace significantly. Also update the html element row element for time
// directly with the new time. No need to rerender everything.
// also split the functions over multiple files


"use strict";
const moment = require("moment-timezone");
const _ = require("lodash");

//this function retrieves for all countryCodes("AD") the timeZones belonging
//to this country. With these timeZones the current timeDate of the timeZones
//is calculated.
// I have chosen for an array instead of a json file, because I didnt wanted to
// mess with server side stuff.
function addAllTimeZones() {
  const countriesCodeAndName = [
    ["AD", "Andorra"],
    ["AE", "United Arab Emirates"],
    ["AF", "Afghanistan"],
    ["AG", "Antigua & Barbuda"],
    ["AI", "Anguilla"],
    ["AL", "Albania"],
    ["AM", "Armenia"],
    ["AO", "Angola"],
    ["AQ", "Antarctica"],
    ["AR", "Argentina"],
    ["AS", "Samoa (American)"],
    ["AT", "Austria"],
    ["AU", "Australia"],
    ["AW", "Aruba"],
    ["AX", "Aaland Islands"],
    ["AZ", "Azerbaijan"],
    ["BA", "Bosnia & Herzegovina"],
    ["BB", "Barbados"],
    ["BD", "Bangladesh"],
    ["BE", "Belgium"],
    ["BF", "Burkina Faso"],
    ["BG", "Bulgaria"],
    ["BH", "Bahrain"],
    ["BI", "Burundi"],
    ["BJ", "Benin"],
    ["BL", "St Barthelemy"],
    ["BM", "Bermuda"],
    ["BN", "Brunei"],
    ["BO", "Bolivia"],
    ["BQ", "Caribbean Netherlands"],
    ["BR", "Brazil"],
    ["BS", "Bahamas"],
    ["BT", "Bhutan"],
    ["BW", "Botswana"],
    ["BY", "Belarus"],
    ["BZ", "Belize"],
    ["CA", "Canada"],
    ["CC", "Cocos (Keeling) Islands"],
    ["CD", "Congo (Dem. Rep.)"],
    ["CF", "Central African Rep."],
    ["CG", "Congo (Rep.)"],
    ["CH", "Switzerland"],
    ["CI", "Cote d'Ivoire"],
    ["CK", "Cook Islands"],
    ["CL", "Chile"],
    ["CM", "Cameroon"],
    ["CN", "China"],
    ["CO", "Colombia"],
    ["CR", "Costa Rica"],
    ["CU", "Cuba"],
    ["CV", "Cape Verde"],
    ["CW", "Curacao"],
    ["CX", "Christmas Island"],
    ["CY", "Cyprus"],
    ["CZ", "Czech Republic"],
    ["DE", "Germany"],
    ["DJ", "Djibouti"],
    ["DK", "Denmark"],
    ["DM", "Dominica"],
    ["DO", "Dominican Republic"],
    ["DZ", "Algeria"],
    ["EC", "Ecuador"],
    ["EE", "Estonia"],
    ["EG", "Egypt"],
    ["EH", "Western Sahara"],
    ["ER", "Eritrea"],
    ["ES", "Spain"],
    ["ET", "Ethiopia"],
    ["FI", "Finland"],
    ["FJ", "Fiji"],
    ["FK", "Falkland Islands"],
    ["FM", "Micronesia"],
    ["FO", "Faroe Islands"],
    ["FR", "France"],
    ["GA", "Gabon"],
    ["GB", "Britain (UK)"],
    ["GD", "Grenada"],
    ["GE", "Georgia"],
    ["GF", "French Guiana"],
    ["GG", "Guernsey"],
    ["GH", "Ghana"],
    ["GI", "Gibraltar"],
    ["GL", "Greenland"],
    ["GM", "Gambia"],
    ["GN", "Guinea"],
    ["GP", "Guadeloupe"],
    ["GQ", "Equatorial Guinea"],
    ["GR", "Greece"],
    ["GS", "South Georgia & the South Sandwich Islands"],
    ["GT", "Guatemala"],
    ["GU", "Guam"],
    ["GW", "Guinea-Bissau"],
    ["GY", "Guyana"],
    ["HK", "Hong Kong"],
    ["HN", "Honduras"],
    ["HR", "Croatia"],
    ["HT", "Haiti"],
    ["HU", "Hungary"],
    ["ID", "Indonesia"],
    ["IE", "Ireland"],
    ["IL", "Israel"],
    ["IM", "Isle of Man"],
    ["IN", "India"],
    ["IO", "British Indian Ocean Territory"],
    ["IQ", "Iraq"],
    ["IR", "Iran"],
    ["IS", "Iceland"],
    ["IT", "Italy"],
    ["JE", "Jersey"],
    ["JM", "Jamaica"],
    ["JO", "Jordan"],
    ["JP", "Japan"],
    ["KE", "Kenya"],
    ["KG", "Kyrgyzstan"],
    ["KH", "Cambodia"],
    ["KI", "Kiribati"],
    ["KM", "Comoros"],
    ["KN", "St Kitts & Nevis"],
    ["KP", "Korea (North)"],
    ["KR", "Korea (South)"],
    ["KW", "Kuwait"],
    ["KY", "Cayman Islands"],
    ["KZ", "Kazakhstan"],
    ["LA", "Laos"],
    ["LB", "Lebanon"],
    ["LC", "St Lucia"],
    ["LI", "Liechtenstein"],
    ["LK", "Sri Lanka"],
    ["LR", "Liberia"],
    ["LS", "Lesotho"],
    ["LT", "Lithuania"],
    ["LU", "Luxembourg"],
    ["LV", "Latvia"],
    ["LY", "Libya"],
    ["MA", "Morocco"],
    ["MC", "Monaco"],
    ["MD", "Moldova"],
    ["ME", "Montenegro"],
    ["MF", "St Martin (French part)"],
    ["MG", "Madagascar"],
    ["MH", "Marshall Islands"],
    ["MK", "Macedonia"],
    ["ML", "Mali"],
    ["MM", "Myanmar (Burma)"],
    ["MN", "Mongolia"],
    ["MO", "Macau"],
    ["MP", "Northern Mariana Islands"],
    ["MQ", "Martinique"],
    ["MR", "Mauritania"],
    ["MS", "Montserrat"],
    ["MT", "Malta"],
    ["MU", "Mauritius"],
    ["MV", "Maldives"],
    ["MW", "Malawi"],
    ["MX", "Mexico"],
    ["MY", "Malaysia"],
    ["MZ", "Mozambique"],
    ["NA", "Namibia"],
    ["NC", "New Caledonia"],
    ["NE", "Niger"],
    ["NF", "Norfolk Island"],
    ["NG", "Nigeria"],
    ["NI", "Nicaragua"],
    ["NL", "Netherlands"],
    ["NO", "Norway"],
    ["NP", "Nepal"],
    ["NR", "Nauru"],
    ["NU", "Niue"],
    ["NZ", "New Zealand"],
    ["OM", "Oman"],
    ["PA", "Panama"],
    ["PE", "Peru"],
    ["PF", "French Polynesia"],
    ["PG", "Papua New Guinea"],
    ["PH", "Philippines"],
    ["PK", "Pakistan"],
    ["PL", "Poland"],
    ["PM", "St Pierre & Miquelon"],
    ["PN", "Pitcairn"],
    ["PR", "Puerto Rico"],
    ["PS", "Palestine"],
    ["PT", "Portugal"],
    ["PW", "Palau"],
    ["PY", "Paraguay"],
    ["QA", "Qatar"],
    ["RE", "Reunion"],
    ["RO", "Romania"],
    ["RS", "Serbia"],
    ["RU", "Russia"],
    ["RW", "Rwanda"],
    ["SA", "Saudi Arabia"],
    ["SB", "Solomon Islands"],
    ["SC", "Seychelles"],
    ["SD", "Sudan"],
    ["SE", "Sweden"],
    ["SG", "Singapore"],
    ["SH", "St Helena"],
    ["SI", "Slovenia"],
    ["SJ", "Svalbard & Jan Mayen"],
    ["SK", "Slovakia"],
    ["SL", "Sierra Leone"],
    ["SM", "San Marino"],
    ["SN", "Senegal"],
    ["SO", "Somalia"],
    ["SR", "Suriname"],
    ["SS", "South Sudan"],
    ["ST", "Sao Tome & Principe"],
    ["SV", "El Salvador"],
    ["SX", "St Maarten (Dutch part)"],
    ["SY", "Syria"],
    ["SZ", "Swaziland"],
    ["TC", "Turks & Caicos Is"],
    ["TD", "Chad"],
    ["TF", "French Southern & Antarctic Lands"],
    ["TG", "Togo"],
    ["TH", "Thailand"],
    ["TJ", "Tajikistan"],
    ["TK", "Tokelau"],
    ["TL", "East Timor"],
    ["TM", "Turkmenistan"],
    ["TN", "Tunisia"],
    ["TO", "Tonga"],
    ["TR", "Turkey"],
    ["TT", "Trinidad & Tobago"],
    ["TV", "Tuvalu"],
    ["TW", "Taiwan"],
    ["TZ", "Tanzania"],
    ["UA", "Ukraine"],
    ["UG", "Uganda"],
    ["UM", "US minor outlying islands"],
    ["US", "United States"],
    ["UY", "Uruguay"],
    ["UZ", "Uzbekistan"],
    ["VA", "Vatican City"],
    ["VC", "St Vincent"],
    ["VE", "Venezuela"],
    ["VG", "Virgin Islands (UK)"],
    ["VI", "Virgin Islands (US)"],
    ["VN", "Vietnam"],
    ["VU", "Vanuatu"],
    ["WF", "Wallis & Futuna"],
    ["WS", "Samoa (western)"],
    ["YE", "Yemen"],
    ["YT", "Mayotte"],
    ["ZA", "South Africa"],
    ["ZM", "Zambia"],
    ["ZW", "Zimbabwe"],
  ];
  let zoneData = [];
  for (let index = 0; index < countriesCodeAndName.length; index++) {
    moment.tz
      .zonesForCountry(countriesCodeAndName[index][0])
      .forEach((zone) => {
        zoneData.push({
          countryCode: countriesCodeAndName[index][0],
          countryName: countriesCodeAndName[index][1],
          zoneName: zone
            .split("/")
            [zone.split("/").length - 1].replace("_", " "),
          zoneTimeDate: moment().tz(zone),
          completZoneName: zone,
        });
      });
  }
  return zoneData;
}

// there are two main lists to render
// one is a list containing all the timeZones for all the countries (allTimeZonesToRender)
// the other is a list of selected timeZones of interest to the user, the favorite timezones (favoriteTimeZonesToRender)

let allTimeZones = addAllTimeZones();
let allTimeZonesToRender = addAllTimeZones();
let locallySavedTimeZones = [];
let favoriteTimeZonesToRender = [];

// this renders the timeZones in allTimeZonesToRender.
function formatAllTimeZones() {
  let timeZoneTable =
    "<tr><th>Country Code</th><th>Country Name</th><th>Zone Name</th><th>Time</th><th>Date</th><th>Add</th></tr>";

  allTimeZonesToRender.forEach(function (timeZone, index) {
    const row = `<tr><td>${timeZone.countryCode}</td><td>${
      timeZone.countryName
    }</td><td>${timeZone.zoneName}</td><td>${timeZone.zoneTimeDate.format(
      "HH:mm:ss"
    )}</td><td>${timeZone.zoneTimeDate.format(
      "DD-MM-YYYY"
    )}</td><td>  <button id="${"Add_" + String(index)}">Add</button></td></tr>`;
    timeZoneTable = timeZoneTable + row;
  });
  document.getElementById("timeZonesTable").innerHTML = timeZoneTable;
}

//this renders the time zones in favoriteTimeZonesToRender
function formatFavoriteTimeZones() {
  let timeZoneTable =
    "<tr><th>Country Code</th><th>Country Name</th><th>Zone Name</th><th>Time</th><th>Date</th><th>Add</th></tr>";
  if (favoriteTimeZonesToRender.length > 0) {
    favoriteTimeZonesToRender.forEach(function (timeZone, index) {
      const row = `<tr><td>${timeZone.countryCode}</td><td>${
        timeZone.countryName
      }</td><td>${timeZone.zoneName}</td><td>${timeZone.zoneTimeDate.format(
        "HH:mm:ss"
      )}</td><td>${timeZone.zoneTimeDate.format(
        "DD-MM-YYYY"
      )}</td><td>  <button id="${
        "Remove_" + String(index)
      }">Remove</button></td></tr>`;
      timeZoneTable = timeZoneTable + row;
    });
  }
  document.getElementById("favoriteTimeZonesTable").innerHTML = timeZoneTable;
}

// this adds the remove buttons to the favoriteTimeZones table
function addFavoriteTimeZonesListners() {
  favoriteTimeZonesToRender.forEach(function (zone, index) {
    const button = document.getElementById("Remove_" + String(index));
    if (button) {
      button.addEventListener("click", function () {
        removeFavoriteTimeZone(index);
      });
    }
  });
}

// this removes the selected timeZone from localstorage
//therefore at a next page reload the correct list of favorite timeZones is shown
function removeFavoriteTimeZone(index) {
  locallySavedTimeZones.splice(index, 1);

  localStorage.setItem("timeZones", JSON.stringify(locallySavedTimeZones));
  readLocalStorage();
  updateFavoriteTimeZones();
  formatFavoriteTimeZones();
  addFavoriteTimeZonesListners();
}

// this function listens to typed character in the searchField.
// these characters are concatenated to previous characters
// to create a string. Vice versa the characters can also be removed.
function addSearchListner() {
  const searchField = document.getElementById("searchField");
  if (searchField) {
    searchField.addEventListener("input", function (e) {

     
      searchAllTimeZones(document.getElementById("searchField").value
      .toLowerCase());
    });
  }
}

// this function searches timeZones countryCode,countryName and zoneName
// for the string entered in searchfield.
// IMPROVEMENTs: change the multiple if statements to one with ANDS
function searchAllTimeZones(stringToSearch) {
  let foundAllTimeZones = [];
  addAllTimeZones().forEach(function (zone) {
    let zoneSearchHit = false;
    if (zone.countryCode.toLowerCase().search(stringToSearch) != -1) {
      zoneSearchHit = true;
    }
    if (zone.countryName.toLowerCase().search(stringToSearch) != -1) {
      zoneSearchHit = true;
    }
    if (zone.zoneName.toLowerCase().search(stringToSearch) != -1) {
      zoneSearchHit = true;
    }
    if (zoneSearchHit == true) {
      foundAllTimeZones.push({...zone});
    }
  });
  allTimeZonesToRender = foundAllTimeZones; // update the allTimeZonesToRender with a list of timeZones in which the search string was found
  formatAllTimeZones();
  addAllTimeZonesListners();
}

//listen for timeZone Add events in all timeZones table
function addAllTimeZonesListners() {
  allTimeZonesToRender.forEach(function (zone, index) {
    const button = document.getElementById("Add_" + String(index));
    if (button) {
      button.addEventListener("click", function () {
        // becauase datetime cannot be saved in localstorage I
        // only chose to save these fields. With these
        // fields the corresponding dateTime can be found.
        const toLocalStorage = {
          countryCode: zone.countryCode,
          countryName: zone.countryName,
          zoneName: zone.zoneName,
        };
        saveTimeZoneToFavorites(toLocalStorage); // the new favorite timeZone nees to be saved to localstorage
        updateFavoriteTimeZones(); // after an add the favoriteTimeZonesToRender grows
        formatFavoriteTimeZones(); //because favoriteTimeZonesToRender has grown the table has to be rerenderd.
        // addFavoriteTimeZonesListners(); // the rerenderd table needs to have the button listeners added.
      });
    }
  });
}

//this function saves the new timeZone to localstorage
function saveTimeZoneToFavorites(timeZoneToSave) {
  locallySavedTimeZones.push(timeZoneToSave);
  locallySavedTimeZones = _.uniqBy(locallySavedTimeZones,'zoneName');
  console.log("uniues ",_.uniqBy(locallySavedTimeZones,'zoneName').length)
  // before you can write to localstorage the data needs to be converted to json
  localStorage.setItem("timeZones", JSON.stringify(locallySavedTimeZones));
}

//this function reads localstorage
function readLocalStorage() {
  let favoriteTimeZonesStoredLocally = JSON.parse(
    localStorage.getItem("timeZones")
  );
  if (favoriteTimeZonesStoredLocally != undefined) {
    // only save the timezones when the parse isnt undefined. Else the array gets overwritten with undefined which results in errors
    locallySavedTimeZones = favoriteTimeZonesStoredLocally;
  }
}
// the locallystored favorite timeZones dont contain the timeDate. This
// functions find the corresponding timezone data which contains the timeDate
// and updates it.
function updateFavoriteTimeZones() {
  let tempFavZones = [];
  locallySavedTimeZones.forEach(function (favZone) {
    allTimeZones.forEach(function (allZone) {
      if (
        favZone.countryName == allZone.countryName &&
        favZone.countryCode == allZone.countryCode &&
        favZone.zoneName == allZone.zoneName
      ) {
        // this is needed because when the zone is copied to favorite zones
        // the old zoneTimeDate is used, not the constantly updated zoneTimeDate in allTimeZones
        //therefore the zoneTimeDate needs to be updated to current timeDate
        let allZoneCopy = {...allZone};
        allZoneCopy.zoneTimeDate = moment().tz(allZoneCopy.completZoneName);
        tempFavZones.push(allZoneCopy);
      }
    });
  });
  favoriteTimeZonesToRender = tempFavZones;
}

// increases the clocks in all time zones
// IMPROVEMENT: combine the increase clocks functions in one function
function increaseTimezoneClocks(secsIncrease) {
  allTimeZonesToRender.forEach(function (zone) {
    zone.zoneTimeDate = zone.zoneTimeDate.add(secsIncrease, "seconds");
  });
}
// increases the clock in favoriate time zones
function increaseFavoriteTimeZonesClocks(secsIncrease) {
  favoriteTimeZonesToRender.forEach(function (zone) {
    zone.zoneTimeDate = zone.zoneTimeDate.add(secsIncrease, "seconds");
  });
}

// localStorage.clear();

//functions to update allTimeZones zoneTimeDate
setInterval(() => {
  increaseTimezoneClocks(1);
  formatAllTimeZones();
  addAllTimeZonesListners();
}, 1000);

//functiosn to update favoriteTimeZonesToRender zoneTimeDate
// IMPROVEMENT: create a seperate rendering function that only
//updates the time and date cells in the table. Because with rerendering
// every second it is difficult to copy paste the content in the table.
setInterval(() => {
  increaseFavoriteTimeZonesClocks(1);
  formatFavoriteTimeZones();
  addFavoriteTimeZonesListners();
}, 1000);

function renderAllTimeZones() {
  formatAllTimeZones();
  addAllTimeZonesListners();
  addSearchListner();
}

readLocalStorage();
renderAllTimeZones();
updateFavoriteTimeZones();
formatFavoriteTimeZones();
addFavoriteTimeZonesListners();

//uitvogelen waarom niet adds niet unique zijn.
//seconde shit is niet goed


// let beh =[{koe:"e",kat:"k"},{koe:"k",kat:"k"},{koe:"k",kat:"k"}]
// console.log(_.uniqBy(beh,'koe','kat'))


// check wanneer zoek box leeg is
let x = document.getElementById("searchField").value;
console.log("serach conttent ", x)

