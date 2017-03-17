angular.module('placeorder', ['services'])
  .controller('placeorderController', function($scope, menuitemsService){

    $scope.data = menuitemsService.getChosenList();

    $scope.placeOrder = function(){
      console.log('button clicked');
    }

  }) // directives are essentially react components
  // they are custom HTML
  .directive('chosenitem', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/placeorder/placeorder.html',
      scope:{
        click: '&'

      }
    }
  });