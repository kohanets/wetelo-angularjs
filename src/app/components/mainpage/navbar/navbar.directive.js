(function() {
  'use strict';

  angular
    .module('bookapp')
    .directive('mainNavbar', mainNavbar);

  /** @ngInject */
  function mainNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/mainpage/navbar/navbar.html',
      scope: true,
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($cookies, $state, authService) {
      var vm = this;

      function activate() {

      }

      vm.logout = function () {
        authService.logout();
        $state.go('auth');
      }

      activate();
    }
  }

})();
