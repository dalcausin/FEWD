Element.prototype.Search = function() {


  var gallery = document.getElementById('gallery'),
      search = document.getElementById('search'),
      searchValue = document.getElementsByTagName('input')[0].value,
      photos = new Object();

  // MY SOLUTION: when the user focuses (clicks) on the input, clear it's contents

  search.clear = function(ev) {
    if(searchValue !== 'this.value=""') {
      search.children[0].setAttribute('onfocus','this.value=""');
    };
  };

  // MY SOLUTION: after the user presses 'Enter/Return' filter the gallery <li> using tags from the JSON model

    // loop through images to find tags that equal
    // if equal to search word

  search.find = function(ev) {

    searchValue = ev.target.value;

    photos.forEach(function(photo,index){

      console.log(searchValue);

    });

  };



  search.connect = function(){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "./models/popular-photos.json", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var response = JSON.parse(xhr.responseText);
            photos = response.photos;
            search.find();
          // JSON.parse does not evaluate the attacker's scripts via xhr.responseText.

        }
      }
      xhr.send();
  };

  init = function (ev) {

    search.connect();
    search.addEventListener('click',search.clear);
    search.addEventListener('keydown',function(ev) {
      if(event.keyCode == 13) {
        search.find(ev);
      }
    });

  };

  init();


};
