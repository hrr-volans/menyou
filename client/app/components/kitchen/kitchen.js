var refresh = false; //seting via closure to avoid duplicate setInterval calls

angular.module('kitchenmodule', ['services'])
  .controller('kitchenController', function($http, $scope, menuitemsService){


    if(refresh === false) {
      setInterval(getOrders, 10000);
    }

    getOrders();

    $scope.completeOrder = function(order) {
      $http.post('/complete', order).then(function(response){
      }, function(err){
        console.log('POST error: ', err);
      });
      getOrders();
    }

    $scope.reAddOrder = function(order) {
      $http.post('/incomplete', order).then(function(response){
      }, function(err){
        console.log('POST error: ', err);
      });
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
      refresh = true;
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
        readdorder: '&',
        deleteorder: '&', //& means function
        bool: '=',
        toggle: '&'
      }
    }
  });
