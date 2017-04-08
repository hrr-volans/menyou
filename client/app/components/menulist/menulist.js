angular.module('menulist', ['services'])
  // we define $scope in controller
  .controller('menulistController', function($http, $scope, categoriesService, menuitemsService){
    var current_time = moment().format("HH");
    categoriesService.getCurrentData(current_time).then(function(result) {            
      $scope.data = categoriesService.getMenuItemsInCurrentCategory;       
      $scope.category = categoriesService.getCurrentCategory();           
      $scope.added = menuitemsService.getChosenList();
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
    categoriesService.setMenuByCategories();

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
