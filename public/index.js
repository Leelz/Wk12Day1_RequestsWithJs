var countries = null;
var regions = null;
var subRegions = null;

var makeRequest = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback; //if button calling function this is button
  request.send();
}

//remember there are 4 things in makerequest function

var populateList = function (someCountries) {
  console.log(someCountries)
  var dropDown = document.querySelector('#country-list');
  dropDown.innerText = "";
  someCountries.forEach( function(country) {
    var place = document.createElement('option');
    place.innerText = country.name;
    dropDown.appendChild(place);
  });
}

var regionList = function () {
  regions = [];
  regions.push("World");
  var regionDropDown = document.querySelector('#region-list');
  for (country of countries) {
    if (!regions.includes(country.region)) {
      regions.push(country.region);
      console.log(regions);
    }
  }

  for (region of regions) {
    var place = document.createElement('option');
    place.innerText = region;
    regionDropDown.appendChild(place);
    console.log(regionDropDown);
  }

}

var subRegionList = function () {
  subRegions = [];
  subRegions.push("World");
  var subRegionDropDown = document.querySelector('#sub-region-list');
  for (country of countries) {
    if (!subRegions.includes(country.subregion)) {
      subRegions.push(country.subregion);
      console.log(subRegions);
    }
  }

  for (subRegion of subRegions) {
    var place = document.createElement('option');
    place.innerText = subRegion;
    subRegionDropDown.appendChild(place);
    console.log(subRegionDropDown);
  }

}

var requestComplete = function () {
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  populateList(countries);
  regionList();
  subRegionList();
}

var save = function (country) {
  var countryString = JSON.stringify(country);
  localStorage.setItem('country', countryString)
}

var load = function () {
  var countryString = localStorage.getItem('country');
  return JSON.parse(countryString);
}



var app = function(){

  var center = {lat: 51.507351, lng: -0.127758 };
  var mapDiv = document.querySelector('#map');

  var mainMap = new MapWrapper(mapDiv, center, 10);
  // mainMap.addMarker(center);

  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);

  var findBorderingCountries = function (country) {
    var borderDiv = document.querySelector('#border-country-info');
    borderDiv.innerText = "";
    for (otherCountry of countries) {
      if (otherCountry.borders.includes(country.alpha3Code)) {
        var borderCountry = document.createElement('p');
        borderCountry.innerText = otherCountry.name;
        borderDiv.appendChild(borderCountry);
      }
    }
  }

  var setCountryDisplay = function(country) {
    var info = document.querySelector('#country-info');
    info.innerText = "";

    var name = document.createElement('h1');
    info.appendChild(name);
    name.innerText = "Name: " + country.name;

    var capital = document.createElement('p');
    info.appendChild(capital);
    capital.innerText = "Capital: " + country.capital;

    var population = document.createElement('p');
    info.appendChild(population);
    population.innerText = "Population: " + country.population;

    mainMap.moveCenter({lat: country.latlng[0], lng: country.latlng[1] });
    // mainMap.zoomLevel(country.area, {lat: country.latlng[0], lng: country.latlng[1] });

    save(country);
    
  }
  setCountryDisplay(load());

  var dropDown = document.querySelector('#country-list');

  dropDown.onchange = function() {
    countries.forEach( function(country) {
      if(country.name == dropDown.value) {
        setCountryDisplay(country);
        findBorderingCountries(country);
      }
    })
  }

  var regionDropDown = document.querySelector('#region-list');
  var subRegionDropDown = document.querySelector('#sub-region-list');

  regionDropDown.onchange = function() {
    subRegionDropDown.value = "World";
    console.log(regionDropDown.value);
    var ofRegion = [];
    if(regionDropDown.value === "World"){
      populateList(countries);
    } else {
      for (country of countries) {
        if(country.region === regionDropDown.value) {
          ofRegion.push(country);
        }
      }
      populateList(ofRegion);
    }
    console.log(ofRegion);
  }

  

  subRegionDropDown.onchange = function() {
    regionDropDown.value = "World"
    console.log(subRegionDropDown.value);
    var ofSubRegion = [];
    if(subRegionDropDown.value === "World"){
      populateList(countries);
    } else {
      for (country of countries) {
        if(country.subregion === subRegionDropDown.value) {
          ofSubRegion.push(country);
        }
      }
      populateList(ofSubRegion);
    }
    console.log(ofSubRegion);
    
  }

}

  // var button = document.querySelector('button')
  // var url = 'https://restcountries.eu/rest/v1/all';
  // var countries = makeRequest(url, requestComplete);

  // button.onclick = function () {
  // }

  window.onload = app;