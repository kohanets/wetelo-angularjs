(function() {
  'use strict';

  angular
    .module('bookapp')
    .config(routerConfig);

  // function routeConfig($routeProvider, $locationProvider) {
  //
  //   $locationProvider.html5Mode(true);
  //
  //   $routeProvider
  //     .when('/', {
  //       templateUrl: 'app/components/auth/auth.html',
  //       controller: 'AuthController',
  //       controllerAs: 'auth'
  //     })
  //     .when('/index', {
  //       templateUrl: 'app/components/mainpage/mainpage.html',
  //       controller: 'MainpageController',
  //       controllerAs: 'main'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  // }

  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('auth', {
        url: '/',
        templateUrl: 'app/components/auth/auth.html',
        controller: 'AuthController',
        controllerAs: 'auth'
      })
      .state('main',{
        url: '/index',
        templateUrl: 'app/components/mainpage/mainpage.html',
        controller: 'MainpageController',
        controllerAs: 'main'
      })
      .state('booklist',{
        url: '/booklist',
        parent: 'main',
        templateUrl: 'app/components/mainpage/booklist/bookList.html',
        controller: 'BookListController',
        controllerAs: 'vm'
      })

    $urlRouterProvider.otherwise('/');
  }

})();
