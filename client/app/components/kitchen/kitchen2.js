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
      //timeout allows card to fadeout before getOrder refresh
      setTimeout(getOrders, 1000);
    }

    $scope.reAddOrder = function(order) {
      $http.post('/incomplete', order).then(function(response){
      }, function(err){
        console.log('POST error: ', err);
      });
      //timeout allows card to fadeout before getOrder refresh
      setTimeout(getOrders, 1000);
    }

    $scope.filterbool = {status: false, prefix: 'Incomplete'};

    $scope.toggleorderstatus = function() {
      getOrders();
      console.log('hit togle')
      $scope.filterbool.status = !$scope.filterbool.status;
      if($scope.filterbool.status === true) {
        $scope.filterbool.prefix = "Complete";
      } else {
        $scope.filterbool.prefix = "Incomplete";
      }
      initFadeOutCards();
    }

    function getOrders() {
      refresh = true;
      $http({
        method: 'GET',
        url: '/deeporders'
      }).then(function successCallback(response) {
        if(!$scope.orders || response.data.length > $scope.orders.length) {
          $scope.orders = response.data;
        }
        initFadeOutCards();
      }, function errorCallback(response) {
        console.log('Error getting orders', response);
      });
    }

    function initFadeOutCards(){
      setTimeout(function(){
        $('.mark-complete-block button').on('click', function(){
          var $parent = $(this).parent();
          var $grandparent = $($parent).parent();
          $($grandparent).fadeOut();
        })
      }, 700);
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
