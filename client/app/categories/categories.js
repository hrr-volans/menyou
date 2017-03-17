angular.module('categories', ['services'])
  .controller('categoriesController', function($scope, categoriesService){
    $scope.data = categoriesService.getAllCategoryNames();
    // $scope.data = ['Dinner', 'Breakfast'];
    $scope.setCurrentCategory = function(category){
      categoriesService.setCurrentCategory(category);
      $scope.testCat = category;
    }
  })
  .directive('category', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/categories/category.html',
      scope:{
        name: '@'
      }
    }
  });
