(function() {
  'use strict';

  angular
    .module('bookapp')
    .controller('BookListController', BookListController);

  /** @ngInject */
  function BookListController(bookService, $cookies) {
    var vm = this;

    vm.books = {};

    function activate() {
      vm.getBooks();

    }

    vm.getBooks = function () {
      bookService.getBooks($cookies.get('token'))
        .then(function (result) {
          vm.books = result.data.data;
        })
    }

    activate();
  }
})();
