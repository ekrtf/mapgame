/**
 * MAP - directive
 * @description d3.js map of the world
 */

angular.module('mapGame')
    .directive('map', map);

function map() {
    return {
        templateUrl: 'components/map/map.html',
        restrict: 'E',
        scope: {},
        controller: mapCtrl,
        link: mapLink
    };

    function mapCtrl($scope) {
        $scope.$watch('userInput', function() {

        });
    }

    function mapLink(scope, element, attrs, controller) {
        scope.mapObject = {
            scope: 'world',
            options: {
                width: 1000,
                legendHeight: 60 // optionally set the padding for the legend
            },
            geographyConfig: {
                highlighBorderColor: '#EAA9A8',
                highlighBorderWidth: 1
            }
        };
    }
}
