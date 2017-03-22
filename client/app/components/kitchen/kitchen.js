angular.module('kitchenmodule', ['services'])
  .controller('kitchenController', function($http, $scope, menuitemsService){

    getOrders();

    $scope.completeOrder = function(order) {
      console.log('INDEX??', order);
      $http.post('/complete', order).then(function(response){
        console.log(response);
      }, function(err){
        console.log('POST error: ', err);
      });

      console.log('complete order hit');
      getOrders();
    }

    $scope.filterbool = {status: false, prefix: 'Incomplete'};

    $scope.toggleorderstatus = function() {
      console.log('hit togle')
      $scope.filterbool.status = !$scope.filterbool.status;
      if($scope.filterbool.status === true) {
        $scope.filterbool.prefix = "Complete";
      } else {
        $scope.filterbool.prefix = "Incomplete";
      }
    }

    function getOrders() {
      $http({
        method: 'GET',
        url: '/deeporders'
      }).then(function successCallback(response) {
        console.log('DEEP ORDERS', response)
        $scope.orders = response.data;
      }, function errorCallback(response) {
        console.log('Error getting orders', response);
      });
    }

  })


  .directive('kitchendirective', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/components/kitchen/kitchen.html',
      scope:{
        id: '@',//@ means string
        allorders: '=', //= means object (or array)
        completeorder: '&',
        deleteorder: '&', //& means function
        bool: '=',
        toggle: '&'
      }
    }
  });
