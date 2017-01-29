var characters = null;

var makeRequest = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback; //if button calling function this is button
  request.send();
}

//remember there are 4 things in makerequest function

var populateList = function (someCharacters) {
  var dropDown = document.querySelector('#character-list');
  dropDown.innerText = "";
  someCharacters.forEach( function(character) {
    var dude = document.createElement('option');
    dude.innerText = character.name;
    dropDown.appendChild(dude);
  });
}

var requestComplete = function () {
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  characters = JSON.parse(jsonString);
  populateList(characters);
  console.log(characters)
}

var save = function (character) {
  var characterString = JSON.stringify(character);
  localStorage.setItem('character', characterString)
}

var load = function () {
  var characterString = localStorage.getItem('character');
  return JSON.parse(characterString);
}

var app = function(){
  var url = 'http://hp-api.herokuapp.com/api/characters';
  makeRequest(url, requestComplete);

  var setCharacterDisplay = function(character) {
    var info = document.querySelector('#character-info');
    info.innerText = "";

    var name = document.createElement('h1');
    info.appendChild(name);
    name.innerText = "Name: " + character.name;

    var house = document.createElement('p');
    info.appendChild(house);
    house.innerText = "House: " + character.house;

    if (character.yearOfBirth != null) {
    var birthdate = document.createElement('p');
      info.appendChild(birthdate);
    birthdate.innerText = "Year of birth: " + character.yearOfBirth;
  }

    var patronus = document.createElement('p');
    info.appendChild(patronus);
    patronus.innerText = "Patronus: " + character.patronus;

    var actor = document.createElement('p');
    info.appendChild(actor);
    actor.innerText = "Actor: " + character.actor;

    save(character);
    
  }

  var dropDown = document.querySelector('#character-list');

  dropDown.onchange = function() {
    characters.forEach( function(character) {
      if(character.name == dropDown.value) {
        setCharacterDisplay(character);
      }
    })
  }


}

  window.onload = app;