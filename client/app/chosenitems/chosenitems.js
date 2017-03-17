angular.module('chosenItems', ['services'])
  .controller('chosenItemsController', function($scope, menuItemsService){
    $scope.data = [];

    // $scope.setCurrentCategory = function(category){
    //   categoriesService.setCurrentCategory(category);
    //   console.log('FROM CONTROLLER', category);
    // }
  })
  .directive('chosenItem', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/chosenitems/chosenitems.html',
      scope:{
        name: '@'
      }
    }
  });