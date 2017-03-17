angular.module('services', [])
  .factory('categoriesService', function ($http) {
    var currentCategory = {name: 'init'};
    var setCurrentCategory = function(category) {

      currentCategory.name = category;

      console.log('CURRENTCAT FROM FACTORY', currentCategory);
    };
    var getCurrentCategory = function() {
      return currentCategory;
    };
    // return js object containing above methods
    return {
      setCurrentCategory: setCurrentCategory,
      getCurrentCategory: getCurrentCategory
    };
  })
