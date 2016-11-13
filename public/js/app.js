// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var angular = require('angular');
var ngCookies = require('angular-cookies');
var geolocation = require('angularjs-geolocation');
var app = angular.module('meanMapApp', ['addCtrl', 'ngCookies', 'geolocation', 'gservice']);
