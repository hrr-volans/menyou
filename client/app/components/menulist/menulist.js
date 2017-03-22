angular.module('menulist', ['services'])
  // we define $scope in controller
  .controller('menulistController', function($http, $scope, categoriesService, menuitemsService){
    $http({
      method: 'GET',
      url: '/menuitems'
      }).then(function successCallback(response) {

        menuitemsService.setAllMenuItems(response.data);
        // everything we need access to in the html, we're attaching to the $scope
        categoriesService.setAllCategoryData('menucontl');
        $scope.category = categoriesService.getCurrentCategory();
        $scope.data = categoriesService.getMenuItemsInCurrentCategory();
        $scope.added = menuitemsService.getChosenList();
        categoriesService.setInitialCategories();
      }, function errorCallback(response) {
        console.log('Error getting data', response);
    });

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
