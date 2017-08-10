(function() {
  'use strict';

  angular
    .module('bookapp')
    .controller('MainpageController', MainpageController);

  /** @ngInject */
  function MainpageController($cookies, $state, authService) {
    var vm = this;



    function activate() {
      vm.isAuthorised();
    }

    vm.isAuthorised = function () {
      if (!angular.isDefined($cookies.get('token'))){
        $state.go('auth');
      } else {
        vm.verifyUser();
      }
    }

    vm.verifyUser = function () {
      authService.verify(authService.getToken())
        .then(function (result) {
          if (!result.data.succsess){
            authService.removeToken();
            $state.go('auth');
          } else {
            $cookies.put('userid', result.data.msg._doc._id);
            $cookies.put('username', result.data.msg._doc.email);
            $state.go('booklist');
          }
        })
    }

    activate();
  }
})();
