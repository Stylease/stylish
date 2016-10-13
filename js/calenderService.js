var calenderService = angular.module('calenderService', []);
calenderService.service('CalenderService', function () {
    var Cal = this;
    this.blockedDates = [];
    this.duration = 4;
    this.addDuration = 4;
    this.console = function () {
        console.log("CalenderService");
    };

    this.disableDate = function (date, mode) {
        var selDate = moment(date.date);
        var returnVal = false;
        //check 1 IS within Selected date + Add Duration
        _.each(Cal.blockedDates, function (n) {
            var isBetween = selDate.isBetween(moment(n.timeFrom), moment(n.timeTo).add(Cal.addDuration, "days"));
            var isSame1 = selDate.isSame(moment(n.timeFrom), 'day');
            var isSame2 = selDate.isSame(moment(n.timeTo).add(Cal.addDuration, "days"), 'day');

            var isBetweenBookingTime = moment(n.timeFrom).isBetween(selDate, selDate.add(Cel.duration + Cel.addDuration + 1, "days"));

            if (isBetween || isSame1 || isSame2 || isBetweenBookingTime) {
                returnVal = true;
                return 0;
            }
        });

        return returnVal;
    };

});