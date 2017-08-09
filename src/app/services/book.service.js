(function() {
  'use strict';

  angular
    .module('bookapp')
    .factory('bookService', bookService);

  /** @ngInject */
  function bookService($http, Upload) {
    var apiHost = 'http://localhost:3200';

    var service = {
      apiHost: apiHost,
      getBook : getBook,
      getBooks: getBooks,
      uploadFile: uploadFile,
      postBook: postBook,
      deleteBook: deleteBook,
      updateBook: updateBook
    };

    return service;

    function getBooks() {
      return $http.get(apiHost + '/secure-api/getbooks');
    };

    function getBook(id) {
      return $http.get(apiHost + '/secure-api/getbook/' + id);
    }


    function uploadFile(file) {
     return Upload.upload({
        url: apiHost +'/api/upload', //webAPI exposed to upload the file
        data:{file:file} //pass file as data, should be user ng-model
      })
    };

    function postBook(book) {
      return $http.post(apiHost + '/secure-api/postbook', book)
    }

    function deleteBook(bookid) {
      return $http.delete(apiHost + '/secure-api/deletebook/' + bookid)
    }

    function updateBook(book) {
      return $http.put(apiHost + '/secure-api/updatebook/' + book._id, book)
    }

  }

})();
