(function() {
  'use strict';

  angular
    .module('bookapp')
    .factory('bookService', bookService);

  /** @ngInject */
  function bookService($http) {
    var apiHost = 'http://localhost:3200';

    var service = {
      apiHost: apiHost,
      getBooks: getBooks
    };

    return service;

    function getBooks(token) {
      return $http.get(apiHost + '/secure-api/getbooks', getHeaders(token));
    };

    function getHeaders(token) {
      var config = {
        headers: {
          token: token
        }
      };
      return config
    };

  }

})();
