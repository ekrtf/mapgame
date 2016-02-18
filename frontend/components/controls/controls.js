(function() {
    
    angular.module('mapGame')
        .directive('controls', controls);

    function controls() {
        return {
            templateUrl: 'components/controls/controls.html',
            restrict: 'E',
            scope: {},
            controller: controlsCtrl
        };

        function controlsCtrl($scope) {

        }
    }

})();
