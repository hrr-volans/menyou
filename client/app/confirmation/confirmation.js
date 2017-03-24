angular.module('confirmation', ['services'])
  .controller('confirmationController', function($http, $scope, menuitemsService){
    getOrders();
    $scope.data = menuitemsService.getChosenList();
    $scope.lastOrder;
    $scope.sendEmail = function(data) {
      console.log(typeof data)
      var data = data;
      $scope.data = {};
      $http.post('/email', JSON.stringify({email : data})).then(function(response){
      });
    };
    //iterate through orders 
    function getOrders() {
      $http({
        method: 'GET',
        url: '/deeporders'
      }).then(function successCallback(response) {
       // console.log('DEEP ORDERS', response)
        $scope.orders = response.items;
        $scope.neworder = response.data;
        $scope.neworder = $scope.neworder[$scope.neworder.length-1];
       //console.log($scope.neworder)
      }, function errorCallback(response) {
        console.log('Error getting orders', response);
      });
    }
  } )

  .directive('confirmationdirective', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/confirmation/confirmation.html',
      scope:{
        id: '@',
        allorders: '=',
        completeorder: '&',
        deleteorder: '&',
        bool: '=',
        toggle: '&',
        click: '&'
      }
    }
  });

