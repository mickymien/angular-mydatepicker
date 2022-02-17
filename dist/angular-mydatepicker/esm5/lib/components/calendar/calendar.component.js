/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewEncapsulation, ViewChild, Renderer2, ChangeDetectorRef, HostBinding } from "@angular/core";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import { KeyCode } from "../../enums/key-code.enum";
import { MonthId } from "../../enums/month-id.enum";
import { DefaultView } from "../../enums/default-view.enum";
import { CalAnimation } from "../../enums/cal-animation.enum";
import { HeaderAction } from "../../enums/header-action.enum";
import { DOT, UNDER_LINE, D, M, Y, DATE_ROW_COUNT, DATE_COL_COUNT, MONTH_ROW_COUNT, MONTH_COL_COUNT, YEAR_ROW_COUNT, YEAR_COL_COUNT, SU, MO, TU, WE, TH, FR, SA, EMPTY_STR, CLICK, STYLE, MY_DP_ANIMATION, ANIMATION_NAMES, IN, OUT, TABINDEX, TD_SELECTOR, ZERO_STR, YEAR_SEPARATOR } from "../../constants/constants";
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
        _a = tslib_1.__read([this.nextViewDisabled, this.prevViewDisabled], 2), this.prevViewDisabled = _a[0], this.nextViewDisabled = _a[1];
    };
    CalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: "lib-angular-mydatepicker-calendar",
                    template: "<span #styleEl></span>\n<div class=\"ng-mydp {{opts.stylesData?.selector || ''}}\">\n  <div class=\"myDpSelector\" #selectorEl \n    [libAngularMyDatePickerCalendar]=\"{inline: opts.inline, selectorWidth: opts.selectorWidth, selectorHeight: opts.selectorHeight, selectorPos: selectorPos}\" \n    [ngClass]=\"{'myDpSelectorArrow': opts.showSelectorArrow, 'myDpSelectorArrowLeft': opts.showSelectorArrow && !opts.alignSelectorRight, \n      'myDpSelectorArrowRight': opts.showSelectorArrow&&opts.alignSelectorRight, 'myDpSelectorAbsolute': !opts.inline, 'myDpSelectorPosInitial': opts.inline}\" \n    (keyup)=\"onCloseSelector($event)\" tabindex=\"0\">\n\n    <lib-selection-bar [opts]=\"opts\" [yearsDuration]=\"yearsDuration\" [visibleMonth]=\"visibleMonth\" [selectMonth]=\"selectMonth\" [selectYear]=\"selectYear\"\n                    [prevViewDisabled]=\"prevViewDisabled\" [nextViewDisabled]=\"nextViewDisabled\"\n                    (prevNavigateBtnClicked)=\"onPrevNavigateBtnClicked()\" (nextNavigateBtnClicked)=\"onNextNavigateBtnClicked()\"\n                    (monthViewBtnClicked)=\"onMonthViewBtnClicked()\" (yearViewBtnClicked)=\"onYearViewBtnClicked()\"></lib-selection-bar>\n\n    <lib-day-view *ngIf=\"!selectMonth && !selectYear\" [opts]=\"opts\" [dates]=\"dates\" [weekDays]=\"weekDays\"\n                    [selectedDate]=\"selectedDate\" [selectedDateRange]=\"selectedDateRange\" [viewChanged]=\"viewChanged\"\n                    (dayCellClicked)=\"onDayCellClicked($event)\"\n                    (dayCellKeyDown)=\"onDayCellKeyDown($event)\"\n                    (viewActivated)=\"onViewActivated($event)\"></lib-day-view>\n\n    <lib-month-view *ngIf=\"selectMonth\" [opts]=\"opts\" [months]=\"months\" [viewChanged]=\"viewChanged\"\n                    (monthCellClicked)=\"onMonthCellClicked($event)\"\n                    (monthCellKeyDown)=\"onMonthCellKeyDown($event)\"\n                    (viewActivated)=\"onViewActivated($event)\"></lib-month-view>\n\n    <lib-year-view *ngIf=\"selectYear\" [opts]=\"opts\" [years]=\"years\" [viewChanged]=\"viewChanged\"\n                    (yearCellClicked)=\"onYearCellClicked($event)\"\n                    (yearCellKeyDown)=\"onYearCellKeyDown($event)\"\n                    (viewActivated)=\"onViewActivated($event)\"></lib-year-view>\n\n    <lib-footer-bar *ngIf=\"opts.showFooterToday\" [opts]=\"opts\"\n                    (footerBarTxtClicked)=\"onTodayFooterClicked()\"></lib-footer-bar>\n  </div>\n</div>\n",
                    providers: [UtilService],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".ng-mydp{position:static}.ng-myrtl{direction:rtl}.ng-mydp *{box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;padding:0;margin:0}.ng-mydp table{display:table;border-spacing:0}.ng-mydp table td,.ng-mydp table th{padding:0;margin:0;vertical-align:middle;border:none}.myDpSelector{padding:4px;border:1px solid #ccc;background-color:#fff;border-radius:4px;z-index:100000}.myDpViewChangeAnimation{-webkit-animation:.2s linear myDpViewChangeAnimation;animation:.2s linear myDpViewChangeAnimation}.myDpContainer{display:flex;flex-direction:column}@-webkit-keyframes myDpViewChangeAnimation{0%{transform:scale(.75);opacity:.1}100%{transform:scale(1);opacity:1}}@keyframes myDpViewChangeAnimation{0%{transform:scale(.75);opacity:.1}100%{transform:scale(1);opacity:1}}.myDpAnimationFadeIn{-webkit-animation:.5s linear myDpAnimationFadeIn;animation:.5s linear myDpAnimationFadeIn}@-webkit-keyframes myDpAnimationFadeIn{0%{transform:translateY(-50px);opacity:0}100%{transform:translateY(0);opacity:1}}@keyframes myDpAnimationFadeIn{0%{transform:translateY(-50px);opacity:0}100%{transform:translateY(0);opacity:1}}.myDpAnimationFadeOut{-webkit-animation:.3s linear forwards myDpAnimationFadeOut;animation:.3s linear forwards myDpAnimationFadeOut}@-webkit-keyframes myDpAnimationFadeOut{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-50px);opacity:0}}@keyframes myDpAnimationFadeOut{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-50px);opacity:0}}.myDpAnimationScaleTopIn{-webkit-animation:.3s linear myDpAnimationScaleTopIn;animation:.3s linear myDpAnimationScaleTopIn}@-webkit-keyframes myDpAnimationScaleTopIn{0%{transform:scaleY(0);transform-origin:100% 0}100%{transform:scaleY(1);transform-origin:100% 0}}@keyframes myDpAnimationScaleTopIn{0%{transform:scaleY(0);transform-origin:100% 0}100%{transform:scaleY(1);transform-origin:100% 0}}.myDpAnimationScaleTopOut{-webkit-animation:.3s linear forwards myDpAnimationScaleTopOut;animation:.3s linear forwards myDpAnimationScaleTopOut}@-webkit-keyframes myDpAnimationScaleTopOut{0%{transform:scaleY(1);transform-origin:100% 0;opacity:1}100%{transform:scaleY(0);transform-origin:100% 0;opacity:0}}@keyframes myDpAnimationScaleTopOut{0%{transform:scaleY(1);transform-origin:100% 0;opacity:1}100%{transform:scaleY(0);transform-origin:100% 0;opacity:0}}.myDpAnimationScaleCenterIn{-webkit-animation:.3s linear myDpAnimationScaleCenterIn;animation:.3s linear myDpAnimationScaleCenterIn}@-webkit-keyframes myDpAnimationScaleCenterIn{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes myDpAnimationScaleCenterIn{0%{transform:scale(0)}100%{transform:scale(1)}}.myDpAnimationScaleCenterOut{-webkit-animation:.3s linear forwards myDpAnimationScaleCenterOut;animation:.3s linear forwards myDpAnimationScaleCenterOut}@-webkit-keyframes myDpAnimationScaleCenterOut{0%{transform:scale(1);opacity:1}100%{transform:scale(0);opacity:0}}@keyframes myDpAnimationScaleCenterOut{0%{transform:scale(1);opacity:1}100%{transform:scale(0);opacity:0}}.myDpAnimationRotateIn{-webkit-animation:.3s linear myDpAnimationRotateIn;animation:.3s linear myDpAnimationRotateIn}@-webkit-keyframes myDpAnimationRotateIn{0%{transform:scale(.3) rotate(-45deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}@keyframes myDpAnimationRotateIn{0%{transform:scale(.3) rotate(-45deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}.myDpAnimationRotateOut{-webkit-animation:.3s linear forwards myDpAnimationRotateOut;animation:.3s linear forwards myDpAnimationRotateOut}@-webkit-keyframes myDpAnimationRotateOut{0%{transform:scale(1) rotate(0);opacity:1}100%{transform:scale(.3) rotate(-45deg);opacity:0}}@keyframes myDpAnimationRotateOut{0%{transform:scale(1) rotate(0);opacity:1}100%{transform:scale(.3) rotate(-45deg);opacity:0}}.myDpAnimationFlipDiagonalIn{-webkit-animation:.3s linear myDpAnimationFlipDiagonalIn;animation:.3s linear myDpAnimationFlipDiagonalIn}@-webkit-keyframes myDpAnimationFlipDiagonalIn{0%{transform:rotate3d(1,1,0,-78deg)}100%{transform:rotate3d(1,1,0,0deg)}}@keyframes myDpAnimationFlipDiagonalIn{0%{transform:rotate3d(1,1,0,-78deg)}100%{transform:rotate3d(1,1,0,0deg)}}.myDpAnimationFlipDiagonalOut{-webkit-animation:.3s linear forwards myDpAnimationFlipDiagonalOut;animation:.3s linear forwards myDpAnimationFlipDiagonalOut}@-webkit-keyframes myDpAnimationFlipDiagonalOut{0%{transform:rotate3d(1,1,0,0deg);opacity:1}100%{transform:rotate3d(1,1,0,78deg);opacity:0}}@keyframes myDpAnimationFlipDiagonalOut{0%{transform:rotate3d(1,1,0,0deg);opacity:1}100%{transform:rotate3d(1,1,0,78deg);opacity:0}}.myDpSelectorAbsolute{position:absolute}.myDpSelectorPosInitial{position:initial}.myDpSelector:focus{box-shadow:-1px 1px 6px 0 #add8e6;outline:0}.myDpSelectorArrow{background:#fff}.myDpSelectorArrow:after,.myDpSelectorArrow:before{bottom:100%;border:solid transparent;content:\" \";height:0;width:0;position:absolute}.myDpSelectorArrow:after{border-color:rgba(250,250,250,0);border-bottom-color:#fafafa;border-width:10px;margin-left:-10px}.myDpSelectorArrow:before{border-color:rgba(204,204,204,0);border-bottom-color:#ccc;border-width:11px;margin-left:-11px}.myDpSelectorArrow:focus:before{border-bottom-color:#add8e6}.myDpSelectorArrowLeft:after,.myDpSelectorArrowLeft:before{left:24px}.myDpSelectorArrowRight:after,.myDpSelectorArrowRight:before{left:86%}::-ms-clear{display:none}.myDpCalTable,.myDpFooterBar,.myDpMonthTable,.myDpYearTable{border-radius:0 0 4px 4px}.myDpCalTable.myDpNoFooter tbody tr:nth-child(6) td:first-child,.myDpMonthTable.myDpNoFooter tbody tr:nth-child(4) td:first-child,.myDpYearTable.myDpNoFooter tbody tr:nth-child(5) td:first-child{border-bottom-left-radius:4px}.myDpCalTable.myDpNoFooter tbody tr:nth-child(6) td:last-child,.myDpMonthTable.myDpNoFooter tbody tr:nth-child(4) td:last-child,.myDpYearTable.myDpNoFooter tbody tr:nth-child(5) td:last-child{border-bottom-right-radius:4px}.myDpCalTable,.myDpMonthTable,.myDpYearTable{table-layout:fixed;width:100%;background-color:#fff;font-size:14px}.myDpFooter{height:calc(100% - 60px)}.myDpNoFooter{height:calc(100% - 30px)}.myDpCalTable,.myDpDaycell,.myDpMonthTable,.myDpMonthcell,.myDpWeekDayTitle,.myDpYearTable,.myDpYearcell{border-collapse:collapse;color:#333;line-height:1.1}.myDpDaycell,.myDpMonthcell,.myDpYearcell{padding:4px;text-align:center;outline:0}.myDpDaycell{background-color:#fff;position:relative}.myDpWeekDayTitle{background-color:transparent;color:#333;font-size:13px;font-weight:400;vertical-align:middle;max-width:36px;overflow:hidden;white-space:nowrap;height:23px;text-align:center}.myDpWeekDayTitleWeekNbr{width:20px}.myDpMonthcell{background-color:#fff;overflow:hidden;white-space:nowrap}.myDpYearcell{background-color:#fff;width:20%}.myDpMonthNbr{font-size:10px;display:block}.myDpDaycellWeekNbr{font-size:9px;cursor:default;text-align:center;color:#333}.myDpNextMonth,.myDpPrevMonth{color:#999}.myDpMonthYearSelBar{display:flex;height:30px;background-color:#fff;border-top-left-radius:4px;border-top-right-radius:4px}.myDpPrevBtn{margin-left:10px}.myDpNextBtn{margin-left:auto;margin-right:10px}.myDpMonthYearText{width:100%;line-height:30px;text-align:center}.myDpFooterBar{display:flex;align-items:center;justify-content:center;height:30px;background-color:#fff}.myDpHeaderBtn{background:0 0;padding:0;border:none;line-height:30px;height:28px;margin-top:1px;color:#000;outline:0;cursor:default}.myDpFooterBtn{margin:0 10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.myDpMonthBtn,.myDpYearBtn{font-size:16px}.myDpMonthBtn{margin-right:6px}.myDpHighlight{color:#c30000}.myDpDimDay{opacity:.5}.myDpCurrMonth{background-color:#fff;font-weight:400}.myDpMarkDate{position:absolute;top:2px;left:2px;border-right:8px solid transparent}.myDpMarkCurrDay,.myDpMarkCurrMonth,.myDpMarkCurrYear{border-bottom:2px solid #333}.myDpHeaderLabelBtnNotEdit{cursor:default}.myDpHeaderBtn::-moz-focus-inner,.myDpNextBtn::-moz-focus-inner,.myDpPrevBtn::-moz-focus-inner{border:0}.myDpFooterBtn:focus,.myDpHeaderBtn:focus,.myDpMonthLabel:focus,.myDpYearLabel:focus{color:#66afe9;outline:0}.myDpDaycell:focus,.myDpMonthcell:focus,.myDpYearcell:focus{box-shadow:inset 0 0 0 1px #66afe9}.myDpTableSingleDay:hover,.myDpTableSingleMonth:hover,.myDpTableSingleYear:hover{background-color:#ddd}.myDpDaycell,.myDpMonthLabel,.myDpMonthcell,.myDpYearLabel,.myDpYearcell{cursor:pointer}.myDpFooterBtn:hover,.myDpHeaderBtnEnabled:hover,.myDpMonthLabel:hover,.myDpYearLabel:hover{color:#777}.myDpHeaderBtnEnabled{cursor:pointer}.myDpHeaderBtnDisabled{cursor:not-allowed;opacity:.65}.myDpDisabled{cursor:default;color:#777;background:repeating-linear-gradient(-45deg,#ccc 7px,#ccc 8px,transparent 7px,transparent 14px)}.myDpRangeColor{background-color:#dbeaff}.myDpRangeBegin,.myDpRangeEnd,.myDpSelectedDay,.myDpSelectedMonth,.myDpSelectedYear{border:none;background-color:#8ebfff}@font-face{font-family:angular-mydatepicker;src:url(data:application/octet-stream;base64,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) format('woff');font-weight:400;font-style:normal}.myDpIcon{font-family:angular-mydatepicker;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#222;font-size:20px}.myDpIconLeftArrow:before{content:\"\\e800\"}.myDpIconRightArrow:before{content:\"\\e801\"}"]
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
export { CalendarComponent };
if (false) {
    /** @type {?} */
    CalendarComponent.prototype.selectorEl;
    /** @type {?} */
    CalendarComponent.prototype.styleEl;
    /** @type {?} */
    CalendarComponent.prototype.position;
    /** @type {?} */
    CalendarComponent.prototype.opts;
    /** @type {?} */
    CalendarComponent.prototype.visibleMonth;
    /** @type {?} */
    CalendarComponent.prototype.selectedMonth;
    /** @type {?} */
    CalendarComponent.prototype.selectedDate;
    /** @type {?} */
    CalendarComponent.prototype.selectedDateRange;
    /** @type {?} */
    CalendarComponent.prototype.weekDays;
    /** @type {?} */
    CalendarComponent.prototype.dates;
    /** @type {?} */
    CalendarComponent.prototype.months;
    /** @type {?} */
    CalendarComponent.prototype.years;
    /** @type {?} */
    CalendarComponent.prototype.yearsDuration;
    /** @type {?} */
    CalendarComponent.prototype.dayIdx;
    /** @type {?} */
    CalendarComponent.prototype.weekDayOpts;
    /** @type {?} */
    CalendarComponent.prototype.selectMonth;
    /** @type {?} */
    CalendarComponent.prototype.selectYear;
    /** @type {?} */
    CalendarComponent.prototype.viewChanged;
    /** @type {?} */
    CalendarComponent.prototype.dateChanged;
    /** @type {?} */
    CalendarComponent.prototype.calendarViewChanged;
    /** @type {?} */
    CalendarComponent.prototype.rangeDateSelection;
    /** @type {?} */
    CalendarComponent.prototype.viewActivated;
    /** @type {?} */
    CalendarComponent.prototype.closedByEsc;
    /** @type {?} */
    CalendarComponent.prototype.selectorPos;
    /** @type {?} */
    CalendarComponent.prototype.prevViewDisabled;
    /** @type {?} */
    CalendarComponent.prototype.nextViewDisabled;
    /** @type {?} */
    CalendarComponent.prototype.clickListener;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.elem;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.utilService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1teWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jYWxlbmRhci9jYWxlbmRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUE0QixXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFnQnZKLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRTVELE9BQU8sRUFBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUNoSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXBMO0lBNENFLDJCQUFvQixJQUFnQixFQUFVLFFBQW1CLEVB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QkFBaUI7Z0JBZ0JqRixXQUFXOzs7NkJBa0JoQixTQUFTLFNBQUMsWUFBWTswQkFDdEIsU0FBUyxTQUFDLFNBQVM7MkJBRW5CLFdBQVcsU0FBQyxnQkFBZ0I7O0lBK3hCL0Isd0JBQUM7Q0FBQSxBQTF5QkQsSUEweUJDO1NBbnlCWSxpQkFBaUI7OztJQUM1Qix1Q0FBZ0Q7O0lBQ2hELG9DQUEwQzs7SUFFMUMscUNBQW1EOztJQUVuRCxpQ0FBaUI7O0lBQ2pCLHlDQUFxRTs7SUFDckUsMENBQWlEOztJQUNqRCx5Q0FBb0Q7O0lBQ3BELDhDQUF5Rzs7SUFDekcscUNBQTZCOztJQUM3QixrQ0FBMkI7O0lBQzNCLG1DQUE0Qzs7SUFDNUMsa0NBQTBDOztJQUMxQywwQ0FBMkI7O0lBQzNCLG1DQUFtQjs7SUFDbkIsd0NBQTBEOztJQUUxRCx3Q0FBNkI7O0lBQzdCLHVDQUE0Qjs7SUFFNUIsd0NBQTZCOztJQUU3Qix3Q0FBd0Q7O0lBQ3hELGdEQUEyRDs7SUFDM0QsK0NBQXlEOztJQUN6RCwwQ0FBd0M7O0lBQ3hDLHdDQUF3Qjs7SUFFeEIsd0NBQXdDOztJQUV4Qyw2Q0FBa0M7O0lBQ2xDLDZDQUFrQzs7SUFFbEMsMENBQTBCOzs7OztJQUVkLGlDQUF3Qjs7Ozs7SUFBRSxxQ0FBMkI7Ozs7O0lBQUUsZ0NBQThCOzs7OztJQUFFLHdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3RW5jYXBzdWxhdGlvbiwgVmlld0NoaWxkLCBSZW5kZXJlcjIsIENoYW5nZURldGVjdG9yUmVmLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEhvc3RCaW5kaW5nfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJTXlEYXRlfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1kYXRlLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlEYXRlUmFuZ2V9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LWRhdGUtcmFuZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeU1vbnRofSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1tb250aC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15Q2FsZW5kYXJEYXl9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LWNhbGVuZGFyLWRheS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15Q2FsZW5kYXJNb250aH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktY2FsZW5kYXItbW9udGguaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeUNhbGVuZGFyWWVhcn0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktY2FsZW5kYXIteWVhci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15V2Vla30gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktd2Vlay5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15T3B0aW9uc30gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktb3B0aW9ucy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15U2VsZWN0b3JQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktc2VsZWN0b3ItcG9zLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlDYWxlbmRhclZpZXdDaGFuZ2VkfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1jYWxlbmRhci12aWV3LWNoYW5nZWQuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeURhdGVNb2RlbH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktZGF0ZS1tb2RlbC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15UmFuZ2VEYXRlU2VsZWN0aW9ufSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1yYW5nZS1kYXRlLXNlbGVjdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15Q2FsZW5kYXJBbmltYXRpb259IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LWNhbGVuZGFyLWFuaW1hdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15VmFsaWRhdGVPcHRpb25zfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS12YWxpZGF0ZS1vcHRpb25zLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlEZWZhdWx0TW9udGh9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LWRlZmF1bHQtbW9udGguaW50ZXJmYWNlXCI7XG5pbXBvcnQge1V0aWxTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYW5ndWxhci1teWRhdGVwaWNrZXIudXRpbC5zZXJ2aWNlXCI7XG5pbXBvcnQge0tleUNvZGV9IGZyb20gXCIuLi8uLi9lbnVtcy9rZXktY29kZS5lbnVtXCI7XG5pbXBvcnQge01vbnRoSWR9IGZyb20gXCIuLi8uLi9lbnVtcy9tb250aC1pZC5lbnVtXCI7XG5pbXBvcnQge0RlZmF1bHRWaWV3fSBmcm9tIFwiLi4vLi4vZW51bXMvZGVmYXVsdC12aWV3LmVudW1cIjtcbmltcG9ydCB7Q2FsQW5pbWF0aW9ufSBmcm9tIFwiLi4vLi4vZW51bXMvY2FsLWFuaW1hdGlvbi5lbnVtXCI7XG5pbXBvcnQge0hlYWRlckFjdGlvbn0gZnJvbSBcIi4uLy4uL2VudW1zL2hlYWRlci1hY3Rpb24uZW51bVwiO1xuaW1wb3J0IHtBY3RpdmVWaWV3fSBmcm9tIFwiLi4vLi4vZW51bXMvYWN0aXZlLXZpZXcuZW51bVwiO1xuaW1wb3J0IHtET1QsIFVOREVSX0xJTkUsIEQsIE0sIFksIERBVEVfUk9XX0NPVU5ULCBEQVRFX0NPTF9DT1VOVCwgTU9OVEhfUk9XX0NPVU5ULCBNT05USF9DT0xfQ09VTlQsIFlFQVJfUk9XX0NPVU5ULCBZRUFSX0NPTF9DT1VOVCwgXG4gIFNVLCBNTywgVFUsIFdFLCBUSCwgRlIsIFNBLCBFTVBUWV9TVFIsIENMSUNLLCBTVFlMRSwgTVlfRFBfQU5JTUFUSU9OLCBBTklNQVRJT05fTkFNRVMsIElOLCBPVVQsIFRBQklOREVYLCBURF9TRUxFQ1RPUiwgWkVST19TVFIsIFlFQVJfU0VQQVJBVE9SfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2NvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibGliLWFuZ3VsYXItbXlkYXRlcGlja2VyLWNhbGVuZGFyXCIsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuLi8uLi9jc3MvYW5ndWxhci1teWRhdGVwaWNrZXIuc3R5bGUuY3NzJ10sXG4gIHByb3ZpZGVyczogW1V0aWxTZXJ2aWNlXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoXCJzZWxlY3RvckVsXCIpIHNlbGVjdG9yRWw6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJzdHlsZUVsXCIpIHN0eWxlRWw6IEVsZW1lbnRSZWY7XG4gIFxuICBASG9zdEJpbmRpbmcoXCJzdHlsZS5wb3NpdGlvblwiKSBwb3NpdGlvbiA9IFwic3RhdGljXCI7XG5cbiAgb3B0czogSU15T3B0aW9ucztcbiAgdmlzaWJsZU1vbnRoOiBJTXlNb250aCA9IHttb250aFR4dDogRU1QVFlfU1RSLCBtb250aE5icjogMCwgeWVhcjogMH07XG4gIHNlbGVjdGVkTW9udGg6IElNeU1vbnRoID0ge21vbnRoTmJyOiAwLCB5ZWFyOiAwfTtcbiAgc2VsZWN0ZWREYXRlOiBJTXlEYXRlID0ge3llYXI6IDAsIG1vbnRoOiAwLCBkYXk6IDB9O1xuICBzZWxlY3RlZERhdGVSYW5nZTogSU15RGF0ZVJhbmdlID0ge2JlZ2luOiB7eWVhcjogMCwgbW9udGg6IDAsIGRheTogMH0sIGVuZDoge3llYXI6IDAsIG1vbnRoOiAwLCBkYXk6IDB9fTtcbiAgd2Vla0RheXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgZGF0ZXM6IEFycmF5PElNeVdlZWs+ID0gW107XG4gIG1vbnRoczogQXJyYXk8QXJyYXk8SU15Q2FsZW5kYXJNb250aD4+ID0gW107XG4gIHllYXJzOiBBcnJheTxBcnJheTxJTXlDYWxlbmRhclllYXI+PiA9IFtdO1xuICB5ZWFyc0R1cmF0aW9uOiBzdHJpbmcgPSBcIlwiO1xuICBkYXlJZHg6IG51bWJlciA9IDA7XG4gIHdlZWtEYXlPcHRzOiBBcnJheTxzdHJpbmc+ID0gW1NVLCBNTywgVFUsIFdFLCBUSCwgRlIsIFNBXTtcblxuICBzZWxlY3RNb250aDogYm9vbGVhbiA9IGZhbHNlO1xuICBzZWxlY3RZZWFyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgdmlld0NoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBkYXRlQ2hhbmdlZDogKGRtOiBJTXlEYXRlTW9kZWwsIGNsb3NlOiBib29sZWFuKSA9PiB2b2lkO1xuICBjYWxlbmRhclZpZXdDaGFuZ2VkOiAoY3ZjOiBJTXlDYWxlbmRhclZpZXdDaGFuZ2VkKSA9PiB2b2lkO1xuICByYW5nZURhdGVTZWxlY3Rpb246IChyZHM6IElNeVJhbmdlRGF0ZVNlbGVjdGlvbikgPT4gdm9pZDtcbiAgdmlld0FjdGl2YXRlZDogKHZhOiBBY3RpdmVWaWV3KSA9PiB2b2lkO1xuICBjbG9zZWRCeUVzYzogKCkgPT4gdm9pZDtcbiAgXG4gIHNlbGVjdG9yUG9zOiBJTXlTZWxlY3RvclBvc2l0aW9uID0gbnVsbDtcblxuICBwcmV2Vmlld0Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIG5leHRWaWV3RGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjbGlja0xpc3RlbmVyOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbTogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgdXRpbFNlcnZpY2U6IFV0aWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5jbGlja0xpc3RlbmVyID0gcmVuZGVyZXIubGlzdGVuKGVsZW0ubmF0aXZlRWxlbWVudCwgQ0xJQ0ssIChldmVudDogYW55KSA9PiB7XG4gICAgICBpZiAoKHRoaXMub3B0cy5tb250aFNlbGVjdG9yIHx8IHRoaXMub3B0cy55ZWFyU2VsZWN0b3IpICYmIGV2ZW50LnRhcmdldCkge1xuICAgICAgICB0aGlzLnJlc2V0TW9udGhZZWFyU2VsZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3Qge3N0eWxlc0RhdGEsIGNhbGVuZGFyQW5pbWF0aW9uLCBpbmxpbmV9ID0gdGhpcy5vcHRzO1xuXG4gICAgaWYgKHN0eWxlc0RhdGEuc3R5bGVzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgc3R5bGVFbFRlbXA6IGFueSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChTVFlMRSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHN0eWxlRWxUZW1wLCB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQoc3R5bGVzRGF0YS5zdHlsZXMpKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5zdHlsZUVsLm5hdGl2ZUVsZW1lbnQsIHN0eWxlRWxUZW1wKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsZW5kYXJBbmltYXRpb24uaW4gIT09IENhbEFuaW1hdGlvbi5Ob25lKSB7XG4gICAgICB0aGlzLnNldENhbGVuZGFyQW5pbWF0aW9uKGNhbGVuZGFyQW5pbWF0aW9uLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoIWlubGluZSkge1xuICAgICAgdGhpcy5mb2N1c1RvU2VsZWN0b3IoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsaWNrTGlzdGVuZXIoKTtcbiAgfVxuXG4gIGluaXRpYWxpemVDb21wb25lbnQob3B0czogSU15T3B0aW9ucywgZGVmYXVsdE1vbnRoOiBJTXlEZWZhdWx0TW9udGgsIHNlbGVjdGVkVmFsdWU6IGFueSwgaW5wdXRWYWx1ZTogc3RyaW5nLCBzZWxlY3RvclBvczogSU15U2VsZWN0b3JQb3NpdGlvbiwgZGM6IChkbTogSU15RGF0ZU1vZGVsLCBjbG9zZTogYm9vbGVhbikgPT4gdm9pZCwgY3ZjOiAoY3ZjOiBJTXlDYWxlbmRhclZpZXdDaGFuZ2VkKSA9PiB2b2lkLCByZHM6IChyZHM6IElNeVJhbmdlRGF0ZVNlbGVjdGlvbikgPT4gdm9pZCwgdmE6ICh2YTogQWN0aXZlVmlldykgPT4gdm9pZCwgY2JlOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICB0aGlzLnNlbGVjdG9yUG9zID0gc2VsZWN0b3JQb3M7XG4gICAgXG4gICAgdGhpcy5kYXRlQ2hhbmdlZCA9IGRjO1xuICAgIHRoaXMuY2FsZW5kYXJWaWV3Q2hhbmdlZCA9IGN2YztcbiAgICB0aGlzLnJhbmdlRGF0ZVNlbGVjdGlvbiA9IHJkcztcbiAgICB0aGlzLnZpZXdBY3RpdmF0ZWQgPSB2YTtcbiAgICB0aGlzLmNsb3NlZEJ5RXNjID0gY2JlO1xuXG4gICAgY29uc3Qge2RlZmF1bHRWaWV3LCBmaXJzdERheU9mV2VlaywgZGF5TGFiZWxzfSA9IG9wdHM7XG5cbiAgICB0aGlzLndlZWtEYXlzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5kYXlJZHggPSB0aGlzLndlZWtEYXlPcHRzLmluZGV4T2YoZmlyc3REYXlPZldlZWspO1xuICAgIGlmICh0aGlzLmRheUlkeCAhPT0gLTEpIHtcbiAgICAgIGxldCBpZHg6IG51bWJlciA9IHRoaXMuZGF5SWR4O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndlZWtEYXlPcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMud2Vla0RheXMucHVzaChkYXlMYWJlbHNbdGhpcy53ZWVrRGF5T3B0c1tpZHhdXSk7XG4gICAgICAgIGlkeCA9IHRoaXMud2Vla0RheU9wdHNbaWR4XSA9PT0gU0EgPyAwIDogaWR4ICsgMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmluaXRpYWxpemVWaWV3KGRlZmF1bHRNb250aCwgc2VsZWN0ZWRWYWx1ZSwgaW5wdXRWYWx1ZSk7XG4gICAgdGhpcy5zZXRDYWxlbmRhclZpc2libGVNb250aCgpO1xuICAgIHRoaXMuc2V0RGVmYXVsdFZpZXcoZGVmYXVsdFZpZXcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZVZpZXcoZGVmYXVsdE1vbnRoOiBJTXlEZWZhdWx0TW9udGgsIHNlbGVjdGVkVmFsdWU6IGFueSwgaW5wdXRWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qge2RhdGVSYW5nZX0gPSB0aGlzLm9wdHM7XG5cbiAgICAvLyB1c2UgdG9kYXkgYXMgYSBzZWxlY3RlZCBtb250aFxuICAgIGNvbnN0IHRvZGF5OiBJTXlEYXRlID0gdGhpcy51dGlsU2VydmljZS5nZXRUb2RheSgpO1xuICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IHttb250aE5icjogdG9kYXkubW9udGgsIHllYXI6IHRvZGF5LnllYXJ9O1xuXG4gICAgLy8gSWYgZGVmYXVsdCBtb250aCBhdHRyaWJ1dGUgdmFsdXIgZ2l2ZW4gdXNlIGl0IGFzIGEgc2VsZWN0ZWQgbW9udGhcbiAgICBjb25zdCB7ZGVmTW9udGgsIG92ZXJyaWRlU2VsZWN0aW9ufSA9IGRlZmF1bHRNb250aDtcbiAgICBpZiAoZGVmTW9udGggJiYgZGVmTW9udGgubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSB0aGlzLnV0aWxTZXJ2aWNlLnBhcnNlRGVmYXVsdE1vbnRoKGRlZk1vbnRoKTtcbiAgICB9XG5cbiAgICBsZXQgdmFsaWRhdGVPcHRzOiBJTXlWYWxpZGF0ZU9wdGlvbnMgPSBudWxsO1xuICAgIGlmICghZGF0ZVJhbmdlKSB7XG4gICAgICAvLyBTaW5nbGUgZGF0ZSBtb2RlIC0gSWYgZGF0ZSBzZWxlY3RlZCB1c2UgaXQgYXMgc2VsZWN0ZWQgbW9udGhcbiAgICAgIHZhbGlkYXRlT3B0cyA9IHt2YWxpZGF0ZURpc2FibGVkRGF0ZXM6IGZhbHNlLCBzZWxlY3RlZFZhbHVlOiB0aGlzLnV0aWxTZXJ2aWNlLmdldFNlbGVjdGVkVmFsdWUoc2VsZWN0ZWRWYWx1ZSwgZGF0ZVJhbmdlKX07XG4gICAgICBjb25zdCBkYXRlOiBJTXlEYXRlID0gdGhpcy51dGlsU2VydmljZS5pc0RhdGVWYWxpZChpbnB1dFZhbHVlLCB0aGlzLm9wdHMsIHZhbGlkYXRlT3B0cyk7XG5cbiAgICAgIGlmICh0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGRhdGUpKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICAgICAgaWYgKCFvdmVycmlkZVNlbGVjdGlvbikge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IHttb250aE5icjogZGF0ZS5tb250aCwgeWVhcjogZGF0ZS55ZWFyfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIERhdGUgcmFuZ2UgbW9kZSAtIElmIGRhdGUgcmFuZ2Ugc2VsZWN0ZWQgdXNlIGJlZ2luIGRhdGUgYXMgc2VsZWN0ZWQgbW9udGhcbiAgICAgIHZhbGlkYXRlT3B0cyA9IHt2YWxpZGF0ZURpc2FibGVkRGF0ZXM6IGZhbHNlLCBzZWxlY3RlZFZhbHVlOiB0aGlzLnV0aWxTZXJ2aWNlLmdldFNlbGVjdGVkVmFsdWUoc2VsZWN0ZWRWYWx1ZSwgZGF0ZVJhbmdlKX07XG4gICAgICBjb25zdCB7YmVnaW4sIGVuZH0gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVZhbGlkRGF0ZVJhbmdlKGlucHV0VmFsdWUsIHRoaXMub3B0cywgdmFsaWRhdGVPcHRzKTtcblxuICAgICAgaWYgKHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoYmVnaW4pICYmIHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoZW5kKSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlID0ge2JlZ2luLCBlbmR9O1xuICAgICAgICBpZiAoIW92ZXJyaWRlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoID0ge21vbnRoTmJyOiBiZWdpbi5tb250aCwgeWVhcjogYmVnaW4ueWVhcn07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWZyZXNoQ29tcG9uZW50KG9wdHM6IElNeU9wdGlvbnMsIGRlZmF1bHRNb250aDogSU15RGVmYXVsdE1vbnRoLCBzZWxlY3RlZFZhbHVlOiBhbnksIGlucHV0VmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMub3B0cyA9IG9wdHM7XG5cbiAgICBjb25zdCB7ZGVmYXVsdFZpZXd9ID0gb3B0cztcblxuICAgIHRoaXMuaW5pdGlhbGl6ZVZpZXcoZGVmYXVsdE1vbnRoLCBzZWxlY3RlZFZhbHVlLCBpbnB1dFZhbHVlKTtcbiAgICB0aGlzLnNldENhbGVuZGFyVmlzaWJsZU1vbnRoKCk7XG4gICAgdGhpcy5zZXREZWZhdWx0VmlldyhkZWZhdWx0Vmlldyk7XG4gIH1cblxuICBoZWFkZXJBY3Rpb24oaGVhZGVyQWN0aW9uOiBIZWFkZXJBY3Rpb24pOiB2b2lkIHtcbiAgICBjb25zdCB7bW9udGhTZWxlY3RvciwgeWVhclNlbGVjdG9yfSA9IHRoaXMub3B0cztcblxuICAgIGlmIChoZWFkZXJBY3Rpb24gPT09IEhlYWRlckFjdGlvbi5QcmV2QnRuQ2xpY2spIHtcbiAgICAgIGlmICghdGhpcy5wcmV2Vmlld0Rpc2FibGVkKSB7XG4gICAgICAgIHRoaXMub25QcmV2TmF2aWdhdGVCdG5DbGlja2VkKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGhlYWRlckFjdGlvbiA9PT0gSGVhZGVyQWN0aW9uLk5leHRCdG5DbGljaykge1xuICAgICAgaWYgKCF0aGlzLm5leHRWaWV3RGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5vbk5leHROYXZpZ2F0ZUJ0bkNsaWNrZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaGVhZGVyQWN0aW9uID09PSBIZWFkZXJBY3Rpb24uTW9udGhCdG5DbGljaykge1xuICAgICAgaWYgKG1vbnRoU2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5vbk1vbnRoVmlld0J0bkNsaWNrZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaGVhZGVyQWN0aW9uID09PSBIZWFkZXJBY3Rpb24uWWVhckJ0bkNsaWNrKSB7XG4gICAgICBpZiAoeWVhclNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMub25ZZWFyVmlld0J0bkNsaWNrZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXREZWZhdWx0VmlldyhkZWZhdWx0VmlldzogRGVmYXVsdFZpZXcpOiB2b2lkIHtcbiAgICBpZiAoZGVmYXVsdFZpZXcgPT09IERlZmF1bHRWaWV3Lk1vbnRoKSB7XG4gICAgICB0aGlzLm1vbnRoVmlld0J0bkNsaWNrZWQoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGVmYXVsdFZpZXcgPT09IERlZmF1bHRWaWV3LlllYXIpIHtcbiAgICAgIHRoaXMueWVhclZpZXdCdG5DbGlja2VkKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q2FsZW5kYXJBbmltYXRpb24oY2FsQW5pbWF0aW9uOiBJTXlDYWxlbmRhckFuaW1hdGlvbiwgaXNPcGVuOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3Qge25hdGl2ZUVsZW1lbnR9ID0gdGhpcy5zZWxlY3RvckVsO1xuICAgIGNvbnN0IHtyZW5kZXJlcn0gPSB0aGlzO1xuXG4gICAgY29uc3QgY2xhc3NJbiA9IE1ZX0RQX0FOSU1BVElPTiArIEFOSU1BVElPTl9OQU1FU1tjYWxBbmltYXRpb24uaW4gLSAxXTtcbiAgICBpZiAoaXNPcGVuKSB7XG4gICAgICByZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCBjbGFzc0luICsgSU4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IGNsYXNzT3V0ID0gTVlfRFBfQU5JTUFUSU9OICsgQU5JTUFUSU9OX05BTUVTW2NhbEFuaW1hdGlvbi5vdXQgLSAxXTtcbiAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKG5hdGl2ZUVsZW1lbnQsIGNsYXNzSW4gKyBJTik7XG4gICAgICByZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCBjbGFzc091dCArIE9VVCk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXREYXRlVmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9wdHMuZGF0ZVJhbmdlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHRoaXMudXRpbFNlcnZpY2UucmVzZXREYXRlKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZERhdGVSYW5nZS5iZWdpbiA9IHRoaXMudXRpbFNlcnZpY2UucmVzZXREYXRlKCk7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLmVuZCA9IHRoaXMudXRpbFNlcnZpY2UucmVzZXREYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJEYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IHttb250aCwgeWVhcn0gPSB0aGlzLnV0aWxTZXJ2aWNlLmdldFRvZGF5KCk7XG4gICAgdGhpcy5zZWxlY3RlZE1vbnRoID0ge21vbnRoTmJyOiBtb250aCwgeWVhcjogeWVhcn07XG4gICAgXG4gICAgdGhpcy5yZXNldERhdGVWYWx1ZSgpO1xuICAgIHRoaXMuc2V0Q2FsZW5kYXJWaXNpYmxlTW9udGgoKTtcbiAgICB0aGlzLnJlc2V0TW9udGhZZWFyU2VsZWN0KCk7XG4gIH1cblxuICByZXNldE1vbnRoWWVhclNlbGVjdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdE1vbnRoID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RZZWFyID0gZmFsc2U7XG4gIH1cblxuICBvbk1vbnRoVmlld0J0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3Q2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy5tb250aFZpZXdCdG5DbGlja2VkKCk7XG4gIH1cblxuICBtb250aFZpZXdCdG5DbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0TW9udGggPSAhdGhpcy5zZWxlY3RNb250aDtcbiAgICB0aGlzLnNlbGVjdFllYXIgPSBmYWxzZTtcbiAgICBcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgaWYgKHRoaXMuc2VsZWN0TW9udGgpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVNb250aHMoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCB7eWVhciwgbW9udGhOYnJ9ID0gdGhpcy5zZWxlY3RlZE1vbnRoO1xuICAgICAgdGhpcy52aXNpYmxlTW9udGggPSB7bW9udGhUeHQ6IHRoaXMub3B0cy5tb250aExhYmVsc1ttb250aE5icl0sIG1vbnRoTmJyLCB5ZWFyfTtcbiAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcihtb250aE5iciwgeWVhciwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgb25Nb250aENlbGxDbGlja2VkKGNlbGw6IElNeUNhbGVuZGFyTW9udGgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdDaGFuZ2VkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHt5ZWFyLCBtb250aE5icn0gPSB0aGlzLnZpc2libGVNb250aDtcbiAgICBjb25zdCBtb250aENoYW5nZTogYm9vbGVhbiA9IGNlbGwubmJyICE9PSBtb250aE5icjtcbiAgICB0aGlzLnZpc2libGVNb250aCA9IHttb250aFR4dDogdGhpcy5vcHRzLm1vbnRoTGFiZWxzW2NlbGwubmJyXSwgbW9udGhOYnI6IGNlbGwubmJyLCB5ZWFyfTtcbiAgICB0aGlzLnNlbGVjdGVkTW9udGgueWVhciA9IHllYXI7XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKGNlbGwubmJyLCB5ZWFyLCBtb250aENoYW5nZSk7XG4gICAgdGhpcy5zZWxlY3RNb250aCA9IGZhbHNlO1xuICAgIHRoaXMuZm9jdXNUb1NlbGVjdG9yKCk7XG4gIH1cblxuICBvbk1vbnRoQ2VsbEtleURvd24oZXZlbnQ6IGFueSkge1xuICAgIC8vIE1vdmUgZm9jdXMgYnkgYXJyb3cga2V5c1xuICAgIGNvbnN0IHtzb3VyY2VSb3csIHNvdXJjZUNvbH0gPSB0aGlzLmdldFNvdXJjZVJvd0FuZENvbHVtbkZyb21FdmVudChldmVudCk7XG4gICAgY29uc3Qge21vdmVGb2N1cywgdGFyZ2V0Um93LCB0YXJnZXRDb2wsIGRpcmVjdGlvbn0gPSB0aGlzLmdldFRhcmdldEZvY3VzUm93QW5kQ29sdW1uKGV2ZW50LCBzb3VyY2VSb3csIHNvdXJjZUNvbCwgTU9OVEhfUk9XX0NPVU5ULCBNT05USF9DT0xfQ09VTlQpO1xuXG4gICAgaWYgKG1vdmVGb2N1cykge1xuICAgICAgdGhpcy5mb2N1c0NlbGxFbGVtZW50KE0sIHRhcmdldFJvdywgdGFyZ2V0Q29sLCBkaXJlY3Rpb24sIE1PTlRIX0NPTF9DT1VOVCk7XG4gICAgfVxuICB9XG5cbiAgb25ZZWFyVmlld0J0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3Q2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy55ZWFyVmlld0J0bkNsaWNrZWQoKTtcbiAgfVxuXG4gIHllYXJWaWV3QnRuQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdFllYXIgPSAhdGhpcy5zZWxlY3RZZWFyO1xuICAgIHRoaXMuc2VsZWN0TW9udGggPSBmYWxzZTtcblxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICBpZiAodGhpcy5zZWxlY3RZZWFyKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlWWVhcnModGhpcy52aXNpYmxlTW9udGgueWVhcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3Qge3llYXIsIG1vbnRoTmJyfSA9IHRoaXMuc2VsZWN0ZWRNb250aDtcbiAgICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge21vbnRoVHh0OiB0aGlzLm9wdHMubW9udGhMYWJlbHNbbW9udGhOYnJdLCBtb250aE5iciwgeWVhcn07XG4gICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIobW9udGhOYnIsIHllYXIsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIG9uWWVhckNlbGxDbGlja2VkKGNlbGw6IElNeUNhbGVuZGFyWWVhcik6IHZvaWQge1xuICAgIHRoaXMudmlld0NoYW5nZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qge3llYXIsIG1vbnRoTmJyLCBtb250aFR4dH0gPSB0aGlzLnZpc2libGVNb250aDtcbiAgICBjb25zdCB5YzogYm9vbGVhbiA9IGNlbGwueWVhciAhPT0geWVhcjtcbiAgICB0aGlzLnZpc2libGVNb250aCA9IHttb250aFR4dCwgbW9udGhOYnIsIHllYXI6IGNlbGwueWVhcn07XG4gICAgdGhpcy5zZWxlY3RlZE1vbnRoLnllYXIgPSBjZWxsLnllYXI7XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKG1vbnRoTmJyLCBjZWxsLnllYXIsIHljKTtcbiAgICB0aGlzLnNlbGVjdFllYXIgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzVG9TZWxlY3RvcigpO1xuICB9XG5cbiAgb25ZZWFyQ2VsbEtleURvd24oZXZlbnQ6IGFueSkge1xuICAgIC8vIE1vdmUgZm9jdXMgYnkgYXJyb3cga2V5c1xuICAgIGNvbnN0IHtzb3VyY2VSb3csIHNvdXJjZUNvbH0gPSB0aGlzLmdldFNvdXJjZVJvd0FuZENvbHVtbkZyb21FdmVudChldmVudCk7XG4gICAgY29uc3Qge21vdmVGb2N1cywgdGFyZ2V0Um93LCB0YXJnZXRDb2wsIGRpcmVjdGlvbn0gPSB0aGlzLmdldFRhcmdldEZvY3VzUm93QW5kQ29sdW1uKGV2ZW50LCBzb3VyY2VSb3csIHNvdXJjZUNvbCwgWUVBUl9ST1dfQ09VTlQsIFlFQVJfQ09MX0NPVU5UKTtcblxuICAgIGlmIChtb3ZlRm9jdXMpIHtcbiAgICAgIHRoaXMuZm9jdXNDZWxsRWxlbWVudChZLCB0YXJnZXRSb3csIHRhcmdldENvbCwgZGlyZWN0aW9uLCBZRUFSX0NPTF9DT1VOVCk7XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVNb250aHMoKTogdm9pZCB7XG4gICAgY29uc3QgdG9kYXk6IElNeURhdGUgPSB0aGlzLnV0aWxTZXJ2aWNlLmdldFRvZGF5KCk7XG4gICAgdGhpcy5tb250aHMubGVuZ3RoID0gMDtcblxuICAgIGNvbnN0IHt5ZWFyLCBtb250aE5icn0gPSB0aGlzLnZpc2libGVNb250aDtcbiAgICBjb25zdCB7cnRsLCBtb250aExhYmVsc30gPSB0aGlzLm9wdHM7XG5cbiAgICBsZXQgcm93OiBudW1iZXIgPSAwO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEyOyBpICs9IDMpIHtcbiAgICAgIGNvbnN0IHJvd0RhdGE6IEFycmF5PElNeUNhbGVuZGFyTW9udGg+ID0gW107XG4gICAgICBsZXQgY29sID0gcnRsID8gMiA6IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSBpOyBqIDwgaSArIDM7IGorKykge1xuICAgICAgICBjb25zdCBkaXNhYmxlZDogYm9vbGVhbiA9IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZE1vbnRoKHllYXIsIGosIHRoaXMub3B0cyk7XG4gICAgICAgIHJvd0RhdGEucHVzaCh7XG4gICAgICAgICAgbmJyOiBqLFxuICAgICAgICAgIHllYXIsXG4gICAgICAgICAgbmFtZTogbW9udGhMYWJlbHNbal0sIFxuICAgICAgICAgIGN1cnJNb250aDogaiA9PT0gdG9kYXkubW9udGggJiYgeWVhciA9PT0gdG9kYXkueWVhciwgXG4gICAgICAgICAgc2VsZWN0ZWQ6IGogPT09IG1vbnRoTmJyICYmIHllYXIgPT09IHRoaXMuc2VsZWN0ZWRNb250aC55ZWFyLCBcbiAgICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgICByb3csXG4gICAgICAgICAgY29sOiBydGwgPyBjb2wtLSA6IGNvbCsrXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcm93Kys7XG4gICAgICB0aGlzLm1vbnRocy5wdXNoKHJvd0RhdGEpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0TW9udGhWaWV3SGVhZGVyQnRuRGlzYWJsZWRTdGF0ZSh5ZWFyKTtcbiAgfVxuXG4gIGdlbmVyYXRlWWVhcnMoaW5wdXRZZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB7bWluWWVhciwgbWF4WWVhciwgcnRsfSA9IHRoaXMub3B0cztcblxuICAgIGxldCB5OiBudW1iZXIgPSBpbnB1dFllYXIgLSAxMjtcbiAgICBpZiAoaW5wdXRZZWFyIDwgbWluWWVhcikge1xuICAgICAgeSA9IG1pblllYXI7XG4gICAgfVxuXG4gICAgaWYgKGlucHV0WWVhciArIDI1ID4gbWF4WWVhcikge1xuICAgICAgeSA9IG1heFllYXIgLSAyNDtcbiAgICB9XG5cbiAgICBjb25zdCB7eWVhcn0gPSB0aGlzLnZpc2libGVNb250aDtcblxuICAgIHRoaXMueWVhcnMubGVuZ3RoID0gMDtcbiAgICBjb25zdCB0b2RheTogSU15RGF0ZSA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0VG9kYXkoKTtcblxuICAgIGxldCByb3c6IG51bWJlciA9IDA7XG4gICAgZm9yIChsZXQgaSA9IHk7IGkgPCB5ICsgMjU7IGkgKz0gNSkge1xuICAgICAgY29uc3Qgcm93RGF0YTogQXJyYXk8SU15Q2FsZW5kYXJZZWFyPiA9IFtdO1xuICAgICAgbGV0IGNvbDogbnVtYmVyID0gcnRsID8gNCA6IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSBpOyBqIDwgaSArIDU7IGorKykge1xuICAgICAgICBjb25zdCBkaXNhYmxlZDogYm9vbGVhbiA9IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZFllYXIoaiwgdGhpcy5vcHRzKTtcbiAgICAgICAgcm93RGF0YS5wdXNoKHtcbiAgICAgICAgICB5ZWFyOiBqLCBcbiAgICAgICAgICBjdXJyWWVhcjogaiA9PT0gdG9kYXkueWVhciwgXG4gICAgICAgICAgc2VsZWN0ZWQ6IGogPT09IHllYXIsIFxuICAgICAgICAgIGRpc2FibGVkLFxuICAgICAgICAgIHJvdyxcbiAgICAgICAgICBjb2w6IHJ0bCA/IGNvbC0tIDogY29sKytcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByb3crKztcbiAgICAgIHRoaXMueWVhcnMucHVzaChyb3dEYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdCBiZWdpblllYXI6IG51bWJlciA9IHRoaXMuZ2V0WWVhclZhbHVlQnlSb3dBbmRDb2woMCwgMCk7XG4gICAgY29uc3QgZW5kWWVhcjogbnVtYmVyID0gYmVnaW5ZZWFyICsgMjQ7XG4gICAgdGhpcy55ZWFyc0R1cmF0aW9uID0gKCFydGwgPyBiZWdpblllYXIgOiBlbmRZZWFyKSArIFlFQVJfU0VQQVJBVE9SICsgKCFydGwgPyBlbmRZZWFyIDogYmVnaW5ZZWFyKTtcblxuICAgIHRoaXMuc2V0WWVhclZpZXdIZWFkZXJCdG5EaXNhYmxlZFN0YXRlKGJlZ2luWWVhciwgZW5kWWVhcik7XG4gIH1cblxuICBvblRvZGF5Rm9vdGVyQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRlID0gdGhpcy51dGlsU2VydmljZS5nZXRUb2RheSgpO1xuICAgIHRoaXMuc2VsZWN0RGF0ZShkYXRlKTtcbiAgfVxuXG4gIGdldFllYXJWYWx1ZUJ5Um93QW5kQ29sKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qge3llYXJzfSA9IHRoaXM7XG4gICAgaWYgKCF5ZWFycyB8fCB5ZWFycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IHt5ZWFyfSA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0VG9kYXkoKTtcbiAgICAgIHJldHVybiB5ZWFyO1xuICAgIH1cbiAgICByZXR1cm4geWVhcnNbcm93XVtjb2xdLnllYXI7XG4gIH1cblxuICBzZXRDYWxlbmRhclZpc2libGVNb250aCgpOiB2b2lkIHtcbiAgICAvLyBTZXRzIHZpc2libGUgbW9udGggb2YgY2FsZW5kYXJcbiAgICBjb25zdCB7eWVhciwgbW9udGhOYnJ9ID0gdGhpcy5zZWxlY3RlZE1vbnRoO1xuICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge21vbnRoVHh0OiB0aGlzLm9wdHMubW9udGhMYWJlbHNbbW9udGhOYnJdLCBtb250aE5iciwgeWVhcn07XG5cbiAgICAvLyBDcmVhdGUgY3VycmVudCBtb250aFxuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcihtb250aE5iciwgeWVhciwgdHJ1ZSk7XG4gIH1cblxuICBvblZpZXdBY3RpdmF0ZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmlld0FjdGl2YXRlZChldmVudCk7XG4gIH1cblxuICBvblByZXZOYXZpZ2F0ZUJ0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdE1vbnRoICYmICF0aGlzLnNlbGVjdFllYXIpIHtcbiAgICAgIHRoaXMuc2V0RGF0ZVZpZXdNb250aChmYWxzZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuc2VsZWN0TW9udGgpIHtcbiAgICAgIHRoaXMudmlzaWJsZU1vbnRoLnllYXItLTtcbiAgICAgIHRoaXMuZ2VuZXJhdGVNb250aHMoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5zZWxlY3RZZWFyKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlWWVhcnModGhpcy5nZXRZZWFyVmFsdWVCeVJvd0FuZENvbCgyLCAyKSAtIDI1KTtcbiAgICB9XG4gIH1cblxuICBvbk5leHROYXZpZ2F0ZUJ0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdE1vbnRoICYmICF0aGlzLnNlbGVjdFllYXIpIHtcbiAgICAgIHRoaXMuc2V0RGF0ZVZpZXdNb250aCh0cnVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5zZWxlY3RNb250aCkge1xuICAgICAgdGhpcy52aXNpYmxlTW9udGgueWVhcisrO1xuICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRocygpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnNlbGVjdFllYXIpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVZZWFycyh0aGlzLmdldFllYXJWYWx1ZUJ5Um93QW5kQ29sKDIsIDIpICsgMjUpO1xuICAgIH1cbiAgfVxuXG4gIHNldERhdGVWaWV3TW9udGgoaXNOZXh0OiBib29sZWFuKTogdm9pZCB7XG4gICAgbGV0IGNoYW5nZTogbnVtYmVyID0gaXNOZXh0ID8gMSA6IC0xO1xuXG4gICAgY29uc3Qge3llYXIsIG1vbnRoTmJyfSA9IHRoaXMudmlzaWJsZU1vbnRoO1xuXG4gICAgY29uc3QgZDogRGF0ZSA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0SnNEYXRlKHllYXIsIG1vbnRoTmJyLCAxKTtcbiAgICBkLnNldE1vbnRoKGQuZ2V0TW9udGgoKSArIGNoYW5nZSk7XG5cbiAgICBjb25zdCB5OiBudW1iZXIgPSBkLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgbTogbnVtYmVyID0gZC5nZXRNb250aCgpICsgMTtcblxuICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge21vbnRoVHh0OiB0aGlzLm9wdHMubW9udGhMYWJlbHNbbV0sIG1vbnRoTmJyOiBtLCB5ZWFyOiB5fTtcbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIobSwgeSwgdHJ1ZSk7XG4gIH1cblxuICBvbkNsb3NlU2VsZWN0b3IoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGtleUNvZGU6IG51bWJlciA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0S2V5Q29kZUZyb21FdmVudChldmVudCk7XG4gICAgaWYgKGtleUNvZGUgPT09IEtleUNvZGUuZXNjKSB7XG4gICAgICB0aGlzLmNsb3NlZEJ5RXNjKCk7XG4gICAgfVxuICB9XG5cbiAgb25EYXlDZWxsQ2xpY2tlZChjZWxsOiBJTXlDYWxlbmRhckRheSk6IHZvaWQge1xuICAgIC8vIENlbGwgY2xpY2tlZCBvbiB0aGUgY2FsZW5kYXJcbiAgICB0aGlzLnNlbGVjdERhdGUoY2VsbC5kYXRlT2JqKTtcbiAgICB0aGlzLnJlc2V0TW9udGhZZWFyU2VsZWN0KCk7XG4gIH1cblxuICBvbkRheUNlbGxLZXlEb3duKGV2ZW50OiBhbnkpIHtcbiAgICAvLyBNb3ZlIGZvY3VzIGJ5IGFycm93IGtleXNcbiAgICBjb25zdCB7c291cmNlUm93LCBzb3VyY2VDb2x9ID0gdGhpcy5nZXRTb3VyY2VSb3dBbmRDb2x1bW5Gcm9tRXZlbnQoZXZlbnQpO1xuICAgIGNvbnN0IHttb3ZlRm9jdXMsIHRhcmdldFJvdywgdGFyZ2V0Q29sLCBkaXJlY3Rpb259ID0gdGhpcy5nZXRUYXJnZXRGb2N1c1Jvd0FuZENvbHVtbihldmVudCwgc291cmNlUm93LCBzb3VyY2VDb2wsIERBVEVfUk9XX0NPVU5ULCBEQVRFX0NPTF9DT1VOVCk7XG4gICAgaWYgKG1vdmVGb2N1cykge1xuICAgICAgdGhpcy5mb2N1c0NlbGxFbGVtZW50KEQsIHRhcmdldFJvdywgdGFyZ2V0Q29sLCBkaXJlY3Rpb24sIERBVEVfQ09MX0NPVU5UKTtcbiAgICB9XG4gIH1cblxuICBnZXRTb3VyY2VSb3dBbmRDb2x1bW5Gcm9tRXZlbnQoZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgbGV0IHNvdXJjZVJvdzogbnVtYmVyID0gMDtcbiAgICBsZXQgc291cmNlQ29sOiBudW1iZXIgPSAwO1xuICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmlkKSB7XG4gICAgICAvLyB2YWx1ZSBvZiBpZCBpcyBmb3IgZXhhbXBsZTogbV8wXzEgKGZpcnN0IG51bWJlciA9IHJvdywgc2Vjb25kIG51bWJlciA9IGNvbHVtbilcbiAgICAgIGNvbnN0IGFycjogQXJyYXk8c3RyaW5nPiA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChVTkRFUl9MSU5FKTtcbiAgICAgIHNvdXJjZVJvdyA9IE51bWJlcihhcnJbMV0pO1xuICAgICAgc291cmNlQ29sID0gTnVtYmVyKGFyclsyXSk7XG4gICAgfVxuICAgIHJldHVybiB7c291cmNlUm93LCBzb3VyY2VDb2x9O1xuICB9XG5cbiAgZ2V0VGFyZ2V0Rm9jdXNSb3dBbmRDb2x1bW4oZXZlbnQ6IGFueSwgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCByb3dDb3VudDogbnVtYmVyLCBjb2xDb3VudDogbnVtYmVyKTogYW55IHtcbiAgICBsZXQgbW92ZUZvY3VzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBsZXQgdGFyZ2V0Um93OiBudW1iZXIgPSByb3c7XG4gICAgbGV0IHRhcmdldENvbDogbnVtYmVyID0gY29sO1xuICAgIGxldCBkaXJlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0IGtleUNvZGU6IG51bWJlciA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0S2V5Q29kZUZyb21FdmVudChldmVudCk7XG4gICAgaWYgKGtleUNvZGUgPT09IEtleUNvZGUudXBBcnJvdyAmJiByb3cgPiAwKSB7XG4gICAgICB0YXJnZXRSb3ctLTtcbiAgICB9XG4gICAgZWxzZSBpZiAoa2V5Q29kZSA9PT0gS2V5Q29kZS5kb3duQXJyb3cgJiYgcm93IDwgcm93Q291bnQpIHtcbiAgICAgIHRhcmdldFJvdysrO1xuICAgICAgZGlyZWN0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoa2V5Q29kZSA9PT0gS2V5Q29kZS5sZWZ0QXJyb3cgJiYgY29sID4gMCkge1xuICAgICAgdGFyZ2V0Q29sLS07XG4gICAgfVxuICAgIGVsc2UgaWYgKGtleUNvZGUgPT09IEtleUNvZGUucmlnaHRBcnJvdyAmJiBjb2wgPCBjb2xDb3VudCkge1xuICAgICAgdGFyZ2V0Q29sKys7XG4gICAgICBkaXJlY3Rpb24gPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG1vdmVGb2N1cyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4ge21vdmVGb2N1cywgdGFyZ2V0Um93LCB0YXJnZXRDb2wsIGRpcmVjdGlvbn07XG4gIH1cblxuICBmb2N1c0NlbGxFbGVtZW50KHR5cGU6IHN0cmluZywgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBkaXJlY3Rpb246IGJvb2xlYW4sIGNvbENvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBjbGFzc05hbWU6IHN0cmluZyA9IHR5cGUgKyBVTkRFUl9MSU5FICsgcm93ICsgVU5ERVJfTElORSArIGNvbDtcbiAgICBsZXQgZWxlbTogYW55ID0gdGhpcy5zZWxlY3RvckVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihET1QgKyBjbGFzc05hbWUpO1xuXG4gICAgaWYgKGVsZW0uZ2V0QXR0cmlidXRlKFRBQklOREVYKSAhPT0gWkVST19TVFIpIHtcbiAgICAgIC8vIGlmIHRoZSBzZWxlY3RlZCBlbGVtZW50IGlzIGRpc2FibGVkIG1vdmUgYSBmb2N1cyB0byBuZXh0L3ByZXZpb3VzIGVuYWJsZWQgZWxlbWVudFxuICAgICAgbGV0IHRkTGlzdDogYW55ID0gdGhpcy5nZXRDYWxlbmRhckVsZW1lbnRzKCk7XG4gICAgICBjb25zdCBpZHg6IG51bWJlciA9IHJvdyAqIChjb2xDb3VudCArIDEpICsgY29sO1xuXG4gICAgICBsZXQgZW5hYmxlZEVsZW06IGFueSA9IG51bGw7XG4gICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGZpbmQgbmV4dCBlbmFibGVkXG4gICAgICAgIGVuYWJsZWRFbGVtID0gdGRMaXN0LnNsaWNlKGlkeCkuZmluZCgodGQ6IGFueSkgPT4gdGQuZ2V0QXR0cmlidXRlKFRBQklOREVYKSA9PT0gWkVST19TVFIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGZpbmQgcHJldmlvdXMgZW5hYmxlZFxuICAgICAgICBlbmFibGVkRWxlbSA9IHRkTGlzdC5zbGljZSgwLCBpZHgpLnJldmVyc2UoKS5maW5kKCh0ZDogYW55KSA9PiB0ZC5nZXRBdHRyaWJ1dGUoVEFCSU5ERVgpID09PSBaRVJPX1NUUik7XG4gICAgICB9XG5cbiAgICAgIGVsZW0gPSBlbmFibGVkRWxlbSA/IGVuYWJsZWRFbGVtIDogdGhpcy5zZWxlY3RvckVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZWxlbS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzVG9TZWxlY3RvcigpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdG9yRWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgZ2V0Q2FsZW5kYXJFbGVtZW50cygpOiBhbnkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2VsZWN0b3JFbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoVERfU0VMRUNUT1IpKTtcbiAgfVxuXG4gIHNlbGVjdERhdGUoZGF0ZTogSU15RGF0ZSk6IHZvaWQge1xuICAgIGNvbnN0IHtkYXRlUmFuZ2UsIGRhdGVGb3JtYXQsIG1vbnRoTGFiZWxzLCBkYXRlUmFuZ2VEYXRlc0RlbGltaXRlciwgY2xvc2VTZWxlY3Rvck9uRGF0ZVNlbGVjdH0gPSB0aGlzLm9wdHM7XG5cbiAgICBpZiAoZGF0ZVJhbmdlKSB7XG4gICAgICAvLyBEYXRlIHJhbmdlXG4gICAgICBjb25zdCBpc0JlZ2luRGF0ZUluaXRpYWxpemVkOiBib29sZWFuID0gdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLmJlZ2luKTtcbiAgICAgIGNvbnN0IGlzRW5kRGF0ZUluaXRpYWxpemVkOiBib29sZWFuID0gdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLmVuZCk7XG4gICAgICBpZiAoaXNCZWdpbkRhdGVJbml0aWFsaXplZCAmJiBpc0VuZERhdGVJbml0aWFsaXplZCkge1xuICAgICAgICAvLyBib3RoIGFscmVhZHkgc2VsZWN0ZWQgLSBzZXQgYmVnaW4gZGF0ZSBhbmQgcmVzZXQgZW5kIGRhdGVcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVSYW5nZS5iZWdpbiA9IGRhdGU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlUmFuZ2UuZW5kID0gdGhpcy51dGlsU2VydmljZS5yZXNldERhdGUoKTtcbiAgICAgICAgdGhpcy5yYW5nZURhdGVTZWxlY3Rpb24oe1xuICAgICAgICAgIGlzQmVnaW46IHRydWUsXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICBqc0RhdGU6IHRoaXMudXRpbFNlcnZpY2UubXlEYXRlVG9Kc0RhdGUoZGF0ZSksXG4gICAgICAgICAgZGF0ZUZvcm1hdDogZGF0ZUZvcm1hdCxcbiAgICAgICAgICBmb3JtYXR0ZWQ6IHRoaXMudXRpbFNlcnZpY2UuZm9ybWF0RGF0ZShkYXRlLCBkYXRlRm9ybWF0LCBtb250aExhYmVscyksXG4gICAgICAgICAgZXBvYzogdGhpcy51dGlsU2VydmljZS5nZXRFcG9jVGltZShkYXRlKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFpc0JlZ2luRGF0ZUluaXRpYWxpemVkKSB7XG4gICAgICAgIC8vIGJlZ2luIGRhdGVcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVSYW5nZS5iZWdpbiA9IGRhdGU7XG4gICAgICAgIHRoaXMucmFuZ2VEYXRlU2VsZWN0aW9uKHtcbiAgICAgICAgICBpc0JlZ2luOiB0cnVlLFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAganNEYXRlOiB0aGlzLnV0aWxTZXJ2aWNlLm15RGF0ZVRvSnNEYXRlKGRhdGUpLFxuICAgICAgICAgIGRhdGVGb3JtYXQ6IGRhdGVGb3JtYXQsXG4gICAgICAgICAgZm9ybWF0dGVkOiB0aGlzLnV0aWxTZXJ2aWNlLmZvcm1hdERhdGUoZGF0ZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMpLFxuICAgICAgICAgIGVwb2M6IHRoaXMudXRpbFNlcnZpY2UuZ2V0RXBvY1RpbWUoZGF0ZSlcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBzZWNvbmQgc2VsZWN0aW9uXG4gICAgICAgIGNvbnN0IGZpcnN0RGF0ZUVhcmxpZXI6IGJvb2xlYW4gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZUVhcmxpZXIoZGF0ZSwgdGhpcy5zZWxlY3RlZERhdGVSYW5nZS5iZWdpbik7XG4gICAgICAgIGlmIChmaXJzdERhdGVFYXJsaWVyKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVSYW5nZS5iZWdpbiA9IGRhdGU7XG4gICAgICAgICAgdGhpcy5yYW5nZURhdGVTZWxlY3Rpb24oe1xuICAgICAgICAgICAgaXNCZWdpbjogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICBqc0RhdGU6IHRoaXMudXRpbFNlcnZpY2UubXlEYXRlVG9Kc0RhdGUoZGF0ZSksXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiBkYXRlRm9ybWF0LFxuICAgICAgICAgICAgZm9ybWF0dGVkOiB0aGlzLnV0aWxTZXJ2aWNlLmZvcm1hdERhdGUoZGF0ZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMpLFxuICAgICAgICAgICAgZXBvYzogdGhpcy51dGlsU2VydmljZS5nZXRFcG9jVGltZShkYXRlKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlUmFuZ2UuZW5kID0gZGF0ZTtcbiAgICAgICAgICB0aGlzLnJhbmdlRGF0ZVNlbGVjdGlvbih7XG4gICAgICAgICAgICBpc0JlZ2luOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICBqc0RhdGU6IHRoaXMudXRpbFNlcnZpY2UubXlEYXRlVG9Kc0RhdGUoZGF0ZSksXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiBkYXRlRm9ybWF0LFxuICAgICAgICAgICAgZm9ybWF0dGVkOiB0aGlzLnV0aWxTZXJ2aWNlLmZvcm1hdERhdGUoZGF0ZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMpLFxuICAgICAgICAgICAgZXBvYzogdGhpcy51dGlsU2VydmljZS5nZXRFcG9jVGltZShkYXRlKVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5kYXRlQ2hhbmdlZCh0aGlzLnV0aWxTZXJ2aWNlLmdldERhdGVNb2RlbChudWxsLCB0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLCBkYXRlRm9ybWF0LCBtb250aExhYmVscywgZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXIpLCBjbG9zZVNlbGVjdG9yT25EYXRlU2VsZWN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIFNpbmdsZSBkYXRlXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGU7XG4gICAgICB0aGlzLmRhdGVDaGFuZ2VkKHRoaXMudXRpbFNlcnZpY2UuZ2V0RGF0ZU1vZGVsKHRoaXMuc2VsZWN0ZWREYXRlLCBudWxsLCBkYXRlRm9ybWF0LCBtb250aExhYmVscywgZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXIpLCBjbG9zZVNlbGVjdG9yT25EYXRlU2VsZWN0KTtcbiAgICB9XG4gIH1cblxuICBtb250aFN0YXJ0SWR4KHk6IG51bWJlciwgbTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAvLyBNb250aCBzdGFydCBpbmRleFxuICAgIGNvbnN0IGQ6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGQuc2V0RGF0ZSgxKTtcbiAgICBkLnNldE1vbnRoKG0gLSAxKTtcbiAgICBkLnNldEZ1bGxZZWFyKHkpO1xuICAgIGNvbnN0IGlkeCA9IGQuZ2V0RGF5KCkgKyB0aGlzLnN1bmRheUlkeCgpO1xuICAgIHJldHVybiBpZHggPj0gNyA/IGlkeCAtIDcgOiBpZHg7XG4gIH1cblxuICBpc0N1cnJEYXkoZDogbnVtYmVyLCBtOiBudW1iZXIsIHk6IG51bWJlciwgdG9kYXk6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICAvLyBDaGVjayBpcyBhIGdpdmVuIGRhdGUgdGhlIHRvZGF5XG4gICAgcmV0dXJuIGQgPT09IHRvZGF5LmRheSAmJiBtID09PSB0b2RheS5tb250aCAmJiB5ID09PSB0b2RheS55ZWFyO1xuICB9XG5cbiAgZ2V0RGF5TnVtYmVyKGRhdGU6IElNeURhdGUpOiBudW1iZXIge1xuICAgIC8vIEdldCBkYXkgbnVtYmVyOiBzdT0wLCBtbz0xLCB0dT0yLCB3ZT0zIC4uLlxuICAgIGNvbnN0IHt5ZWFyLCBtb250aCwgZGF5fSA9IGRhdGU7XG4gICAgY29uc3QgZDogRGF0ZSA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0SnNEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIHJldHVybiBkLmdldERheSgpO1xuICB9XG5cbiAgZ2V0V2Vla2RheShkYXRlOiBJTXlEYXRlKTogc3RyaW5nIHtcbiAgICAvLyBHZXQgd2Vla2RheTogc3UsIG1vLCB0dSwgd2UgLi4uXG4gICAgcmV0dXJuIHRoaXMud2Vla0RheU9wdHNbdGhpcy5nZXREYXlOdW1iZXIoZGF0ZSldO1xuICB9XG5cbiAgc3VuZGF5SWR4KCk6IG51bWJlciB7XG4gICAgLy8gSW5kZXggb2YgU3VuZGF5IGRheVxuICAgIHJldHVybiB0aGlzLmRheUlkeCA+IDAgPyA3IC0gdGhpcy5kYXlJZHggOiAwO1xuICB9XG5cbiAgZ2VuZXJhdGVDYWxlbmRhcihtOiBudW1iZXIsIHk6IG51bWJlciwgbm90aWZ5Q2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kYXRlcy5sZW5ndGggPSAwO1xuICAgIGNvbnN0IHRvZGF5OiBJTXlEYXRlID0gdGhpcy51dGlsU2VydmljZS5nZXRUb2RheSgpO1xuICAgIGNvbnN0IG1vbnRoU3RhcnQ6IG51bWJlciA9IHRoaXMubW9udGhTdGFydElkeCh5LCBtKTtcbiAgICBjb25zdCBkSW5UaGlzTTogbnVtYmVyID0gdGhpcy51dGlsU2VydmljZS5kYXRlc0luTW9udGgobSwgeSk7XG4gICAgY29uc3QgZEluUHJldk06IG51bWJlciA9IHRoaXMudXRpbFNlcnZpY2UuZGF0ZXNJblByZXZNb250aChtLCB5KTtcblxuICAgIGxldCBkYXlOYnI6IG51bWJlciA9IDE7XG4gICAgbGV0IG1vbnRoOiBudW1iZXIgPSBtO1xuICAgIGxldCBjbW86IG51bWJlciA9IE1vbnRoSWQucHJldjtcbiAgICBjb25zdCB7cnRsLCBzaG93V2Vla051bWJlcnMsIGZpcnN0RGF5T2ZXZWVrfSA9IHRoaXMub3B0cztcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDc7IGkrKykge1xuICAgICAgbGV0IGNvbDogbnVtYmVyID0gcnRsID8gNiA6IDA7XG4gICAgICBjb25zdCB3ZWVrOiBBcnJheTxJTXlDYWxlbmRhckRheT4gPSBbXTtcbiAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgIC8vIEZpcnN0IHdlZWtcbiAgICAgICAgY29uc3QgcG0gPSBkSW5QcmV2TSAtIG1vbnRoU3RhcnQgKyAxO1xuICAgICAgICAvLyBQcmV2aW91cyBtb250aFxuICAgICAgICBmb3IgKGxldCBqID0gcG07IGogPD0gZEluUHJldk07IGorKykge1xuICAgICAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB7eWVhcjogbSA9PT0gMSA/IHkgLSAxIDogeSwgbW9udGg6IG0gPT09IDEgPyAxMiA6IG0gLSAxLCBkYXk6IGp9O1xuICAgICAgICAgIHdlZWsucHVzaCh7XG4gICAgICAgICAgICBkYXRlT2JqOiBkYXRlLFxuICAgICAgICAgICAgY21vLFxuICAgICAgICAgICAgY3VyckRheTogdGhpcy5pc0N1cnJEYXkoaiwgbW9udGggLSAxLCB5LCB0b2RheSksXG4gICAgICAgICAgICBkaXNhYmxlZERhdGU6IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZERhdGUoZGF0ZSwgdGhpcy5vcHRzKSxcbiAgICAgICAgICAgIG1hcmtlZERhdGU6IHRoaXMudXRpbFNlcnZpY2UuaXNNYXJrZWREYXRlKGRhdGUsIHRoaXMub3B0cyksXG4gICAgICAgICAgICBoaWdobGlnaHQ6IHRoaXMudXRpbFNlcnZpY2UuaXNIaWdobGlnaHRlZERhdGUoZGF0ZSwgdGhpcy5vcHRzKSxcbiAgICAgICAgICAgIHJvdzogaSAtIDEsXG4gICAgICAgICAgICBjb2w6IHJ0bCA/IGNvbC0tIDogY29sKyssXG4gICAgICAgICAgICBkYXRlRGF0YTogIHRoaXMub3B0cy5kYXRlRGF0YSAmJiB0aGlzLm9wdHMuZGF0ZURhdGFbYCR7ZGF0ZS5kYXl9LSR7ZGF0ZS5tb250aH0tJHtkYXRlLnllYXJ9YF0gPyB0aGlzLm9wdHMuZGF0ZURhdGFbYCR7ZGF0ZS5kYXl9LSR7ZGF0ZS5tb250aH0tJHtkYXRlLnllYXJ9YF0gOiBudWxsXG4gICAgICAgICAgfSk7IFxuICAgICAgICB9XG5cbiAgICAgICAgY21vID0gTW9udGhJZC5jdXJyO1xuICAgICAgICAvLyBDdXJyZW50IG1vbnRoXG4gICAgICAgIGNvbnN0IGRheXNMZWZ0OiBudW1iZXIgPSA3IC0gd2Vlay5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF5c0xlZnQ7IGorKykge1xuICAgICAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB7eWVhcjogeSwgbW9udGg6IG0sIGRheTogZGF5TmJyfTtcbiAgICAgICAgICB3ZWVrLnB1c2goe1xuICAgICAgICAgICAgZGF0ZU9iajogZGF0ZSxcbiAgICAgICAgICAgIGNtbyxcbiAgICAgICAgICAgIGN1cnJEYXk6IHRoaXMuaXNDdXJyRGF5KGRheU5iciwgbSwgeSwgdG9kYXkpLFxuICAgICAgICAgICAgZGlzYWJsZWREYXRlOiB0aGlzLnV0aWxTZXJ2aWNlLmlzRGlzYWJsZWREYXRlKGRhdGUsIHRoaXMub3B0cyksXG4gICAgICAgICAgICBtYXJrZWREYXRlOiB0aGlzLnV0aWxTZXJ2aWNlLmlzTWFya2VkRGF0ZShkYXRlLCB0aGlzLm9wdHMpLFxuICAgICAgICAgICAgaGlnaGxpZ2h0OiB0aGlzLnV0aWxTZXJ2aWNlLmlzSGlnaGxpZ2h0ZWREYXRlKGRhdGUsIHRoaXMub3B0cyksXG4gICAgICAgICAgICByb3c6IGkgLSAxLFxuICAgICAgICAgICAgY29sOiBydGwgPyBjb2wtLSA6IGNvbCsrLFxuICAgICAgICAgICAgZGF0ZURhdGE6IHRoaXMub3B0cy5kYXRlRGF0YSAmJiB0aGlzLm9wdHMuZGF0ZURhdGFbYCR7ZGF0ZS5kYXl9LSR7ZGF0ZS5tb250aH0tJHtkYXRlLnllYXJ9YF0gPyB0aGlzLm9wdHMuZGF0ZURhdGFbYCR7ZGF0ZS5kYXl9LSR7ZGF0ZS5tb250aH0tJHtkYXRlLnllYXJ9YF0gOiBudWxsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZGF5TmJyKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBSZXN0IG9mIHRoZSB3ZWVrc1xuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDg7IGorKykge1xuICAgICAgICAgIGlmIChkYXlOYnIgPiBkSW5UaGlzTSkge1xuICAgICAgICAgICAgLy8gTmV4dCBtb250aFxuICAgICAgICAgICAgZGF5TmJyID0gMTtcbiAgICAgICAgICAgIGNtbyA9IE1vbnRoSWQubmV4dDtcbiAgICAgICAgICAgIG1vbnRoID0gbSArIDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB7eWVhcjogY21vID09PSBNb250aElkLm5leHQgJiYgbSA9PT0gMTIgPyB5ICsgMSA6IHksIG1vbnRoOiBjbW8gPT09IE1vbnRoSWQuY3VyciA/IG0gOiBjbW8gPT09IE1vbnRoSWQubmV4dCAmJiBtIDwgMTIgPyBtICsgMSA6IDEsIGRheTogZGF5TmJyfTtcbiAgICAgICAgICB3ZWVrLnB1c2goe1xuICAgICAgICAgICAgZGF0ZU9iajogZGF0ZSxcbiAgICAgICAgICAgIGNtbyxcbiAgICAgICAgICAgIGN1cnJEYXk6IHRoaXMuaXNDdXJyRGF5KGRheU5iciwgbW9udGgsIHksIHRvZGF5KSxcbiAgICAgICAgICAgIGRpc2FibGVkRGF0ZTogdGhpcy51dGlsU2VydmljZS5pc0Rpc2FibGVkRGF0ZShkYXRlLCB0aGlzLm9wdHMpLFxuICAgICAgICAgICAgbWFya2VkRGF0ZTogdGhpcy51dGlsU2VydmljZS5pc01hcmtlZERhdGUoZGF0ZSwgdGhpcy5vcHRzKSxcbiAgICAgICAgICAgIGhpZ2hsaWdodDogdGhpcy51dGlsU2VydmljZS5pc0hpZ2hsaWdodGVkRGF0ZShkYXRlLCB0aGlzLm9wdHMpLFxuICAgICAgICAgICAgcm93OiBpIC0gMSxcbiAgICAgICAgICAgIGNvbDogcnRsID8gY29sLS0gOiBjb2wrKyxcbiAgICAgICAgICAgIGRhdGVEYXRhOiB0aGlzLm9wdHMuZGF0ZURhdGEgJiYgdGhpcy5vcHRzLmRhdGVEYXRhW2Ake2RhdGUuZGF5fS0ke2RhdGUubW9udGh9LSR7ZGF0ZS55ZWFyfWBdID8gdGhpcy5vcHRzLmRhdGVEYXRhW2Ake2RhdGUuZGF5fS0ke2RhdGUubW9udGh9LSR7ZGF0ZS55ZWFyfWBdIDogbnVsbFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGRheU5icisrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB3ZWVrTmJyOiBudW1iZXIgPSBzaG93V2Vla051bWJlcnMgICYmIGZpcnN0RGF5T2ZXZWVrID09PSBNTyA/IHRoaXMudXRpbFNlcnZpY2UuZ2V0V2Vla051bWJlcih3ZWVrWzBdLmRhdGVPYmopIDogMDtcbiAgICAgIHRoaXMuZGF0ZXMucHVzaCh7d2Vlaywgd2Vla05icn0pO1xuICAgIH1cblxuICAgIHRoaXMuc2V0RGF0ZVZpZXdIZWFkZXJCdG5EaXNhYmxlZFN0YXRlKG0sIHkpO1xuXG4gICAgaWYgKG5vdGlmeUNoYW5nZSkge1xuICAgICAgLy8gTm90aWZ5IHBhcmVudFxuICAgICAgdGhpcy5jYWxlbmRhclZpZXdDaGFuZ2VkKHt5ZWFyOiB5LCBtb250aDogbSwgZmlyc3Q6IHtudW1iZXI6IDEsIHdlZWtkYXk6IHRoaXMuZ2V0V2Vla2RheSh7eWVhcjogeSwgbW9udGg6IG0sIGRheTogMX0pfSwgbGFzdDoge251bWJlcjogZEluVGhpc00sIHdlZWtkYXk6IHRoaXMuZ2V0V2Vla2RheSh7eWVhcjogeSwgbW9udGg6IG0sIGRheTogZEluVGhpc019KX19KTtcbiAgICB9XG4gIH1cblxuICBzZXREYXRlVmlld0hlYWRlckJ0bkRpc2FibGVkU3RhdGUobTogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBsZXQgZHBtOiBib29sZWFuID0gZmFsc2U7XG4gICAgbGV0IGRubTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3Qge2Rpc2FibGVIZWFkZXJCdXR0b25zLCBkaXNhYmxlVW50aWwsIGRpc2FibGVTaW5jZSwgZW5hYmxlRGF0ZXMsIG1pblllYXIsIG1heFllYXIsIHJ0bH0gPSB0aGlzLm9wdHM7XG5cbiAgICBpZiAoZGlzYWJsZUhlYWRlckJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGR1RGF0ZTogSU15RGF0ZSA9IHt5ZWFyOiBtID09PSAxID8geSAtIDEgOiB5LCBtb250aDogbSA9PT0gMSA/IDEyIDogbSAtIDEsIGRheTogdGhpcy51dGlsU2VydmljZS5kYXRlc0luTW9udGgobSA9PT0gMSA/IDEyIDogbSAtIDEsIG0gPT09IDEgPyB5IC0gMSA6IHkpfTtcbiAgICAgIGNvbnN0IGRzRGF0ZTogSU15RGF0ZSA9IHt5ZWFyOiBtID09PSAxMiA/IHkgKyAxIDogeSwgbW9udGg6IG0gPT09IDEyID8gMSA6IG0gKyAxLCBkYXk6IDF9O1xuICAgICAgXG4gICAgICBkcG0gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGlzYWJsZWRCeURpc2FibGVVbnRpbChkdURhdGUsIGRpc2FibGVVbnRpbCkgXG4gICAgICAgICYmICF0aGlzLnV0aWxTZXJ2aWNlLmlzUGFzdERhdGVzRW5hYmxlZChkdURhdGUsIGVuYWJsZURhdGVzKTtcbiAgICAgIGRubSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZEJ5RGlzYWJsZVNpbmNlKGRzRGF0ZSwgZGlzYWJsZVNpbmNlKVxuICAgICAgICAmJiAhdGhpcy51dGlsU2VydmljZS5pc0Z1dHVyZURhdGVzRW5hYmxlZChkc0RhdGUsIGVuYWJsZURhdGVzKTtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZWaWV3RGlzYWJsZWQgPSBtID09PSAxICYmIHkgPT09IG1pblllYXIgfHwgZHBtO1xuICAgIHRoaXMubmV4dFZpZXdEaXNhYmxlZCA9IG0gPT09IDEyICYmIHkgPT09IG1heFllYXIgfHwgZG5tO1xuXG4gICAgaWYgKHJ0bCkge1xuICAgICAgdGhpcy5zd2FwSGVhZGVyQnRuRGlzYWJsZWQoKTtcbiAgICB9XG4gIH1cblxuICBzZXRNb250aFZpZXdIZWFkZXJCdG5EaXNhYmxlZFN0YXRlKHk6IG51bWJlcik6IHZvaWQge1xuICAgIGxldCBkcG06IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBsZXQgZG5tOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdCB7ZGlzYWJsZUhlYWRlckJ1dHRvbnMsIGRpc2FibGVVbnRpbCwgZGlzYWJsZVNpbmNlLCBlbmFibGVEYXRlcywgbWluWWVhciwgbWF4WWVhciwgcnRsfSA9IHRoaXMub3B0cztcblxuICAgIGlmIChkaXNhYmxlSGVhZGVyQnV0dG9ucykge1xuICAgICAgY29uc3QgZHVEYXRlOiBJTXlEYXRlID0ge3llYXI6IHkgLSAxLCBtb250aDogMTIsIGRheTogMzF9O1xuICAgICAgY29uc3QgZHNEYXRlOiBJTXlEYXRlID0ge3llYXI6IHkgKyAxLCBtb250aDogMSwgZGF5OiAxfTtcblxuICAgICAgZHBtID0gdGhpcy51dGlsU2VydmljZS5pc0Rpc2FibGVkQnlEaXNhYmxlVW50aWwoZHVEYXRlLCBkaXNhYmxlVW50aWwpXG4gICAgICAgICYmICF0aGlzLnV0aWxTZXJ2aWNlLmlzUGFzdERhdGVzRW5hYmxlZChkdURhdGUsIGVuYWJsZURhdGVzKTtcbiAgICAgIGRubSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZEJ5RGlzYWJsZVNpbmNlKGRzRGF0ZSwgZGlzYWJsZVNpbmNlKVxuICAgICAgICAmJiAhdGhpcy51dGlsU2VydmljZS5pc0Z1dHVyZURhdGVzRW5hYmxlZChkc0RhdGUsIGVuYWJsZURhdGVzKTtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZWaWV3RGlzYWJsZWQgPSB5ID09PSBtaW5ZZWFyIHx8IGRwbTtcbiAgICB0aGlzLm5leHRWaWV3RGlzYWJsZWQgPSB5ID09PSBtYXhZZWFyIHx8IGRubTtcblxuICAgIGlmIChydGwpIHtcbiAgICAgIHRoaXMuc3dhcEhlYWRlckJ0bkRpc2FibGVkKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0WWVhclZpZXdIZWFkZXJCdG5EaXNhYmxlZFN0YXRlKHlwOiBudW1iZXIsIHluOiBudW1iZXIpOiB2b2lkIHtcbiAgICBsZXQgZHB5OiBib29sZWFuID0gZmFsc2U7XG4gICAgbGV0IGRueTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3Qge2Rpc2FibGVIZWFkZXJCdXR0b25zLCBkaXNhYmxlVW50aWwsIGRpc2FibGVTaW5jZSwgZW5hYmxlRGF0ZXMsIG1pblllYXIsIG1heFllYXIsIHJ0bH0gPSB0aGlzLm9wdHM7XG5cbiAgICBpZiAoZGlzYWJsZUhlYWRlckJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGR1RGF0ZTogSU15RGF0ZSA9IHt5ZWFyOiB5cCAtIDEsIG1vbnRoOiAxMiwgZGF5OiAzMX07XG4gICAgICBjb25zdCBkc0RhdGU6IElNeURhdGUgPSB7eWVhcjogeW4gKyAxLCBtb250aDogMSwgZGF5OiAxfTtcblxuICAgICAgZHB5ID0gdGhpcy51dGlsU2VydmljZS5pc0Rpc2FibGVkQnlEaXNhYmxlVW50aWwoZHVEYXRlLCBkaXNhYmxlVW50aWwpXG4gICAgICAgICYmICF0aGlzLnV0aWxTZXJ2aWNlLmlzUGFzdERhdGVzRW5hYmxlZChkdURhdGUsIGVuYWJsZURhdGVzKTtcbiAgICAgIGRueSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZEJ5RGlzYWJsZVNpbmNlKGRzRGF0ZSwgZGlzYWJsZVNpbmNlKVxuICAgICAgICAmJiAhdGhpcy51dGlsU2VydmljZS5pc0Z1dHVyZURhdGVzRW5hYmxlZChkc0RhdGUsIGVuYWJsZURhdGVzKTtcbiAgICB9XG4gICAgdGhpcy5wcmV2Vmlld0Rpc2FibGVkID0geXAgPD0gbWluWWVhciB8fCBkcHk7XG4gICAgdGhpcy5uZXh0Vmlld0Rpc2FibGVkID0geW4gPj0gbWF4WWVhciB8fCBkbnk7XG5cbiAgICBpZiAocnRsKSB7XG4gICAgICB0aGlzLnN3YXBIZWFkZXJCdG5EaXNhYmxlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHN3YXBIZWFkZXJCdG5EaXNhYmxlZCgpOiB2b2lkIHtcbiAgICBbdGhpcy5wcmV2Vmlld0Rpc2FibGVkLCB0aGlzLm5leHRWaWV3RGlzYWJsZWRdID0gW3RoaXMubmV4dFZpZXdEaXNhYmxlZCwgdGhpcy5wcmV2Vmlld0Rpc2FibGVkXTtcbiAgfVxufVxuIl19