angular.module('services', [])
  .factory('categoriesService', function ($http) {
    var menuItems = {Dinner: ['pizza $5.50', 'sandwich $2.30'], Breakfast: ['eggs $1.40', 'pancakes $1,000,000']};
    var currentMenuItems =  {items: []};
    var currentCategory = {name: undefined};

    var setCurrentCategory = function(category) {
      currentCategory.name = category;
      currentMenuItems.items = menuItems[category];
    };
    var getCurrentCategory = function() {
      return currentCategory;
    };
    var getMenuItemsInCurrentCategory = function() {
      return currentMenuItems;
    };
    
    return {
      setCurrentCategory: setCurrentCategory,
      getCurrentCategory: getCurrentCategory,
      getMenuItemsInCurrentCategory: getMenuItemsInCurrentCategory
    };
  })
  .factory('menuitemsService', function ($http) {
    var addedItems = {items: []};
    var data = {Dinner: ['pizza', 'sandwich'], Breakfast: ['eggs', 'pancakes']};

    var getAllMenuItems = function() {
      return data;
    };
    var addMenuItemToChosenList = function(item){
      addedItems.items.push(item);
    }
    var getChosenList = function(){
      return addedItems;
    }
    var removeMenuItemFromChosenList = function(index){
      addedItems.items.splice(index, 1);
    }

    return {
      getAllMenuItems: getAllMenuItems,
      addMenuItemToChosenList: addMenuItemToChosenList,
      getChosenList: getChosenList,
      removeMenuItemFromChosenList: removeMenuItemFromChosenList
    };
  })
