angular.module('services', [])
  .factory('categoriesService', function ($http, menuitemsService) {

    //These variables hold the 'state' of current category & menu items in that category
    var categoryData = [];
    var menuItemsByCategory = {};
    var menuItems = [];
    var currentMenuItems =  {items: []};
    var currentCategory = {name: undefined};

    //Helper functions
    var setAllCategoryData = function(data){
      if(data) {
        categoryData = data;
      }
      menuItems = menuitemsService.getAllMenuItems();
      console.log('get menu items from setCat', menuItems)
      createMenuItemsByCategory();
      //This section organizes the menu items by category name, if they are available
    }

    var createMenuItemsByCategory = function() {
      // if(categoryData.length) {
        menuItems.forEach(function(menuObj){
          var key = findCategoryById(menuObj.category_id)[0].name;
          var formattedKey = key[0].toUpperCase() + key.slice(1);
          menuItemsByCategory[formattedKey] = menuItemsByCategory[formattedKey] || [];
          menuItemsByCategory[formattedKey].push(menuObj);
        });
        function findCategoryById(id){
          return categoryData.filter(function(category){
            return category['id'] === id;
          });
        }
      // }
    }

    var getAllCategoryNames = function(){
      console.log('function', categoryData);
      return categoryData.map(function(category){
        return category.name[0].toUpperCase() + category.name.slice(1);
      });
    }
    var setCurrentCategory = function(category) {
      currentCategory.name = category;
      currentMenuItems.items = menuItemsByCategory[category];
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
      getMenuItemsInCurrentCategory: getMenuItemsInCurrentCategory,
      getAllCategoryNames: getAllCategoryNames,
      setAllCategoryData: setAllCategoryData
    };
  })
  .factory('menuitemsService', function ($http) {
    //This is the 'state' of all items added to current order
    var addedItems = {items: []};

    var total = {total: 0};

    var data = [];

    // data variable to hold on to all menu items
    // above creates state and below are functions which act on it (like setState)
    // this gets all menu items - not defined use yet
    // var data = [
    //   {
    //     "id": 1,
    //     "name": "bigmac",
    //     "description": "the biggest burger",
    //     "price": 122,
    //     "category_id": 1
    //   },
    //   {
    //     "id": 2,
    //     "name": "nuggets",
    //     "description": "little nuggets",
    //     "price": 232,
    //     "category_id": 3
    //   },
    //   {
    //     "id": 3,
    //     "name": "fries",
    //     "description": "good fries",
    //     "price": 23,
    //     "category_id": 2
    //   }
    // ];

    //
    // $http({
    //   method: 'GET',
    //   url: '/menuitems'
    //   }).then(function successCallback(response) {
    //     data = response;
    //   }, function errorCallback(response) {
    //     console.log('Error getting data', response);
    // });

    //Helper functions
    function setAllMenuItems(thisdata) {
      thisdata.forEach(item => data.push(item))
    }

    function sendOrder() {
      var orderObj = {
        customername: 'Chuck Norris',
        totalprice: total.total,
        menuitems: addedItems.items
      }

      $http.post('/orders', JSON.stringify(orderObj)).then(function(response){
        console.log(response);
      }, function(err){
        console.log('POST error: ', err);
      });
    }

    function updateTotalPrice(){
      total.total = addedItems.items.reduce(function(acc, curr){
        acc = acc + Number(curr.price);
        return acc;
      }, 0);
      console.log('TOTAL FROM services', total.total);
    }
    function getTotalPrice(){
      return total;
    }
    var getAllMenuItems = function() {
      return data;
    };
    var addMenuItemToChosenList = function(item){
      // console.log(item);
      addedItems.items.push(item);
      updateTotalPrice();
    }
    // give access to chosenItemList module will eventually use to place order
    var getChosenList = function(){
      return addedItems;
    }
    var removeMenuItemFromChosenList = function(index){
      addedItems.items.splice(index, 1);
      updateTotalPrice();
    }

    return {
      sendOrder: sendOrder,
      getAllMenuItems: getAllMenuItems,
      addMenuItemToChosenList: addMenuItemToChosenList,
      getChosenList: getChosenList,
      removeMenuItemFromChosenList: removeMenuItemFromChosenList,
      getTotalPrice: getTotalPrice,
      setAllMenuItems: setAllMenuItems
    };
  })
