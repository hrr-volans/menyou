
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
      templateUrl: 'app/views/main.html'
    })
    .when('/kitchen', {
      templateUrl: 'app/views/kitchen.html',
      controller: 'kitchenController'
    })
    .when('/admin', {
      templateUrl: 'app/views/admin.html',
      controller: 'adminController'
    })
    .when('/confirmation', {
      templateUrl:"app/confirmation/confirmation.html",
      controller: 'confirmationController'
    })
<<<<<<< HEAD
    .when('/login', {
      templateUrl: 'app/views/login.html',
      controller: 'authController'
    })
    .when('/email', {
      templateUrl:"app/confirmation/confirmation.html",
      controller: 'confirmationController'
=======
    .when('/myorders', {
      templateUrl:"app/views/myorders.html",
      controller: 'myOrdersController'
>>>>>>> myorders cache, new styles
    });


    $locationProvider.html5Mode(true);
  })
  .run(function($location, authenticationService){

    authenticationService.getLoginStatus(authVerify);
    function authVerify(isLoggedIn) {
      console.log('running authVerify app.js')
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
