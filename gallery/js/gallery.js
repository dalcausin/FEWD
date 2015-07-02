//Define prototypical Gallery function
Element.prototype.Gallery = function(){

  var gallery = this;
  var ul = gallery.children[0];
  var photos = new Object();
  var container = document.getElementById('container')


  // Define global variables

  this.singlePhoto = function(ev) {

  // --myattempt--
  //   var ev = event.target;
  //   console.log(ev.style.backgroundImage);
  //   var img = ev.style.backgroundImage;
  //   var single = document.createElement('div');
  //   single.classList.add('single-photo');
  //   single.style.opacity='1';
  //   single.style.backgroundImage = ("img");
  //   singlePhoto.appendChild(single);

    console.log(ev.target.style.backgroundImage);
    var section = document.createElement('section');

    section.innerHTML = ev.target.innerHTML;
    section.style.backgroundImage = ev.target.style.backgroundImage;
    section.classList.add('single-photo');

/*  -- Not required as we have assigned a class to the section --
    section.style.backgroundRepeat = 'no-repeat';
    section.style.backgroundSize = 'contain';
    section.style.backgroundPosition = 'center center';
    section.style.height = '100%';*/

    var p = document.createElement('p');
    p.innerHTML = ev.target.dataset.description;

    var closeButton = document.createElement('div');
    closeButton.classList.add('close');

    closeButton.addEventListener('click',function(){
        section.style.display = 'none';
    });

    section.children[0].appendChild(p);
    section.appendChild(closeButton);
    container.appendChild(section);

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

// setting data attributes
        li.dataset.description = photo.description;

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
