'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('GaugeCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

        $scope.demoValue = 1250;
        $scope.demoOptions = {
            lines: 12, // The number of lines to draw
            angle: 0.15, // The length of each line
            lineWidth: 0.44, // The line thickness
            pointer: {
                length: 0.9, // The radius of the inner circle
                strokeWidth: 0.035, // The rotation offset
                color: '#000000' // Fill color
            },
            limitMax: true,   // If true, the pointer will not go past the end of the gauge

            colorStart: '#6FADCF',   // Colors
            colorStop: '#8FC0DA',    // just experiment with them
            strokeColor: '#E0E0E0',   // to see which ones work best for you
            generateGradient: true,
            maxValue: 3000
        };

        var opts = {
            lines: 12, // The number of lines to draw
            angle: 0.15, // The length of each line
            lineWidth: 0.44, // The line thickness
            pointer: {
                length: 0.9, // The radius of the inner circle
                strokeWidth: 0.035, // The rotation offset
                color: '#000000' // Fill color
            },
            limitMax: true,   // If true, the pointer will not go past the end of the gauge

            colorStart: '#6FADCF',   // Colors
            colorStop: '#8FC0DA',    // just experiment with them
            strokeColor: '#E0E0E0',   // to see which ones work best for you
            generateGradient: true,
            maxValue: 3000
        };
        var target = document.getElementById('foo'); // your canvas element
        var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!

        $scope.$watch('demoValue', function(newValue, oldValue){
            if (newValue !== oldValue){
                $timeout(function(){
                    gauge.set($scope.demoValue);
                },5);
            }
        });

    }])
    .directive('gaugeJs', function(){
        return {
            restrict: 'A',
            scope: {
                options:'=',
                currentValue: '=ngModel'
            },
            compile: function(tElem, tAttrs){

                if ( tElem[0].tagName !== 'CANVAS' ) {
                    throw new Error('guage-js can only be set on a canvas element. ' + tElem[0].tagName + ' will not work.');
                }

                return function(scope, element, attrs){

                    var gauge;

                    function setGauge(options){
                        gauge = new Gauge(element[0]).setOptions(scope.options);
                        gauge.maxValue = scope.options.maxValue; // set max gauge value
                        gauge.set(scope.currentValue);
                    }

                    scope.$watch('options', function(newV, oldV){
                        setGauge(scope.options);
                    },true);

                    scope.$watch('currentValue', function(newV,oldV){
                        if(scope.currentValue > scope.options.maxValue){
                            gauge.set(scope.options.maxValue);
                        } else {
                            gauge.set(scope.currentValue);
                        }
                    });
                };
            }
        };
    });
