angular.module('kitchenmodule', ['services'])
  .controller('kitchenController', function($http, $scope, menuitemsService){

    getOrders();


    $scope.completeOrder = function(index) {
      //do something to complete orders
      console.log('complete order hit');
      getOrders();
    }

    $scope.deleteOrder = function(index) {
      //do something to delete orders
      console.log('delete order hit');
      getOrders();
    }

    function getOrders() {
      $http({
        method: 'GET',
        url: '/orders'
      }).then(function successCallback(response) {
        $scope.orders = response.data;
      }, function errorCallback(response) {
        console.log('Error getting orders', response);
      });
    }

  })


  .directive('kitchendirective', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/kitchen/kitchen.html',
      scope:{
        // name: '@',
        // added: '=',
        allorders: '=',
        completeorder: '&',
        deleteorder: '&'
      }
    }
  });
