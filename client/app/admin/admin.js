angular.module('admin', ['services'])
  .controller('adminController', function($http, $scope, categoriesService){

    getCategories();

    $scope.addCategory = function(category) {
      $http.post('/createCategory', category).then(function(response){
        console.log(response);
        getCategories();
      }, function(err){
        console.log('POST error: ', err);
      });
    }

    $scope.addMenuItem = function(item) {
      console.log('called add menu item')
      $http.post('/createMenuItem', JSON.stringify(item)).then(function(response){
        console.log(response);
      }, function(err){
        console.log('POST error: ', err);
      });
    }

    function getCategories() {
      $http({
        method: 'GET',
        url: '/categories'
        }).then(function successCallback(response) {
          $scope.allcategories = response.data.map(function(category){
            return category.name[0].toUpperCase() + category.name.slice(1);
          });
          console.log('got all categories', $scope.allcategories)

        }, function errorCallback(response) {
          console.log('Error getting data', response);
      });
    }
  })

  .directive('menuform', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/admin/addMenuItemForm.html',
      scope:{
        categories: '='
      }
    }
  })
  .directive('categoryform', function(){
      return {
        restrict: 'E',
        templateUrl: 'app/admin/addCategoryForm.html'
      }
    })
