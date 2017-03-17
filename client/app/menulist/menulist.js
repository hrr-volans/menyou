angular.module('menulist', ['services'])
  .controller('menulistController', function($scope, categoriesService, menuitemsService){
    $scope.category = categoriesService.getCurrentCategory();
    $scope.data = categoriesService.getMenuItemsInCurrentCategory();
    $scope.added = menuitemsService.getChosenList();
    $scope.addMenuItemToChosenList = function(item){
      menuitemsService.addMenuItemToChosenList(item);
    }
    $scope.removeMenuItemFromChosenList = function(index){
      menuitemsService.removeMenuItemFromChosenList(index);
    }
  })
  .directive('menu', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/menulist/menulist.html',
      scope:{
        name: '@',
        added: '=',
        data: '=',
        click: '&',
        addedclick: '&'
      }
    }
  });
