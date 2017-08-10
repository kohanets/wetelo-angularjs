(function() {
  'use strict';

  angular
    .module('bookapp')
    .factory('authService', authService);

  /** @ngInject */
  function authService($http, $cookies) {
    var apiHost = 'http://localhost:3200';

    var service = {
      apiHost: apiHost,
      authenticate: authenticate,
      registration: registration,
      verify: verify,
      logout: logout,
      putToken: putToken,
      getToken: getToken,
      removeToken: removeToken
    };

    return service;

    function authenticate(authCredentials) {
      return $http.post(apiHost + '/api/authenticate', authCredentials);
    }

    function registration(authCredentials) {
      return $http.post(apiHost + '/api/createuser', authCredentials);
    }

    function logout() {
      $cookies.remove('token');
    }

    function verify(token) {
      return $http.get(apiHost + '/api/verify');
    }

    function putToken(token) {
      $cookies.put('token',token);
    }

    function getToken() {
      return $cookies.get('token')
    }

    function removeToken() {
      $cookies.remove('token');
    }
  }
})();
