
var app = angular.module('app', [
  'ngRoute',
  'categories',
  'customername',
  'menulist',
  'chosenitems',
  'placeorder',
  'totalmodule',
  'kitchenmodule',
  'admin',
  'confirmation',
  'authentication',
  'myorders'
])

.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'client/app/views/main.html'
    })
    .when('/kitchen', {
      templateUrl: 'client/app/views/kitchen.html',
      controller: 'kitchenController'
    })
    .when('/admin', {
      templateUrl: 'client/app/views/admin.html',
      controller: 'adminController'
    })
    .when('/confirmation', {
      templateUrl:"client/app/confirmation/confirmation.html",
      controller: 'confirmationController'
    })
    .when('/login', {
      templateUrl: 'client/app/views/login.html',
      controller: 'authController'
    })
    .when('/email', {
      templateUrl:"client/app/confirmation/confirmation.html",
      controller: 'confirmationController'
    })
    .when('/myorders', {
      templateUrl:"client/app/views/myorders.html",
      controller: 'myOrdersController'
    });


    $locationProvider.html5Mode(true);
  })
  .run(function($location, authenticationService){

    authenticationService.getLoginStatus(authVerify);
    function authVerify(isLoggedIn) {      
      if($location.$$path === '/admin') {
        if(isLoggedIn.status === false || isLoggedIn.type !== 'admin') {
          // debugger;
          console.log('about to redirect')
          $location.path('/');
        }
      } else if ($location.$$path === '/kitchen' && !isLoggedIn.status) {
        console.log('about to redirect')
        $location.path('/');
      }
    }
  })
