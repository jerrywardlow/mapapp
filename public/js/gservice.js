// Create gservice factory.
angular.module('gservice'[])
    .factory('gservice', function($http){
        // Initialize variables
        // Service factory will return
        var googleMapService = {};

        // Locations array obtained from API calls
        var locations = [];

        // Selected location
        var selectedLat = 39.50;
        var selectedLong = -98.35;

        // Functions
        // Refresh Map with new data
        googleMapService.refresh = function(latitude, longitude){

            // Clear location holding array
            locations = [];

            // Set lat and long equal to refresh() call
            selectedLat = latitude;
            selectedLong = longitude;

            // AJAX call for all records in db
            $http.get('/users').success(function(response){

                // Convert results into Google Map Format
                locations = convertToMapPoints(response);

                // Initialize map
                Initialize(latitiude, longitude);
            }).error(function(){});
        };

        // Private inner functions
        // Convert JSON of users to map points
        var convertToMapPoints = function(response){

            // Clear locations holder
            var locations = [];

            // Loop through JSON entries
            for(var i=0; i < reponse.length; i++) {
                var user = response[i];

                // Popup window for each record
                var contentString =
                    '<p><b>Username</b>: ' + user.username +
                    '<br><b>Age</b>: ' + user.age +
                    '<br><b>Gender</b>: ' + user.gender +
                    '<br><b>Favorite Language</b>: ' + user.favlang +
                    '</p>';

                // Convert each JSON record into Google Maps location format
                locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    username: user.username,
                    gender: user.gender,
                    age: user.age,
                    favlang: user.favlang
                });
            }
            return locations;
        };
        // Initialize map
        var Initialize = function(latitiude, longitude) {
            var myLatLng = {lat: selectedLat, lng: selectedLong};

            if (!map){

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 3,
                    center: myLatLng
                });
            }

            // Loop through locations in array
            locations.forEach(function(n, i){
                var marker = new google.maps.Marker({
                    position: n.latlon,
                    map: map,
                    title: "Big Map",
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                });

                // Add listener for each marker created
                google.maps.event.addListener(marker, 'click', function(e){
                    // Open selected marker message when clicked
                    currentSelectedMarker = n;
                    n.message.open(map, marker);
                });
            });

            // Set initial location as red marker
            var initialLocation = new google.maps.LatLng(latitiude, longitude);
            var marker = new google.maps.Marker({
                position: initialLocation,
                animation: google.maps.Animation.BOUNCE,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            lastMarker = marker;

        };

        // Refresh page on window load
        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh(selectedLat, selectedLong));

        return googleMapService;
    });
