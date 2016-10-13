var calenderService = angular.module('calenderService', []);
calenderService.service('CalenderService', function () {
    this.console = function () {
        console.log("CalenderService");
    };
});