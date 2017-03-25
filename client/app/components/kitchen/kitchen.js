var refresh = false; //seting via closure to avoid duplicate setInterval calls

angular.module('kitchenmodule', ['services'])
  .controller('kitchenController', function($http, $scope, menuitemsService){
    var lastItemId = 0;

    // if(refresh === false) {
    //   setInterval(getOrders, 3000);
    // }

    getOrders();

    $scope.completeOrder = function(order, allorders) {
      var completeIndex = allorders.indexOf(order);            
      $http.post('/complete', order).then(function(response){                
        $scope.orders.splice(completeIndex, 1);
      }, function(err){
        console.log('POST error: ', err);
      });
      //timeout allows card to fadeout before getOrder refresh
      //setTimeout(getOrders, 1000);
    }

    $scope.reAddOrder = function(order, allorders) {
      var reAddIndex = allorders.indexOf(order);            
      $http.post('/incomplete', order).then(function(response){
        $scope.orders.splice(reAddIndex, 1);
      }, function(err){
        console.log('POST error: ', err);
      });
      //timeout allows card to fadeout before getOrder refresh
      // setTimeout(getOrders, 1000);
      //getOrders();
    }

    $scope.filterbool = {status: false, prefix: 'Incomplete'};

    $scope.toggleorderstatus = function() {
      getOrders();
      console.log('hit togle')
      lastItemId = 0;
      getOrders();
      $scope.filterbool.status = !$scope.filterbool.status;
      if($scope.filterbool.status === true) {
        $scope.filterbool.prefix = "Complete";
      } else {
        $scope.filterbool.prefix = "Incomplete";
      }
    }
    
    // take the id of the last order received
    // send it to the server through params
    // in the server side capture the last order id
      // compare them and get the offset
        // if there is an offset, 
          // make query with that limit 
          // return the new orders
          // prepend the new ones by unshifting to $scope.orders
    var firstTime = true;
    function getOrders() {   
      //initFadeOutCards();
      console.log('last index', lastItemId)   
      refresh = true;
      $http({
        method: 'GET',
        url: '/kitchenorders',
        params: {last_id: lastItemId}
      }).then(function successCallback(response) {        
        if(response.status === 200 && firstTime === true) {                            
          lastItemId = response.data[0].id;          
          $scope.orders = response.data;
          firstTime = false;          
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
    }, 700);
  }

})

  .directive('kitchendirective', function(){
    return {
      restrict: 'E',
      templateUrl: 'client/app/components/kitchen/kitchen.html',
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
