angular.module('categories', ['services'])
  .controller('categoriesController', function($scope, categoriesService){

    //Gives category directive access to all category names via 'data' attribute
    $scope.data = categoriesService.getAllCategoryNames();

    console.log('scope', $scope.data);
    //Sets current category name which updates both category and menulist data attributes
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
