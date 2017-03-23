angular.module('confirmation', ['services'])
  .controller('confirmationController', function($http, $scope, menuitemsService){
    getOrders();
    $scope.data = menuitemsService.getChosenList();
    $scope.lastOrder;
    $scope.sendEmail = function(data) {
      console.log(typeof data)
      // var from_email = new helper.Email('test@example.com');
      // var to_email = new helper.Email('test@example.com');
      // var subject = 'Hello World from the SendGrid Node.js Library!';
      // var content = new helper.Content('text/plain', 'Hello, Email!');
      // var mail = new helper.Mail(from_email, subject, to_email, content);
      // var request = sg.emptyRequest({
      //   method: 'POST',
      //   path: '/v3/mail/send',
      //   body: mail.toJSON(),
      // });
      // sg.API(request, function(error, response) {
      //   console.log(response.statusCode);
      //   console.log(response.body);
      //   console.log(response.headers);
      };
    //iterate through orders 
    function getOrders() {
      $http({
        method: 'GET',
        url: '/deeporders'
      }).then(function successCallback(response) {
        console.log('DEEP ORDERS', response)
        $scope.orders = response.items;
        $scope.neworder = response.data;
        $scope.neworder = $scope.neworder[$scope.neworder.length-1];
        console.log($scope.neworder)
      }, function errorCallback(response) {
        console.log('Error getting orders', response);
      });
    }
  } )

  .directive('confirmationdirective', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/confirmation/confirmation.html',
      scope:{
        id: '@',
        allorders: '=',
        completeorder: '&',
        deleteorder: '&',
        bool: '=',
        toggle: '&',
        click: '&'
      }
    }
  });

