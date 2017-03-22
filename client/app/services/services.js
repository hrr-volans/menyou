angular.module('services', [])
  .factory('categoriesService', function ($http, menuitemsService) {
    var current_time = moment().format("HH");    
    var initialCategory;
    if(current_time < 12) {
      initialCategory = 'Breakfast';
    } else if (current_time < 19) {
      initialCategory = 'Lunch';
    } else if (current_time < 24) {
      initialCategory = 'Dinner';
    }
    //These variables hold the 'state' of current category & menu items in that category
    var categoryData = [];
    var menuItemsByCategory = {};
    var menuItems = [];
    var currentMenuItems =  {items: []};
    var currentCategory = {name: undefined};

    //Helper functions
    var setInitialCategories = function() {
      setCurrentCategory(initialCategory);
    }

    var setAllCategoryData = function(where, data){
      if(data) {
        categoryData = data;
      }
      menuitemsService.getAllMenuItems().forEach(item => menuItems.push(item));
      createMenuItemsByCategory();
    }
    var createMenuItemsByCategory = function() {
      //This section organizes the menu items by category name
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
      console.log(menuItemsByCategory);
    };
    var getCurrentCategory = function() {
      return currentCategory;
    };
    var getMenuItemsInCurrentCategory = function() {
      return currentMenuItems;
    };
    var getAllCategoryData= function() {
      return categoryData;
    };

    return {
      setCurrentCategory: setCurrentCategory,
      getCurrentCategory: getCurrentCategory,
      getMenuItemsInCurrentCategory: getMenuItemsInCurrentCategory,
      getAllCategoryNames: getAllCategoryNames,
      setAllCategoryData: setAllCategoryData,
      setInitialCategories: setInitialCategories,
      initialCategory: initialCategory
    };
  })

  .factory('menuitemsService', function ($http) {
    // This is the 'state' of all items added to current order
    var addedItems = {items: []};

    var total = {total: 0};
    var currentCustomer = {name: ''};

    // data variable to hold on to all menu items
    var data = [];

    // above creates state and below are functions which act on it (like setState)

    //Helper functions
    function getCustomerName(name) {
      return currentCustomer;
    }

    function setAllMenuItems(thisdata) {
      thisdata.forEach(item => data.push(item))
    }

    function sendOrder() {
      var orderObj = {
        customer: currentCustomer.name,
        totalprice: total.total,
        menuitems: addedItems.items
      }

      console.log(orderObj);

      $http.post('/orders', JSON.stringify(orderObj)).then(function(response){
        console.log(response);
      }, function(err){
        console.log('POST error: ', err);
      });
    }

    function updateTotalPrice(){
      total.total = addedItems.items.reduce(function(acc, curr){
        acc = acc + (Number(curr.price) * curr.quantity);
        return acc;
      }, 0).toFixed(2);
      // console.log('TOTAL FROM services', total.total);
    }
    function getTotalPrice(){
      return total;
    }
    var getAllMenuItems = function() {
      return data;
    };
    var addMenuItemToChosenList = function(item){
      var ind = addedItems.items.indexOf(item);
      if(ind !== -1) {
        addedItems.items[ind].quantity += 1;
      } else {
        item.quantity = 1;
        addedItems.items.push(item);
      }
      updateTotalPrice();
    }
    // give access to chosenItemList module will eventually use to place order
    var getChosenList = function(){
      return addedItems;
    }
    var removeMenuItemFromChosenList = function(index){
      if(addedItems.items[index].quantity > 1) {
        addedItems.items[index].quantity -= 1;
      } else {
        addedItems.items.splice(index, 1);
      }
      updateTotalPrice();
    }

    return {
      sendOrder: sendOrder,
      getAllMenuItems: getAllMenuItems,
      addMenuItemToChosenList: addMenuItemToChosenList,
      getChosenList: getChosenList,
      removeMenuItemFromChosenList: removeMenuItemFromChosenList,
      getTotalPrice: getTotalPrice,
      setAllMenuItems: setAllMenuItems,   
      getCustomerName: getCustomerName
    };
  })
  .factory('authenticationService', function () {
    var isLoggedIn = {status: true}
  });
