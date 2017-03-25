angular.module('myorders', [])
  .controller('myOrdersController', function($scope, $window, $http){    
    var ids = $window.localStorage.menyouUser;
    console.log('myorders controller');
    $http({
      method: 'GET',
      url: '/userorders',
      params: {orders_ids: ids}      
    }).then(function successCallback(response) {            
      $scope.data = response.data;
    }, function errorCallback(response) {
      console.log('Error getting orders', response);
    });
  })
  .directive('myorders', function(){
    return {
      restrict: 'EA',
      templateUrl: 'client/app/myorders/myorders.html',
      scope: {
        orders: '='
      }
    }
  });
