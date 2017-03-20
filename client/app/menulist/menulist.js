angular.module('menulist', ['services'])
  // we define $scope in controller
  .controller('menulistController', function($http, $scope, categoriesService, menuitemsService){

    $http({
      method: 'GET',
      url: '/menuitems'
      }).then(function successCallback(response) {
        console.log('response in menu cont', response.data)
        menuitemsService.setAllMenuItems(response.data);

        // everything we need access to in the html, we're attaching to the $scope

        $scope.category = categoriesService.getCurrentCategory();
        $scope.data = categoriesService.getMenuItemsInCurrentCategory();
        $scope.added = menuitemsService.getChosenList();


      }, function errorCallback(response) {
        console.log('Error getting data', response);
    });

    // everything we need access to in the html, we're attaching to the $scope

    // $scope.category = categoriesService.getCurrentCategory();
    // $scope.data = categoriesService.getMenuItemsInCurrentCategory();
    // $scope.added = menuitemsService.getChosenList();

    // adding functions to $scope that will be used in html

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
      templateUrl: 'app/menulist/menulist.html',
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
