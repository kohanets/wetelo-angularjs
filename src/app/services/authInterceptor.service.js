(function() {
  'use strict';

  angular
    .module('bookapp')
    .factory('authInterceptor', authInterceptor)
    .config([ '$httpProvider',   function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    }]);

  function authInterceptor($cookies) {
    return {
      request : function (config) {
        config.headers.token = $cookies.get('token');
        return config;
      }
    }
  }

})();
