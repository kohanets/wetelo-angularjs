(function() {
  'use strict';

  angular
    .module('bookapp')
    .controller('BookListController', BookListController)
    .directive('paginator',function () {
      return {
        scope: {
          totalPages: "=",
          changePage: '='
        },
        templateUrl: 'app/components/mainpage/booklist/paginator.html',
        link: function (scope, element, attributes) {

          scope.pages = [];


          function updatePaginator() { // update to rating value
            scope.pages = [];
            for (var i = 1; i <= scope.totalPages; i++) {
              scope.pages.push({
                value: i
              });
            }
          };

          scope.$watch('totalPages', function(oldValue, newValue) {
            updatePaginator();
          })

        }}
    });


  /** @ngInject */
  function BookListController(bookService, $window, $scope) {
    var vm = this;

    vm.books = [];

    vm.search = '';

    vm.openedBook = null;

    vm.totalPages = '1';

    vm.pagOpt = {
      curentPage: 1,
      booksOnPage: 5,
      filterBy: '',
      orderBy: 'null',
      reverse : false
    };


    $scope.$watch('vm.pagOpt', function(newVal, oldVal){
      vm.getPaginationBooks(vm.pagOpt.curentPage,vm.pagOpt.booksOnPage,vm.pagOpt.filterBy,vm.pagOpt.orderBy,vm.pagOpt.reverse);
    }, true);

    vm.getPaginationBooks = function (curentPage,booksOnPage,filterBy,orderBy,reverse) {
      if (filterBy === ''){
        filterBy = null;
      }
      bookService.getPaginationBooks(curentPage,booksOnPage,filterBy,orderBy,reverse)
        .then(function (result) {
          vm.books = result.data.data;
          vm.totalPages = result.data.pagesCount;
        })
    }

    function activate() {

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
      vm.pagOpt.orderBy = keyname;
      vm.pagOpt.reverse = !vm.pagOpt.reverse;
    }

    vm.changePage = function (page) {
      vm.pagOpt.curentPage = page;
    }

    activate();
  }
})();
