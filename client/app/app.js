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

    .when('/confirmation', {
      templateUrl:"app/confirmation/confirmation.html",
      controller: 'confirmationController'
    });

    .when('/auth', {
      templateUrl: 'app/views/auth.html',
      controller: 'authController'
    })


    $locationProvider.html5Mode(true);
})
