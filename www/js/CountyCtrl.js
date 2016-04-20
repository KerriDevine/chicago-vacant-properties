angular.module('city')
  .controller('CountyCtrl', CountyController);


function CountyController($scope, $stateParams,$sce) {
    var vm = this;

    vm.url = $sce.trustAsResourceUrl('http://www.cookcountypropertyinfo.com/Pages/Pin-Results.aspx?pin=' + $stateParams.pin)


}