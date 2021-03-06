(function() {
    
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
            var countries = Datamap.prototype.worldTopo.objects.world.geometries;
            var countryNames = _.map(countries, function(country) {
                return _.camelCase(country.properties.name);
            });

            $scope.countriesFound = [];

            $scope.$watch('userInput', function(userInput) {
                var input = _.camelCase(userInput);
                var found = _.map($scope.countriesFound, function(country) {
                    return _.camelCase(country.properties.name);
                });

                if (_.includes(countryNames, input) && !_.includes(found, input)) {
                    var country = _.filter(countries, function(country) {
                        return _.camelCase(country.properties.name) === input;
                    });

                    if (country.length > 0 && country.length < 2) {
                        $scope.mapObject.data[country[0].id] = {
                            "fillKey": "FOUND"
                        };
                        $scope.userInput = '';
                        $scope.countriesFound.push(country[0]);
                    }
                }
            });

        }

        function mapLink(scope, element, attrs, controller) {
            scope.mapObject = {
                scope: 'world',
                options: {
                    width: 1000
                },
                geographyConfig: {
                    highlightOnHover: false,
                    popupOnHover: false,
                    highlighBorderColor: '#00BFFF',
                    highlighBorderWidth: 1
                },
                fills: {
                    'FOUND': '#CC4731',
                },
                data: {}
            };
        }
    }

})();
