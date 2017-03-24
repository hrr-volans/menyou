angular.module('authentication', ['services'])
  .controller('authController', function($http, $window, $scope, $location, authenticationService){

    $scope.formData = {};

    $scope.isLoggedIn = authenticationService.getLoginStatus();
    console.log('Logged in from auth?', $scope.isLoggedIn)

    $scope.authLogin = function() {
      $http.post('/authenticate', $scope.formData).then(function(response){
        $window.localStorage.token = response.data.token;
        authenticationService.logIn(response.data.user.type);
        if(response.data.user.type === 'admin') {
          $location.path('/admin');
        } else {
          $location.path('/kitchen');
        }
      }, function(err){
        console.log('Auth error: ', err);
        $scope.error = err.data;
      });
    }

    $scope.authLogout = function() {
      authenticationService.logOut();
    }

  })

  .directive('login', function(){
      return {
        restrict: 'E',
        templateUrl: 'app/components/auth/login.html',
        scope:{
          form: '=',
          submit: '&'
        }
      }
    })
  .directive('logout', function(){
      return {
        restrict: 'E',
        templateUrl: 'app/components/auth/logout.html',
        scope:{
          click: '&',
          loginstatus: '='
        }
      }
    })
