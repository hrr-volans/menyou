angular.module('menulist', ['services'])
  .controller('menulistController', function($scope, categoriesService){
    $scope.data = ['Dinner', 'Breakfast'];
    $scope.category = categoriesService.getCurrentCategory();
  })
  // .directive('menulist', function(){
  //   return {
  //     restrict: 'E',
  //     templateUrl: 'app/categories/menulist.html',
  //     scope:{
  //       name: categoriesService.getCurrentCategory()
  //     }
  //   }
  // });
