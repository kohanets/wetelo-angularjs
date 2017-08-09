(function() {
  'use strict';

  angular
    .module('bookapp')
    .config(routerConfig);


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
      .state('booklist', {
        url: '/booklist',
        parent: 'main',
        templateUrl: 'app/components/mainpage/booklist/bookList.html',
        data: {
          css: ['app/components/mainpage/booklist/bookList.css']
        },
        controller: 'BookListController',
        controllerAs: 'vm'
      })
      .state('addbook',{
        url: '/addbook',
        parent: 'main',
        templateUrl: 'app/components/mainpage/addbook/addBook.html',
        data: {
          css: ['app/components/mainpage/addbook/addBook.css']
        },
        controller: 'AddBookController',
        controllerAs: 'vm'
      })
      .state('editbook',{
        url: '/editbook/:id',
        parent: 'main',
        templateUrl: 'app/components/mainpage/editbook/editBook.html',
        controller: 'EditBookController',
        controllerAs: 'vm'
      })

    $urlRouterProvider.otherwise('/');
  }

})();
