angular.module('placeorder', ['services'])
  .controller('placeorderController', function($scope, menuitemsService){    
    $scope.data = menuitemsService.getChosenList();

    $scope.placeOrder = function(){
      menuitemsService.sendOrder();
    };

  }) 
  .directive('placeorder', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/components/placeorder/placeorder.html',
      scope:{
        click: '&'
      }
    }
  });
