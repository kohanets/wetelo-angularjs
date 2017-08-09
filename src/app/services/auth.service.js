(function() {
  'use strict';

  angular
    .module('bookapp')
    .factory('authService', authService);

  /** @ngInject */
  function authService($http) {
    var apiHost = 'http://localhost:3200';

    var service = {
      apiHost: apiHost,
      authenticate: authenticate,
      registration: registration,
      verify: verify
    };

    return service;

    function authenticate(authCredentials) {
      return $http.post(apiHost + '/api/authenticate', authCredentials);
    }

    function registration(authCredentials) {
      return $http.post(apiHost + '/api/createuser', authCredentials);
    }

    function verify(token) {
      return $http.get(apiHost + '/api/verify');
    }
  }
})();
