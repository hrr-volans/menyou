angular.module('chosenitems', ['services'])
  .controller('chosenItemsController', function($scope, menuitemsService){
    $scope.data = menuitemsService.getChosenList();

    $scope.addMenuItemToChosenList = function(item){      
      menuitemsService.addMenuItemToChosenList(item);
    }
    $scope.removeMenuItemFromChosenList = function(index){
      menuitemsService.removeMenuItemFromChosenList(index);
    }
  }) 

  .directive('chosenitem', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/components/chosenitems/chosenitems.html',
      scope:{
        name: '@',
        added: '=',
        data: '=',
        click: '&',
        removeclick: '&'
      }
    }
  });
