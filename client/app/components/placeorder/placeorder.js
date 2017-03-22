angular.module('placeorder', ['services'])
  .controller('placeorderController', function($scope, menuitemsService){

    // var orderList =
    $scope.data = menuitemsService.getChosenList();

    $scope.placeOrder = function(){
      menuitemsService.sendOrder();
    };

  }) // directives are essentially react components
  // they are custom HTML
  .directive('placeorder', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/components/placeorder/placeorder.html',
      scope:{
        click: '&'
      }
    }
  });
