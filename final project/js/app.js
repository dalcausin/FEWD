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
    transHeader = document.getElementById('transparent_header'),
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
          transHeader.style.zIndex = '200';
          leftNav.style.zIndex = '50';

          var mapOptions = {
            zoom: 15,
            center: location,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            scaleControl: true,
            streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            }
          }

          // create map
          var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

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
  address = "";
  type = "";
  console.log(address);
  console.log(type);
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
              console.log(results);
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


this.init = function(){

  where_input.addEventListener("focus",function(ev){
    ev.target.value = "";
  });

  // window.addEventListener("keydown",function(ev){
  //   if(mapCanvas.style.zIndex='-100'){
  //     if(ev.keyCode === 13){
  //       results.initialSearch(where_input.value);
  //     }
  //   }
  // });

  goButton.addEventListener("click",function(ev){
    results.initialSearch(where_input.value);
  })

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
