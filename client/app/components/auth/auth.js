angular.module('authentication', ['services'])
  .controller('authController', function($http, $window, $scope, $location, authenticationService){

    $scope.formData = {};

    $scope.isLoggedIn = authenticationService.getLoginStatus();
    console.log($scope.isLoggedIn)

    $scope.authLogin = function() {
      $http.post('/authenticate', $scope.formData).then(function(response){
        $window.localStorage.token = response.data.token;
        $window.localStorage.type = response.data.user.type;
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
      $window.localStorage.removeItem('token');
      $window.localStorage.removeItem('type');
      $location.path('/');
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
          click: '&'
        }
      }
    })
