(function() {
  'use strict';

  angular
    .module('bookapp')
    .controller('AddBookController', AddBookController);

  /** @ngInject */
  function AddBookController(bookService, $cookies, $state) {

    var vm = this;

    vm.book = {};

    function activate() {

    }


    vm.uploadBook = function () {
      bookService.uploadFile(vm.file)
        .then(function (result) {
          if (result.data.succsess){
            vm.book.url = result.data.data.path
            vm.postBook();
          } else {
            alert('fule uploading error');
          }
        })
    }

    vm.postBook = function () {
      vm.compareBook();
      bookService.postBook(vm.book)
        .then(function (result) {
          if(result.data.succsess){
            $state.go('booklist');
          }
        })
    }

    vm.compareBook = function () {
      vm.book.creatorid = $cookies.get('userid');
    }



    activate();

  }
})();
