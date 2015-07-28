// *** Landing Page *** //
// User enters the type of business - should this be a drop down?
// User enters the location
// Default time from is now

// *** Results Page *** //
// Return a list of business types ordered by distance closest to location (within a certain radius?)
    // within each card, a bar visually illustrates open hours from now to +12hours
    // display distance
    // display open for ...
// Return markers with a map of results


var results = this,
    long = 0,
    lat = 0;


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




this.getLocation = function () {

  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById("results_where_input").value;

    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          console.log(latitude);
          console.log(longitude);

          var location = new google.maps.LatLng(latitude,longitude);
          var type = document.getElementById("results_category_input").value;

          var map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: location,
            zoom: 15
          });

          var request = {
            location: location,
            radius: 800,
            types: [type]
          };
          infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
          console.log(type);


        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          }
        };

        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
            console.log(google.maps.places);
          });
        };
          // alert("Latitude: " + latitude + "\nLongitude: " + longitude);
      }
      else
      {
          alert("Request failed.");
      }
  });

};


// this.styleMap = function() {
//
//   // Create an array of styles.
//   var styles = [
//     {
//         "featureType": "administrative",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#6195a0"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.province",
//         "elementType": "geometry.stroke",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "lightness": "0"
//             },
//             {
//                 "saturation": "0"
//             },
//             {
//                 "color": "#f5f5f2"
//             },
//             {
//                 "gamma": "1"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape.man_made",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "lightness": "-3"
//             },
//             {
//                 "gamma": "1.00"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape.natural.terrain",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.park",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "color": "#bae5ce"
//             },
//             {
//                 "visibility": "on"
//             }
//         ]
//     },
//     {
//         "featureType": "road",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "saturation": -100
//             },
//             {
//                 "lightness": 45
//             },
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "color": "#fac9a9"
//             },
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.text",
//         "stylers": [
//             {
//                 "color": "#4e4e4e"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#787878"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "transit",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "transit.station.airport",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "hue": "#0a00ff"
//             },
//             {
//                 "saturation": "-77"
//             },
//             {
//                 "gamma": "0.57"
//             },
//             {
//                 "lightness": "0"
//             }
//         ]
//     },
//     {
//         "featureType": "transit.station.rail",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#43321e"
//             }
//         ]
//     },
//     {
//         "featureType": "transit.station.rail",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "hue": "#ff6c00"
//             },
//             {
//                 "lightness": "4"
//             },
//             {
//                 "gamma": "0.75"
//             },
//             {
//                 "saturation": "-68"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "color": "#eaf6f8"
//             },
//             {
//                 "visibility": "on"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "color": "#c8ecff"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "lightness": "0"
//             },
//             {
//                 "saturation": "100"
//             },
//             {
//                 "gamma": "0.79"
//             }
//         ]
//     }
//   ];
//
//   // Create a new StyledMapType object, passing it the array of styles,
//   // as well as the name to be displayed on the map type control.
//   var styledMap = new google.maps.StyledMapType(styles,
//     {name: "Styled Map"});
//
//   // Create a map object, and include the MapTypeId to add
//   // to the map type control.
//   var mapOptions = {
//     zoom: 14,
//     center: new google.maps.LatLng(34.0219,-118.4814),
//     mapTypeControlOptions: {
//       mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
//     }
//   };
//
//   var map = new google.maps.Map(document.getElementById('map_canvas'),
//     mapOptions);
//
//   //Associate the styled map with the MapTypeId and set it to display.
//   map.mapTypes.set('map_style', styledMap);
//   map.setMapTypeId('map_style');
//
//   Map.call(document.getElementById('map_canvas'));
//
// }

this.init = function(){

  // this.createCatInput();

  // google.maps.event.addDomListener(window, 'load', this.search());

  results_where_input.addEventListener("focus",function(ev){
    ev.target.value = "";
  });

  window.addEventListener("keydown",function(ev){
    if(ev.keyCode === 13){
      results.getLocation(results_where_input.value);
    }
  });

}

this.init();
