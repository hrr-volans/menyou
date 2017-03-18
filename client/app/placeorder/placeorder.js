angular.module('placeorder', ['services'])
  .controller('placeorderController', function($scope, menuitemsService){

    // var orderList =
    $scope.data = menuitemsService.getChosenList();

    console.log($scope.data);



    // $scope.placeOrder = function(){
    //   console.log('button clicked');
    // $http.post('/orders', $scope.data)
    //   .then()
    // });




  }) // directives are essentially react components
  // they are custom HTML
  .directive('placeorder', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/placeorder/placeorder.html',
      scope:{
        click: '&'
      }
    }
  });