angular.module('authentication', ['services'])
  .controller('authController', function($http, $window, $scope){

    $scope.formData = {};

    $scope.authLogin = function() {
      $http.post('/authenticate', $scope.formData).then(function(response){
        $window.localStorage.token = response.token;
        console.log('TOKEN??', $window.localStorage.token)
      }, function(err){
        console.log('Auth error: ', err);
        // $scope.error = {
        //   show: true,
        //   message: 'Error -- does this show?'
        // }
      });
    }

    $scope.logout = function() {
      $window.localStorage.removeItem('token');
      //set logged in to false
    }

  })

  .directive('auth', function(){
      return {
        restrict: 'E',
        templateUrl: 'app/components/auth/auth.html',
        scope:{
          form: '=',
          login: '&'
        }
      }
    })
