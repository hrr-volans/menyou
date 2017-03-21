angular.module('chosenitems', ['services'])
  .controller('chosenItemsController', function($scope, menuitemsService){

    $scope.data = menuitemsService.getChosenList();

    $scope.addMenuItemToChosenList = function(item){
      console.log($scope.data);
      menuitemsService.addMenuItemToChosenList(item);
    }
    $scope.removeMenuItemFromChosenList = function(index){
      menuitemsService.removeMenuItemFromChosenList(index);
    }

  }) // directives are essentially react components
  // they are custom HTML

  .directive('chosenitem', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/chosenitems/chosenitems.html',
      scope:{
        name: '@',
        added: '=',
        data: '=',
        click: '&',
        removeclick: '&'
      }
    }
  });
