angular.module('services', [])
  .factory('categoriesService', function ($http) {
    var menuItems = {Dinner: ['pizza', 'sandwich'], Breakfast: ['eggs', 'pancakes']};
    var currentMenuItems =  {items: []};
    var currentCategory = {name: undefined};
    var setCurrentCategory = function(category) {
      currentCategory.name = category;
      currentMenuItems.items = menuItems[category];
      console.log('CURRENTCAT FROM FACTORY', currentCategory);
    };
    var getCurrentCategory = function() {
      return currentCategory;
    };
    var getCurrentMenuItems = function() {
      return currentMenuItems;
    };
    return {
      setCurrentCategory: setCurrentCategory,
      getCurrentCategory: getCurrentCategory,
      getCurrentMenuItems: getCurrentMenuItems
    };
  })
  // .factory('menuitemsService', function ($http) {
  //   var data = {Dinner: ['pizza', 'sandwich'], Breakfast: ['eggs', 'pancakes']};
  //   var getMenuItems = function() {
  //     return data;
  //   };
  //   return {
  //     getMenuItems: getMenuItems
  //   };
  // })
