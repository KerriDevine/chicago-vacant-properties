////community_area=west%20pullman
//https://data.cityofchicago.org/resource/aksk-kvfp.json?community_area=west%20pullman

angular.module('city')
  .controller('ListCtrl', ListController);

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


function ListController($scope, $ionicHistory, $state, $stateParams) {

  $scope.vacantProperties = $stateParams.properties;

  $scope.showMapView = function() {
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
        disableBack: true,
        historyRoot: true
    });
    $state.go('app.map')
  }


}