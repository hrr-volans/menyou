angular.module('admin', ['services'])
  .controller('adminController', function($http, $scope, categoriesService){

    getCategories();

    $scope.formData = {};

    $scope.addCategory = function() {
      console.log($scope.formData.categoryname)
      $http.post('/createCategory', JSON.stringify({name: $scope.formData.categoryname})).then(function(response){
        console.log(response);
        getCategories();
      }, function(err){
        console.log('POST error: ', err);
      });
    }

    $scope.addMenuItem = function() {
      $scope.formData.category_id = Number($scope.formData.category_id);
      console.log($scope.formData)
      $http.post('/createMenuItem', $scope.formData).then(function(response){
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
          // console.log('category data', response)
          $scope.allcategories = response.data.map(function(category){
            return {name: category.name[0].toUpperCase() + category.name.slice(1), id: category.id};
          });
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
        categories: '=',
        form: '=',
        add: '&'
      }
    }
  })
  .directive('categoryform', function(){
      return {
        restrict: 'E',
        templateUrl: 'app/admin/addCategoryForm.html',
        scope:{
          form: '=',
          add: '&'
        }
      }
    })
