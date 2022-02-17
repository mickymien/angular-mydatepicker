import { CommonModule } from '@angular/common';
import { __read, __values } from 'tslib';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Injectable, Component, ElementRef, ViewEncapsulation, ViewChild, Renderer2, ChangeDetectorRef, HostBinding, EventEmitter, Input, Output, Directive, ViewContainerRef, ComponentFactoryResolver, forwardRef, HostListener, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var KeyCode = {
    enter: 13,
    esc: 27,
    space: 32,
    leftArrow: 37,
    upArrow: 38,
    rightArrow: 39,
    downArrow: 40,
    tab: 9,
    shift: 16,
};
KeyCode[KeyCode.enter] = 'enter';
KeyCode[KeyCode.esc] = 'esc';
KeyCode[KeyCode.space] = 'space';
KeyCode[KeyCode.leftArrow] = 'leftArrow';
KeyCode[KeyCode.upArrow] = 'upArrow';
KeyCode[KeyCode.rightArrow] = 'rightArrow';
KeyCode[KeyCode.downArrow] = 'downArrow';
KeyCode[KeyCode.tab] = 'tab';
KeyCode[KeyCode.shift] = 'shift';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var KeyName = {
    enter: "Enter",
    esc: "Escape|Esc",
    space: " |Spacebar",
    leftArrow: "ArrowLeft|Left",
    upArrow: "ArrowUp|Up",
    rightArrow: "ArrowRight|Right",
    downArrow: "ArrowDown|Down",
    tab: "Tab",
    shift: "Shift",
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Constants
 * @type {?}
 */
var D = "d";
/** @type {?} */
var DD = "dd";
/** @type {?} */
var M = "m";
/** @type {?} */
var MM = "mm";
/** @type {?} */
var MMM = "mmm";
/** @type {?} */
var Y = "y";
/** @type {?} */
var YYYY = "yyyy";
/** @type {?} */
var ORDINAL = "##";
/** @type {?} */
var ST = 'st';
/** @type {?} */
var ND = "nd";
/** @type {?} */
var RD = "rd";
/** @type {?} */
var DATE_ROW_COUNT = 5;
/** @type {?} */
var DATE_COL_COUNT = 6;
/** @type {?} */
var MONTH_ROW_COUNT = 3;
/** @type {?} */
var MONTH_COL_COUNT = 2;
/** @type {?} */
var YEAR_ROW_COUNT = 4;
/** @type {?} */
var YEAR_COL_COUNT = 4;
/** @type {?} */
var DOT = ".";
/** @type {?} */
var UNDER_LINE = "_";
/** @type {?} */
var PIPE = "|";
/** @type {?} */
var YEAR_SEPARATOR = " - ";
/** @type {?} */
var SU = "su";
/** @type {?} */
var MO = "mo";
/** @type {?} */
var TU = "tu";
/** @type {?} */
var WE = "we";
/** @type {?} */
var TH = "th";
/** @type {?} */
var FR = "fr";
/** @type {?} */
var SA = "sa";
/** @type {?} */
var DEFAULT_LOCALE = "en";
/** @type {?} */
var ZERO_STR = "0";
/** @type {?} */
var EMPTY_STR = "";
/** @type {?} */
var SPACE_STR = " ";
/** @type {?} */
var CLICK = "click";
/** @type {?} */
var KEYUP = "keyup";
/** @type {?} */
var BLUR = "blur";
/** @type {?} */
var DISABLED = "disabled";
/** @type {?} */
var BODY = "body";
/** @type {?} */
var VALUE = "value";
/** @type {?} */
var OPTIONS = "options";
/** @type {?} */
var DEFAULT_MONTH = "defaultMonth";
/** @type {?} */
var LOCALE = "locale";
/** @type {?} */
var OBJECT = "object";
/** @type {?} */
var PX = "px";
/** @type {?} */
var STYLE = "style";
/** @type {?} */
var INNER_HTML = "innerHTML";
/** @type {?} */
var OPTS = "opts";
/** @type {?} */
var YEARS_DURATION = "yearsDuration";
/** @type {?} */
var YEARS = "years";
/** @type {?} */
var VISIBLE_MONTH = "visibleMonth";
/** @type {?} */
var SELECT_MONTH = "selectMonth";
/** @type {?} */
var SELECT_YEAR = "selectYear";
/** @type {?} */
var PREV_VIEW_DISABLED = "prevViewDisabled";
/** @type {?} */
var NEXT_VIEW_DISABLED = "nextViewDisabled";
/** @type {?} */
var DATES = "dates";
/** @type {?} */
var WEEK_DAYS = "weekDays";
/** @type {?} */
var SELECTED_DATE = "selectedDate";
/** @type {?} */
var SELECTED_DATE_RANGE = "selectedDateRange";
/** @type {?} */
var MONTHS = "months";
/** @type {?} */
var ANIMATION_END = "animationend";
/** @type {?} */
var ANIMATION_TIMEOUT = 550;
/** @type {?} */
var MY_DP_ANIMATION = "myDpAnimation";
/** @type {?} */
var ANIMATION_NAMES = ["Fade", "ScaleTop", "ScaleCenter", "Rotate", "FlipDiagonal", "Own"];
/** @type {?} */
var IN = "In";
/** @type {?} */
var OUT = "Out";
/** @type {?} */
var TABINDEX = "tabindex";
/** @type {?} */
var TD_SELECTOR = "table tbody tr td:not(.myDpDaycellWeekNbr)";
/** @type {?} */
var PREVENT_CLOSE_TIMEOUT = 50;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UtilService = /** @class */ (function () {
    function UtilService() {
        this.weekDays = [SU, MO, TU, WE, TH, FR, SA];
    }
    /**
     * @param {?} dateStr
     * @param {?} options
     * @param {?} validateOpts
     * @return {?}
     */
    UtilService.prototype.isDateValid = /**
     * @param {?} dateStr
     * @param {?} options
     * @param {?} validateOpts
     * @return {?}
     */
    function (dateStr, options, validateOpts) {
        var e_1, _a;
        var dateFormat = options.dateFormat, minYear = options.minYear, maxYear = options.maxYear, monthLabels = options.monthLabels;
        /** @type {?} */
        var returnDate = this.resetDate();
        /** @type {?} */
        var datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        /** @type {?} */
        var isMonthStr = dateFormat.indexOf(MMM) !== -1;
        /** @type {?} */
        var delimeters = dateFormat.match(/[^(d#my)]{1,}/g);
        if (!dateStr || dateStr === EMPTY_STR) {
            return returnDate;
        }
        /** @type {?} */
        var dateValues = this.getDateValue(dateStr, dateFormat, delimeters);
        /** @type {?} */
        var year = 0;
        /** @type {?} */
        var month = 0;
        /** @type {?} */
        var day = 0;
        try {
            for (var dateValues_1 = __values(dateValues), dateValues_1_1 = dateValues_1.next(); !dateValues_1_1.done; dateValues_1_1 = dateValues_1.next()) {
                var dv = dateValues_1_1.value;
                if (dv.format.indexOf(ORDINAL) != -1) {
                    /** @type {?} */
                    var dayNumber = parseInt(dv.value.replace(/\D/g, ''));
                    /** @type {?} */
                    var ordinalStr = dv.value.replace(/[0-9]/g, '');
                    /** @type {?} */
                    var ordinal = this.getOrdinal(dayNumber);
                    if (ordinal !== ordinalStr) {
                        return returnDate;
                    }
                    dv.value = dv.value.replace(ST, EMPTY_STR).replace(ND, EMPTY_STR).replace(RD, EMPTY_STR).replace(TH, EMPTY_STR);
                    dv.format = dv.format.replace(ORDINAL, EMPTY_STR);
                }
                var value = dv.value, format = dv.format;
                if (value && /^\d+$/.test(value) && Number(value) === 0) {
                    return returnDate;
                }
                if (format.indexOf(YYYY) !== -1) {
                    year = this.getNumberByValue(dv);
                }
                else if (format.indexOf(M) !== -1) {
                    month = isMonthStr ? this.getMonthNumberByMonthName(dv, monthLabels) : this.getNumberByValue(dv);
                }
                else if (format.indexOf(D) !== -1) {
                    day = this.getNumberByValue(dv);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (dateValues_1_1 && !dateValues_1_1.done && (_a = dateValues_1.return)) _a.call(dateValues_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var validateDisabledDates = validateOpts.validateDisabledDates, selectedValue = validateOpts.selectedValue;
        year = year === 0 && selectedValue ? selectedValue.year : year;
        month = month === 0 && selectedValue ? selectedValue.month : month;
        day = day === 0 && selectedValue ? selectedValue.day : day;
        /** @type {?} */
        var today = this.getToday();
        if (year === 0 && (month !== 0 || day !== 0)) {
            year = today.year;
        }
        if (month === 0 && (year !== 0 || day !== 0)) {
            month = today.month;
        }
        if (day === 0 && (year !== 0 || month !== 0)) {
            day = today.day;
        }
        if (month !== -1 && day !== -1 && year !== -1) {
            if (year < minYear || year > maxYear || month < 1 || month > 12) {
                return returnDate;
            }
            /** @type {?} */
            var date = { year: year, month: month, day: day };
            if (validateDisabledDates && this.isDisabledDate(date, options).disabled) {
                return returnDate;
            }
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                datesInMonth[1] = 29;
            }
            if (day < 1 || day > datesInMonth[month - 1]) {
                return returnDate;
            }
            // Valid date
            return date;
        }
        return returnDate;
    };
    /**
     * @param {?} dateRangeStr
     * @param {?} options
     * @param {?} validateOpts
     * @return {?}
     */
    UtilService.prototype.isDateValidDateRange = /**
     * @param {?} dateRangeStr
     * @param {?} options
     * @param {?} validateOpts
     * @return {?}
     */
    function (dateRangeStr, options, validateOpts) {
        /** @type {?} */
        var dateRange = { begin: this.resetDate(), end: this.resetDate() };
        if (dateRangeStr && dateRangeStr.length) {
            /** @type {?} */
            var dates = dateRangeStr.split(options.dateRangeDatesDelimiter);
            if (dates && dates.length === 2) {
                var _a = __read(dates, 2), beginDate = _a[0], endDate = _a[1];
                var selectedValue = validateOpts.selectedValue;
                if (selectedValue) {
                    validateOpts.selectedValue = selectedValue.begin;
                }
                /** @type {?} */
                var begin = this.isDateValid(beginDate, options, validateOpts);
                if (this.isInitializedDate(begin)) {
                    if (selectedValue) {
                        validateOpts.selectedValue = selectedValue.end;
                    }
                    /** @type {?} */
                    var end = this.isDateValid(endDate, options, validateOpts);
                    if (this.isInitializedDate(end) && this.isDateSameOrEarlier(begin, end)) {
                        dateRange = { begin: begin, end: end };
                    }
                }
            }
        }
        return dateRange;
    };
    /**
     * @param {?} dateStr
     * @param {?} dateFormat
     * @param {?} delimeters
     * @return {?}
     */
    UtilService.prototype.getDateValue = /**
     * @param {?} dateStr
     * @param {?} dateFormat
     * @param {?} delimeters
     * @return {?}
     */
    function (dateStr, dateFormat, delimeters) {
        var e_2, _a;
        /** @type {?} */
        var del = EMPTY_STR;
        if (delimeters) {
            try {
                for (var delimeters_1 = __values(delimeters), delimeters_1_1 = delimeters_1.next(); !delimeters_1_1.done; delimeters_1_1 = delimeters_1.next()) {
                    var d = delimeters_1_1.value;
                    if (del.indexOf(d) === -1) {
                        del += d;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (delimeters_1_1 && !delimeters_1_1.done && (_a = delimeters_1.return)) _a.call(delimeters_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        /** @type {?} */
        var re = new RegExp("[" + del + "]");
        /** @type {?} */
        var ds = dateStr.split(re);
        /** @type {?} */
        var df = dateFormat.split(re);
        /** @type {?} */
        var da = [];
        for (var i = 0; i < df.length; i++) {
            if (df[i].indexOf(YYYY) !== -1) {
                da.push({ value: ds[i], format: df[i] });
            }
            if (df[i].indexOf(M) !== -1) {
                da.push({ value: ds[i], format: df[i] });
            }
            if (df[i].indexOf(D) !== -1) {
                da.push({ value: ds[i], format: df[i] });
            }
        }
        return da;
    };
    /**
     * @param {?} df
     * @param {?} monthLabels
     * @return {?}
     */
    UtilService.prototype.getMonthNumberByMonthName = /**
     * @param {?} df
     * @param {?} monthLabels
     * @return {?}
     */
    function (df, monthLabels) {
        if (df.value) {
            for (var key = 1; key <= 12; key++) {
                if (df.value.toLowerCase() === monthLabels[key].toLowerCase()) {
                    return key;
                }
            }
        }
        return -1;
    };
    /**
     * @param {?} df
     * @return {?}
     */
    UtilService.prototype.getNumberByValue = /**
     * @param {?} df
     * @return {?}
     */
    function (df) {
        if (!/^\d+$/.test(df.value)) {
            return -1;
        }
        /** @type {?} */
        var nbr = Number(df.value);
        if (df.format.length === 1 && df.value.length !== 1 && nbr < 10 || df.format.length === 1 && df.value.length !== 2 && nbr >= 10) {
            nbr = -1;
        }
        else if (df.format.length === 2 && df.value.length > 2) {
            nbr = -1;
        }
        return nbr;
    };
    /**
     * @param {?} monthString
     * @return {?}
     */
    UtilService.prototype.parseDefaultMonth = /**
     * @param {?} monthString
     * @return {?}
     */
    function (monthString) {
        /** @type {?} */
        var month = { monthTxt: EMPTY_STR, monthNbr: 0, year: 0 };
        if (monthString !== EMPTY_STR) {
            /** @type {?} */
            var split = monthString.split(monthString.match(/[^0-9]/)[0]);
            month.monthNbr = split[0].length === 2 ? Number(split[0]) : Number(split[1]);
            month.year = split[0].length === 2 ? Number(split[1]) : Number(split[0]);
        }
        return month;
    };
    /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    UtilService.prototype.isDisabledDate = /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    function (date, options) {
        var e_3, _a, e_4, _b;
        var minYear = options.minYear, maxYear = options.maxYear, disableUntil = options.disableUntil, disableSince = options.disableSince, disableWeekends = options.disableWeekends, disableDates = options.disableDates, disableDateRanges = options.disableDateRanges, disableWeekdays = options.disableWeekdays, enableDates = options.enableDates;
        if (this.dateMatchToDates(date, enableDates)) {
            return this.getDisabledValue(false, EMPTY_STR);
        }
        if (date.year < minYear && date.month === 12 || date.year > maxYear && date.month === 1) {
            return this.getDisabledValue(true, EMPTY_STR);
        }
        /** @type {?} */
        var inputDates = (/** @type {?} */ (disableDates));
        /** @type {?} */
        var result = inputDates.find((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.dates;
        }));
        if (!result) {
            if (this.dateMatchToDates(date, inputDates)) {
                return this.getDisabledValue(true, EMPTY_STR);
            }
        }
        else {
            try {
                for (var inputDates_1 = __values(inputDates), inputDates_1_1 = inputDates_1.next(); !inputDates_1_1.done; inputDates_1_1 = inputDates_1.next()) {
                    var dd = inputDates_1_1.value;
                    if (this.dateMatchToDates(date, dd.dates)) {
                        return this.getDisabledValue(true, dd.styleClass);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (inputDates_1_1 && !inputDates_1_1.done && (_a = inputDates_1.return)) _a.call(inputDates_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        if (this.isDisabledByDisableUntil(date, disableUntil)) {
            return this.getDisabledValue(true, EMPTY_STR);
        }
        if (this.isDisabledByDisableSince(date, disableSince)) {
            return this.getDisabledValue(true, EMPTY_STR);
        }
        if (disableWeekends) {
            /** @type {?} */
            var dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return this.getDisabledValue(true, EMPTY_STR);
            }
        }
        /** @type {?} */
        var dn = this.getDayNumber(date);
        if (disableWeekdays.length > 0) {
            try {
                for (var disableWeekdays_1 = __values(disableWeekdays), disableWeekdays_1_1 = disableWeekdays_1.next(); !disableWeekdays_1_1.done; disableWeekdays_1_1 = disableWeekdays_1.next()) {
                    var wd = disableWeekdays_1_1.value;
                    if (dn === this.getWeekdayIndex(wd)) {
                        return this.getDisabledValue(true, EMPTY_STR);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (disableWeekdays_1_1 && !disableWeekdays_1_1.done && (_b = disableWeekdays_1.return)) _b.call(disableWeekdays_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        if (this.isDisabledByDisableDateRange(date, date, disableDateRanges)) {
            return this.getDisabledValue(true, EMPTY_STR);
        }
        return this.getDisabledValue(false, EMPTY_STR);
    };
    /**
     * @param {?} disabled
     * @param {?} styleClass
     * @return {?}
     */
    UtilService.prototype.getDisabledValue = /**
     * @param {?} disabled
     * @param {?} styleClass
     * @return {?}
     */
    function (disabled, styleClass) {
        return { disabled: disabled, styleClass: styleClass };
    };
    /**
     * @param {?} date
     * @param {?} dates
     * @return {?}
     */
    UtilService.prototype.dateMatchToDates = /**
     * @param {?} date
     * @param {?} dates
     * @return {?}
     */
    function (date, dates) {
        var e_5, _a;
        try {
            for (var dates_1 = __values(dates), dates_1_1 = dates_1.next(); !dates_1_1.done; dates_1_1 = dates_1.next()) {
                var d = dates_1_1.value;
                if ((d.year === 0 || d.year === date.year) && (d.month === 0 || d.month === date.month) && d.day === date.day) {
                    return true;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (dates_1_1 && !dates_1_1.done && (_a = dates_1.return)) _a.call(dates_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return false;
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} options
     * @return {?}
     */
    UtilService.prototype.isDisabledMonth = /**
     * @param {?} year
     * @param {?} month
     * @param {?} options
     * @return {?}
     */
    function (year, month, options) {
        var disableUntil = options.disableUntil, disableSince = options.disableSince, disableDateRanges = options.disableDateRanges, enableDates = options.enableDates;
        /** @type {?} */
        var dateEnd = { year: year, month: month, day: this.datesInMonth(month, year) };
        /** @type {?} */
        var dateBegin = { year: year, month: month, day: 1 };
        if (this.isDatesEnabled(dateBegin, dateEnd, enableDates)) {
            return false;
        }
        if (this.isDisabledByDisableUntil(dateEnd, disableUntil)) {
            return true;
        }
        if (this.isDisabledByDisableSince(dateBegin, disableSince)) {
            return true;
        }
        if (this.isDisabledByDisableDateRange(dateBegin, dateEnd, disableDateRanges)) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} year
     * @param {?} options
     * @return {?}
     */
    UtilService.prototype.isDisabledYear = /**
     * @param {?} year
     * @param {?} options
     * @return {?}
     */
    function (year, options) {
        var disableUntil = options.disableUntil, disableSince = options.disableSince, disableDateRanges = options.disableDateRanges, enableDates = options.enableDates, minYear = options.minYear, maxYear = options.maxYear;
        /** @type {?} */
        var dateEnd = { year: year, month: 12, day: 31 };
        /** @type {?} */
        var dateBegin = { year: year, month: 1, day: 1 };
        if (this.isDatesEnabled(dateBegin, dateEnd, enableDates)) {
            return false;
        }
        if (this.isDisabledByDisableUntil(dateEnd, disableUntil)) {
            return true;
        }
        if (this.isDisabledByDisableSince(dateBegin, disableSince)) {
            return true;
        }
        if (this.isDisabledByDisableDateRange(dateBegin, dateEnd, disableDateRanges)) {
            return true;
        }
        if (year < minYear || year > maxYear) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} date
     * @param {?} disableUntil
     * @return {?}
     */
    UtilService.prototype.isDisabledByDisableUntil = /**
     * @param {?} date
     * @param {?} disableUntil
     * @return {?}
     */
    function (date, disableUntil) {
        return this.isInitializedDate(disableUntil) && this.getTimeInMilliseconds(date) <= this.getTimeInMilliseconds(disableUntil);
    };
    /**
     * @param {?} date
     * @param {?} disableSince
     * @return {?}
     */
    UtilService.prototype.isDisabledByDisableSince = /**
     * @param {?} date
     * @param {?} disableSince
     * @return {?}
     */
    function (date, disableSince) {
        return this.isInitializedDate(disableSince) && this.getTimeInMilliseconds(date) >= this.getTimeInMilliseconds(disableSince);
    };
    /**
     * @param {?} date
     * @param {?} enableDates
     * @return {?}
     */
    UtilService.prototype.isPastDatesEnabled = /**
     * @param {?} date
     * @param {?} enableDates
     * @return {?}
     */
    function (date, enableDates) {
        var e_6, _a;
        try {
            for (var enableDates_1 = __values(enableDates), enableDates_1_1 = enableDates_1.next(); !enableDates_1_1.done; enableDates_1_1 = enableDates_1.next()) {
                var d = enableDates_1_1.value;
                if (this.getTimeInMilliseconds(d) <= this.getTimeInMilliseconds(date)) {
                    return true;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (enableDates_1_1 && !enableDates_1_1.done && (_a = enableDates_1.return)) _a.call(enableDates_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return false;
    };
    /**
     * @param {?} date
     * @param {?} enableDates
     * @return {?}
     */
    UtilService.prototype.isFutureDatesEnabled = /**
     * @param {?} date
     * @param {?} enableDates
     * @return {?}
     */
    function (date, enableDates) {
        var e_7, _a;
        try {
            for (var enableDates_2 = __values(enableDates), enableDates_2_1 = enableDates_2.next(); !enableDates_2_1.done; enableDates_2_1 = enableDates_2.next()) {
                var d = enableDates_2_1.value;
                if (this.getTimeInMilliseconds(d) >= this.getTimeInMilliseconds(date)) {
                    return true;
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (enableDates_2_1 && !enableDates_2_1.done && (_a = enableDates_2.return)) _a.call(enableDates_2);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return false;
    };
    /**
     * @param {?} dateBegin
     * @param {?} dateEnd
     * @param {?} enableDates
     * @return {?}
     */
    UtilService.prototype.isDatesEnabled = /**
     * @param {?} dateBegin
     * @param {?} dateEnd
     * @param {?} enableDates
     * @return {?}
     */
    function (dateBegin, dateEnd, enableDates) {
        var e_8, _a;
        try {
            for (var enableDates_3 = __values(enableDates), enableDates_3_1 = enableDates_3.next(); !enableDates_3_1.done; enableDates_3_1 = enableDates_3.next()) {
                var d = enableDates_3_1.value;
                if (this.getTimeInMilliseconds(d) >= this.getTimeInMilliseconds(dateBegin)
                    && this.getTimeInMilliseconds(d) <= this.getTimeInMilliseconds(dateEnd)) {
                    return true;
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (enableDates_3_1 && !enableDates_3_1.done && (_a = enableDates_3.return)) _a.call(enableDates_3);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return false;
    };
    /**
     * @param {?} dateBegin
     * @param {?} dateEnd
     * @param {?} disableDateRanges
     * @return {?}
     */
    UtilService.prototype.isDisabledByDisableDateRange = /**
     * @param {?} dateBegin
     * @param {?} dateEnd
     * @param {?} disableDateRanges
     * @return {?}
     */
    function (dateBegin, dateEnd, disableDateRanges) {
        var e_9, _a;
        /** @type {?} */
        var dateMsBegin = this.getTimeInMilliseconds(dateBegin);
        /** @type {?} */
        var dateMsEnd = this.getTimeInMilliseconds(dateEnd);
        try {
            for (var disableDateRanges_1 = __values(disableDateRanges), disableDateRanges_1_1 = disableDateRanges_1.next(); !disableDateRanges_1_1.done; disableDateRanges_1_1 = disableDateRanges_1.next()) {
                var d = disableDateRanges_1_1.value;
                if (this.isInitializedDate(d.begin) && this.isInitializedDate(d.end)
                    && dateMsBegin >= this.getTimeInMilliseconds(d.begin) && dateMsEnd <= this.getTimeInMilliseconds(d.end)) {
                    return true;
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (disableDateRanges_1_1 && !disableDateRanges_1_1.done && (_a = disableDateRanges_1.return)) _a.call(disableDateRanges_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return false;
    };
    /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    UtilService.prototype.isMarkedDate = /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    function (date, options) {
        var e_10, _a;
        var markDates = options.markDates, markWeekends = options.markWeekends;
        try {
            for (var markDates_1 = __values(markDates), markDates_1_1 = markDates_1.next(); !markDates_1_1.done; markDates_1_1 = markDates_1.next()) {
                var md = markDates_1_1.value;
                if (this.dateMatchToDates(date, md.dates)) {
                    return this.getMarkedValue(true, md.color, md.styleClass);
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (markDates_1_1 && !markDates_1_1.done && (_a = markDates_1.return)) _a.call(markDates_1);
            }
            finally { if (e_10) throw e_10.error; }
        }
        if (markWeekends && markWeekends.marked) {
            /** @type {?} */
            var dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return this.getMarkedValue(true, markWeekends.color, EMPTY_STR);
            }
        }
        return this.getMarkedValue(false, EMPTY_STR, EMPTY_STR);
    };
    /**
     * @param {?} marked
     * @param {?} color
     * @param {?} styleClass
     * @return {?}
     */
    UtilService.prototype.getMarkedValue = /**
     * @param {?} marked
     * @param {?} color
     * @param {?} styleClass
     * @return {?}
     */
    function (marked, color, styleClass) {
        return { marked: marked, color: color ? color : EMPTY_STR, styleClass: styleClass ? styleClass : EMPTY_STR };
    };
    /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    UtilService.prototype.isHighlightedDate = /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    function (date, options) {
        var sunHighlight = options.sunHighlight, satHighlight = options.satHighlight, highlightDates = options.highlightDates;
        /** @type {?} */
        var dayNbr = this.getDayNumber(date);
        if (sunHighlight && dayNbr === 0 || satHighlight && dayNbr === 6) {
            return true;
        }
        if (this.dateMatchToDates(date, highlightDates)) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.getWeekNumber = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        d.setDate(d.getDate() + (d.getDay() === 0 ? -3 : 4 - d.getDay()));
        return Math.round(((d.getTime() - new Date(d.getFullYear(), 0, 4).getTime()) / 86400000) / 7) + 1;
    };
    /**
     * @param {?} date
     * @param {?} dateRange
     * @param {?} dateFormat
     * @param {?} monthLabels
     * @param {?} rangeDelimiter
     * @param {?=} dateStr
     * @return {?}
     */
    UtilService.prototype.getDateModel = /**
     * @param {?} date
     * @param {?} dateRange
     * @param {?} dateFormat
     * @param {?} monthLabels
     * @param {?} rangeDelimiter
     * @param {?=} dateStr
     * @return {?}
     */
    function (date, dateRange, dateFormat, monthLabels, rangeDelimiter, dateStr) {
        if (dateStr === void 0) { dateStr = EMPTY_STR; }
        /** @type {?} */
        var singleDateModel = null;
        /** @type {?} */
        var dateRangeModel = null;
        if (date) {
            singleDateModel = {
                date: date,
                jsDate: this.myDateToJsDate(date),
                formatted: dateStr.length ? dateStr : this.formatDate(date, dateFormat, monthLabels),
                epoc: this.getEpocTime(date)
            };
        }
        else {
            dateRangeModel = {
                beginDate: dateRange.begin,
                beginJsDate: this.myDateToJsDate(dateRange.begin),
                beginEpoc: this.getEpocTime(dateRange.begin),
                endDate: dateRange.end,
                endJsDate: this.myDateToJsDate(dateRange.end),
                endEpoc: this.getEpocTime(dateRange.end),
                formatted: this.formatDate(dateRange.begin, dateFormat, monthLabels) + rangeDelimiter + this.formatDate(dateRange.end, dateFormat, monthLabels)
            };
        }
        return {
            isRange: date === null,
            singleDate: singleDateModel,
            dateRange: dateRangeModel
        };
    };
    /**
     * @param {?} date
     * @param {?} dateFormat
     * @param {?} monthLabels
     * @return {?}
     */
    UtilService.prototype.formatDate = /**
     * @param {?} date
     * @param {?} dateFormat
     * @param {?} monthLabels
     * @return {?}
     */
    function (date, dateFormat, monthLabels) {
        /** @type {?} */
        var formatted = dateFormat.replace(YYYY, String(date.year));
        if (dateFormat.indexOf(MMM) !== -1) {
            formatted = formatted.replace(MMM, monthLabels[date.month]);
        }
        else if (dateFormat.indexOf(MM) !== -1) {
            formatted = formatted.replace(MM, this.preZero(date.month));
        }
        else {
            formatted = formatted.replace(M, String(date.month));
        }
        if (dateFormat.indexOf(DD) !== -1) {
            formatted = formatted.replace(DD, this.preZero(date.day));
        }
        else {
            formatted = formatted.replace(D, String(date.day));
        }
        if (dateFormat.indexOf(ORDINAL) !== -1) {
            formatted = formatted.replace(ORDINAL, this.getOrdinal(date.day));
        }
        return formatted;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.getOrdinal = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date > 3 && date < 21) {
            return TH;
        }
        switch (date % 10) {
            case 1:
                return ST;
            case 2:
                return ND;
            case 3:
                return RD;
            default:
                return TH;
        }
    };
    /**
     * @param {?} model
     * @return {?}
     */
    UtilService.prototype.getFormattedDate = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        return !model.isRange ? model.singleDate.formatted : model.dateRange.formatted;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    UtilService.prototype.preZero = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return val < 10 ? ZERO_STR + val : String(val);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.isInitializedDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.year !== 0 && date.month !== 0 && date.day !== 0;
    };
    /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    UtilService.prototype.isDateEarlier = /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    function (firstDate, secondDate) {
        return this.getTimeInMilliseconds(firstDate) < this.getTimeInMilliseconds(secondDate);
    };
    /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    UtilService.prototype.isDateSameOrEarlier = /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    function (firstDate, secondDate) {
        return this.getTimeInMilliseconds(firstDate) <= this.getTimeInMilliseconds(secondDate);
    };
    /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    UtilService.prototype.isDateSame = /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    function (firstDate, secondDate) {
        return this.getTimeInMilliseconds(firstDate) === this.getTimeInMilliseconds(secondDate);
    };
    /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.isDateRangeBeginOrEndSame = /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    function (dateRange, date) {
        /** @type {?} */
        var dateMs = this.getTimeInMilliseconds(date);
        return this.getTimeInMilliseconds(dateRange.begin) === dateMs || this.getTimeInMilliseconds(dateRange.end) === dateMs;
    };
    /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.isDateRangeBegin = /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    function (dateRange, date) {
        /** @type {?} */
        var dateMs = this.getTimeInMilliseconds(date);
        return this.getTimeInMilliseconds(dateRange.begin) === dateMs;
    };
    /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.isDateRangeEnd = /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    function (dateRange, date) {
        /** @type {?} */
        var dateMs = this.getTimeInMilliseconds(date);
        return this.getTimeInMilliseconds(dateRange.end) === dateMs;
    };
    /**
     * @param {?} date
     * @param {?} dateRange
     * @return {?}
     */
    UtilService.prototype.isDateInRange = /**
     * @param {?} date
     * @param {?} dateRange
     * @return {?}
     */
    function (date, dateRange) {
        if (!this.isInitializedDate(dateRange.begin) || !this.isInitializedDate(dateRange.end)) {
            return false;
        }
        return this.isDateSameOrEarlier(dateRange.begin, date) && this.isDateSameOrEarlier(date, dateRange.end);
    };
    /**
     * @return {?}
     */
    UtilService.prototype.resetDate = /**
     * @return {?}
     */
    function () {
        return { year: 0, month: 0, day: 0 };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.getTimeInMilliseconds = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.myDateToJsDate(date).getTime();
    };
    /**
     * @return {?}
     */
    UtilService.prototype.getToday = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var date = new Date();
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.getDayNumber = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getDay();
    };
    /**
     * @param {?} wd
     * @return {?}
     */
    UtilService.prototype.getWeekdayIndex = /**
     * @param {?} wd
     * @return {?}
     */
    function (wd) {
        return this.weekDays.indexOf(wd);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.getEpocTime = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return Math.round(this.getTimeInMilliseconds(date) / 1000.0);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.jsDateToMyDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.myDateToJsDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        var year = date.year, month = date.month, day = date.day;
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    };
    /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    UtilService.prototype.datesInMonth = /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    function (m, y) {
        return new Date(y, m, 0).getDate();
    };
    /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    UtilService.prototype.datesInPrevMonth = /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    function (m, y) {
        /** @type {?} */
        var d = this.getJsDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.datesInMonth(d.getMonth() + 1, d.getFullYear());
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} day
     * @return {?}
     */
    UtilService.prototype.getJsDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} day
     * @return {?}
     */
    function (year, month, day) {
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    };
    /**
     * @param {?} selectedValue
     * @param {?} dateRange
     * @return {?}
     */
    UtilService.prototype.getSelectedValue = /**
     * @param {?} selectedValue
     * @param {?} dateRange
     * @return {?}
     */
    function (selectedValue, dateRange) {
        if (!selectedValue) {
            return null;
        }
        if (!dateRange) {
            return selectedValue.date;
        }
        else {
            var beginDate = selectedValue.beginDate, endDate = selectedValue.endDate;
            return { begin: beginDate, end: endDate };
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    UtilService.prototype.getKeyCodeFromEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var key = event.key || event.keyCode || event.which;
        if (this.checkKeyName(key, KeyName.enter) || key === KeyCode.enter) {
            return KeyCode.enter;
        }
        else if (this.checkKeyName(key, KeyName.esc) || key === KeyCode.esc) {
            return KeyCode.esc;
        }
        else if (this.checkKeyName(key, KeyName.space) || key === KeyCode.space) {
            return KeyCode.space;
        }
        else if (this.checkKeyName(key, KeyName.leftArrow) || key === KeyCode.leftArrow) {
            return KeyCode.leftArrow;
        }
        else if (this.checkKeyName(key, KeyName.upArrow) || key === KeyCode.upArrow) {
            return KeyCode.upArrow;
        }
        else if (this.checkKeyName(key, KeyName.rightArrow) || key === KeyCode.rightArrow) {
            return KeyCode.rightArrow;
        }
        else if (this.checkKeyName(key, KeyName.downArrow) || key === KeyCode.downArrow) {
            return KeyCode.downArrow;
        }
        else if (this.checkKeyName(key, KeyName.tab) || key === KeyCode.tab) {
            return KeyCode.tab;
        }
        else if (this.checkKeyName(key, KeyName.shift) || key === KeyCode.shift) {
            return KeyCode.shift;
        }
        else {
            return null;
        }
    };
    /**
     * @param {?} key
     * @param {?} keyName
     * @return {?}
     */
    UtilService.prototype.checkKeyName = /**
     * @param {?} key
     * @param {?} keyName
     * @return {?}
     */
    function (key, keyName) {
        /** @type {?} */
        var arr = keyName.split(PIPE);
        return arr.indexOf(key) !== -1;
    };
    UtilService.decorators = [
        { type: Injectable }
    ];
    return UtilService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var MonthId = {
    prev: 1,
    curr: 2,
    next: 3,
};
MonthId[MonthId.prev] = 'prev';
MonthId[MonthId.curr] = 'curr';
MonthId[MonthId.next] = 'next';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var DefaultView = {
    Date: 1,
    Month: 2,
    Year: 3,
};
DefaultView[DefaultView.Date] = 'Date';
DefaultView[DefaultView.Month] = 'Month';
DefaultView[DefaultView.Year] = 'Year';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var CalAnimation = {
    None: 0,
    Fade: 1,
    ScaleTop: 2,
    ScaleCenter: 3,
    Rotate: 4,
    FlipDiagonal: 5,
    Own: 6,
};
CalAnimation[CalAnimation.None] = 'None';
CalAnimation[CalAnimation.Fade] = 'Fade';
CalAnimation[CalAnimation.ScaleTop] = 'ScaleTop';
CalAnimation[CalAnimation.ScaleCenter] = 'ScaleCenter';
CalAnimation[CalAnimation.Rotate] = 'Rotate';
CalAnimation[CalAnimation.FlipDiagonal] = 'FlipDiagonal';
CalAnimation[CalAnimation.Own] = 'Own';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var HeaderAction = {
    PrevBtnClick: 1,
    NextBtnClick: 2,
    MonthBtnClick: 3,
    YearBtnClick: 4,
};
HeaderAction[HeaderAction.PrevBtnClick] = 'PrevBtnClick';
HeaderAction[HeaderAction.NextBtnClick] = 'NextBtnClick';
HeaderAction[HeaderAction.MonthBtnClick] = 'MonthBtnClick';
HeaderAction[HeaderAction.YearBtnClick] = 'YearBtnClick';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(elem, renderer, cdr, utilService) {
        var _this = this;
        this.elem = elem;
        this.renderer = renderer;
        this.cdr = cdr;
        this.utilService = utilService;
        this.position = "static";
        this.visibleMonth = { monthTxt: EMPTY_STR, monthNbr: 0, year: 0 };
        this.selectedMonth = { monthNbr: 0, year: 0 };
        this.selectedDate = { year: 0, month: 0, day: 0 };
        this.selectedDateRange = { begin: { year: 0, month: 0, day: 0 }, end: { year: 0, month: 0, day: 0 } };
        this.weekDays = [];
        this.dates = [];
        this.months = [];
        this.years = [];
        this.yearsDuration = "";
        this.dayIdx = 0;
        this.weekDayOpts = [SU, MO, TU, WE, TH, FR, SA];
        this.selectMonth = false;
        this.selectYear = false;
        this.viewChanged = false;
        this.selectorPos = null;
        this.prevViewDisabled = false;
        this.nextViewDisabled = false;
        this.clickListener = renderer.listen(elem.nativeElement, CLICK, (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if ((_this.opts.monthSelector || _this.opts.yearSelector) && event.target) {
                _this.resetMonthYearSelect();
            }
        }));
    }
    /**
     * @return {?}
     */
    CalendarComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _a = this.opts, stylesData = _a.stylesData, calendarAnimation = _a.calendarAnimation, inline = _a.inline;
        if (stylesData.styles.length) {
            /** @type {?} */
            var styleElTemp = this.renderer.createElement(STYLE);
            this.renderer.appendChild(styleElTemp, this.renderer.createText(stylesData.styles));
            this.renderer.appendChild(this.styleEl.nativeElement, styleElTemp);
        }
        if (calendarAnimation.in !== CalAnimation.None) {
            this.setCalendarAnimation(calendarAnimation, true);
        }
        if (!inline) {
            this.focusToSelector();
        }
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.clickListener();
    };
    /**
     * @param {?} opts
     * @param {?} defaultMonth
     * @param {?} selectedValue
     * @param {?} inputValue
     * @param {?} selectorPos
     * @param {?} dc
     * @param {?} cvc
     * @param {?} rds
     * @param {?} va
     * @param {?} cbe
     * @return {?}
     */
    CalendarComponent.prototype.initializeComponent = /**
     * @param {?} opts
     * @param {?} defaultMonth
     * @param {?} selectedValue
     * @param {?} inputValue
     * @param {?} selectorPos
     * @param {?} dc
     * @param {?} cvc
     * @param {?} rds
     * @param {?} va
     * @param {?} cbe
     * @return {?}
     */
    function (opts, defaultMonth, selectedValue, inputValue, selectorPos, dc, cvc, rds, va, cbe) {
        this.opts = opts;
        this.selectorPos = selectorPos;
        this.dateChanged = dc;
        this.calendarViewChanged = cvc;
        this.rangeDateSelection = rds;
        this.viewActivated = va;
        this.closedByEsc = cbe;
        var defaultView = opts.defaultView, firstDayOfWeek = opts.firstDayOfWeek, dayLabels = opts.dayLabels;
        this.weekDays.length = 0;
        this.dayIdx = this.weekDayOpts.indexOf(firstDayOfWeek);
        if (this.dayIdx !== -1) {
            /** @type {?} */
            var idx = this.dayIdx;
            for (var i = 0; i < this.weekDayOpts.length; i++) {
                this.weekDays.push(dayLabels[this.weekDayOpts[idx]]);
                idx = this.weekDayOpts[idx] === SA ? 0 : idx + 1;
            }
        }
        this.initializeView(defaultMonth, selectedValue, inputValue);
        this.setCalendarVisibleMonth();
        this.setDefaultView(defaultView);
    };
    /**
     * @param {?} defaultMonth
     * @param {?} selectedValue
     * @param {?} inputValue
     * @return {?}
     */
    CalendarComponent.prototype.initializeView = /**
     * @param {?} defaultMonth
     * @param {?} selectedValue
     * @param {?} inputValue
     * @return {?}
     */
    function (defaultMonth, selectedValue, inputValue) {
        var dateRange = this.opts.dateRange;
        // use today as a selected month
        /** @type {?} */
        var today = this.utilService.getToday();
        this.selectedMonth = { monthNbr: today.month, year: today.year };
        // If default month attribute valur given use it as a selected month
        var defMonth = defaultMonth.defMonth, overrideSelection = defaultMonth.overrideSelection;
        if (defMonth && defMonth.length) {
            this.selectedMonth = this.utilService.parseDefaultMonth(defMonth);
        }
        /** @type {?} */
        var validateOpts = null;
        if (!dateRange) {
            // Single date mode - If date selected use it as selected month
            validateOpts = { validateDisabledDates: false, selectedValue: this.utilService.getSelectedValue(selectedValue, dateRange) };
            /** @type {?} */
            var date = this.utilService.isDateValid(inputValue, this.opts, validateOpts);
            if (this.utilService.isInitializedDate(date)) {
                this.selectedDate = date;
                if (!overrideSelection) {
                    this.selectedMonth = { monthNbr: date.month, year: date.year };
                }
            }
        }
        else {
            // Date range mode - If date range selected use begin date as selected month
            validateOpts = { validateDisabledDates: false, selectedValue: this.utilService.getSelectedValue(selectedValue, dateRange) };
            var _a = this.utilService.isDateValidDateRange(inputValue, this.opts, validateOpts), begin = _a.begin, end = _a.end;
            if (this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end)) {
                this.selectedDateRange = { begin: begin, end: end };
                if (!overrideSelection) {
                    this.selectedMonth = { monthNbr: begin.month, year: begin.year };
                }
            }
        }
    };
    /**
     * @param {?} opts
     * @param {?} defaultMonth
     * @param {?} selectedValue
     * @param {?} inputValue
     * @return {?}
     */
    CalendarComponent.prototype.refreshComponent = /**
     * @param {?} opts
     * @param {?} defaultMonth
     * @param {?} selectedValue
     * @param {?} inputValue
     * @return {?}
     */
    function (opts, defaultMonth, selectedValue, inputValue) {
        this.opts = opts;
        var defaultView = opts.defaultView;
        this.initializeView(defaultMonth, selectedValue, inputValue);
        this.setCalendarVisibleMonth();
        this.setDefaultView(defaultView);
    };
    /**
     * @param {?} headerAction
     * @return {?}
     */
    CalendarComponent.prototype.headerAction = /**
     * @param {?} headerAction
     * @return {?}
     */
    function (headerAction) {
        var _a = this.opts, monthSelector = _a.monthSelector, yearSelector = _a.yearSelector;
        if (headerAction === HeaderAction.PrevBtnClick) {
            if (!this.prevViewDisabled) {
                this.onPrevNavigateBtnClicked();
            }
        }
        else if (headerAction === HeaderAction.NextBtnClick) {
            if (!this.nextViewDisabled) {
                this.onNextNavigateBtnClicked();
            }
        }
        else if (headerAction === HeaderAction.MonthBtnClick) {
            if (monthSelector) {
                this.onMonthViewBtnClicked();
            }
        }
        else if (headerAction === HeaderAction.YearBtnClick) {
            if (yearSelector) {
                this.onYearViewBtnClicked();
            }
        }
    };
    /**
     * @param {?} defaultView
     * @return {?}
     */
    CalendarComponent.prototype.setDefaultView = /**
     * @param {?} defaultView
     * @return {?}
     */
    function (defaultView) {
        if (defaultView === DefaultView.Month) {
            this.monthViewBtnClicked();
        }
        else if (defaultView === DefaultView.Year) {
            this.yearViewBtnClicked();
        }
    };
    /**
     * @param {?} calAnimation
     * @param {?} isOpen
     * @return {?}
     */
    CalendarComponent.prototype.setCalendarAnimation = /**
     * @param {?} calAnimation
     * @param {?} isOpen
     * @return {?}
     */
    function (calAnimation, isOpen) {
        var nativeElement = this.selectorEl.nativeElement;
        var renderer = this.renderer;
        /** @type {?} */
        var classIn = MY_DP_ANIMATION + ANIMATION_NAMES[calAnimation.in - 1];
        if (isOpen) {
            renderer.addClass(nativeElement, classIn + IN);
        }
        else {
            /** @type {?} */
            var classOut = MY_DP_ANIMATION + ANIMATION_NAMES[calAnimation.out - 1];
            renderer.removeClass(nativeElement, classIn + IN);
            renderer.addClass(nativeElement, classOut + OUT);
        }
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.resetDateValue = /**
     * @return {?}
     */
    function () {
        if (!this.opts.dateRange) {
            this.selectedDate = this.utilService.resetDate();
        }
        else {
            this.selectedDateRange.begin = this.utilService.resetDate();
            this.selectedDateRange.end = this.utilService.resetDate();
        }
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.clearDate = /**
     * @return {?}
     */
    function () {
        var _a = this.utilService.getToday(), month = _a.month, year = _a.year;
        this.selectedMonth = { monthNbr: month, year: year };
        this.resetDateValue();
        this.setCalendarVisibleMonth();
        this.resetMonthYearSelect();
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.resetMonthYearSelect = /**
     * @return {?}
     */
    function () {
        this.selectMonth = false;
        this.selectYear = false;
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.onMonthViewBtnClicked = /**
     * @return {?}
     */
    function () {
        this.viewChanged = true;
        this.monthViewBtnClicked();
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.monthViewBtnClicked = /**
     * @return {?}
     */
    function () {
        this.selectMonth = !this.selectMonth;
        this.selectYear = false;
        this.cdr.detectChanges();
        if (this.selectMonth) {
            this.generateMonths();
        }
        else {
            var _a = this.selectedMonth, year = _a.year, monthNbr = _a.monthNbr;
            this.visibleMonth = { monthTxt: this.opts.monthLabels[monthNbr], monthNbr: monthNbr, year: year };
            this.generateCalendar(monthNbr, year, true);
        }
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    CalendarComponent.prototype.onMonthCellClicked = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        this.viewChanged = true;
        var _a = this.visibleMonth, year = _a.year, monthNbr = _a.monthNbr;
        /** @type {?} */
        var monthChange = cell.nbr !== monthNbr;
        this.visibleMonth = { monthTxt: this.opts.monthLabels[cell.nbr], monthNbr: cell.nbr, year: year };
        this.selectedMonth.year = year;
        this.generateCalendar(cell.nbr, year, monthChange);
        this.selectMonth = false;
        this.focusToSelector();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CalendarComponent.prototype.onMonthCellKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Move focus by arrow keys
        var _a = this.getSourceRowAndColumnFromEvent(event), sourceRow = _a.sourceRow, sourceCol = _a.sourceCol;
        var _b = this.getTargetFocusRowAndColumn(event, sourceRow, sourceCol, MONTH_ROW_COUNT, MONTH_COL_COUNT), moveFocus = _b.moveFocus, targetRow = _b.targetRow, targetCol = _b.targetCol, direction = _b.direction;
        if (moveFocus) {
            this.focusCellElement(M, targetRow, targetCol, direction, MONTH_COL_COUNT);
        }
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.onYearViewBtnClicked = /**
     * @return {?}
     */
    function () {
        this.viewChanged = true;
        this.yearViewBtnClicked();
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.yearViewBtnClicked = /**
     * @return {?}
     */
    function () {
        this.selectYear = !this.selectYear;
        this.selectMonth = false;
        this.cdr.detectChanges();
        if (this.selectYear) {
            this.generateYears(this.visibleMonth.year);
        }
        else {
            var _a = this.selectedMonth, year = _a.year, monthNbr = _a.monthNbr;
            this.visibleMonth = { monthTxt: this.opts.monthLabels[monthNbr], monthNbr: monthNbr, year: year };
            this.generateCalendar(monthNbr, year, true);
        }
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    CalendarComponent.prototype.onYearCellClicked = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        this.viewChanged = true;
        var _a = this.visibleMonth, year = _a.year, monthNbr = _a.monthNbr, monthTxt = _a.monthTxt;
        /** @type {?} */
        var yc = cell.year !== year;
        this.visibleMonth = { monthTxt: monthTxt, monthNbr: monthNbr, year: cell.year };
        this.selectedMonth.year = cell.year;
        this.generateCalendar(monthNbr, cell.year, yc);
        this.selectYear = false;
        this.focusToSelector();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CalendarComponent.prototype.onYearCellKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Move focus by arrow keys
        var _a = this.getSourceRowAndColumnFromEvent(event), sourceRow = _a.sourceRow, sourceCol = _a.sourceCol;
        var _b = this.getTargetFocusRowAndColumn(event, sourceRow, sourceCol, YEAR_ROW_COUNT, YEAR_COL_COUNT), moveFocus = _b.moveFocus, targetRow = _b.targetRow, targetCol = _b.targetCol, direction = _b.direction;
        if (moveFocus) {
            this.focusCellElement(Y, targetRow, targetCol, direction, YEAR_COL_COUNT);
        }
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.generateMonths = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var today = this.utilService.getToday();
        this.months.length = 0;
        var _a = this.visibleMonth, year = _a.year, monthNbr = _a.monthNbr;
        var _b = this.opts, rtl = _b.rtl, monthLabels = _b.monthLabels;
        /** @type {?} */
        var row = 0;
        for (var i = 1; i <= 12; i += 3) {
            /** @type {?} */
            var rowData = [];
            /** @type {?} */
            var col = rtl ? 2 : 0;
            for (var j = i; j < i + 3; j++) {
                /** @type {?} */
                var disabled = this.utilService.isDisabledMonth(year, j, this.opts);
                rowData.push({
                    nbr: j,
                    year: year,
                    name: monthLabels[j],
                    currMonth: j === today.month && year === today.year,
                    selected: j === monthNbr && year === this.selectedMonth.year,
                    disabled: disabled,
                    row: row,
                    col: rtl ? col-- : col++
                });
            }
            row++;
            this.months.push(rowData);
        }
        this.setMonthViewHeaderBtnDisabledState(year);
    };
    /**
     * @param {?} inputYear
     * @return {?}
     */
    CalendarComponent.prototype.generateYears = /**
     * @param {?} inputYear
     * @return {?}
     */
    function (inputYear) {
        var _a = this.opts, minYear = _a.minYear, maxYear = _a.maxYear, rtl = _a.rtl;
        /** @type {?} */
        var y = inputYear - 12;
        if (inputYear < minYear) {
            y = minYear;
        }
        if (inputYear + 25 > maxYear) {
            y = maxYear - 24;
        }
        var year = this.visibleMonth.year;
        this.years.length = 0;
        /** @type {?} */
        var today = this.utilService.getToday();
        /** @type {?} */
        var row = 0;
        for (var i = y; i < y + 25; i += 5) {
            /** @type {?} */
            var rowData = [];
            /** @type {?} */
            var col = rtl ? 4 : 0;
            for (var j = i; j < i + 5; j++) {
                /** @type {?} */
                var disabled = this.utilService.isDisabledYear(j, this.opts);
                rowData.push({
                    year: j,
                    currYear: j === today.year,
                    selected: j === year,
                    disabled: disabled,
                    row: row,
                    col: rtl ? col-- : col++
                });
            }
            row++;
            this.years.push(rowData);
        }
        /** @type {?} */
        var beginYear = this.getYearValueByRowAndCol(0, 0);
        /** @type {?} */
        var endYear = beginYear + 24;
        this.yearsDuration = (!rtl ? beginYear : endYear) + YEAR_SEPARATOR + (!rtl ? endYear : beginYear);
        this.setYearViewHeaderBtnDisabledState(beginYear, endYear);
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.onTodayFooterClicked = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var date = this.utilService.getToday();
        this.selectDate(date);
    };
    /**
     * @param {?} row
     * @param {?} col
     * @return {?}
     */
    CalendarComponent.prototype.getYearValueByRowAndCol = /**
     * @param {?} row
     * @param {?} col
     * @return {?}
     */
    function (row, col) {
        var years = this.years;
        if (!years || years.length === 0) {
            var year = this.utilService.getToday().year;
            return year;
        }
        return years[row][col].year;
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.setCalendarVisibleMonth = /**
     * @return {?}
     */
    function () {
        // Sets visible month of calendar
        var _a = this.selectedMonth, year = _a.year, monthNbr = _a.monthNbr;
        this.visibleMonth = { monthTxt: this.opts.monthLabels[monthNbr], monthNbr: monthNbr, year: year };
        // Create current month
        this.generateCalendar(monthNbr, year, true);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CalendarComponent.prototype.onViewActivated = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.viewActivated(event);
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.onPrevNavigateBtnClicked = /**
     * @return {?}
     */
    function () {
        if (!this.selectMonth && !this.selectYear) {
            this.setDateViewMonth(false);
        }
        else if (this.selectMonth) {
            this.visibleMonth.year--;
            this.generateMonths();
        }
        else if (this.selectYear) {
            this.generateYears(this.getYearValueByRowAndCol(2, 2) - 25);
        }
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.onNextNavigateBtnClicked = /**
     * @return {?}
     */
    function () {
        if (!this.selectMonth && !this.selectYear) {
            this.setDateViewMonth(true);
        }
        else if (this.selectMonth) {
            this.visibleMonth.year++;
            this.generateMonths();
        }
        else if (this.selectYear) {
            this.generateYears(this.getYearValueByRowAndCol(2, 2) + 25);
        }
    };
    /**
     * @param {?} isNext
     * @return {?}
     */
    CalendarComponent.prototype.setDateViewMonth = /**
     * @param {?} isNext
     * @return {?}
     */
    function (isNext) {
        /** @type {?} */
        var change = isNext ? 1 : -1;
        var _a = this.visibleMonth, year = _a.year, monthNbr = _a.monthNbr;
        /** @type {?} */
        var d = this.utilService.getJsDate(year, monthNbr, 1);
        d.setMonth(d.getMonth() + change);
        /** @type {?} */
        var y = d.getFullYear();
        /** @type {?} */
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CalendarComponent.prototype.onCloseSelector = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (keyCode === KeyCode.esc) {
            this.closedByEsc();
        }
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    CalendarComponent.prototype.onDayCellClicked = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        // Cell clicked on the calendar
        this.selectDate(cell.dateObj);
        this.resetMonthYearSelect();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CalendarComponent.prototype.onDayCellKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Move focus by arrow keys
        var _a = this.getSourceRowAndColumnFromEvent(event), sourceRow = _a.sourceRow, sourceCol = _a.sourceCol;
        var _b = this.getTargetFocusRowAndColumn(event, sourceRow, sourceCol, DATE_ROW_COUNT, DATE_COL_COUNT), moveFocus = _b.moveFocus, targetRow = _b.targetRow, targetCol = _b.targetCol, direction = _b.direction;
        if (moveFocus) {
            this.focusCellElement(D, targetRow, targetCol, direction, DATE_COL_COUNT);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CalendarComponent.prototype.getSourceRowAndColumnFromEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var sourceRow = 0;
        /** @type {?} */
        var sourceCol = 0;
        if (event.target && event.target.id) {
            // value of id is for example: m_0_1 (first number = row, second number = column)
            /** @type {?} */
            var arr = event.target.id.split(UNDER_LINE);
            sourceRow = Number(arr[1]);
            sourceCol = Number(arr[2]);
        }
        return { sourceRow: sourceRow, sourceCol: sourceCol };
    };
    /**
     * @param {?} event
     * @param {?} row
     * @param {?} col
     * @param {?} rowCount
     * @param {?} colCount
     * @return {?}
     */
    CalendarComponent.prototype.getTargetFocusRowAndColumn = /**
     * @param {?} event
     * @param {?} row
     * @param {?} col
     * @param {?} rowCount
     * @param {?} colCount
     * @return {?}
     */
    function (event, row, col, rowCount, colCount) {
        /** @type {?} */
        var moveFocus = true;
        /** @type {?} */
        var targetRow = row;
        /** @type {?} */
        var targetCol = col;
        /** @type {?} */
        var direction = false;
        /** @type {?} */
        var keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (keyCode === KeyCode.upArrow && row > 0) {
            targetRow--;
        }
        else if (keyCode === KeyCode.downArrow && row < rowCount) {
            targetRow++;
            direction = true;
        }
        else if (keyCode === KeyCode.leftArrow && col > 0) {
            targetCol--;
        }
        else if (keyCode === KeyCode.rightArrow && col < colCount) {
            targetCol++;
            direction = true;
        }
        else {
            moveFocus = false;
        }
        return { moveFocus: moveFocus, targetRow: targetRow, targetCol: targetCol, direction: direction };
    };
    /**
     * @param {?} type
     * @param {?} row
     * @param {?} col
     * @param {?} direction
     * @param {?} colCount
     * @return {?}
     */
    CalendarComponent.prototype.focusCellElement = /**
     * @param {?} type
     * @param {?} row
     * @param {?} col
     * @param {?} direction
     * @param {?} colCount
     * @return {?}
     */
    function (type, row, col, direction, colCount) {
        /** @type {?} */
        var className = type + UNDER_LINE + row + UNDER_LINE + col;
        /** @type {?} */
        var elem = this.selectorEl.nativeElement.querySelector(DOT + className);
        if (elem.getAttribute(TABINDEX) !== ZERO_STR) {
            // if the selected element is disabled move a focus to next/previous enabled element
            /** @type {?} */
            var tdList = this.getCalendarElements();
            /** @type {?} */
            var idx = row * (colCount + 1) + col;
            /** @type {?} */
            var enabledElem = null;
            if (direction) {
                // find next enabled
                enabledElem = tdList.slice(idx).find((/**
                 * @param {?} td
                 * @return {?}
                 */
                function (td) { return td.getAttribute(TABINDEX) === ZERO_STR; }));
            }
            else {
                // find previous enabled
                enabledElem = tdList.slice(0, idx).reverse().find((/**
                 * @param {?} td
                 * @return {?}
                 */
                function (td) { return td.getAttribute(TABINDEX) === ZERO_STR; }));
            }
            elem = enabledElem ? enabledElem : this.selectorEl.nativeElement;
        }
        else {
            elem.focus();
        }
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.focusToSelector = /**
     * @return {?}
     */
    function () {
        this.selectorEl.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.getCalendarElements = /**
     * @return {?}
     */
    function () {
        return Array.from(this.selectorEl.nativeElement.querySelectorAll(TD_SELECTOR));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    CalendarComponent.prototype.selectDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        var _a = this.opts, dateRange = _a.dateRange, dateFormat = _a.dateFormat, monthLabels = _a.monthLabels, dateRangeDatesDelimiter = _a.dateRangeDatesDelimiter, closeSelectorOnDateSelect = _a.closeSelectorOnDateSelect;
        if (dateRange) {
            // Date range
            /** @type {?} */
            var isBeginDateInitialized = this.utilService.isInitializedDate(this.selectedDateRange.begin);
            /** @type {?} */
            var isEndDateInitialized = this.utilService.isInitializedDate(this.selectedDateRange.end);
            if (isBeginDateInitialized && isEndDateInitialized) {
                // both already selected - set begin date and reset end date
                this.selectedDateRange.begin = date;
                this.selectedDateRange.end = this.utilService.resetDate();
                this.rangeDateSelection({
                    isBegin: true,
                    date: date,
                    jsDate: this.utilService.myDateToJsDate(date),
                    dateFormat: dateFormat,
                    formatted: this.utilService.formatDate(date, dateFormat, monthLabels),
                    epoc: this.utilService.getEpocTime(date)
                });
            }
            else if (!isBeginDateInitialized) {
                // begin date
                this.selectedDateRange.begin = date;
                this.rangeDateSelection({
                    isBegin: true,
                    date: date,
                    jsDate: this.utilService.myDateToJsDate(date),
                    dateFormat: dateFormat,
                    formatted: this.utilService.formatDate(date, dateFormat, monthLabels),
                    epoc: this.utilService.getEpocTime(date)
                });
            }
            else {
                // second selection
                /** @type {?} */
                var firstDateEarlier = this.utilService.isDateEarlier(date, this.selectedDateRange.begin);
                if (firstDateEarlier) {
                    this.selectedDateRange.begin = date;
                    this.rangeDateSelection({
                        isBegin: true,
                        date: date,
                        jsDate: this.utilService.myDateToJsDate(date),
                        dateFormat: dateFormat,
                        formatted: this.utilService.formatDate(date, dateFormat, monthLabels),
                        epoc: this.utilService.getEpocTime(date)
                    });
                }
                else {
                    this.selectedDateRange.end = date;
                    this.rangeDateSelection({
                        isBegin: false,
                        date: date,
                        jsDate: this.utilService.myDateToJsDate(date),
                        dateFormat: dateFormat,
                        formatted: this.utilService.formatDate(date, dateFormat, monthLabels),
                        epoc: this.utilService.getEpocTime(date)
                    });
                    this.dateChanged(this.utilService.getDateModel(null, this.selectedDateRange, dateFormat, monthLabels, dateRangeDatesDelimiter), closeSelectorOnDateSelect);
                }
            }
        }
        else {
            // Single date
            this.selectedDate = date;
            this.dateChanged(this.utilService.getDateModel(this.selectedDate, null, dateFormat, monthLabels, dateRangeDatesDelimiter), closeSelectorOnDateSelect);
        }
    };
    /**
     * @param {?} y
     * @param {?} m
     * @return {?}
     */
    CalendarComponent.prototype.monthStartIdx = /**
     * @param {?} y
     * @param {?} m
     * @return {?}
     */
    function (y, m) {
        // Month start index
        /** @type {?} */
        var d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        /** @type {?} */
        var idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    };
    /**
     * @param {?} d
     * @param {?} m
     * @param {?} y
     * @param {?} today
     * @return {?}
     */
    CalendarComponent.prototype.isCurrDay = /**
     * @param {?} d
     * @param {?} m
     * @param {?} y
     * @param {?} today
     * @return {?}
     */
    function (d, m, y, today) {
        // Check is a given date the today
        return d === today.day && m === today.month && y === today.year;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    CalendarComponent.prototype.getDayNumber = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        // Get day number: su=0, mo=1, tu=2, we=3 ...
        var year = date.year, month = date.month, day = date.day;
        /** @type {?} */
        var d = this.utilService.getJsDate(year, month, day);
        return d.getDay();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    CalendarComponent.prototype.getWeekday = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        // Get weekday: su, mo, tu, we ...
        return this.weekDayOpts[this.getDayNumber(date)];
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.sundayIdx = /**
     * @return {?}
     */
    function () {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    };
    /**
     * @param {?} m
     * @param {?} y
     * @param {?} notifyChange
     * @return {?}
     */
    CalendarComponent.prototype.generateCalendar = /**
     * @param {?} m
     * @param {?} y
     * @param {?} notifyChange
     * @return {?}
     */
    function (m, y, notifyChange) {
        this.dates.length = 0;
        /** @type {?} */
        var today = this.utilService.getToday();
        /** @type {?} */
        var monthStart = this.monthStartIdx(y, m);
        /** @type {?} */
        var dInThisM = this.utilService.datesInMonth(m, y);
        /** @type {?} */
        var dInPrevM = this.utilService.datesInPrevMonth(m, y);
        /** @type {?} */
        var dayNbr = 1;
        /** @type {?} */
        var month = m;
        /** @type {?} */
        var cmo = MonthId.prev;
        var _a = this.opts, rtl = _a.rtl, showWeekNumbers = _a.showWeekNumbers, firstDayOfWeek = _a.firstDayOfWeek;
        for (var i = 1; i < 7; i++) {
            /** @type {?} */
            var col = rtl ? 6 : 0;
            /** @type {?} */
            var week = [];
            if (i === 1) {
                // First week
                /** @type {?} */
                var pm = dInPrevM - monthStart + 1;
                // Previous month
                for (var j = pm; j <= dInPrevM; j++) {
                    /** @type {?} */
                    var date = { year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: j };
                    week.push({
                        dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(j, month - 1, y, today),
                        disabledDate: this.utilService.isDisabledDate(date, this.opts),
                        markedDate: this.utilService.isMarkedDate(date, this.opts),
                        highlight: this.utilService.isHighlightedDate(date, this.opts),
                        row: i - 1,
                        col: rtl ? col-- : col++,
                        dateData: this.opts.dateData && this.opts.dateData[date.day + "-" + date.month + "-" + date.year] ? this.opts.dateData[date.day + "-" + date.month + "-" + date.year] : null
                    });
                }
                cmo = MonthId.curr;
                // Current month
                /** @type {?} */
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    /** @type {?} */
                    var date = { year: y, month: m, day: dayNbr };
                    week.push({
                        dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(dayNbr, m, y, today),
                        disabledDate: this.utilService.isDisabledDate(date, this.opts),
                        markedDate: this.utilService.isMarkedDate(date, this.opts),
                        highlight: this.utilService.isHighlightedDate(date, this.opts),
                        row: i - 1,
                        col: rtl ? col-- : col++,
                        dateData: this.opts.dateData && this.opts.dateData[date.day + "-" + date.month + "-" + date.year] ? this.opts.dateData[date.day + "-" + date.month + "-" + date.year] : null
                    });
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = MonthId.next;
                        month = m + 1;
                    }
                    /** @type {?} */
                    var date = { year: cmo === MonthId.next && m === 12 ? y + 1 : y, month: cmo === MonthId.curr ? m : cmo === MonthId.next && m < 12 ? m + 1 : 1, day: dayNbr };
                    week.push({
                        dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(dayNbr, month, y, today),
                        disabledDate: this.utilService.isDisabledDate(date, this.opts),
                        markedDate: this.utilService.isMarkedDate(date, this.opts),
                        highlight: this.utilService.isHighlightedDate(date, this.opts),
                        row: i - 1,
                        col: rtl ? col-- : col++,
                        dateData: this.opts.dateData && this.opts.dateData[date.day + "-" + date.month + "-" + date.year] ? this.opts.dateData[date.day + "-" + date.month + "-" + date.year] : null
                    });
                    dayNbr++;
                }
            }
            /** @type {?} */
            var weekNbr = showWeekNumbers && firstDayOfWeek === MO ? this.utilService.getWeekNumber(week[0].dateObj) : 0;
            this.dates.push({ week: week, weekNbr: weekNbr });
        }
        this.setDateViewHeaderBtnDisabledState(m, y);
        if (notifyChange) {
            // Notify parent
            this.calendarViewChanged({ year: y, month: m, first: { number: 1, weekday: this.getWeekday({ year: y, month: m, day: 1 }) }, last: { number: dInThisM, weekday: this.getWeekday({ year: y, month: m, day: dInThisM }) } });
        }
    };
    /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    CalendarComponent.prototype.setDateViewHeaderBtnDisabledState = /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    function (m, y) {
        /** @type {?} */
        var dpm = false;
        /** @type {?} */
        var dnm = false;
        var _a = this.opts, disableHeaderButtons = _a.disableHeaderButtons, disableUntil = _a.disableUntil, disableSince = _a.disableSince, enableDates = _a.enableDates, minYear = _a.minYear, maxYear = _a.maxYear, rtl = _a.rtl;
        if (disableHeaderButtons) {
            /** @type {?} */
            var duDate = { year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: this.utilService.datesInMonth(m === 1 ? 12 : m - 1, m === 1 ? y - 1 : y) };
            /** @type {?} */
            var dsDate = { year: m === 12 ? y + 1 : y, month: m === 12 ? 1 : m + 1, day: 1 };
            dpm = this.utilService.isDisabledByDisableUntil(duDate, disableUntil)
                && !this.utilService.isPastDatesEnabled(duDate, enableDates);
            dnm = this.utilService.isDisabledByDisableSince(dsDate, disableSince)
                && !this.utilService.isFutureDatesEnabled(dsDate, enableDates);
        }
        this.prevViewDisabled = m === 1 && y === minYear || dpm;
        this.nextViewDisabled = m === 12 && y === maxYear || dnm;
        if (rtl) {
            this.swapHeaderBtnDisabled();
        }
    };
    /**
     * @param {?} y
     * @return {?}
     */
    CalendarComponent.prototype.setMonthViewHeaderBtnDisabledState = /**
     * @param {?} y
     * @return {?}
     */
    function (y) {
        /** @type {?} */
        var dpm = false;
        /** @type {?} */
        var dnm = false;
        var _a = this.opts, disableHeaderButtons = _a.disableHeaderButtons, disableUntil = _a.disableUntil, disableSince = _a.disableSince, enableDates = _a.enableDates, minYear = _a.minYear, maxYear = _a.maxYear, rtl = _a.rtl;
        if (disableHeaderButtons) {
            /** @type {?} */
            var duDate = { year: y - 1, month: 12, day: 31 };
            /** @type {?} */
            var dsDate = { year: y + 1, month: 1, day: 1 };
            dpm = this.utilService.isDisabledByDisableUntil(duDate, disableUntil)
                && !this.utilService.isPastDatesEnabled(duDate, enableDates);
            dnm = this.utilService.isDisabledByDisableSince(dsDate, disableSince)
                && !this.utilService.isFutureDatesEnabled(dsDate, enableDates);
        }
        this.prevViewDisabled = y === minYear || dpm;
        this.nextViewDisabled = y === maxYear || dnm;
        if (rtl) {
            this.swapHeaderBtnDisabled();
        }
    };
    /**
     * @param {?} yp
     * @param {?} yn
     * @return {?}
     */
    CalendarComponent.prototype.setYearViewHeaderBtnDisabledState = /**
     * @param {?} yp
     * @param {?} yn
     * @return {?}
     */
    function (yp, yn) {
        /** @type {?} */
        var dpy = false;
        /** @type {?} */
        var dny = false;
        var _a = this.opts, disableHeaderButtons = _a.disableHeaderButtons, disableUntil = _a.disableUntil, disableSince = _a.disableSince, enableDates = _a.enableDates, minYear = _a.minYear, maxYear = _a.maxYear, rtl = _a.rtl;
        if (disableHeaderButtons) {
            /** @type {?} */
            var duDate = { year: yp - 1, month: 12, day: 31 };
            /** @type {?} */
            var dsDate = { year: yn + 1, month: 1, day: 1 };
            dpy = this.utilService.isDisabledByDisableUntil(duDate, disableUntil)
                && !this.utilService.isPastDatesEnabled(duDate, enableDates);
            dny = this.utilService.isDisabledByDisableSince(dsDate, disableSince)
                && !this.utilService.isFutureDatesEnabled(dsDate, enableDates);
        }
        this.prevViewDisabled = yp <= minYear || dpy;
        this.nextViewDisabled = yn >= maxYear || dny;
        if (rtl) {
            this.swapHeaderBtnDisabled();
        }
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.swapHeaderBtnDisabled = /**
     * @return {?}
     */
    function () {
        var _a;
        _a = __read([this.nextViewDisabled, this.prevViewDisabled], 2), this.prevViewDisabled = _a[0], this.nextViewDisabled = _a[1];
    };
    CalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: "lib-angular-mydatepicker-calendar",
                    template: "<span #styleEl></span>\n<div class=\"ng-mydp {{opts.stylesData?.selector || ''}}\">\n  <div class=\"myDpSelector\" #selectorEl \n    [libAngularMyDatePickerCalendar]=\"{inline: opts.inline, selectorWidth: opts.selectorWidth, selectorHeight: opts.selectorHeight, selectorPos: selectorPos}\" \n    [ngClass]=\"{'myDpSelectorArrow': opts.showSelectorArrow, 'myDpSelectorArrowLeft': opts.showSelectorArrow && !opts.alignSelectorRight, \n      'myDpSelectorArrowRight': opts.showSelectorArrow&&opts.alignSelectorRight, 'myDpSelectorAbsolute': !opts.inline, 'myDpSelectorPosInitial': opts.inline}\" \n    (keyup)=\"onCloseSelector($event)\" tabindex=\"0\">\n\n    <lib-selection-bar [opts]=\"opts\" [yearsDuration]=\"yearsDuration\" [visibleMonth]=\"visibleMonth\" [selectMonth]=\"selectMonth\" [selectYear]=\"selectYear\"\n                    [prevViewDisabled]=\"prevViewDisabled\" [nextViewDisabled]=\"nextViewDisabled\"\n                    (prevNavigateBtnClicked)=\"onPrevNavigateBtnClicked()\" (nextNavigateBtnClicked)=\"onNextNavigateBtnClicked()\"\n                    (monthViewBtnClicked)=\"onMonthViewBtnClicked()\" (yearViewBtnClicked)=\"onYearViewBtnClicked()\"></lib-selection-bar>\n\n    <lib-day-view *ngIf=\"!selectMonth && !selectYear\" [opts]=\"opts\" [dates]=\"dates\" [weekDays]=\"weekDays\"\n                    [selectedDate]=\"selectedDate\" [selectedDateRange]=\"selectedDateRange\" [viewChanged]=\"viewChanged\"\n                    (dayCellClicked)=\"onDayCellClicked($event)\"\n                    (dayCellKeyDown)=\"onDayCellKeyDown($event)\"\n                    (viewActivated)=\"onViewActivated($event)\"></lib-day-view>\n\n    <lib-month-view *ngIf=\"selectMonth\" [opts]=\"opts\" [months]=\"months\" [viewChanged]=\"viewChanged\"\n                    (monthCellClicked)=\"onMonthCellClicked($event)\"\n                    (monthCellKeyDown)=\"onMonthCellKeyDown($event)\"\n                    (viewActivated)=\"onViewActivated($event)\"></lib-month-view>\n\n    <lib-year-view *ngIf=\"selectYear\" [opts]=\"opts\" [years]=\"years\" [viewChanged]=\"viewChanged\"\n                    (yearCellClicked)=\"onYearCellClicked($event)\"\n                    (yearCellKeyDown)=\"onYearCellKeyDown($event)\"\n                    (viewActivated)=\"onViewActivated($event)\"></lib-year-view>\n\n    <lib-footer-bar *ngIf=\"opts.showFooterToday\" [opts]=\"opts\"\n                    (footerBarTxtClicked)=\"onTodayFooterClicked()\"></lib-footer-bar>\n  </div>\n</div>\n",
                    providers: [UtilService],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".ng-mydp{position:static}.ng-myrtl{direction:rtl}.ng-mydp *{box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;padding:0;margin:0}.ng-mydp table{display:table;border-spacing:0}.ng-mydp table td,.ng-mydp table th{padding:0;margin:0;vertical-align:middle;border:none}.myDpSelector{padding:4px;border:1px solid #ccc;background-color:#fff;border-radius:4px;z-index:100000}.myDpViewChangeAnimation{-webkit-animation:.2s linear myDpViewChangeAnimation;animation:.2s linear myDpViewChangeAnimation}.myDpContainer{display:flex;flex-direction:column}@-webkit-keyframes myDpViewChangeAnimation{0%{transform:scale(.75);opacity:.1}100%{transform:scale(1);opacity:1}}@keyframes myDpViewChangeAnimation{0%{transform:scale(.75);opacity:.1}100%{transform:scale(1);opacity:1}}.myDpAnimationFadeIn{-webkit-animation:.5s linear myDpAnimationFadeIn;animation:.5s linear myDpAnimationFadeIn}@-webkit-keyframes myDpAnimationFadeIn{0%{transform:translateY(-50px);opacity:0}100%{transform:translateY(0);opacity:1}}@keyframes myDpAnimationFadeIn{0%{transform:translateY(-50px);opacity:0}100%{transform:translateY(0);opacity:1}}.myDpAnimationFadeOut{-webkit-animation:.3s linear forwards myDpAnimationFadeOut;animation:.3s linear forwards myDpAnimationFadeOut}@-webkit-keyframes myDpAnimationFadeOut{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-50px);opacity:0}}@keyframes myDpAnimationFadeOut{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-50px);opacity:0}}.myDpAnimationScaleTopIn{-webkit-animation:.3s linear myDpAnimationScaleTopIn;animation:.3s linear myDpAnimationScaleTopIn}@-webkit-keyframes myDpAnimationScaleTopIn{0%{transform:scaleY(0);transform-origin:100% 0}100%{transform:scaleY(1);transform-origin:100% 0}}@keyframes myDpAnimationScaleTopIn{0%{transform:scaleY(0);transform-origin:100% 0}100%{transform:scaleY(1);transform-origin:100% 0}}.myDpAnimationScaleTopOut{-webkit-animation:.3s linear forwards myDpAnimationScaleTopOut;animation:.3s linear forwards myDpAnimationScaleTopOut}@-webkit-keyframes myDpAnimationScaleTopOut{0%{transform:scaleY(1);transform-origin:100% 0;opacity:1}100%{transform:scaleY(0);transform-origin:100% 0;opacity:0}}@keyframes myDpAnimationScaleTopOut{0%{transform:scaleY(1);transform-origin:100% 0;opacity:1}100%{transform:scaleY(0);transform-origin:100% 0;opacity:0}}.myDpAnimationScaleCenterIn{-webkit-animation:.3s linear myDpAnimationScaleCenterIn;animation:.3s linear myDpAnimationScaleCenterIn}@-webkit-keyframes myDpAnimationScaleCenterIn{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes myDpAnimationScaleCenterIn{0%{transform:scale(0)}100%{transform:scale(1)}}.myDpAnimationScaleCenterOut{-webkit-animation:.3s linear forwards myDpAnimationScaleCenterOut;animation:.3s linear forwards myDpAnimationScaleCenterOut}@-webkit-keyframes myDpAnimationScaleCenterOut{0%{transform:scale(1);opacity:1}100%{transform:scale(0);opacity:0}}@keyframes myDpAnimationScaleCenterOut{0%{transform:scale(1);opacity:1}100%{transform:scale(0);opacity:0}}.myDpAnimationRotateIn{-webkit-animation:.3s linear myDpAnimationRotateIn;animation:.3s linear myDpAnimationRotateIn}@-webkit-keyframes myDpAnimationRotateIn{0%{transform:scale(.3) rotate(-45deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}@keyframes myDpAnimationRotateIn{0%{transform:scale(.3) rotate(-45deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}.myDpAnimationRotateOut{-webkit-animation:.3s linear forwards myDpAnimationRotateOut;animation:.3s linear forwards myDpAnimationRotateOut}@-webkit-keyframes myDpAnimationRotateOut{0%{transform:scale(1) rotate(0);opacity:1}100%{transform:scale(.3) rotate(-45deg);opacity:0}}@keyframes myDpAnimationRotateOut{0%{transform:scale(1) rotate(0);opacity:1}100%{transform:scale(.3) rotate(-45deg);opacity:0}}.myDpAnimationFlipDiagonalIn{-webkit-animation:.3s linear myDpAnimationFlipDiagonalIn;animation:.3s linear myDpAnimationFlipDiagonalIn}@-webkit-keyframes myDpAnimationFlipDiagonalIn{0%{transform:rotate3d(1,1,0,-78deg)}100%{transform:rotate3d(1,1,0,0deg)}}@keyframes myDpAnimationFlipDiagonalIn{0%{transform:rotate3d(1,1,0,-78deg)}100%{transform:rotate3d(1,1,0,0deg)}}.myDpAnimationFlipDiagonalOut{-webkit-animation:.3s linear forwards myDpAnimationFlipDiagonalOut;animation:.3s linear forwards myDpAnimationFlipDiagonalOut}@-webkit-keyframes myDpAnimationFlipDiagonalOut{0%{transform:rotate3d(1,1,0,0deg);opacity:1}100%{transform:rotate3d(1,1,0,78deg);opacity:0}}@keyframes myDpAnimationFlipDiagonalOut{0%{transform:rotate3d(1,1,0,0deg);opacity:1}100%{transform:rotate3d(1,1,0,78deg);opacity:0}}.myDpSelectorAbsolute{position:absolute}.myDpSelectorPosInitial{position:initial}.myDpSelector:focus{box-shadow:-1px 1px 6px 0 #add8e6;outline:0}.myDpSelectorArrow{background:#fff}.myDpSelectorArrow:after,.myDpSelectorArrow:before{bottom:100%;border:solid transparent;content:\" \";height:0;width:0;position:absolute}.myDpSelectorArrow:after{border-color:rgba(250,250,250,0);border-bottom-color:#fafafa;border-width:10px;margin-left:-10px}.myDpSelectorArrow:before{border-color:rgba(204,204,204,0);border-bottom-color:#ccc;border-width:11px;margin-left:-11px}.myDpSelectorArrow:focus:before{border-bottom-color:#add8e6}.myDpSelectorArrowLeft:after,.myDpSelectorArrowLeft:before{left:24px}.myDpSelectorArrowRight:after,.myDpSelectorArrowRight:before{left:86%}::-ms-clear{display:none}.myDpCalTable,.myDpFooterBar,.myDpMonthTable,.myDpYearTable{border-radius:0 0 4px 4px}.myDpCalTable.myDpNoFooter tbody tr:nth-child(6) td:first-child,.myDpMonthTable.myDpNoFooter tbody tr:nth-child(4) td:first-child,.myDpYearTable.myDpNoFooter tbody tr:nth-child(5) td:first-child{border-bottom-left-radius:4px}.myDpCalTable.myDpNoFooter tbody tr:nth-child(6) td:last-child,.myDpMonthTable.myDpNoFooter tbody tr:nth-child(4) td:last-child,.myDpYearTable.myDpNoFooter tbody tr:nth-child(5) td:last-child{border-bottom-right-radius:4px}.myDpCalTable,.myDpMonthTable,.myDpYearTable{table-layout:fixed;width:100%;background-color:#fff;font-size:14px}.myDpFooter{height:calc(100% - 60px)}.myDpNoFooter{height:calc(100% - 30px)}.myDpCalTable,.myDpDaycell,.myDpMonthTable,.myDpMonthcell,.myDpWeekDayTitle,.myDpYearTable,.myDpYearcell{border-collapse:collapse;color:#333;line-height:1.1}.myDpDaycell,.myDpMonthcell,.myDpYearcell{padding:4px;text-align:center;outline:0}.myDpDaycell{background-color:#fff;position:relative}.myDpWeekDayTitle{background-color:transparent;color:#333;font-size:13px;font-weight:400;vertical-align:middle;max-width:36px;overflow:hidden;white-space:nowrap;height:23px;text-align:center}.myDpWeekDayTitleWeekNbr{width:20px}.myDpMonthcell{background-color:#fff;overflow:hidden;white-space:nowrap}.myDpYearcell{background-color:#fff;width:20%}.myDpMonthNbr{font-size:10px;display:block}.myDpDaycellWeekNbr{font-size:9px;cursor:default;text-align:center;color:#333}.myDpNextMonth,.myDpPrevMonth{color:#999}.myDpMonthYearSelBar{display:flex;height:30px;background-color:#fff;border-top-left-radius:4px;border-top-right-radius:4px}.myDpPrevBtn{margin-left:10px}.myDpNextBtn{margin-left:auto;margin-right:10px}.myDpMonthYearText{width:100%;line-height:30px;text-align:center}.myDpFooterBar{display:flex;align-items:center;justify-content:center;height:30px;background-color:#fff}.myDpHeaderBtn{background:0 0;padding:0;border:none;line-height:30px;height:28px;margin-top:1px;color:#000;outline:0;cursor:default}.myDpFooterBtn{margin:0 10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.myDpMonthBtn,.myDpYearBtn{font-size:16px}.myDpMonthBtn{margin-right:6px}.myDpHighlight{color:#c30000}.myDpDimDay{opacity:.5}.myDpCurrMonth{background-color:#fff;font-weight:400}.myDpMarkDate{position:absolute;top:2px;left:2px;border-right:8px solid transparent}.myDpMarkCurrDay,.myDpMarkCurrMonth,.myDpMarkCurrYear{border-bottom:2px solid #333}.myDpHeaderLabelBtnNotEdit{cursor:default}.myDpHeaderBtn::-moz-focus-inner,.myDpNextBtn::-moz-focus-inner,.myDpPrevBtn::-moz-focus-inner{border:0}.myDpFooterBtn:focus,.myDpHeaderBtn:focus,.myDpMonthLabel:focus,.myDpYearLabel:focus{color:#66afe9;outline:0}.myDpDaycell:focus,.myDpMonthcell:focus,.myDpYearcell:focus{box-shadow:inset 0 0 0 1px #66afe9}.myDpTableSingleDay:hover,.myDpTableSingleMonth:hover,.myDpTableSingleYear:hover{background-color:#ddd}.myDpDaycell,.myDpMonthLabel,.myDpMonthcell,.myDpYearLabel,.myDpYearcell{cursor:pointer}.myDpFooterBtn:hover,.myDpHeaderBtnEnabled:hover,.myDpMonthLabel:hover,.myDpYearLabel:hover{color:#777}.myDpHeaderBtnEnabled{cursor:pointer}.myDpHeaderBtnDisabled{cursor:not-allowed;opacity:.65}.myDpDisabled{cursor:default;color:#777;background:repeating-linear-gradient(-45deg,#ccc 7px,#ccc 8px,transparent 7px,transparent 14px)}.myDpRangeColor{background-color:#dbeaff}.myDpRangeBegin,.myDpRangeEnd,.myDpSelectedDay,.myDpSelectedMonth,.myDpSelectedYear{border:none;background-color:#8ebfff}@font-face{font-family:angular-mydatepicker;src:url(data:application/octet-stream;base64,d09GRgABAAAAAAs4AA8AAAAAE+gAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABWAAAADsAAABUIIslek9TLzIAAAGUAAAAQwAAAFY+IEi5Y21hcAAAAdgAAABQAAABfohD7KljdnQgAAACKAAAABMAAAAgBtX/BGZwZ20AAAI8AAAFkAAAC3CKkZBZZ2FzcAAAB8wAAAAIAAAACAAAABBnbHlmAAAH1AAAAL8AAAEAS//bfWhlYWQAAAiUAAAAMQAAADYW6nhraGhlYQAACMgAAAAbAAAAJAc8A1ZobXR4AAAI5AAAAAwAAAAMCXwAAGxvY2EAAAjwAAAACAAAAAgAQACAbWF4cAAACPgAAAAgAAAAIACmC5tuYW1lAAAJGAAAAXcAAALNzJ0fIXBvc3QAAAqQAAAAKwAAAEAj+eC8cHJlcAAACrwAAAB6AAAAhuVBK7x4nGNgZGBg4GIwYLBjYHJx8wlh4MtJLMljkGJgYYAAkDwymzEnMz2RgQPGA8qxgGkOIGaDiAIAJjsFSAB4nGNgZNZknMDAysDAVMW0h4GBoQdCMz5gMGRkAooysDIzYAUBaa4pDA4vGF4wMgf9z2KIYg5imAYUZgTJAQDMhAtXAHic7ZCxDYAwDATPiaFAjEFBwTBU7F+yRfK2GYOX7qR/uTKwAF1cwsEejMit1XLvbLk7R9547K+NIRNW93STVv7s6fNrLf5U1OcK2gTMuAtdeJxjYEADEhDIHPQ/C4QBEmwD3QB4nK1WaXfTRhQdeUmchCwlCy1qYcTEabBGJmzBgAlBsmMgXZytlaCLFDvpvvGJ3+Bf82Tac+g3flrvGy8kkLTncJqTo3fnzdXM22USWpLYC+uRlJsvxdTWJo3sPAnphk3LUXwoO3shZYrJ3wVREK2W2rcdh0REIlC1rrBEEPseWZpkfOhRRsu2pFdNyi096S5b40G9Vd9+GjrKsTuhpGYzdGg9siVVGFWiSKY9UtKmZaj6K0krvL/CzFfNUMKITiJpvBnG0EjeG2e0ymg1tuMoimyy3ChSJJrhQRR5lNUS5+SKCQzKB82Q8sqnEeXD/Iis2KOcVrBLttP8vi95p3c5P7Ffb1G25EAfyI7s4Ox0JV+EW1th3LST7ShUEXbXd0Js2exU/2aP8ppGA7crMr3QjGCpfIUQKz+hzP4hWS2cT/mSR6NaspETQetlTuxLPoHW44gpcc0YWdDd0QkR1P2SMwz2mD4e/PHeKZYLEwJ4HMt6RyWcCBMpYXM0SdowcmAlZYsqqfWumDjldVrEW8J+7drRl85o41B3YjxbDx1bOVHJ8WhSp5lMndpJzaMpDaKUdCZ4zK8DKD+iSV5tYzWJlUfTOGbGhEQiAi3cS1NBLDuxpCkEzaMZvbkbprl2LVqkyQP13KP39OZWuLnTU9oO9LNGf1anYjrYC9PpaeQv8Wna5SJF6frpGX5M4kHWAjKRLTbDlIMHb/0O0svXlhyF1wbY7u3zK6h91kTwpAH7G9AeT9UpCUyFmFWIVkBirWtZlsnVrBapyNR3Q5pWvqzTBIpyHBfHvoxx/V8zM5aYEr7fidOzIy49c+1LCNMcfJt1PZrXqcVyAXFmeU6nWZbv6zTH8gOd5lme1+kIS1unoyw/1GmB5Uc6HWN5QQuadN/BkIsw5AIOkDCEpQNDWF6CISwVDGG5CENYFmEIyyUYwvJjGMJyGYawvKxl1dRTSePamVgGbEJgYo4eucxF5WoquVRCu2hUakOeEm6VVBTPqn9loF488oY5sBZIl8iaXzHOlY9G5fjWFS1vGjtXwLHqbx+O9jnxUtaLhT8F/9XWVCW9Ys3Dk6vwG4aebCeqNql4dE2Xz1U9uv5fVFRYC/QbSIVYKMqybHBnIoSPOp2GaqCVQ8xszDy063XLmp/D/TcxQhZQ/fg3FBoL3INOWUlZ7eCs1dfbstw7g3I4EyxJMTfz+lb4IiOz0n6RWcqej3wecAWMSmXYagOtFbzZJzEPmd4kzwRxW1E2SNrYzgSJDRzzgHnznQQmYeqqDeRO4YYN+AVhbsF5J1yieqMsh+5F7PMopPxbp+JE9qhojMCz2Rthr+9Cym9xDCQ0+aV+DFQVoakYNRXQNFJuqAZfxtm6bULGDvQjKnbDsqziw8cW95WSbRmEfKSI1aOjn9Zeok6q3H5mFJfvnb4FwSA1MX9733RxkMq7WskyR20DU7calVPXmkPjVYfq5lH1vePsEzlrmm66Jx56X9Oq28HFXCyw9m0O0lImF9T1YYUNosvFpVDqZTRJ77gHGBYY0O9Qio3/q/rYfJ4rVYXRcSTfTtS30edgDPwP2H9H9QPQ92Pocg0uz/eaE59u9OFsma6iF+un6Dcwa625WboG3NB0A+IhR62OuMoNfKcGcXqkuRzpIeBj3RXiAcAmgMXgE921jOZTAKP5jDk+wOfMYdBkDoMt5jDYZs4awA5zGOwyh8Eecxh8wZx1gC+ZwyBkDoOIOQyeMCcAeMocBl8xh8HXzGHwDXPuA3zLHAYxcxgkzGGwr+nWMMwtXtBdoLZBVaADU09Y3MPiUFNlyP6OF4b9vUHM/sEgpv6o6faQ+hMvDPVng5j6i0FM/VXTnSH1N14Y6u8GMfUPg5j6TL8Yy2UGv4x8lwoHlF1sPufvifcP28VAuQABAAH//wAPeJxjYGRg+H+AaQazC4MIg+5WRkYGRkZ37w0qAREO3AwMjAwFQD4Po6e0AyeQw5jPwMCQFrlFXJyJVUybk0lMhJ+RTUmdUc3EnNHMSJ5RTISp7991Rk0urlhuGe5/SdzcjPO45LhiuZhW/bvx7zqYycU4H0gzzuPmjuWSYwBZAbK/BGo/J1H2ywiB7QfarQ+ymxNI2AMdIA5yQBbQWhnuWKDVGv9ugC0BWsbFmPkvEeIqRk1GDYgCkEIGAB9cLoQAeJxjYGRgYABic9F3f+P5bb4ycDO/AIow3Pw4yxFB/z/A/ILZBcjlYGACiQIAcjgNFAAAAHicY2BkYGAO+p8FJF8wMIBJRgZUwAwAXPcDmgAD6AAAAsoAAALKAAAAAAAAAEAAgAABAAAAAwAVAAEAAAAAAAIABAAUAHMAAAAqC3AAAAAAeJx1kMtOwkAUhv+RiwqJGk3cOisDMZZL4gISEhIMbHRDDFtTSmlLSodMBxJew3fwYXwJn8WfdjAGYpvpfOebM2dOB8A1viGQP08cOQucMcr5BKfoWS7QP1sukl8sl1DFm+Uy/bvlCh4QWK7iBh+sIIrnjBb4tCxwJS4tn+BC3Fku0D9aLpJ7lku4Fa+Wy/Se5QomIrVcxb34GqjVVkdBaGRtUJftZqsjp1upqKLEjaW7NqHSqezLuUqMH8fK8dRyz2M/WMeu3of7eeLrNFKJbDnNvRr5ia9d48921dNN0DZmLudaLeXQZsiVVgvfM05ozKrbaPw9DwMorLCFRsSrCmEgUaOtc26jiRY6pCkzJDPzrAgJXMQ0LtbcEWYrKeM+x5xRQuszIyY78PhdHvkxKeD+mFX00ephPCHtzogyL9mXw+4Os0akJMt0Mzv77T3Fhqe1aQ137brUWVcSw4MakvexW1vQePROdiuGtosG33/+7wfseIRVAHicY2BigAAuBuyAmZGJkZmRhYEzJzWtRDe/IDWPqygzPQPCZGAAAGN+B7YAeJxj8N7BcCIoYiMjY1/kBsadHAwcDMkFGxlYnTYxMDJogRibuZgYOSAsPgYwi81pF9MBoDQnkM3utIvBAcJmZnDZqMLYERixwaEjYiNzistGNRBvF0cDAyOLQ0dySARISSQQbOZhYuTR2sH4v3UDS+9GJgYXAAx2I/QAAA==) format('woff');font-weight:400;font-style:normal}.myDpIcon{font-family:angular-mydatepicker;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#222;font-size:20px}.myDpIconLeftArrow:before{content:\"\\e800\"}.myDpIconRightArrow:before{content:\"\\e801\"}"]
                }] }
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: UtilService }
    ]; };
    CalendarComponent.propDecorators = {
        selectorEl: [{ type: ViewChild, args: ["selectorEl",] }],
        styleEl: [{ type: ViewChild, args: ["styleEl",] }],
        position: [{ type: HostBinding, args: ["style.position",] }]
    };
    return CalendarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SelectionBarComponent = /** @class */ (function () {
    function SelectionBarComponent() {
        this.prevNavigateBtnClicked = new EventEmitter();
        this.nextNavigateBtnClicked = new EventEmitter();
        this.monthViewBtnClicked = new EventEmitter();
        this.yearViewBtnClicked = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    SelectionBarComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty(OPTS)) {
            this.opts = changes[OPTS].currentValue;
        }
        if (changes.hasOwnProperty(YEARS_DURATION)) {
            this.yearsDuration = changes[YEARS_DURATION].currentValue;
        }
        if (changes.hasOwnProperty(VISIBLE_MONTH)) {
            this.visibleMonth = changes[VISIBLE_MONTH].currentValue;
        }
        if (changes.hasOwnProperty(SELECT_MONTH)) {
            this.selectMonth = changes[SELECT_MONTH].currentValue;
        }
        if (changes.hasOwnProperty(SELECT_YEAR)) {
            this.selectYear = changes[SELECT_YEAR].currentValue;
        }
        if (changes.hasOwnProperty(PREV_VIEW_DISABLED)) {
            this.prevViewDisabled = changes[PREV_VIEW_DISABLED].currentValue;
        }
        if (changes.hasOwnProperty(NEXT_VIEW_DISABLED)) {
            this.nextViewDisabled = changes[NEXT_VIEW_DISABLED].currentValue;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectionBarComponent.prototype.onPrevNavigateBtnClicked = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.opts.rtl ? this.nextNavigateBtnClicked.emit() : this.prevNavigateBtnClicked.emit();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectionBarComponent.prototype.onNextNavigateBtnClicked = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.opts.rtl ? this.prevNavigateBtnClicked.emit() : this.nextNavigateBtnClicked.emit();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectionBarComponent.prototype.onMonthViewBtnClicked = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.monthViewBtnClicked.emit();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectionBarComponent.prototype.onYearViewBtnClicked = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.yearViewBtnClicked.emit();
    };
    SelectionBarComponent.decorators = [
        { type: Component, args: [{
                    selector: "lib-selection-bar",
                    template: "<div class=\"myDpMonthYearSelBar\">\n  <div class=\"myDpPrevBtn\">\n    <button type=\"button\" [attr.aria-label]=\"opts.ariaLabelPrevMonth\" class=\"myDpHeaderBtn myDpIcon myDpIconLeftArrow myDpHeaderBtnEnabled\" (click)=\"onPrevNavigateBtnClicked($event)\" tabindex=\"{{!prevViewDisabled ? '0':'-1'}}\"  [disabled]=\"prevViewDisabled\" [ngClass]=\"{'myDpHeaderBtnDisabled': prevViewDisabled}\"></button>\n  </div>\n  <div class=\"myDpMonthYearText\">\n    <button type=\"button\" class=\"myDpHeaderBtn myDpMonthBtn\" *ngIf=\"!selectYear\" (click)=\"opts.monthSelector && onMonthViewBtnClicked($event)\" tabindex=\"{{opts.monthSelector ? '0':'-1'}}\" [ngClass]=\"{'myDpMonthLabel': opts.monthSelector, 'myDpHeaderLabelBtnNotEdit': !opts.monthSelector}\">{{visibleMonth.monthTxt}}</button>\n    <button type=\"button\" class=\"myDpHeaderBtn myDpYearBtn\" (click)=\"opts.yearSelector && onYearViewBtnClicked($event)\" tabindex=\"{{opts.yearSelector ? '0':'-1'}}\" [ngClass]=\"{'myDpYearLabel': opts.yearSelector, 'myDpHeaderLabelBtnNotEdit': !opts.yearSelector}\">{{!selectYear ? visibleMonth.year : yearsDuration}}</button>\n  </div>\n  <div class=\"myDpNextBtn\">\n    <button type=\"button\" [attr.aria-label]=\"opts.ariaLabelNextMonth\" class=\"myDpHeaderBtn myDpIcon myDpIconRightArrow myDpHeaderBtnEnabled\" (click)=\"onNextNavigateBtnClicked($event)\" tabindex=\"{{!nextViewDisabled ? '0':'-1'}}\" [disabled]=\"nextViewDisabled\" [ngClass]=\"{'myDpHeaderBtnDisabled': nextViewDisabled}\"></button>\n  </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    SelectionBarComponent.ctorParameters = function () { return []; };
    SelectionBarComponent.propDecorators = {
        opts: [{ type: Input }],
        yearsDuration: [{ type: Input }],
        visibleMonth: [{ type: Input }],
        selectMonth: [{ type: Input }],
        selectYear: [{ type: Input }],
        prevViewDisabled: [{ type: Input }],
        nextViewDisabled: [{ type: Input }],
        prevNavigateBtnClicked: [{ type: Output }],
        nextNavigateBtnClicked: [{ type: Output }],
        monthViewBtnClicked: [{ type: Output }],
        yearViewBtnClicked: [{ type: Output }]
    };
    return SelectionBarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var ActiveView = {
    Date: 1,
    Month: 2,
    Year: 3,
};
ActiveView[ActiveView.Date] = 'Date';
ActiveView[ActiveView.Month] = 'Month';
ActiveView[ActiveView.Year] = 'Year';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DayViewComponent = /** @class */ (function () {
    function DayViewComponent(utilService) {
        this.utilService = utilService;
        this.dayCellClicked = new EventEmitter();
        this.dayCellKeyDown = new EventEmitter();
        this.viewActivated = new EventEmitter();
        this.prevMonthId = MonthId.prev;
        this.currMonthId = MonthId.curr;
        this.nextMonthId = MonthId.next;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    DayViewComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty(OPTS)) {
            this.opts = changes[OPTS].currentValue;
        }
        if (changes.hasOwnProperty(DATES)) {
            this.dates = changes[DATES].currentValue;
        }
        if (changes.hasOwnProperty(WEEK_DAYS)) {
            this.weekDays = changes[WEEK_DAYS].currentValue;
        }
        if (changes.hasOwnProperty(SELECTED_DATE)) {
            this.selectedDate = changes[SELECTED_DATE].currentValue;
        }
        if (changes.hasOwnProperty(SELECTED_DATE_RANGE)) {
            this.selectedDateRange = changes[SELECTED_DATE_RANGE].currentValue;
        }
    };
    /**
     * @return {?}
     */
    DayViewComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.viewActivated.emit(ActiveView.Date);
    };
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    DayViewComponent.prototype.onDayCellClicked = /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    function (event, cell) {
        event.stopPropagation();
        if (cell.disabledDate.disabled) {
            return;
        }
        this.dayCellClicked.emit(cell);
    };
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    DayViewComponent.prototype.onDayCellKeyDown = /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    function (event, cell) {
        /** @type {?} */
        var keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (keyCode !== KeyCode.tab) {
            event.preventDefault();
            if (keyCode === KeyCode.enter || keyCode === KeyCode.space) {
                this.onDayCellClicked(event, cell);
            }
            else if (this.opts.moveFocusByArrowKeys) {
                this.dayCellKeyDown.emit(event);
            }
        }
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    DayViewComponent.prototype.onDayCellMouseEnter = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        var e_1, _a, e_2, _b;
        if (this.utilService.isInitializedDate(this.selectedDateRange.begin) && !this.utilService.isInitializedDate(this.selectedDateRange.end)) {
            try {
                for (var _c = __values(this.dates), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var w = _d.value;
                    try {
                        for (var _e = __values(w.week), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var day = _f.value;
                            day.range = this.utilService.isDateSameOrEarlier(this.selectedDateRange.begin, day.dateObj) && this.utilService.isDateSameOrEarlier(day.dateObj, cell.dateObj);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    /**
     * @return {?}
     */
    DayViewComponent.prototype.onDayCellMouseLeave = /**
     * @return {?}
     */
    function () {
        var e_3, _a, e_4, _b;
        try {
            for (var _c = __values(this.dates), _d = _c.next(); !_d.done; _d = _c.next()) {
                var w = _d.value;
                try {
                    for (var _e = __values(w.week), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var day = _f.value;
                        day.range = false;
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DayViewComponent.prototype.isDateInRange = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.utilService.isDateInRange(date, this.selectedDateRange);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DayViewComponent.prototype.isDateSame = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.utilService.isDateSame(this.selectedDate, date);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DayViewComponent.prototype.isDateRangeBeginOrEndSame = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.utilService.isDateRangeBeginOrEndSame(this.selectedDateRange, date);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DayViewComponent.prototype.isDateRangeBegin = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.utilService.isDateRangeBegin(this.selectedDateRange, date);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DayViewComponent.prototype.isDateRangeEnd = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.utilService.isDateRangeEnd(this.selectedDateRange, date);
    };
    DayViewComponent.decorators = [
        { type: Component, args: [{
                    selector: "lib-day-view",
                    template: "<table class=\"myDpCalTable\" [ngClass]=\"{'ng-myrtl': opts.rtl, 'myDpFooter': opts.showFooterToday, 'myDpNoFooter': !opts.showFooterToday, 'myDpViewChangeAnimation': opts.viewChangeAnimation && viewChanged}\">\n  <thead>\n    <tr>\n      <th class=\"myDpWeekDayTitle myDpWeekDayTitleWeekNbr\" *ngIf=\"opts.showWeekNumbers && opts.firstDayOfWeek==='mo'\">#</th>\n      <th class=\"myDpWeekDayTitle\" scope=\"col\" *ngFor=\"let d of weekDays\">{{d}}</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let w of dates\">\n      <td class=\"myDpDaycellWeekNbr\" *ngIf=\"opts.showWeekNumbers && opts.firstDayOfWeek==='mo'\">{{w.weekNbr}}</td>\n      <td id=\"d_{{d.row}}_{{d.col}}\" class=\"d_{{d.row}}_{{d.col}} myDpDaycell {{d.markedDate.styleClass}} {{d.disabledDate.styleClass}}\" *ngFor=\"let d of w.week\"\n          [ngClass]=\"{'myDpRangeColor': isDateInRange(d.dateObj) || d.range,\n                'myDpPrevMonth': d.cmo === prevMonthId,\n                'myDpCurrMonth':d.cmo === currMonthId && !d.disabledDate.disabled,\n                'myDpNextMonth': d.cmo === nextMonthId,\n                'myDpSelectedDay':!this.opts.dateRange && isDateSame(d.dateObj) || this.opts.dateRange && isDateRangeBeginOrEndSame(d.dateObj),\n                'myDpRangeBegin':this.opts.dateRange && isDateRangeBegin(d.dateObj),\n                'myDpRangeEnd':this.opts.dateRange && isDateRangeEnd(d.dateObj),\n                'myDpDisabled': d.disabledDate.disabled && !d.disabledDate.styleClass.length,\n                'myDpTableSingleDay': !d.disabledDate.disabled}\"\n          (click)=\"onDayCellClicked($event, d)\" (keydown)=\"onDayCellKeyDown($event, d)\"\n          (mouseenter)=\"onDayCellMouseEnter(d)\" (mouseleave)=\"onDayCellMouseLeave()\" [attr.tabindex]=\"!d.disabledDate.disabled ? 0 : -1\">\n        <div class=\"myDpContainer\">\n          <span *ngIf=\"d.markedDate.marked && d.markedDate.color.length\" class=\"myDpMarkDate\" [ngStyle]=\"{'border-top': '8px solid ' + d.markedDate.color}\"></span>\n          <span  class=\"myDpDayValue\" \n          [attr.aria-label]=\"[(d.dateObj.month + '/' + d.dateObj.day + '/' + d.dateObj.year | date:'fullDate')]\" \n          [ngClass]=\"{'myDpMarkCurrDay': d.currDay && opts.markCurrentDay, 'myDpDimDay': d.highlight && (d.cmo===prevMonthId || d.cmo===nextMonthId || d.disabledDate.disabled), 'myDpHighlight': d.highlight}\">{{d.dateObj.day}}</span>\n          <span *ngIf=\"d.dateData\" class=\"myDpDataValue\">{{d.dateData.text}}</span>\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n",
                    providers: [UtilService],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    DayViewComponent.ctorParameters = function () { return [
        { type: UtilService }
    ]; };
    DayViewComponent.propDecorators = {
        opts: [{ type: Input }],
        dates: [{ type: Input }],
        weekDays: [{ type: Input }],
        selectedDate: [{ type: Input }],
        selectedDateRange: [{ type: Input }],
        viewChanged: [{ type: Input }],
        dayCellClicked: [{ type: Output }],
        dayCellKeyDown: [{ type: Output }],
        viewActivated: [{ type: Output }]
    };
    return DayViewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MonthViewComponent = /** @class */ (function () {
    function MonthViewComponent(utilService) {
        this.utilService = utilService;
        this.monthCellClicked = new EventEmitter();
        this.monthCellKeyDown = new EventEmitter();
        this.viewActivated = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MonthViewComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty(OPTS)) {
            this.opts = changes[OPTS].currentValue;
        }
        if (changes.hasOwnProperty(MONTHS)) {
            this.months = changes[MONTHS].currentValue;
        }
    };
    /**
     * @return {?}
     */
    MonthViewComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.viewActivated.emit(ActiveView.Month);
    };
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    MonthViewComponent.prototype.onMonthCellClicked = /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    function (event, cell) {
        event.stopPropagation();
        if (cell.disabled) {
            return;
        }
        this.monthCellClicked.emit(cell);
    };
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    MonthViewComponent.prototype.onMonthCellKeyDown = /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    function (event, cell) {
        /** @type {?} */
        var keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (keyCode !== KeyCode.tab) {
            event.preventDefault();
            if (keyCode === KeyCode.enter || keyCode === KeyCode.space) {
                this.onMonthCellClicked(event, cell);
            }
            else if (this.opts.moveFocusByArrowKeys) {
                this.monthCellKeyDown.emit(event);
            }
        }
    };
    MonthViewComponent.decorators = [
        { type: Component, args: [{
                    selector: "lib-month-view",
                    template: "<table class=\"myDpMonthTable\" [ngClass]=\"{'ng-myrtl': opts.rtl, 'myDpFooter': opts.showFooterToday, 'myDpNoFooter': !opts.showFooterToday, 'myDpViewChangeAnimation': opts.viewChangeAnimation && viewChanged}\">\n  <tbody>\n    <tr *ngFor=\"let mr of months\">\n      <td id=\"m_{{m.row}}_{{m.col}}\" class=\"m_{{m.row}}_{{m.col}} myDpMonthcell\"\n          [ngClass]=\"{'myDpSelectedMonth': m.selected, 'myDpDisabled': m.disabled, 'myDpTableSingleMonth': !m.disabled}\"\n          *ngFor=\"let m of mr\" (click)=\"onMonthCellClicked($event, m)\" (keydown)=\"onMonthCellKeyDown($event, m)\" [attr.tabindex]=\"!m.disabled ? 0 : -1\">\n        <span class=\"myDpMonthNbr\" *ngIf=\"opts.showMonthNumber\">{{m.nbr}}</span>\n        <span class=\"myDpMonthValue\" \n          [attr.aria-label]=\"[(m.nbr + '/' + 1 + '/' + m.year | date:'MMMM yyyy')]\"\n          [ngClass]=\"{'myDpMarkCurrMonth': m.currMonth && opts.markCurrentMonth}\">{{m.name}}</span>\n      </td>\n    </tr>\n  </tbody>\n</table>\n",
                    providers: [UtilService],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    MonthViewComponent.ctorParameters = function () { return [
        { type: UtilService }
    ]; };
    MonthViewComponent.propDecorators = {
        opts: [{ type: Input }],
        months: [{ type: Input }],
        viewChanged: [{ type: Input }],
        monthCellClicked: [{ type: Output }],
        monthCellKeyDown: [{ type: Output }],
        viewActivated: [{ type: Output }]
    };
    return MonthViewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var YearViewComponent = /** @class */ (function () {
    function YearViewComponent(utilService) {
        this.utilService = utilService;
        this.yearCellClicked = new EventEmitter();
        this.yearCellKeyDown = new EventEmitter();
        this.viewActivated = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    YearViewComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty(OPTS)) {
            this.opts = changes[OPTS].currentValue;
        }
        if (changes.hasOwnProperty(YEARS)) {
            this.years = changes[YEARS].currentValue;
        }
    };
    /**
     * @return {?}
     */
    YearViewComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.viewActivated.emit(ActiveView.Year);
    };
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    YearViewComponent.prototype.onYearCellClicked = /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    function (event, cell) {
        event.stopPropagation();
        if (cell.disabled) {
            return;
        }
        this.yearCellClicked.emit(cell);
    };
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    YearViewComponent.prototype.onYearCellKeyDown = /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    function (event, cell) {
        /** @type {?} */
        var keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (keyCode !== KeyCode.tab) {
            event.preventDefault();
            if (keyCode === KeyCode.enter || keyCode === KeyCode.space) {
                this.onYearCellClicked(event, cell);
            }
            else if (this.opts.moveFocusByArrowKeys) {
                this.yearCellKeyDown.emit(event);
            }
        }
    };
    YearViewComponent.decorators = [
        { type: Component, args: [{
                    selector: "lib-year-view",
                    template: "<table class=\"myDpYearTable\" [ngClass]=\"{'ng-myrtl': opts.rtl, 'myDpFooter': opts.showFooterToday, 'myDpNoFooter': !opts.showFooterToday, 'myDpViewChangeAnimation': opts.viewChangeAnimation && viewChanged}\">\n  <tbody>\n    <tr *ngFor=\"let yr of years\">\n      <td id=\"y_{{y.row}}_{{y.col}}\" class=\"y_{{y.row}}_{{y.col}} myDpYearcell\"\n          [ngClass]=\"{'myDpSelectedYear': y.selected, 'myDpDisabled': y.disabled, 'myDpTableSingleYear': !y.disabled}\"\n          *ngFor=\"let y of yr\" (click)=\"onYearCellClicked($event, y)\" (keydown)=\"onYearCellKeyDown($event, y)\" [attr.tabindex]=\"!y.disabled ? 0 : -1\">\n        <span class=\"myDpYearValue\" \n          [attr.aria-label]=\"[(1 + '/' + 1 + '/' + y.year | date:'yyyy')]\"\n          [ngClass]=\"{'myDpMarkCurrYear': y.currYear && opts.markCurrentYear}\">{{y.year}}</span>\n      </td>\n    </tr>\n  </tbody>\n</table>\n",
                    providers: [UtilService],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    YearViewComponent.ctorParameters = function () { return [
        { type: UtilService }
    ]; };
    YearViewComponent.propDecorators = {
        opts: [{ type: Input }],
        years: [{ type: Input }],
        viewChanged: [{ type: Input }],
        yearCellClicked: [{ type: Output }],
        yearCellKeyDown: [{ type: Output }],
        viewActivated: [{ type: Output }]
    };
    return YearViewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FooterBarComponent = /** @class */ (function () {
    function FooterBarComponent(utilService) {
        this.utilService = utilService;
        this.footerBarTxtClicked = new EventEmitter();
        this.footerBarTxt = EMPTY_STR;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    FooterBarComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty(OPTS)) {
            this.opts = changes[OPTS].currentValue;
            var _a = this.opts, dateFormat = _a.dateFormat, monthLabels = _a.monthLabels, todayTxt = _a.todayTxt;
            /** @type {?} */
            var today = this.utilService.getToday();
            this.footerBarTxt = todayTxt + (todayTxt.length > 0 ? SPACE_STR : EMPTY_STR) +
                this.utilService.formatDate(today, dateFormat, monthLabels);
        }
    };
    /**
     * @return {?}
     */
    FooterBarComponent.prototype.onFooterBarTxtClicked = /**
     * @return {?}
     */
    function () {
        this.footerBarTxtClicked.emit();
    };
    FooterBarComponent.decorators = [
        { type: Component, args: [{
                    selector: "lib-footer-bar",
                    template: "<div class=\"myDpFooterBar\">\n    <button type=\"button\" class=\"myDpHeaderBtn myDpFooterBtn\" (click)=\"onFooterBarTxtClicked()\">{{footerBarTxt}}</button>\n</div>",
                    providers: [UtilService],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    FooterBarComponent.ctorParameters = function () { return [
        { type: UtilService }
    ]; };
    FooterBarComponent.propDecorators = {
        opts: [{ type: Input }],
        footerBarTxtClicked: [{ type: Output }]
    };
    return FooterBarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LocaleService = /** @class */ (function () {
    function LocaleService() {
        this.locales = {
            "en": {
                dayLabels: { su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" },
                dateFormat: "mm/dd/yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Today"
            },
            "he": {
                dayLabels: { su: "רא", mo: "שנ", tu: "של", we: "רב", th: "חמ", fr: "שי", sa: "שב" },
                monthLabels: { 1: "ינו", 2: "פבר", 3: "מרץ", 4: "אפר", 5: "מאי", 6: "יונ", 7: "יול", 8: "אוג", 9: "ספט", 10: "אוק", 11: "נוב", 12: "דצמ" },
                dateFormat: "dd/mm/yyyy",
                firstDayOfWeek: "su",
                sunHighlight: false,
                todayTxt: "היום"
            },
            "ja": {
                dayLabels: { su: "日", mo: "月", tu: "火", we: "水", th: "木", fr: "金", sa: "土" },
                monthLabels: { 1: "１月", 2: "２月", 3: "３月", 4: "４月", 5: "５月", 6: "６月", 7: "７月", 8: "８月", 9: "９月", 10: "１０月", 11: "１１月", 12: "１２月" },
                dateFormat: "yyyy.mm.dd",
                sunHighlight: false,
                todayTxt: "今日"
            },
            "fr": {
                dayLabels: { su: "Dim", mo: "Lun", tu: "Mar", we: "Mer", th: "Jeu", fr: "Ven", sa: "Sam" },
                monthLabels: { 1: "Jan", 2: "Fév", 3: "Mar", 4: "Avr", 5: "Mai", 6: "Juin", 7: "Juil", 8: "Aoû", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Déc" },
                dateFormat: "dd/mm/yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Aujourd'hui"
            },
            "fr-ch": {
                dayLabels: { su: "Dim", mo: "Lun", tu: "Mar", we: "Mer", th: "Jeu", fr: "Ven", sa: "Sam" },
                monthLabels: { 1: "Jan", 2: "Fév", 3: "Mar", 4: "Avr", 5: "Mai", 6: "Juin", 7: "Juil", 8: "Aoû", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Déc" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Aujourd'hui"
            },
            "fi": {
                dayLabels: { su: "Su", mo: "Ma", tu: "Ti", we: "Ke", th: "To", fr: "Pe", sa: "La" },
                monthLabels: { 1: "Tam", 2: "Hel", 3: "Maa", 4: "Huh", 5: "Tou", 6: "Kes", 7: "Hei", 8: "Elo", 9: "Syy", 10: "Lok", 11: "Mar", 12: "Jou" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Tänään"
            },
            "es": {
                dayLabels: { su: "Do", mo: "Lu", tu: "Ma", we: "Mi", th: "Ju", fr: "Vi", sa: "Sa" },
                monthLabels: { 1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Hoy"
            },
            "hu": {
                dayLabels: { su: "Vas", mo: "Hét", tu: "Kedd", we: "Sze", th: "Csü", fr: "Pén", sa: "Szo" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Már", 4: "Ápr", 5: "Máj", 6: "Jún", 7: "Júl", 8: "Aug", 9: "Szep", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "yyyy-mm-dd",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Ma"
            },
            "sv": {
                dayLabels: { su: "Sön", mo: "Mån", tu: "Tis", we: "Ons", th: "Tor", fr: "Fre", sa: "Lör" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Maj", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "yyyy-mm-dd",
                firstDayOfWeek: "mo",
                sunHighlight: false,
                todayTxt: "Idag"
            },
            "nl": {
                dayLabels: { su: "Zon", mo: "Maa", tu: "Din", we: "Woe", th: "Don", fr: "Vri", sa: "Zat" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mei", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "dd-mm-yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: false,
                todayTxt: "Vandaag"
            },
            "ru": {
                dayLabels: { su: "Вс", mo: "Пн", tu: "Вт", we: "Ср", th: "Чт", fr: "Пт", sa: "Сб" },
                monthLabels: { 1: "Янв", 2: "Фев", 3: "Март", 4: "Апр", 5: "Май", 6: "Июнь", 7: "Июль", 8: "Авг", 9: "Сент", 10: "Окт", 11: "Ноя", 12: "Дек" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Сегодня"
            },
            "uk": {
                dayLabels: { su: "Нд", mo: "Пн", tu: "Вт", we: "Ср", th: "Чт", fr: "Пт", sa: "Сб" },
                monthLabels: { 1: "Січ", 2: "Лют", 3: "Бер", 4: "Кві", 5: "Тра", 6: "Чер", 7: "Лип", 8: "Сер", 9: "Вер", 10: "Жов", 11: "Лис", 12: "Гру" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Сьогодні"
            },
            "uz": {
                dayLabels: { su: "Yak", mo: "Du", tu: "Se", we: "Cho", th: "Pay", fr: "Ju", sa: "Sha" },
                monthLabels: { 1: "Yan", 2: "Fev", 3: "Mar", 4: "Apr", 5: "May", 6: "Iyn", 7: "Iyl", 8: "Avg", 9: "Sen", 10: "Okt", 11: "Noy", 12: "Dek" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Bugun"
            },
            "no": {
                dayLabels: { su: "Søn", mo: "Man", tu: "Tir", we: "Ons", th: "Tor", fr: "Fre", sa: "Lør" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Des" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: false,
                todayTxt: "I dag"
            },
            "tr": {
                dayLabels: { su: "Paz", mo: "Pzt", tu: "Sal", we: "Çar", th: "Per", fr: "Cum", sa: "Cmt" },
                monthLabels: { 1: "Oca", 2: "Şub", 3: "Mar", 4: "Nis", 5: "May", 6: "Haz", 7: "Tem", 8: "Ağu", 9: "Eyl", 10: "Eki", 11: "Kas", 12: "Ara" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: false,
                todayTxt: "Bugün"
            },
            "pt-br": {
                dayLabels: { su: "Dom", mo: "Seg", tu: "Ter", we: "Qua", th: "Qui", fr: "Sex", sa: "Sab" },
                monthLabels: { 1: "Jan", 2: "Fev", 3: "Mar", 4: "Abr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Set", 10: "Out", 11: "Nov", 12: "Dez" },
                dateFormat: "dd/mm/yyyy",
                firstDayOfWeek: "su",
                sunHighlight: true,
                todayTxt: "Hoje"
            },
            "de": {
                dayLabels: { su: "So", mo: "Mo", tu: "Di", we: "Mi", th: "Do", fr: "Fr", sa: "Sa" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mär", 4: "Apr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dez" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Heute"
            },
            "de-ch": {
                dayLabels: { su: "So", mo: "Mo", tu: "Di", we: "Mi", th: "Do", fr: "Fr", sa: "Sa" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mär", 4: "Apr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dez" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Heute"
            },
            "it": {
                dayLabels: { su: "Dom", mo: "Lun", tu: "Mar", we: "Mer", th: "Gio", fr: "Ven", sa: "Sab" },
                monthLabels: { 1: "Gen", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mag", 6: "Giu", 7: "Lug", 8: "Ago", 9: "Set", 10: "Ott", 11: "Nov", 12: "Dic" },
                dateFormat: "dd/mm/yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Oggi"
            },
            "it-ch": {
                dayLabels: { su: "Dom", mo: "Lun", tu: "Mar", we: "Mer", th: "Gio", fr: "Ven", sa: "Sab" },
                monthLabels: { 1: "Gen", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mag", 6: "Giu", 7: "Lug", 8: "Ago", 9: "Set", 10: "Ott", 11: "Nov", 12: "Dic" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Oggi"
            },
            "pl": {
                dayLabels: { su: "Nie", mo: "Pon", tu: "Wto", we: "Śro", th: "Czw", fr: "Pią", sa: "Sob" },
                monthLabels: { 1: "Sty", 2: "Lut", 3: "Mar", 4: "Kwi", 5: "Maj", 6: "Cze", 7: "Lip", 8: "Sie", 9: "Wrz", 10: "Paź", 11: "Lis", 12: "Gru" },
                dateFormat: "yyyy-mm-dd",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Dzisiaj"
            },
            "my": {
                dayLabels: { su: "တနင်္ဂနွေ", mo: "တနင်္လာ", tu: "အင်္ဂါ", we: "ဗုဒ္ဓဟူး", th: "ကြသပတေး", fr: "သောကြာ", sa: "စနေ" },
                monthLabels: { 1: "ဇန်နဝါရီ", 2: "ဖေဖော်ဝါရီ", 3: "မတ်", 4: "ဧပြီ", 5: "မေ", 6: "ဇွန်", 7: "ဇူလိုင်", 8: "ဩဂုတ်", 9: "စက်တင်ဘာ", 10: "အောက်တိုဘာ", 11: "နိုဝင်ဘာ", 12: "ဒီဇင်ဘာ" },
                dateFormat: "yyyy-mm-dd",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "ယနေ့"
            },
            "sk": {
                dayLabels: { su: "Ne", mo: "Po", tu: "Ut", we: "St", th: "Št", fr: "Pi", sa: "So" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Máj", 6: "Jún", 7: "Júl", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Dnes"
            },
            "sl": {
                dayLabels: { su: "Ned", mo: "Pon", tu: "Tor", we: "Sre", th: "Čet", fr: "Pet", sa: "Sob" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Maj", 6: "Jun", 7: "Jul", 8: "Avg", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "dd. mm. yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Danes"
            },
            "zh-cn": {
                dayLabels: { su: "日", mo: "一", tu: "二", we: "三", th: "四", fr: "五", sa: "六" },
                monthLabels: { 1: "1月", 2: "2月", 3: "3月", 4: "4月", 5: "5月", 6: "6月", 7: "7月", 8: "8月", 9: "9月", 10: "10月", 11: "11月", 12: "12月" },
                dateFormat: "yyyy-mm-dd",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "今天"
            },
            "ro": {
                dayLabels: { su: "du", mo: "lu", tu: "ma", we: "mi", th: "jo", fr: "vi", sa: "sa" },
                monthLabels: { 1: "ian", 2: "feb", 3: "mart", 4: "apr", 5: "mai", 6: "iun", 7: "iul", 8: "aug", 9: "sept", 10: "oct", 11: "nov", 12: "dec" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Astăzi"
            },
            "ca": {
                dayLabels: { su: "dg", mo: "dl", tu: "dt", we: "dc", th: "dj", fr: "dv", sa: "ds" },
                monthLabels: { 1: "Gen", 2: "Febr", 3: "Març", 4: "Abr", 5: "Maig", 6: "Juny", 7: "Jul", 8: "Ag", 9: "Set", 10: "Oct", 11: "Nov", 12: "Des" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Avui"
            },
            "id": {
                dayLabels: { su: "Min", mo: "Sen", tu: "Sel", we: "Rab", th: "Kam", fr: "Jum", sa: "Sab" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mei", 6: "Jun", 7: "Jul", 8: "Ags", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Des" },
                dateFormat: "dd-mm-yyyy",
                firstDayOfWeek: "su",
                sunHighlight: true,
                todayTxt: "Hari ini"
            },
            "en-au": {
                dayLabels: { su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" },
                dateFormat: "dd/mm/yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Today"
            },
            "en-gb": {
                dayLabels: { su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" },
                dateFormat: "dd/mm/yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Today"
            },
            "am-et": {
                dayLabels: { su: "እሑድ", mo: "ሰኞ", tu: "ማክሰኞ", we: "ረቡዕ", th: "ሐሙስ", fr: "ዓርብ", sa: "ቅዳሜ" },
                monthLabels: { 1: "ጃንዩ", 2: "ፌብሩ", 3: "ማርች", 4: "ኤፕረ", 5: "ሜይ", 6: "ጁን", 7: "ጁላይ", 8: "ኦገስ", 9: "ሴፕቴ", 10: "ኦክተ", 11: "ኖቬም", 12: "ዲሴም" },
                dateFormat: "yyyy-mm-dd",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "ዛሬ"
            },
            "cs": {
                dayLabels: { su: "Ne", mo: "Po", tu: "Út", we: "St", th: "Čt", fr: "Pá", sa: "So" },
                monthLabels: { 1: "Led", 2: "Úno", 3: "Bře", 4: "Dub", 5: "Kvě", 6: "Čvn", 7: "Čvc", 8: "Srp", 9: "Zář", 10: "Říj", 11: "Lis", 12: "Pro" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Dnes"
            },
            "el": {
                dayLabels: { su: "Κυρ", mo: "Δευ", tu: "Τρι", we: "Τετ", th: "Πεμ", fr: "Παρ", sa: "Σαβ" },
                monthLabels: { 1: "Ιαν", 2: "Φεβ", 3: "Μαρ", 4: "Απρ", 5: "Μαι", 6: "Ιουν", 7: "Ιουλ", 8: "Αυγ", 9: "Σεπ", 10: "Οκτ", 11: "Νοε", 12: "Δεκ" },
                dateFormat: "dd/mm/yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Σήμερα"
            },
            "kk": {
                dayLabels: { su: "Жк", mo: "Дс", tu: "Сс", we: "Ср", th: "Бс", fr: "Жм", sa: "Сб" },
                monthLabels: { 1: "Қаң", 2: "Ақп", 3: "Нау", 4: "Сәу", 5: "Мам", 6: "Мау", 7: "Шіл", 8: "Там", 9: "Қырк", 10: "Қаз", 11: "Қар", 12: "Желт" },
                dateFormat: "dd-mmm-yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Бүгін"
            },
            "th": {
                dayLabels: { su: "อา", mo: "จ", tu: "อ", we: "พ", th: "พฤ", fr: "ศ", sa: "ส" },
                monthLabels: { 1: "ม.ค", 2: "ก.พ.", 3: "มี.ค.", 4: "เม.ย.", 5: "พ.ค.", 6: "มิ.ย.", 7: "ก.ค.", 8: "ส.ค.", 9: "ก.ย.", 10: "ต.ค.", 11: "พ.ย.", 12: "ธ.ค." },
                dateFormat: "dd-mm-yyyy",
                firstDayOfWeek: "su",
                sunHighlight: true,
                todayTxt: "วันนี้"
            },
            "ko-kr": {
                dayLabels: { su: "일", mo: "월", tu: "화", we: "수", th: "목", fr: "금", sa: "토" },
                monthLabels: { 1: "1월", 2: "2월", 3: "3월", 4: "4월", 5: "5월", 6: "6월", 7: "7월", 8: "8월", 9: "9월", 10: "10월", 11: "11월", 12: "12월" },
                dateFormat: "yyyy mm dd",
                firstDayOfWeek: "su",
                sunHighlight: true,
                todayTxt: "오늘"
            },
            "da": {
                dayLabels: { su: "Søn", mo: "Man", tu: "Tir", we: "Ons", th: "Tor", fr: "Fre", sa: "Lør" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Maj", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "dd-mm-yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "I dag"
            },
            "lt": {
                dayLabels: { su: "Sk", mo: "Pr", tu: "An", we: "Tr", th: "Kt", fr: "Pn", sa: "Št" },
                monthLabels: { 1: "Saus.", 2: "Vas.", 3: "Kov.", 4: "Bal.", 5: "Geg.", 6: "Birž.", 7: "Liep.", 8: "Rugp.", 9: "Rugs.", 10: "Sapl.", 11: "Lapkr.", 12: "Gruod." },
                dateFormat: "yyyy-mm-dd",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Šianien"
            },
            "vi": {
                dayLabels: { su: "CN", mo: "T2", tu: "T3", we: "T4", th: "T5", fr: "T6", sa: "T7" },
                monthLabels: { 1: "THG 1", 2: "THG 2", 3: "THG 3", 4: "THG 4", 5: "THG 5", 6: "THG 6", 7: "THG 7", 8: "THG 8", 9: "THG 9", 10: "THG 10", 11: "THG 11", 12: "THG 12" },
                dateFormat: "dd/mm/yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Hôm nay"
            },
            "bn": {
                dayLabels: { su: "রবি", mo: "সোম", tu: "মঙ্গল", we: "বুধ", th: "বৃহঃ", fr: "শুক্র", sa: "শনি" },
                monthLabels: { 1: "জানু", 2: "ফেব্রু", 3: "মার্চ", 4: "এপ্রিল", 5: "মে", 6: "জুন", 7: "জুলাই", 8: "আগস্ট", 9: "সেপ্টে", 10: "অক্টো", 11: "নভে", 12: "ডিসে" },
                dateFormat: "dd-mm-yyyy",
                firstDayOfWeek: "su",
                sunHighlight: true,
                todayTxt: "আজ"
            },
            "bg": {
                dayLabels: { su: "нд", mo: "пн", tu: "вт", we: "ср", th: "чт", fr: "пт", sa: "сб" },
                monthLabels: { 1: "яну.", 2: "фев.", 3: "март", 4: "апр.", 5: "май", 6: "юни", 7: "юли", 8: "авг.", 9: "сеп.", 10: "окт.", 11: "ное.", 12: "дек." },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "днес"
            },
            "hr": {
                dayLabels: { su: "Ne", mo: "Po", tu: "Ul", we: "Sr", th: "Če", fr: "Pe", sa: "Su" },
                monthLabels: { 1: "Sij", 2: "Vel", 3: "Ožu", 4: "Tra", 5: "Svi", 6: "Lip", 7: "Srp", 8: "Kol", 9: "Ruj", 10: "Lis", 11: "Stu", 12: "Pro" },
                dateFormat: "dd.mm.yyyy.",
                firstDayOfWeek: "su",
                sunHighlight: true,
                todayTxt: "danas"
            },
            "ar": {
                dayLabels: { su: "الأحد", mo: "الاثنين", tu: "الثلاثاء", we: "الاربعاء", th: "الخميس", fr: "الجمعة", sa: "السبت" },
                monthLabels: { 1: "يناير", 2: "فبراير", 3: "مارس", 4: "ابريل", 5: "مايو", 6: "يونيو", 7: "يوليو", 8: "أغسطس", 9: "سبتمبر", 10: "أكتوبر", 11: "نوفمبر", 12: "ديسمبر" },
                dateFormat: "yyyy-mm-dd",
                firstDayOfWeek: "sa",
                sunHighlight: true,
                todayTxt: "اليوم"
            },
            "is": {
                dayLabels: { su: "sun", mo: "mán", tu: "þri", we: "mið", th: "fim", fr: "fös", sa: "lau" },
                monthLabels: { 1: "jan", 2: "feb", 3: "mar", 4: "apr", 5: "maí", 6: "jún", 7: "júl", 8: "ágú", 9: "sep", 10: "okt", 11: "nóv", 12: "des" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "su",
                sunHighlight: true,
                todayTxt: "Í dag"
            },
            "tw": {
                dayLabels: { su: "週日", mo: "週一", tu: "週二", we: "週三", th: "週四", fr: "週五", sa: "週六" },
                monthLabels: { 1: "一月", 2: "二月", 3: "三月", 4: "四月", 5: "五月", 6: "六月", 7: "七月", 8: "八月", 9: "九月", 10: "十月", 11: "十一月", 12: "十二月" },
                dateFormat: "yyyy-mm-dd",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "今天"
            },
            "lv": {
                dayLabels: { su: "S", mo: "P", tu: "O", we: "T", th: "C", fr: "P", sa: "S" },
                monthLabels: { 1: "Janv", 2: "Febr", 3: "Marts", 4: "Apr", 5: "Maijs", 6: "Jūn", 7: "Jūl", 8: "Aug", 9: "Sept", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Šodien"
            },
            "et": {
                dayLabels: { su: "P", mo: "E", tu: "T", we: "K", th: "N", fr: "R", sa: "L" },
                monthLabels: { 1: "Jaan", 2: "Veebr", 3: "Märts", 4: "Apr", 5: "Mai", 6: "Juuni", 7: "Juuli", 8: "Aug", 9: "Sept", 10: "Okt", 11: "Nov", 12: "Dets" },
                dateFormat: "dd.mm.yyyy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
                todayTxt: "Täna"
            }
        };
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    LocaleService.prototype.getLocaleOptions = /**
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        if (locale && this.locales.hasOwnProperty(locale)) {
            // User given locale
            return this.locales[locale];
        }
        // Default: en
        return this.locales[DEFAULT_LOCALE];
    };
    LocaleService.decorators = [
        { type: Injectable }
    ];
    return LocaleService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var Year = {
    min: 1000,
    max: 9999,
};
Year[Year.min] = 'min';
Year[Year.max] = 'max';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DefaultConfigService = /** @class */ (function () {
    function DefaultConfigService() {
        this.defaultConfig = {
            dateRange: false,
            inline: false,
            dayLabels: { su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat" },
            monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" },
            dateFormat: "yyyy-mm-dd",
            defaultView: DefaultView.Date,
            firstDayOfWeek: "mo",
            satHighlight: false,
            sunHighlight: true,
            highlightDates: [],
            markCurrentDay: true,
            markCurrentMonth: true,
            markCurrentYear: true,
            monthSelector: true,
            yearSelector: true,
            disableHeaderButtons: true,
            showWeekNumbers: false,
            selectorHeight: "266px",
            selectorWidth: "266px",
            disableUntil: { year: 0, month: 0, day: 0 },
            disableSince: { year: 0, month: 0, day: 0 },
            disableDates: [],
            disableDateRanges: [],
            disableWeekends: false,
            disableWeekdays: [],
            enableDates: [],
            markDates: [],
            markWeekends: { marked: false, color: "" },
            alignSelectorRight: false,
            openSelectorTopOfInput: false,
            closeSelectorOnDateSelect: true,
            closeSelectorOnDocumentClick: true,
            minYear: Year.min,
            maxYear: Year.max,
            showSelectorArrow: true,
            appendSelectorToBody: false,
            focusInputOnDateSelect: true,
            moveFocusByArrowKeys: true,
            dateRangeDatesDelimiter: " - ",
            inputFieldValidation: true,
            showMonthNumber: true,
            todayTxt: "",
            showFooterToday: false,
            calendarAnimation: { in: CalAnimation.None, out: CalAnimation.None },
            viewChangeAnimation: true,
            rtl: false,
            stylesData: { selector: "", styles: "" },
            divHostElement: { enabled: false, placeholder: "" },
            ariaLabelPrevMonth: "Previous Month",
            ariaLabelNextMonth: "Next Month",
            dateData: {}
        };
    }
    /**
     * @return {?}
     */
    DefaultConfigService.prototype.getDefaultConfig = /**
     * @return {?}
     */
    function () {
        return this.defaultConfig;
    };
    DefaultConfigService.decorators = [
        { type: Injectable }
    ];
    return DefaultConfigService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var CalToggle = {
    Open: 1,
    CloseByDateSel: 2,
    CloseByCalBtn: 3,
    CloseByOutClick: 4,
    CloseByEsc: 5,
};
CalToggle[CalToggle.Open] = 'Open';
CalToggle[CalToggle.CloseByDateSel] = 'CloseByDateSel';
CalToggle[CalToggle.CloseByCalBtn] = 'CloseByCalBtn';
CalToggle[CalToggle.CloseByOutClick] = 'CloseByOutClick';
CalToggle[CalToggle.CloseByEsc] = 'CloseByEsc';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var NGX_DP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return AngularMyDatePickerDirective; })),
    multi: true
};
/** @type {?} */
var NGX_DP_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return AngularMyDatePickerDirective; })),
    multi: true
};
var AngularMyDatePickerDirective = /** @class */ (function () {
    function AngularMyDatePickerDirective(localeService, utilService, vcRef, cfr, renderer, cdr, elem, config) {
        var _this = this;
        this.localeService = localeService;
        this.utilService = utilService;
        this.vcRef = vcRef;
        this.cfr = cfr;
        this.renderer = renderer;
        this.cdr = cdr;
        this.elem = elem;
        this.config = config;
        this.defaultMonth = { defMonth: EMPTY_STR, overrideSelection: false };
        this.dateChanged = new EventEmitter();
        this.inputFieldChanged = new EventEmitter();
        this.calendarViewChanged = new EventEmitter();
        this.calendarToggle = new EventEmitter();
        this.rangeDateSelection = new EventEmitter();
        this.viewActivated = new EventEmitter();
        this.cRef = null;
        this.hostText = EMPTY_STR;
        this.preventClose = false;
        this.disabled = false;
        this.selectedValue = null;
        this.onChangeCb = (/**
         * @return {?}
         */
        function () { });
        this.onTouchedCb = (/**
         * @return {?}
         */
        function () { });
        this.onClickWrapper = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onClick(event); });
        this.onAnimateWrapper = (/**
         * @param {?} reason
         * @return {?}
         */
        function (reason) { return _this.animationEnd(reason); });
        this.opts = this.config.getDefaultConfig();
        this.parseOptions(this.opts);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.onKeyUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (this.ignoreKeyPress(keyCode)) {
            return;
        }
        if (keyCode === KeyCode.esc) {
            this.closeSelector(CalToggle.CloseByEsc);
        }
        else {
            var _a = this.opts, dateRange = _a.dateRange, dateFormat = _a.dateFormat, monthLabels = _a.monthLabels, dateRangeDatesDelimiter = _a.dateRangeDatesDelimiter;
            /** @type {?} */
            var value = this.getHostValue();
            /** @type {?} */
            var dateModel = null;
            /** @type {?} */
            var valid = false;
            /** @type {?} */
            var validateOpts = null;
            if (!dateRange) {
                validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
                /** @type {?} */
                var date = this.utilService.isDateValid(value, this.opts, validateOpts);
                valid = this.utilService.isInitializedDate(date);
                if (valid) {
                    dateModel = this.utilService.getDateModel(date, null, dateFormat, monthLabels, dateRangeDatesDelimiter);
                }
            }
            else {
                validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
                /** @type {?} */
                var range = this.utilService.isDateValidDateRange(value, this.opts, validateOpts);
                var begin = range.begin, end = range.end;
                valid = this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end);
                if (valid) {
                    dateModel = this.utilService.getDateModel(null, range, dateFormat, monthLabels, dateRangeDatesDelimiter);
                }
            }
            this.onChangeCb(dateModel);
            this.emitInputFieldChanged(value, valid);
        }
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        var _a = this.opts, inputFieldValidation = _a.inputFieldValidation, dateRange = _a.dateRange, dateFormat = _a.dateFormat, monthLabels = _a.monthLabels, dateRangeDatesDelimiter = _a.dateRangeDatesDelimiter, closeSelectorOnDateSelect = _a.closeSelectorOnDateSelect;
        if (inputFieldValidation) {
            /** @type {?} */
            var value = this.getHostValue();
            /** @type {?} */
            var valid = false;
            /** @type {?} */
            var validateOpts = null;
            if (!dateRange) {
                validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
                /** @type {?} */
                var date = this.utilService.isDateValid(value, this.opts, validateOpts);
                valid = this.utilService.isInitializedDate(date);
                if (valid && this.hostText !== value) {
                    // Valid date
                    /** @type {?} */
                    var dateModel = this.utilService.getDateModel(date, null, dateFormat, monthLabels, dateRangeDatesDelimiter);
                    this.emitDateChanged(dateModel);
                    this.updateModel(dateModel);
                    if (closeSelectorOnDateSelect) {
                        this.closeSelector(CalToggle.CloseByDateSel);
                    }
                }
            }
            else {
                validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
                /** @type {?} */
                var dateRange_1 = this.utilService.isDateValidDateRange(value, this.opts, validateOpts);
                var begin = dateRange_1.begin, end = dateRange_1.end;
                valid = this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end);
                if (valid && this.hostText !== value) {
                    // Valid date range
                    /** @type {?} */
                    var dateModel = this.utilService.getDateModel(null, dateRange_1, dateFormat, monthLabels, dateRangeDatesDelimiter);
                    this.emitDateChanged(dateModel);
                    this.updateModel(dateModel);
                    if (closeSelectorOnDateSelect) {
                        this.closeSelector(CalToggle.CloseByDateSel);
                    }
                }
            }
            if (!valid && this.hostText !== value) {
                if (value === EMPTY_STR) {
                    this.clearDate();
                }
                else {
                    this.onChangeCb(null);
                }
            }
            this.hostText = value;
        }
        this.onTouchedCb();
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.onClick = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.opts.closeSelectorOnDocumentClick && !this.preventClose && event.target && this.cRef
            && this.elem.nativeElement !== event.target && !this.cRef.location.nativeElement.contains(event.target)
            && !this.disabled) {
            this.closeSelector(CalToggle.CloseByOutClick);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty(LOCALE)) {
            this.setLocaleOptions();
        }
        if (changes.hasOwnProperty(DEFAULT_MONTH)) {
            /** @type {?} */
            var dm = changes[DEFAULT_MONTH].currentValue;
            if (typeof dm === OBJECT) {
                if (!dm.overrideSelection) {
                    dm.overrideSelection = false;
                }
            }
            else {
                dm = { defMonth: dm, overrideSelection: false };
            }
            this.defaultMonth = dm;
        }
        if (changes.hasOwnProperty(OPTIONS)) {
            this.parseOptions(changes[OPTIONS].currentValue);
        }
        if (this.cRef) {
            this.cRef.instance.refreshComponent(this.opts, this.defaultMonth, this.selectedValue, this.getHostValue());
        }
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.closeCalendar();
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.setLocaleOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var opts = this.localeService.getLocaleOptions(this.locale);
        Object.keys(opts).forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) {
            ((/** @type {?} */ (_this.opts)))[k] = opts[k];
        }));
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.parseOptions = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
        var _this = this;
        if (opts) {
            Object.keys(opts).forEach((/**
             * @param {?} k
             * @return {?}
             */
            function (k) {
                ((/** @type {?} */ (_this.opts)))[k] = opts[k];
            }));
        }
        var _a = this.opts, minYear = _a.minYear, maxYear = _a.maxYear, openSelectorTopOfInput = _a.openSelectorTopOfInput, inline = _a.inline;
        if (minYear < Year.min) {
            this.opts.minYear = Year.min;
        }
        if (maxYear > Year.max) {
            this.opts.maxYear = Year.max;
        }
        if (openSelectorTopOfInput || inline) {
            this.opts.showSelectorArrow = false;
        }
        if (inline) {
            this.openCalendar();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        var validateOpts = null;
        var _a = this.opts, dateFormat = _a.dateFormat, monthLabels = _a.monthLabels, dateRangeDatesDelimiter = _a.dateRangeDatesDelimiter, inline = _a.inline;
        if (!value) {
            this.setHostValue(EMPTY_STR);
            this.emitInputFieldChanged(EMPTY_STR, false);
            if (this.cRef) {
                this.cRef.instance.resetDateValue();
            }
        }
        else if (!value.isRange && value.singleDate) {
            // single date
            var _b = value.singleDate, date = _b.date, jsDate = _b.jsDate;
            if (!date) {
                date = this.utilService.jsDateToMyDate(jsDate);
            }
            /** @type {?} */
            var formatted = this.utilService.formatDate(date, dateFormat, monthLabels);
            validateOpts = { validateDisabledDates: false, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
            /** @type {?} */
            var valid = this.utilService.isInitializedDate(this.utilService.isDateValid(formatted, this.opts, validateOpts));
            if (valid) {
                this.setHostValue(formatted);
                this.emitInputFieldChanged(formatted, valid);
                this.setSelectedValue(this.utilService.getDateModel(date, null, dateFormat, monthLabels, dateRangeDatesDelimiter));
                if (this.cRef) {
                    this.cRef.instance.refreshComponent(this.opts, this.defaultMonth, this.selectedValue, this.getHostValue());
                }
            }
        }
        else if (value.isRange && value.dateRange) {
            // date range
            var _c = value.dateRange, beginDate = _c.beginDate, beginJsDate = _c.beginJsDate, endDate = _c.endDate, endJsDate = _c.endJsDate;
            if (!beginDate || !endDate) {
                beginDate = this.utilService.jsDateToMyDate(beginJsDate);
                endDate = this.utilService.jsDateToMyDate(endJsDate);
            }
            /** @type {?} */
            var formatted = this.utilService.formatDate(beginDate, dateFormat, monthLabels) + dateRangeDatesDelimiter +
                this.utilService.formatDate(endDate, dateFormat, monthLabels);
            validateOpts = { validateDisabledDates: false, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
            var _d = this.utilService.isDateValidDateRange(formatted, this.opts, validateOpts), begin = _d.begin, end = _d.end;
            /** @type {?} */
            var valid = this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end);
            if (valid) {
                this.setHostValue(formatted);
                this.emitInputFieldChanged(formatted, valid);
                /** @type {?} */
                var dateRange = { begin: beginDate, end: endDate };
                this.setSelectedValue(this.utilService.getDateModel(null, dateRange, dateFormat, monthLabels, dateRangeDatesDelimiter));
                if (this.cRef) {
                    this.cRef.instance.refreshComponent(this.opts, this.defaultMonth, this.selectedValue, this.getHostValue());
                }
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCb = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCb = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this.renderer.setProperty(this.elem.nativeElement, DISABLED, isDisabled);
        if (isDisabled) {
            this.closeCalendar();
        }
    };
    /**
     * @param {?} c
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        /** @type {?} */
        var value = this.getHostValue();
        if (value === null || value === EMPTY_STR) {
            return null;
        }
        /** @type {?} */
        var validateOpts = null;
        if (!this.opts.dateRange) {
            validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
            /** @type {?} */
            var date = this.utilService.isDateValid(value, this.opts, validateOpts);
            if (!this.utilService.isInitializedDate(date)) {
                return { invalidDateFormat: true };
            }
        }
        else {
            validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
            var _a = this.utilService.isDateValidDateRange(value, this.opts, validateOpts), begin = _a.begin, end = _a.end;
            if (!this.utilService.isInitializedDate(begin) || !this.utilService.isInitializedDate(end)) {
                return { invalidDateFormat: true };
            }
        }
        return null;
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.openCalendar = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.disabled) {
            return;
        }
        this.preventClose = true;
        this.cdr.detectChanges();
        if (this.cRef === null) {
            this.cRef = this.vcRef.createComponent(this.cfr.resolveComponentFactory(CalendarComponent));
            this.appendSelector(this.cRef.location.nativeElement);
            this.cRef.instance.initializeComponent(this.opts, this.defaultMonth, this.selectedValue, this.getHostValue(), this.getSelectorPosition(this.elem.nativeElement), (/**
             * @param {?} dm
             * @param {?} close
             * @return {?}
             */
            function (dm, close) {
                _this.focusToInput();
                _this.emitDateChanged(dm);
                _this.emitInputFieldChanged(_this.utilService.getFormattedDate(dm), true);
                _this.updateModel(dm);
                if (close) {
                    _this.closeSelector(CalToggle.CloseByDateSel);
                }
            }), (/**
             * @param {?} cvc
             * @return {?}
             */
            function (cvc) {
                _this.emitCalendarChanged(cvc);
            }), (/**
             * @param {?} rds
             * @return {?}
             */
            function (rds) {
                _this.emitRangeDateSelection(rds);
            }), (/**
             * @param {?} va
             * @return {?}
             */
            function (va) {
                _this.emitViewActivated(va);
            }), (/**
             * @return {?}
             */
            function () {
                _this.closeSelector(CalToggle.CloseByEsc);
            }));
            this.emitCalendarToggle(CalToggle.Open);
            if (!this.opts.inline) {
                document.addEventListener(CLICK, this.onClickWrapper);
            }
        }
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.preventClose = false;
        }), PREVENT_CLOSE_TIMEOUT);
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.closeCalendar = /**
     * @return {?}
     */
    function () {
        this.closeSelector(CalToggle.CloseByCalBtn);
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.toggleCalendar = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        var isOpen = this.cRef === null;
        if (isOpen) {
            this.openCalendar();
        }
        else {
            this.closeSelector(CalToggle.CloseByCalBtn);
        }
        return isOpen;
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.clearDate = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        var inline = this.opts.inline;
        this.setHostValue(EMPTY_STR);
        this.emitDateChanged({
            isRange: this.opts.dateRange,
            singleDate: {
                date: this.utilService.resetDate(),
                jsDate: null,
                formatted: EMPTY_STR,
                epoc: 0
            },
            dateRange: {
                beginDate: this.utilService.resetDate(),
                beginJsDate: null,
                beginEpoc: 0,
                endDate: this.utilService.resetDate(),
                endJsDate: null,
                endEpoc: 0,
                formatted: EMPTY_STR
            }
        });
        this.onChangeCb(null);
        this.onTouchedCb();
        if (this.cRef) {
            this.cRef.instance.clearDate();
        }
        if (!inline) {
            this.closeSelector(CalToggle.CloseByCalBtn);
        }
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.isDateValid = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this.getHostValue();
        if (value === null || value === EMPTY_STR) {
            return false;
        }
        /** @type {?} */
        var validateOpts = null;
        if (!this.opts.dateRange) {
            validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
            /** @type {?} */
            var date = this.utilService.isDateValid(value, this.opts, validateOpts);
            if (this.utilService.isInitializedDate(date)) {
                this.emitInputFieldChanged(value, true);
                return true;
            }
        }
        else {
            validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
            var _a = this.utilService.isDateValidDateRange(value, this.opts, validateOpts), begin = _a.begin, end = _a.end;
            if (this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end)) {
                this.emitInputFieldChanged(value, true);
                return true;
            }
        }
        this.emitInputFieldChanged(value, false);
        return false;
    };
    /**
     * @param {?} headerAction
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.headerAction = /**
     * @param {?} headerAction
     * @return {?}
     */
    function (headerAction) {
        if (this.cRef) {
            this.cRef.instance.headerAction(headerAction);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.setHostValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var divHostElement = this.opts.divHostElement;
        this.hostText = value;
        /** @type {?} */
        var valueType = !divHostElement.enabled ? VALUE : INNER_HTML;
        value = valueType === INNER_HTML && value === EMPTY_STR ? divHostElement.placeholder : value;
        this.renderer.setProperty(this.elem.nativeElement, valueType, value);
    };
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.ignoreKeyPress = /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    function (keyCode) {
        return keyCode === KeyCode.leftArrow || keyCode === KeyCode.rightArrow || keyCode === KeyCode.upArrow || keyCode === KeyCode.downArrow || keyCode === KeyCode.tab || keyCode === KeyCode.shift;
    };
    /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.animationEnd = /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    function (reason) {
        if (this.cRef) {
            this.cRef.instance.selectorEl.nativeElement.removeEventListener(ANIMATION_END, this.onAnimateWrapper);
            this.removeComponent();
            this.emitCalendarToggle(reason);
        }
    };
    /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.closeSelector = /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    function (reason) {
        var _a = this.opts, inline = _a.inline, calendarAnimation = _a.calendarAnimation;
        if (this.cRef && !inline) {
            if (calendarAnimation.out !== CalAnimation.None) {
                var instance = this.cRef.instance;
                instance.selectorEl.nativeElement.addEventListener(ANIMATION_END, this.onAnimateWrapper.bind(this, reason));
                instance.setCalendarAnimation(calendarAnimation, false);
                // In case the animationend event is not fired
                setTimeout(this.onAnimateWrapper.bind(this, reason), ANIMATION_TIMEOUT);
            }
            else {
                this.removeComponent();
                this.emitCalendarToggle(reason);
            }
            document.removeEventListener(CLICK, this.onClickWrapper);
        }
    };
    /**
     * @private
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.removeComponent = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.vcRef !== null) {
            this.vcRef.remove(this.vcRef.indexOf(this.cRef.hostView));
            this.cRef = null;
        }
    };
    /**
     * @private
     * @param {?} model
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.updateModel = /**
     * @private
     * @param {?} model
     * @return {?}
     */
    function (model) {
        this.setHostValue(this.utilService.getFormattedDate(model));
        this.onChangeCb(model);
        this.onTouchedCb();
    };
    /**
     * @private
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.getHostValue = /**
     * @private
     * @return {?}
     */
    function () {
        var _a = this.elem.nativeElement, value = _a.value, innerHTML = _a.innerHTML;
        return !this.opts.divHostElement.enabled ? value : innerHTML;
    };
    /**
     * @private
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.focusToInput = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        var _a = this.opts, focusInputOnDateSelect = _a.focusInputOnDateSelect, divHostElement = _a.divHostElement;
        if (focusInputOnDateSelect && !divHostElement.enabled) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.elem.nativeElement.focus();
            }));
        }
    };
    /**
     * @private
     * @param {?} dateModel
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.emitDateChanged = /**
     * @private
     * @param {?} dateModel
     * @return {?}
     */
    function (dateModel) {
        this.dateChanged.emit(dateModel);
        this.setSelectedValue(dateModel);
    };
    /**
     * @private
     * @param {?} dateModel
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.setSelectedValue = /**
     * @private
     * @param {?} dateModel
     * @return {?}
     */
    function (dateModel) {
        var isRange = dateModel.isRange, dateRange = dateModel.dateRange, singleDate = dateModel.singleDate;
        this.selectedValue = isRange ? dateRange : singleDate;
    };
    /**
     * @private
     * @param {?} value
     * @param {?} valid
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.emitInputFieldChanged = /**
     * @private
     * @param {?} value
     * @param {?} valid
     * @return {?}
     */
    function (value, valid) {
        this.inputFieldChanged.emit({ value: value, dateFormat: this.opts.dateFormat, valid: valid });
    };
    /**
     * @private
     * @param {?} cvc
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.emitCalendarChanged = /**
     * @private
     * @param {?} cvc
     * @return {?}
     */
    function (cvc) {
        this.calendarViewChanged.emit(cvc);
    };
    /**
     * @private
     * @param {?} rds
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.emitRangeDateSelection = /**
     * @private
     * @param {?} rds
     * @return {?}
     */
    function (rds) {
        this.rangeDateSelection.emit(rds);
    };
    /**
     * @private
     * @param {?} va
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.emitViewActivated = /**
     * @private
     * @param {?} va
     * @return {?}
     */
    function (va) {
        this.viewActivated.emit(va);
    };
    /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.emitCalendarToggle = /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    function (reason) {
        this.calendarToggle.emit(reason);
    };
    /**
     * @private
     * @param {?} elem
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.appendSelector = /**
     * @private
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        if (this.opts.appendSelectorToBody) {
            document.querySelector(BODY).appendChild(elem);
        }
    };
    /**
     * @private
     * @param {?} elem
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.getSelectorPosition = /**
     * @private
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        /** @type {?} */
        var top = 0;
        /** @type {?} */
        var left = 0;
        var _a = this.opts, appendSelectorToBody = _a.appendSelectorToBody, openSelectorTopOfInput = _a.openSelectorTopOfInput, selectorHeight = _a.selectorHeight, selectorWidth = _a.selectorWidth, showSelectorArrow = _a.showSelectorArrow, alignSelectorRight = _a.alignSelectorRight;
        if (appendSelectorToBody) {
            /** @type {?} */
            var b = document.body.getBoundingClientRect();
            /** @type {?} */
            var e = elem.getBoundingClientRect();
            top = e.top - b.top;
            left = e.left - b.left;
        }
        if (openSelectorTopOfInput) {
            top = top - this.getSelectorDimension(selectorHeight) - 2;
        }
        else {
            top = top + elem.offsetHeight + (showSelectorArrow ? 12 : 2);
        }
        if (alignSelectorRight) {
            left = left + elem.offsetWidth - this.getSelectorDimension(selectorWidth);
        }
        return { top: top + PX, left: left + PX };
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.getSelectorDimension = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Number(value.replace(PX, EMPTY_STR));
    };
    AngularMyDatePickerDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[angular-mydatepicker]",
                    exportAs: "angular-mydatepicker",
                    providers: [UtilService, LocaleService, DefaultConfigService, NGX_DP_VALUE_ACCESSOR, NGX_DP_VALIDATORS]
                },] }
    ];
    /** @nocollapse */
    AngularMyDatePickerDirective.ctorParameters = function () { return [
        { type: LocaleService },
        { type: UtilService },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: DefaultConfigService }
    ]; };
    AngularMyDatePickerDirective.propDecorators = {
        options: [{ type: Input }],
        locale: [{ type: Input }],
        defaultMonth: [{ type: Input }],
        dateChanged: [{ type: Output }],
        inputFieldChanged: [{ type: Output }],
        calendarViewChanged: [{ type: Output }],
        calendarToggle: [{ type: Output }],
        rangeDateSelection: [{ type: Output }],
        viewActivated: [{ type: Output }],
        onKeyUp: [{ type: HostListener, args: [KEYUP, ["$event"],] }],
        onBlur: [{ type: HostListener, args: [BLUR,] }]
    };
    return AngularMyDatePickerDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularMyDatePickerCalendarDirective = /** @class */ (function () {
    function AngularMyDatePickerCalendarDirective(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    AngularMyDatePickerCalendarDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _a = this.libAngularMyDatePickerCalendar, inline = _a.inline, selectorHeight = _a.selectorHeight, selectorWidth = _a.selectorWidth, selectorPos = _a.selectorPos;
        var style = this.el.nativeElement.style;
        style.height = selectorHeight;
        style.width = selectorWidth;
        style.top = !inline ? selectorPos.top : "0";
        style.left = !inline ? selectorPos.left : "0";
    };
    AngularMyDatePickerCalendarDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[libAngularMyDatePickerCalendar]"
                },] }
    ];
    /** @nocollapse */
    AngularMyDatePickerCalendarDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AngularMyDatePickerCalendarDirective.propDecorators = {
        libAngularMyDatePickerCalendar: [{ type: Input }]
    };
    return AngularMyDatePickerCalendarDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularMyDatePickerModule = /** @class */ (function () {
    function AngularMyDatePickerModule() {
    }
    AngularMyDatePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [
                        CalendarComponent,
                        SelectionBarComponent,
                        DayViewComponent,
                        MonthViewComponent,
                        YearViewComponent,
                        FooterBarComponent,
                        AngularMyDatePickerDirective,
                        AngularMyDatePickerCalendarDirective
                    ],
                    entryComponents: [CalendarComponent],
                    exports: [
                        CalendarComponent,
                        SelectionBarComponent,
                        DayViewComponent,
                        MonthViewComponent,
                        YearViewComponent,
                        FooterBarComponent,
                        AngularMyDatePickerDirective,
                        AngularMyDatePickerCalendarDirective
                    ]
                },] }
    ];
    return AngularMyDatePickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularMyDatePickerModule, AngularMyDatePickerDirective, CalendarComponent, DayViewComponent, MonthViewComponent, YearViewComponent, SelectionBarComponent, UtilService, DefaultConfigService, LocaleService, AngularMyDatePickerCalendarDirective, CalToggle, KeyCode, KeyName, MonthId, Year, DefaultView, ActiveView, CalAnimation, HeaderAction, D, DD, M, MM, MMM, Y, YYYY, ORDINAL, ST, ND, RD, DATE_ROW_COUNT, DATE_COL_COUNT, MONTH_ROW_COUNT, MONTH_COL_COUNT, YEAR_ROW_COUNT, YEAR_COL_COUNT, DOT, UNDER_LINE, PIPE, YEAR_SEPARATOR, SU, MO, TU, WE, TH, FR, SA, DEFAULT_LOCALE, ZERO_STR, EMPTY_STR, SPACE_STR, CLICK, KEYUP, BLUR, DISABLED, BODY, VALUE, OPTIONS, DEFAULT_MONTH, LOCALE, OBJECT, PX, STYLE, INNER_HTML, OPTS, YEARS_DURATION, YEARS, VISIBLE_MONTH, SELECT_MONTH, SELECT_YEAR, PREV_VIEW_DISABLED, NEXT_VIEW_DISABLED, DATES, WEEK_DAYS, SELECTED_DATE, SELECTED_DATE_RANGE, MONTHS, ANIMATION_END, ANIMATION_TIMEOUT, MY_DP_ANIMATION, ANIMATION_NAMES, IN, OUT, TABINDEX, TD_SELECTOR, PREVENT_CLOSE_TIMEOUT, FooterBarComponent as ɵa };

//# sourceMappingURL=angular-mydatepicker.js.map