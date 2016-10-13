var calenderService = angular.module('calenderService', []);
calenderService.service('CalenderService', function () {
    var Cal = this;
    this.blockedDates = [];
    this.duration = 4;
    this.addDuration = 4;
    this.console = function () {
        console.log("CalenderService");
    };
    this.selectedDate = undefined;

    this.disableDate = function (date, mode) {
        var selDate = moment(date.date);
        var addedSelDate = moment(date.date).add(Cal.duration + Cal.addDuration, "d");
        var returnVal = false;
        //check 1 IS within Selected date + Add Duration
        _.each(Cal.blockedDates, function (n) {
            var isBetween = selDate.isBetween(moment(n.timeFrom), moment(n.timeTo).add(Cal.addDuration, "d"), "day");
            var isSame1 = selDate.isSame(moment(n.timeFrom), 'day');
            var isSame2 = selDate.isSame(moment(n.timeTo).add(Cal.addDuration, "d"), 'day');

            var isBetweenBookingTime = moment(n.timeFrom).isBetween(selDate, addedSelDate, "day");

            if (isBetween || isSame1 || isSame2 || isBetweenBookingTime) {
                returnVal = true;
                return 0;
            }
        });

        return returnVal;
    };

    this.getDayClass = function (date) {
        var selDate = moment(date.date);
        var returnVal = "";
        var selectedDateMo = moment(Cal.selectedDate);
        var addDate = moment(Cal.selectedDate).add(Cal.duration, "days");
        var isBetween = selDate.isBetween(selectedDateMo, addDate, "days");
        var isSame1 = selDate.isSame(selectedDateMo, 'day');
        if (isBetween || isSame1) {
            returnVal = "active2";
        }
        return returnVal;
    }

});