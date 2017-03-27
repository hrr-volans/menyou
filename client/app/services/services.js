angular.module('services', [])
  .factory('categoriesService', function ($http, menuitemsService) {

    var current_time = moment().format("HH");
    var initialCategory;
    if(current_time < 12) {
      initialCategory = 'Breakfast';
    } else if (current_time < 16) {
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


    var newGetCurrentData = function(time) {
      return $http({
        method: 'GET',
        url: '/newGetCurrentData',
        params: {current_time: time}
        }).then(function successCallback(response) {                              
          currentMenuItems.items = response.data.menuItems;             
          console.log('servcie res', response.data)                 
          return response;
        }, function errorCallback(response) {
          console.log('Error getting data', response);
      })
    }

    var newSetMenuByCategories = function() {
      $http({
        method: 'GET',
        url: '/menuByCategory',        
        }).then(function successCallback(response) {                    
          console.log('menu by cat method', response.data);
          menuItemsByCategory = response.data;
        }, function errorCallback(response) {
          console.log('Error getting data', response);
      })
    }
    //Helper functions
    var setInitialCategories = function() {
      setCurrentCategory(initialCategory);
    }

    var setAllCategoryData = function(data){
      if(data) {
        categoryData = data;
      }

      menuItems = [];
      menuitemsService.getAllMenuItems().forEach(item => menuItems.push(item));
      console.log('menu', data)
      //createMenuItemsByCategory();
    }
    var createMenuItemsByCategory = function() {
      //This section organizes the menu items by category name
      menuItemsByCategory = {};
      menuItems.forEach(function(menuObj){
        console.log('menuObj ', menuObj);
        var key = findCategoryById(menuObj.category_id)[0].name;
        var formattedKey = key[0].toUpperCase() + key.slice(1);
        menuItemsByCategory[formattedKey] = menuItemsByCategory[formattedKey] || [];
        menuItemsByCategory[formattedKey].push(menuObj);
        console.log('by category', menuItemsByCategory)
      });
      function findCategoryById(id){
        return categoryData.filter(function(category){
          return category['id'] === id;
        });
      }
    }
    var getAllCategoryNames = function(){
      return categoryData.map(function(category){
        return category.name[0].toUpperCase() + category.name.slice(1);
      });
    }
    var setCurrentCategory = function(category) {
      currentCategory.name = category;
      currentMenuItems.items = menuItemsByCategory[category];
    };
    var getCurrentCategory = function() {
      console.log('currentCategory', currentCategory)
      return currentCategory;
    };
    var getMenuItemsInCurrentCategory = function() {
      return currentMenuItems;
    };
    var getAllCategoryData= function() {    
      return categoryData;
    };

    var reactToSuccessfulPost = function(target, response) {
      var formInputs = $('.admin-forms > div > input');
      Array.prototype.forEach.call(formInputs, function(input) {
        input.value = '';
      });
      $('.add-' + target + '-container').append('<p class="success">' + target + ' ' +response.data[0].name+' successfully created!</p>')
      setTimeout(function(){
        $('.success').fadeOut(300, function() { $(this).remove(); });
      }, 1500);
    }

    return {
      setCurrentCategory: setCurrentCategory,
      getCurrentCategory: getCurrentCategory,
      getMenuItemsInCurrentCategory: currentMenuItems,
      getAllCategoryNames: getAllCategoryNames,
      setAllCategoryData: setAllCategoryData,
      setInitialCategories: setInitialCategories,
      initialCategory: initialCategory,
      reactToSuccessfulPost: reactToSuccessfulPost,
      newGetCurrentData: newGetCurrentData,
      newSetMenuByCategories: newSetMenuByCategories
    };
  })

  .factory('menuitemsService', function ($http, $window) {
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
      data = [];
      thisdata.forEach(item => data.push(item))
    }

    function sendOrder() {
      var orderObj = {
        customer: currentCustomer.name,
        totalprice: total.total,
        menuitems: addedItems.items
      }

      $http.post('/orders', JSON.stringify(orderObj)).then(function(response){
        console.log('post order response: ', response.data);
        if( $window.localStorage.menyouUser ) {
          var localStorageArray = JSON.parse($window.localStorage.menyouUser);
          localStorageArray.push(response.data.id);
          $window.localStorage.menyouUser = JSON.stringify(localStorageArray);
        } else {
          var storageArray = [response.data.id];
          $window.localStorage.menyouUser = JSON.stringify(storageArray);
        }
        addedItems.items = [];
        total.total = 0;
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
  .factory('authenticationService', function ($window, $http, $location) {
    var isLoggedIn = {status: false};

    var logIn = function(type) {
      isLoggedIn.status = true;
      isLoggedIn.type = type;
      console.log('login = ', isLoggedIn.status);
    }

    var logOut = function() {
      isLoggedIn.status = false;
      $window.localStorage.removeItem('token');
      $window.localStorage.removeItem('type');
      $location.path('/');
    }

    // if($window.localStorage.token) {
    //   $http.post('/authenticate', {token: $window.localStorage.token}).then(function(response){
    //     logIn(response.data.type);
    //   }, function(err){
    //     console.log('Auth error: ', err);
    //     logOut();
    //   });
    // }

    var getLoginStatus = function(callback) {
      if($window.localStorage.token) {
        $http.post('/authenticate', {token: $window.localStorage.token}).then(function(response){
          logIn(response.data.type);
          if(callback) {
            console.log('callbacl called services')
            callback(isLoggedIn);
          }
        }, function(err){
          console.log('Auth error: ', err);
          logOut();
          callback(isLoggedIn);
        });
      } else {
        if(callback) {
          callback(isLoggedIn);
        }
      }
      return isLoggedIn;
    }

    return {
      logIn: logIn,
      logOut: logOut,
      getLoginStatus: getLoginStatus
    };
  });
