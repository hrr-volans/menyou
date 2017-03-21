var app = angular.module('app', ['ngRoute', 'categories', 'menulist', 'chosenitems', 'placeorder', 'totalmodule', 'kitchenmodule'])

.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/kitchen', {
      templateUrl: 'app/views/kitchen.html',
      controller: 'kitchenController'
    })
    .when('/admin', {
      templateUrl: 'app/views/admin.html'
    })

    $locationProvider.html5Mode(true);
})
