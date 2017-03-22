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
    .when('/auth', {
      templateUrl: 'app/views/auth.html',
      controller: 'authController'
    })

    $locationProvider.html5Mode(true);
})
