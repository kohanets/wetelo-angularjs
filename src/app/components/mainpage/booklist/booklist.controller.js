(function() {
  'use strict';

  angular
    .module('bookapp')
    .controller('BookListController', BookListController)
    .filter('searchFilter', function () {
      return function (books, search) {
        var filtered = [];
        for (var i = 0; i < books.length; i++) {
          if(books[i].title.toLowerCase().includes(search.toLowerCase()) || books[i].author.toLowerCase().includes(search.toLowerCase())) {
            filtered.push(books[i]);
          }
        }
        return filtered;
      };
    });


  /** @ngInject */
  function BookListController(bookService, $cookies, $window) {
    var vm = this;

    vm.books = [];

    vm.search = '';

    vm.openedBook = null;

    function activate() {
      vm.getBooks();
    }

    vm.getBooks = function () {
      bookService.getBooks()
        .then(function (result) {
          vm.books = result.data.data;
        })
    }

    vm.deleteBook = function (bookid) {
      bookService.deleteBook(bookid)
        .then(function (result) {
          if (result.data.succsess){
            vm.deleteFromArray(bookid);
          }
        })
    }

    vm.deleteFromArray = function (bookid) {
      vm.books.splice(vm.books.indexOf(vm.books.find(function (book) {
        return book._id == bookid;
      })),1);
    }

    vm.openBook = function (bookid) {
      vm.openedBook = vm.books.find(function (book) {
        return book._id == bookid;
        });
    }

    vm.download = function (url) {
      $window.open(bookService.apiHost+'/'+url,'_blank');
    }

    vm.updateBook = function (book) {
      bookService.updateBook(book)
        .then(function (result) {
          if (!result.data.succsess){
            console.log('Error, book is not updated')
          }
        })
    }

    vm.sort = function(keyname){
      vm.sortKey = keyname;   //set the sortKey to the param passed
      vm.reverse = !vm.reverse; //if true make it false and vice versa
    }

    activate();
  }
})();
