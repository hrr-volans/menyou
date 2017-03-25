angular.module('myorders', [])
  .controller('myOrdersController', function($scope, $window, $http){
    var ids = $window.localStorage.menyouUser;
    $http({
      method: 'GET',
      url: '/userorders',
      params: {orders_ids: ids}
    }).then(function successCallback(response) {
      console.log(response.data);
      $scope.data = response.data;
    }, function errorCallback(response) {
      console.log('Error getting orders', response);
    });
  })
  .directive('myorders', function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/components/myorders/myorders.html',
      scope: {
        orders: '='
      }
    }
  });
