angular.module('categories', ['services'])
  .controller('categoriesController', function($http, $scope, categoriesService){
    var current_time = moment().format("HH");
    var initialCategory;
    if(current_time < 12) {
      initialCategory = 'Breakfast';
    } else if (current_time < 16) {
      initialCategory = 'Lunch';
    } else if (current_time < 24) {
      initialCategory = 'Dinner';
    } else {
      initialCategory = 'Lunch';
    }
    $http({
      method: 'GET',
      url: '/categories'
      }).then(function successCallback(response) {
        $scope.data = response.data.map(function(category){
          return category.name[0].toUpperCase() + category.name.slice(1);
        });                        
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
      var categoryIndex = $scope.data.indexOf(initialCategory);        
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
