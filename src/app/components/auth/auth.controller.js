(function() {
  'use strict';

  angular
    .module('bookapp')
    .controller('AuthController', AuthController);

  /** @ngInject */
  function AuthController(authService, $cookies, $state) {
    var vm = this;

    vm.errorMsg = '';

    vm.registrationBookmark = false;

    vm.authCredentials = {
      email: '',
      password: '',
      rePassword: ''
    };


    function activate() {
      vm.isAuthorised();
    }

    vm.auth = function (){
      authService.authenticate(vm.authCredentials)
        .then(function (result) {
          if (result.data.succsess == true){
            $cookies.put('token',result.data.token);
            vm.isAuthorised();
          }
          else {
            vm.errorMsg = result.data.message;
            vm.authCredentials = {};
          }
        })
    }

    vm.registration = function () {
      if (vm.authCredentials.password == vm.authCredentials.rePassword){
        authService.registration(vm.authCredentials)
          .then(function (result) {
            if (result.data.succsess == true){
              $cookies.put('token',result.data.token);
              vm.isAuthorised();
            }
            else {
              console.log(result);
              vm.errorMsg = result.data.message;
              vm.authCredentials = {};
            }
          })
      } else {
        vm.errorMsg = 'Password didnt mutch';
      }
    }

    vm.isAuthorised = function () {
      if ($cookies.get('token')){
        $state.go('main')
      }
    }

    activate();
  }
})();
