var app = angular.module('app', [
  'ngRoute',
  'categories',
  'menulist',
  'chosenitems',
  'placeorder',
  'totalmodule',
  'kitchenmodule',
  'admin',
  'authentication'
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
    .when('/login', {
      templateUrl: 'app/views/login.html',
      controller: 'authController'
    })

    $locationProvider.html5Mode(true);
  })
  .run(function($location, authenticationService){
    if($location.$$path === '/admin') {
      if(!authenticationService.getLoginStatus().status || !authenticationService.getLoginStatus().status !== 'admin') {
        $location.path('/');
      }
    } else if ($location.$$path === '/kitchen' && !authenticationService.getLoginStatus().status) {
      $location.path('/');
    }
  })
