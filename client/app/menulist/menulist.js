angular.module('menulist', ['services'])
  .controller('menulistController', function($scope, categoriesService){
    $scope.category = categoriesService.getCurrentCategory();
    console.log($scope.category);
    $scope.data = categoriesService.getCurrentMenuItems();
  })
  .directive('menu', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/menulist/menulist.html',
      scope:{
        name: '@name',
        data: '='
      }
    }
  });
