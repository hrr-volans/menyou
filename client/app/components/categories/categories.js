angular.module('categories', ['services'])
  .controller('categoriesController', function($http, $scope, categoriesService){    
    $http({
      method: 'GET',
      url: '/categories'
      }).then(function successCallback(response) {        
        $scope.data = response.data.map(function(category){
          return category.name[0].toUpperCase() + category.name.slice(1);
        });
        categoriesService.setAllCategoryData('catCont', response.data);        
      }, function errorCallback(response) {
        console.log('Error getting data', response);
    });

    $scope.setCurrentCategory = function(category){
      categoriesService.setCurrentCategory(category);
    }

    $scope.$on('LastRepeaterElement', function(){
      var categoryIndex = $scope.data.indexOf(categoriesService.initialCategory);
      $('.category-slider').slick({
        arrows: true,
        dots: true,
        initialSlide: categoryIndex
      });
    });
  })
  .directive('emitLastRepeaterElement', function(){
    return function(scope) {
      if (scope.$last){
        scope.$emit('LastRepeaterElement');
      }
    };
  })
