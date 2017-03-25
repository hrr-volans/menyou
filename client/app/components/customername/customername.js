angular.module('customername', ['services'])
  .controller('customernameController', function($scope, menuitemsService){

    $scope.custname = menuitemsService.getCustomerName();
    $scope.getCustomerName = function() {
      console.log('hit getCustomerName');
    }

  })

  .directive('name', function(){
    return {
      restrict: 'E',
      templateUrl: 'client/app/components/customername/customername.html',
      scope: {
        customer: '='
      }
    }

  });