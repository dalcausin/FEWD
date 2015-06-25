//Define prototypical Gallery function
Element.prototype.Gallery = function(){

  var gallery = this;
  var ul = gallery.children[0];
  var photos = new Object();


  // Define global variables

  this.singlePhoto = function(ev) {

  var ev = event.target;

  console.log(ev.style.backgroundImage);

  var img = ev.style.backgroundImage;

  var single = document.createElement('div');

  single.classList.add('single-photo');

  single.style.opacity='1';
  single.style.backgroundImage = ("img");


  singlePhoto.appendChild(single);


  /*photos.forEach(function(photo){

      var singlePhoto = document.getElementById('singlePhoto');

      singlePhoto.classList.add('single-photo');

      singlePhoto.style.backgroundImage = 'url("'+photo.image_url+'")';
      singlePhoto.style.opacity='1';
      singlePhoto.style.backgroundSize='auto';
      singlePhoto.innerHTML = '<div class="meta"><h2>'+
          photo.name+
          '</h2><h3>'+
          photo.user.fullname+
          '</h3></div><div class="stats"><div>'+
          photo.rating+'</div></div>';


    });*/

  };

  this.layoutPhotos = function(){
      // add logic for each photo in here

      photos.forEach(function(photo,index){

      //  console.log(photo.rating);

        var li = document.createElement('li');

        li.style.backgroundImage = 'url("'+photo.image_url+'")';
        li.style.backgroundSize = 'cover';

        li.innerHTML = '<div class="meta"><h5>'+
            photo.name+
            '</h5><h6>'+
            photo.user.fullname+
            '</h6></div><div class="stats"><div>'+
            photo.rating+'</div></div>';

        li.addEventListener('mousedown',gallery.singlePhoto);

        ul.appendChild(li);

      });

  };

  this.connect = function(){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "./models/popular-photos.json", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var response = JSON.parse(xhr.responseText);
            photos = response.photos;
            gallery.layoutPhotos();
          // JSON.parse does not evaluate the attacker's scripts via xhr.responseText.

        }
      }
      xhr.send();
  };

  this.init = function(){

    this.connect();

  };


  this.init(); // do tasks on initialization.


};
/* end Gallery */
