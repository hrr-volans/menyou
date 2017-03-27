angular.module('confirmation', ['services'])
  .controller('confirmationController', function($http, $scope, $timeout, menuitemsService) {
    getOrders();
    $scope.data = menuitemsService.getChosenList();
    $scope.lastOrder;
    $scope.sendEmail = function(data, name) {
      var data = data;
      var name = name;
      $scope.data = {};
      $http.post('/valid',JSON.stringify({email : data})).then(function(response){
        if(response.data) {
          JSAlert.alert("You're savings are on the way! Check your email " + data + " for details.").dismissIn(700 * 10);
          $http.post('/email', JSON.stringify({email : data, name : name, orderid:$scope.orderid}))
            .then(function(response){
          });
        } else {
          JSAlert.confirm("That email address is invalid. Please enter reenter you email address and submit again.").dismissIn(1000*10);
        }
      });
    };
    function getOrders() {
      // setTimeout(function(){window.location = "http://localhost:5000/";}, 30000);
      $http({
        method: 'GET',
        url: '/getmax'
      }).then(function successCallback(response) {
        console.log('DEEP ORDERS', response);
        var data = response.data;
        $scope.orderid = data[0];
        $scope.customer = data[1];
        $scope.totalprice = data[2];
        $scope.neworder = data[3];
      }, function errorCallback(response) {
        console.log('Error getting orders', response);
      });
    }
  })

  .directive('confirmationdirective', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/components/confirmation/confirmation.html',
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
