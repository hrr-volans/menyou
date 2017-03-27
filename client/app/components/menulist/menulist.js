angular.module('menulist', ['services'])
  // we define $scope in controller
  .controller('menulistController', function($http, $scope, categoriesService, menuitemsService){
    var current_time = moment().format("HH");
    categoriesService.newGetCurrentData(current_time).then(function(result) {
      categoriesService.currentMenuItems = result.data.menuItems;             
      categoriesService.setCurrentCategory(result.data.categoryName);             
      console.log('new res', result)
      $scope.data = categoriesService.getMenuItemsInCurrentCategory; 
      console.log('scope data: ', $scope.data);
      $scope.category = result.getCurrentCategory;     
    })
    categoriesService.newSetMenuByCategories();

    $http({
      method: 'GET',
      url: '/menuitems'
      }).then(function successCallback(response) {
        menuitemsService.setAllMenuItems(response.data);        
        // everything we need access to in the html, we're attaching to the $scope
      }, function errorCallback(response) {
        console.log('Error getting data', response);
    })
    .then(function(){            
      $scope.added = menuitemsService.getChosenList();
      categoriesService.setInitialCategories();
      setTimeout(function(){
        $('.menuitem-select').click(function(){
          var $svg = $(this)[0].childNodes[1];
          $($svg).css('display', 'block');
          setTimeout(function(){
            $($svg).fadeOut()
          }, 1500);
        });
      }, 500);
    })

    $scope.addMenuItemToChosenList = function(item){
      menuitemsService.addMenuItemToChosenList(item);
    }
    $scope.removeMenuItemFromChosenList = function(index){
      menuitemsService.removeMenuItemFromChosenList(index);
    }
  })
  // specifies your template. tells the template which properties it should accept. sets the paramters for the html template
  .directive('menu', function(){
    return {
      // allows us to create unique html tags
      restrict: 'E',
      // reference to where our html lives
      templateUrl: 'app/components/menulist/menulist.html',
      // these symbols below tell the scope which type of javascript objects these are. @ is string, click is function, etc.
      scope:{
        name: '@',
        added: '=',
        data: '=',
        click: '&',
        addedclick: '&'
      }
    }
  });
