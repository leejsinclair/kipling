'use strict';

angular.module('kipplingApp', [ 'ngRoute', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
