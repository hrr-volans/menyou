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
    var getCurrentMenuItems = function() {
      return currentMenuItems;
    };
    return {
      setCurrentCategory: setCurrentCategory,
      getCurrentCategory: getCurrentCategory,
      getCurrentMenuItems: getCurrentMenuItems
    };
  })
  .factory('menuitemsService', function ($http) {
    var addedItems = {items: [1, 2]};
    var data = {Dinner: ['pizza', 'sandwich'], Breakfast: ['eggs', 'pancakes']};
    var getMenuItems = function() {
      return data;
    };
    var addMenuItemToOrder = function(item){
      addedItems.items.push(item);
      console.log(addedItems);
    }
    var getAddedMenuItems = function(){
      console.log('tring to get added service', addedItems);
      return addedItems;
    }
    var removeMenuItemFromOrder = function(index){
      addedItems.items.splice(index, 1);
    }
    return {
      getMenuItems: getMenuItems,
      addMenuItemToOrder: addMenuItemToOrder,
      getAddedMenuItems: getAddedMenuItems,
      removeMenuItemFromOrder: removeMenuItemFromOrder
    };
  })
