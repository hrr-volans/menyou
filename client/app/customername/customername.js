angular.module('customername', ['services'])
  .controller('customernameController', function($scope, menuitemsService){

    $scope.custname = '';

  })

  .directive('customername', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/customername/customername.html',
      scope: {
        custname: '='
      }
    }

  });