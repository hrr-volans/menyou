angular.module('categories', ['services'])
  .controller('categoriesController', function($http, $scope, categoriesService){
    $http({
      method: 'GET',
      url: '/categories'
      }).then(function successCallback(response) {
        $scope.data = response.data.map(function(category){
          return category.name[0].toUpperCase() + category.name.slice(1);
        });
        //$scope.data = [1, 2, 3, 4];
        console.log('category response', $scope.data)
        //first arg exists
        categoriesService.setAllCategoryData(response.data);
      }, function errorCallback(response) {
        console.log('Error getting data', response);
    });

    $scope.setCurrentCategory = function(category){
      categoriesService.setCurrentCategory(category);

      //This takes care of the checkmark for any new menu items appended to screen after category change
      setTimeout(function(){
        $('.menuitem-select').click(function(){
          var $svg = $(this)[0].childNodes[1];
          $($svg).css('display', 'block');
          setTimeout(function(){
            $($svg).fadeOut()
          }, 1500);
        });
      }, 500);
      
    }

    $scope.$on('LastRepeaterElement', function(){
      categoriesService.newGetCurrentData().then(function(response) {
        var categoryIndex = $scope.data.indexOf(response.data.categoryName.name);        
        $('.category-slider').slick({
          arrows: true,
          dots: true,
          initialSlide: categoryIndex
        });
      })
    });
  })
  .directive('emitLastRepeaterElement', function(){
    return function(scope) {
      if (scope.$last){
        scope.$emit('LastRepeaterElement');
      }
    };
  })
