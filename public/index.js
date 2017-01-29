var characters = null;

var makeRequest = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback; //if button calling function this is button
  request.send();
}

var populateList = function (someCharacters) {
  var dropDown = document.querySelector('#character-list');
  dropDown.innerText = "";
  someCharacters.forEach( function(character) {
    var dude = document.createElement('option');
    dude.innerText = character.name;
    dropDown.appendChild(dude);
  });
}

///adding an image

var createImage = function(url) {
  var charImage = document.createElement('img');
  charImage.src = url;
  return charImage;
}

var addChar = function(charUrl) {
  var charImage = createImage(charUrl);
  var characters = document.getElementById("image");
  characters.appendChild(charImage);
}

// var addSeveralCats = function() {
//   images.forEach(function(image) {
//   addCharacter(image.characterImage);
//   })
// }

///adding an image

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

//this IF function doesn't work :(
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
      if(dropDown.value == "Harry Potter") {
        addChar("http://cdn.playbuzz.com/cdn/23651551-a1f5-47ad-8709-f3535f0defaf/973dfb63-f694-4062-a9ac-444107fd2ee5.jpg");
      }
    })
  }

}

  window.onload = app;