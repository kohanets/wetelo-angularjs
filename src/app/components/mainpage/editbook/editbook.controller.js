(function() {
  'use strict';

  angular
    .module('bookapp')
    .controller('EditBookController', EditBookController);

  /** @ngInject */
  function EditBookController(bookService, $state) {

    var vm = this;

    vm.book = {};

    function activate() {
      vm.getBook();
    }

    vm.getBook = function () {
      bookService.getBook($state.params.id)
        .then(function (result) {
          vm.book = result.data;
        }, function (responce) {
          if (responce.status == 404){
            alert('Error 404, page not found');
            $state.go('booklist');
          }
        });
    }

    vm.uploadBook = function () {
      if (angular.isDefined(vm.file)){
        bookService.uploadFile(vm.file)
        .then(function (result) {
          if (result.data.succsess){
            vm.book.url = result.data.data.path
            vm.updateBook();
          } else {
            alert('fule uploading error');
          }
        })
      } else {
        vm.updateBook();
      }
    }

    vm.updateBook = function () {
      bookService.updateBook(vm.book)
        .then(function (result) {
          console.log(result);
          if(result.data.succsess){
            $state.go('booklist');
          }
        })
    }

    activate();

  }
})();
