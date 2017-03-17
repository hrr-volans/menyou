angular.module('menulist', ['services'])
  .controller('menulistController', function($scope, categoriesService, menuitemsService){
    $scope.category = categoriesService.getCurrentCategory();
    $scope.data = categoriesService.getCurrentMenuItems();
    $scope.added = menuitemsService.getAddedMenuItems();
    console.log('addeditems from control', $scope.addedItems);
    $scope.addMenuItemToOrder = function(item){
      menuitemsService.addMenuItemToOrder(item);
    }
    $scope.removeMenuItemFromOrder = function(index){
      menuitemsService.removeMenuItemFromOrder(index);
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
