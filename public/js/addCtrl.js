// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.
var addCtrl = angular.module('addCtrl', ['ngCookies', 'geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, $cookies, geolocation, gservice){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to the center of the US
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;

    var sessionID = $cookies.get('connect.sid');

    var wsUri = "ws://localhost:3001/";
    var websocket = new WebSocket(wsUri);
    websocket.onmessage = function(event){
        var msg = JSON.parse(event.data);
        console.log("from websocket: " + msg);
        gservice.placePins(msg);
    };

    $http.get('/me')
        .success(function (data) {
            console.log(data);
            $scope.formData.email = data.email;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "Nope (Thanks for spamming my map...)";
        });
    });

    // Functions
    // ----------------------------------------------------------------------------
    // Creates a new user based on the form fields
    $scope.setLocation = function() {

        var location = {
            longitude: parseFloat($scope.formData.longitude),
            latitude: parseFloat($scope.formData.latitude)
        };

        // Grabs all of the text box fields
        var userData = {
            email: $scope.formData.email,
            location: [location.longitude, location.latitude]
        };

        // Saves the user data to the db
        //$http.post('/users', userData)
        //    .success(function (data) {
        //    })
        //    .error(function (data) {
        //        console.log('Error: ' + data);
        //    });
        console.log("sending to server: " + JSON.stringify({sessionID: sessionID, userData: userData}))
        websocket.send(JSON.stringify({sessionID: sessionID, userData: userData}));

        // Refresh the map with new data
        //gservice.refresh(location.latitude, location.longitude);
    };
});
