angular.module('city')
  .controller('PropertyCtrl', PropertyController);

// With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
function PropertyController($scope, $stateParams, $http, $timeout) {
  var vm = this;
  console.log('stateParams.property', $stateParams.property)
  vm.property = $stateParams.property;
 var location = '&$where=within_circle(location,' + vm.property.latitude + ',' + vm.property.longitude + ',1)';
  $timeout(function() {
    $http.get('https://data.cityofchicago.org/resource/aksk-kvfp.json?' + location)
      .success(function(data, statusCode, error){
          console.log(location);
          console.log(data);
        if (data && data.length == 1) {
            console.log('FOUND A MATCH');
            vm.property.pin_number = data[0].digit_pin;
            vm.property.type = data[0].type;
            vm.property.sq_ft = data[0].sq_ft;
            vm.property.owner = "Chicago City";
            vm.property.zone = data[0].zoning_classification;
            vm.tif_district = data[0].tif_name_area;
        }
      })
      .error(function(data, statusCode, error) {
        //console.error(statusCode, error);
      });
  }, 1000);



  // Build the street view request
  var point = new google.maps.LatLng(vm.property.latitude, vm.property.longitude);
  var streetViewService = new google.maps.StreetViewService();
  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: point,
        pov: {
          heading: 34,
          pitch: 10
        }
      });

    // We get the map's default panorama and set up some defaults.
    // Note that we don't yet set it visible.
  streetViewService.getPanoramaByLocation(point, 10, function (streetViewPanoramaData, status) {
    if(status === google.maps.StreetViewStatus.OK){

      var oldPoint = point;
      point = streetViewPanoramaData.location.latLng;

        var heading = google.maps.geometry.spherical.computeHeading(point,oldPoint);
        console.log(heading);
        panorama.setPosition(point);
        panorama.setPov({
           heading: heading,
            zoom: 1,
            pitch: 0
        });
        panorama.setVisible(true);

    }else{
      //$this.text("Sorry! Street View is not available.");
        // no street view available in this range, or some error occurred
    }
});

}