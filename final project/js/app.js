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
    lat = 0,
    goButton = document.getElementById('gobutton'),
    mapCanvas = document.getElementById('map_canvas'),
    leftNav = document.getElementById('left_nav'),
    resultsList = document.getElementById('results_list_container'),
    resultsCount = 0;

this.initialSearch = function () {


  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById("where_input").value;

    // Google geocoder, to determine lat and lng values of where input
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          console.log(latitude);
          console.log(longitude);

          // assign lat and lng to location variable and hold input type in variable
          var location = new google.maps.LatLng(latitude,longitude);
          var type = document.getElementById("category_input").value;

          // make map and left nav visible
          mapCanvas.style.zIndex = '100';
          leftNav.style.zIndex = '50';

          // create map
          var map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: location,
            zoom: 15
          });

          // generate nearbySearch service request with location and type variables
          var request = {
            location: location,
            radius: 800,
            types: [type],
            openNow: 1,
          };
          infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
          console.log(request);

        // create markers and left hand list
        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
              createList(results[i]);
            }
          }
        };

        // createList of results function
        function createList(place) {

          var cards = document.createElement('div');
          cards.setAttribute("id","card");

          var request = {
            reference: place.reference
          };

          service.getDetails(request, function(details, status) {
            cards.innerHTML = '<div class="meta"><h5>' + details.name + '</h5><h6>' + details.formatted_address + '</h6><h6>' + details.formatted_phone_number + '</h6>';
          });

          resultsList.appendChild(cards);
          resultsCount++;
          console.log(resultsCount);

        };

        // createMarkers of results function
        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location
          });

          var request = {
            reference: place.reference,
          };
          service.getDetails(request, function(details, status) {
            google.maps.event.addListener(marker, 'click', function() {
              console.log(details,status);
            infowindow.setContent(details.name + "<br />" + details.formatted_address +"<br />" + details.website + "<br />" + details.rating + "<br />" + details.formatted_phone_number + "<br />" + details.opening_hours.weekday_text);
            infowindow.open(map, this);
            });
          });
        };

      };

          // alert("Latitude: " + latitude + "\nLongitude: " + longitude);
    });
      // else
      // {
      //     alert("Request failed.");
      // }
};


this.getLocation = function () {

  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById("results_where_input").value;

    // Google geocoder, to determine lat and lng values of where input
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          console.log(latitude);
          console.log(longitude);

          // assign lat and lng to location variable and hold input type in variable
          var location = new google.maps.LatLng(latitude,longitude);
          var type = document.getElementById("results_category_input").value;

          // create a map
          var map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: location,
            zoom: 15
          });

          // generate nearbySearch service request with location and type variables
          var request = {
            location: location,
            radius: 800,
            types: [type],
            openNow: 1,
          };
          infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
          console.log(type);

        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
              // createList(results[i]);
          }
        }
      };

      function createList(place) {

        var cards = document.createElement('div');
        cards.setAttribute("id","card");

        var request = {
          reference: place.reference
        };

        service.getDetails(request, function(details, status) {
          cards.innerHTML = '<div class="meta"><h5>' + details.name + '</h5><h6>' + details.formatted_address + '</h6><h6>' + details.formatted_phone_number + '</h6>';
        });

        resultsList.appendChild(cards);
        console.log(resultsList);

      };


        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location
          });

          var request = {
            reference: place.reference,
          };
            service.getDetails(request, function(details, status) {

              google.maps.event.addListener(marker, 'click', function() {
              // console.log(details.opening_hours.weekday_text);
                console.log(details, status);

                infowindow.setContent(details.name + "<br />" + details.formatted_address +"<br />" + details.website + "<br />" + details.rating + "<br />" + details.formatted_phone_number + "<br />" + details.opening_hours.weekday_text);

                infowindow.open(map, this);
              });


          });


        };
          // alert("Latitude: " + latitude + "\nLongitude: " + longitude);
      }
      // else
      // {
      //     alert("Request failed.");
      // }
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

  where_input.addEventListener("focus",function(ev){
    ev.target.value = "";
  });

  window.addEventListener("keydown",function(ev){
    if(ev.keyCode === 13){
      results.initialSearch(where_input.value);
    }
  });

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
