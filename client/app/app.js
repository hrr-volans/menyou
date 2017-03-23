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
  'confirmation'
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

    $locationProvider.html5Mode(true);
})
