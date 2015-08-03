// this.connect = function(){
//       var xhr = new XMLHttpRequest();
//       xhr.open("GET", "./models/popular-photos.json", true);
//       xhr.setRequestHeader("Content-Type", "application/json");
//
//       xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4) {
//             var response = JSON.parse(xhr.responseText);
//             photos = response.photos;
//             gallery.layoutPhotos();
//           // JSON.parse does not evaluate the attacker's scripts via xhr.responseText.
//
//         }
//       }
//       xhr.send();
//   };
this.search = function(){

  var markers = [];
  var mapOptions = {
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
    },
  }
  var map = new google.maps.Map(document.getElementById('map_canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
  map.fitBounds(defaultBounds);

  // Create var for the search boxes.
  var inputCat = document.getElementById('results_category_input');


  console.log(google.maps.places);



  var searchBox = new google.maps.places.SearchBox(
  /** @type {HTMLInputElement} */(inputCat));


  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    console.log(places);

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map:map,
        animation: google.maps.Animation.DROP,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

// this.createCatInput();

// google.maps.event.addDomListener(window, 'load', this.search());



google.maps.event.addListener(marker, 'click', function() {
  infowindow.setContent(place.name);
  infowindow.open(map, this);
  console.log(google.maps.places);
});

google.maps.event.addListener(marker, 'click', function() {
  infowindow.setContent(place.name);
  infowindow.open(map, this);
  console.log(google.maps.places);
});



      function clearList() {

        console.log(resultsList.children.length);

        for(var i = 0; i < resultsCount; i++) {
          resultsList.removeChild(resultsList.childNodes[i]);
          resultsCount--;
        }

      };
