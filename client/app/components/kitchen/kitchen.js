var refresh = false; //seting via closure to avoid duplicate setInterval calls

angular.module('kitchenmodule', ['services'])
  .controller('kitchenController', function($http, $scope, menuitemsService){
    var lastItemId = 0;

    if(refresh === false) {
      setInterval(getOrders, 5000);
    }

    getOrders();

    $scope.completeOrder = function(order, allorders) {
      var completeIndex = allorders.indexOf(order);
      $http.post('/complete', order).then(function(response){
        setTimeout(function(){
          $scope.orders[completeIndex].complete = true;
          getOrders();
        }, 500);
      }, function(err){
        console.log('POST error: ', err);
      });
    }

    $scope.reAddOrder = function(order, allorders) {
      var reAddIndex = allorders.indexOf(order);
      $http.post('/incomplete', order).then(function(response){
        setTimeout(function(){
          $scope.orders[reAddIndex].complete = false;
          getOrders();
        }, 500);
      }, function(err){
        console.log('POST error: ', err);
      });
    }

    $scope.filterbool = {status: false, prefix: 'Incomplete'};

    $scope.toggleorderstatus = function() {      
      $scope.filterbool.status = !$scope.filterbool.status;
      if($scope.filterbool.status === true) {
        $scope.filterbool.prefix = "Complete";
      } else {
        $scope.filterbool.prefix = "Incomplete";
      }
      initFadeOutCards();
    }

    var firstTime = true;
    function getOrders() {      
      refresh = true;
      $http({
        method: 'GET',
        url: '/kitchenorders',
        params: {last_id: lastItemId}
      }).then(function successCallback(response) {
        if(response.status === 200 && firstTime === true) {
          lastItemId = response.data[0].id;
          $scope.orders = response.data;
          firstTime = false;
          initFadeOutCards();
        } else if (response.status === 200 && firstTime === false) {
          lastItemId = response.data[0].id;
          var lastOrders = response.data;
          lastOrders.forEach(function(newOrder) {
            $scope.orders.unshift(newOrder)
          })
        }
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
    }, 200);
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
