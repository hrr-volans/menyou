angular.module('customername', ['services'])
  .controller('customernameController', function($scope, menuitemsService){

    // $scope.custname = '';

    // menuitemsService.setCurrentCustomer($scope.custname);

    $scope.setCurrentCustomer = function(val){
      menuitemsService.setCurrentCustomer(val);
    };

  })

  .directive('customername', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/customername/customername.html',
      scope: {
        click: '&'
      }
    }

  });