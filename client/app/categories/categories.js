angular.module('categories', ['services'])
  .controller('categoriesController', function($scope, categoriesService){
    $scope.data = ['Dinner', 'Breakfast'];
    $scope.setCurrentCategory = function(category){
      categoriesService.setCurrentCategory(category);
      console.log('FROM CONTROLLER', category);
    }
  })
  .directive('category', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/categories/category.html',
      scope:{
        name: '@name'
      }
    }
  });
