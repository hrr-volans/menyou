angular.module('categories', ['services'])
  .controller('categoriesController', function($http, $scope, categoriesService){

    $http({
      method: 'GET',
      url: '/categories'
      }).then(function successCallback(response) {
        console.log('data: ', response.data);
        $scope.data = response.data.map(function(category){
          return category.name[0].toUpperCase() + category.name.slice(1);
        });
        categoriesService.setAllCategoryData('catCont', response.data);

      }, function errorCallback(response) {
        console.log('Error getting data', response);
    });

    //Sets current category name which updates both category and menulist data attributes
    $scope.setCurrentCategory = function(category){
      categoriesService.setCurrentCategory(category);
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
