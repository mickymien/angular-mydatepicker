/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewEncapsulation, ViewChild, Renderer2, ChangeDetectorRef, HostBinding } from "@angular/core";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import { KeyCode } from "../../enums/key-code.enum";
import { MonthId } from "../../enums/month-id.enum";
import { DefaultView } from "../../enums/default-view.enum";
import { CalAnimation } from "../../enums/cal-animation.enum";
import { HeaderAction } from "../../enums/header-action.enum";
import { DOT, UNDER_LINE, D, M, Y, DATE_ROW_COUNT, DATE_COL_COUNT, MONTH_ROW_COUNT, MONTH_COL_COUNT, YEAR_ROW_COUNT, YEAR_COL_COUNT, SU, MO, TU, WE, TH, FR, SA, EMPTY_STR, CLICK, STYLE, MY_DP_ANIMATION, ANIMATION_NAMES, IN, OUT, TABINDEX, TD_SELECTOR, ZERO_STR, YEAR_SEPARATOR } from "../../constants/constants";
export class CalendarComponent {
    /**
     * @param {?} elem
     * @param {?} renderer
     * @param {?} cdr
     * @param {?} utilService
     */
    constructor(elem, renderer, cdr, utilService) {
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
        (event) => {
            if ((this.opts.monthSelector || this.opts.yearSelector) && event.target) {
                this.resetMonthYearSelect();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const { stylesData, calendarAnimation, inline } = this.opts;
        if (stylesData.styles.length) {
            /** @type {?} */
            const styleElTemp = this.renderer.createElement(STYLE);
            this.renderer.appendChild(styleElTemp, this.renderer.createText(stylesData.styles));
            this.renderer.appendChild(this.styleEl.nativeElement, styleElTemp);
        }
        if (calendarAnimation.in !== CalAnimation.None) {
            this.setCalendarAnimation(calendarAnimation, true);
        }
        if (!inline) {
            this.focusToSelector();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.clickListener();
    }
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
    initializeComponent(opts, defaultMonth, selectedValue, inputValue, selectorPos, dc, cvc, rds, va, cbe) {
        this.opts = opts;
        this.selectorPos = selectorPos;
        this.dateChanged = dc;
        this.calendarViewChanged = cvc;
        this.rangeDateSelection = rds;
        this.viewActivated = va;
        this.closedByEsc = cbe;
        const { defaultView, firstDayOfWeek, dayLabels } = opts;
        this.weekDays.length = 0;
        this.dayIdx = this.weekDayOpts.indexOf(firstDayOfWeek);
        if (this.dayIdx !== -1) {
            /** @type {?} */
            let idx = this.dayIdx;
            for (let i = 0; i < this.weekDayOpts.length; i++) {
                this.weekDays.push(dayLabels[this.weekDayOpts[idx]]);
                idx = this.weekDayOpts[idx] === SA ? 0 : idx + 1;
            }
        }
        this.initializeView(defaultMonth, selectedValue, inputValue);
        this.setCalendarVisibleMonth();
        this.setDefaultView(defaultView);
    }
    /**
     * @param {?} defaultMonth
     * @param {?} selectedValue
     * @param {?} inputValue
     * @return {?}
     */
    initializeView(defaultMonth, selectedValue, inputValue) {
        const { dateRange } = this.opts;
        // use today as a selected month
        /** @type {?} */
        const today = this.utilService.getToday();
        this.selectedMonth = { monthNbr: today.month, year: today.year };
        // If default month attribute valur given use it as a selected month
        const { defMonth, overrideSelection } = defaultMonth;
        if (defMonth && defMonth.length) {
            this.selectedMonth = this.utilService.parseDefaultMonth(defMonth);
        }
        /** @type {?} */
        let validateOpts = null;
        if (!dateRange) {
            // Single date mode - If date selected use it as selected month
            validateOpts = { validateDisabledDates: false, selectedValue: this.utilService.getSelectedValue(selectedValue, dateRange) };
            /** @type {?} */
            const date = this.utilService.isDateValid(inputValue, this.opts, validateOpts);
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
            const { begin, end } = this.utilService.isDateValidDateRange(inputValue, this.opts, validateOpts);
            if (this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end)) {
                this.selectedDateRange = { begin, end };
                if (!overrideSelection) {
                    this.selectedMonth = { monthNbr: begin.month, year: begin.year };
                }
            }
        }
    }
    /**
     * @param {?} opts
     * @param {?} defaultMonth
     * @param {?} selectedValue
     * @param {?} inputValue
     * @return {?}
     */
    refreshComponent(opts, defaultMonth, selectedValue, inputValue) {
        this.opts = opts;
        const { defaultView } = opts;
        this.initializeView(defaultMonth, selectedValue, inputValue);
        this.setCalendarVisibleMonth();
        this.setDefaultView(defaultView);
    }
    /**
     * @param {?} headerAction
     * @return {?}
     */
    headerAction(headerAction) {
        const { monthSelector, yearSelector } = this.opts;
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
    }
    /**
     * @param {?} defaultView
     * @return {?}
     */
    setDefaultView(defaultView) {
        if (defaultView === DefaultView.Month) {
            this.monthViewBtnClicked();
        }
        else if (defaultView === DefaultView.Year) {
            this.yearViewBtnClicked();
        }
    }
    /**
     * @param {?} calAnimation
     * @param {?} isOpen
     * @return {?}
     */
    setCalendarAnimation(calAnimation, isOpen) {
        const { nativeElement } = this.selectorEl;
        const { renderer } = this;
        /** @type {?} */
        const classIn = MY_DP_ANIMATION + ANIMATION_NAMES[calAnimation.in - 1];
        if (isOpen) {
            renderer.addClass(nativeElement, classIn + IN);
        }
        else {
            /** @type {?} */
            const classOut = MY_DP_ANIMATION + ANIMATION_NAMES[calAnimation.out - 1];
            renderer.removeClass(nativeElement, classIn + IN);
            renderer.addClass(nativeElement, classOut + OUT);
        }
    }
    /**
     * @return {?}
     */
    resetDateValue() {
        if (!this.opts.dateRange) {
            this.selectedDate = this.utilService.resetDate();
        }
        else {
            this.selectedDateRange.begin = this.utilService.resetDate();
            this.selectedDateRange.end = this.utilService.resetDate();
        }
    }
    /**
     * @return {?}
     */
    clearDate() {
        const { month, year } = this.utilService.getToday();
        this.selectedMonth = { monthNbr: month, year: year };
        this.resetDateValue();
        this.setCalendarVisibleMonth();
        this.resetMonthYearSelect();
    }
    /**
     * @return {?}
     */
    resetMonthYearSelect() {
        this.selectMonth = false;
        this.selectYear = false;
    }
    /**
     * @return {?}
     */
    onMonthViewBtnClicked() {
        this.viewChanged = true;
        this.monthViewBtnClicked();
    }
    /**
     * @return {?}
     */
    monthViewBtnClicked() {
        this.selectMonth = !this.selectMonth;
        this.selectYear = false;
        this.cdr.detectChanges();
        if (this.selectMonth) {
            this.generateMonths();
        }
        else {
            const { year, monthNbr } = this.selectedMonth;
            this.visibleMonth = { monthTxt: this.opts.monthLabels[monthNbr], monthNbr, year };
            this.generateCalendar(monthNbr, year, true);
        }
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    onMonthCellClicked(cell) {
        this.viewChanged = true;
        const { year, monthNbr } = this.visibleMonth;
        /** @type {?} */
        const monthChange = cell.nbr !== monthNbr;
        this.visibleMonth = { monthTxt: this.opts.monthLabels[cell.nbr], monthNbr: cell.nbr, year };
        this.selectedMonth.year = year;
        this.generateCalendar(cell.nbr, year, monthChange);
        this.selectMonth = false;
        this.focusToSelector();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMonthCellKeyDown(event) {
        // Move focus by arrow keys
        const { sourceRow, sourceCol } = this.getSourceRowAndColumnFromEvent(event);
        const { moveFocus, targetRow, targetCol, direction } = this.getTargetFocusRowAndColumn(event, sourceRow, sourceCol, MONTH_ROW_COUNT, MONTH_COL_COUNT);
        if (moveFocus) {
            this.focusCellElement(M, targetRow, targetCol, direction, MONTH_COL_COUNT);
        }
    }
    /**
     * @return {?}
     */
    onYearViewBtnClicked() {
        this.viewChanged = true;
        this.yearViewBtnClicked();
    }
    /**
     * @return {?}
     */
    yearViewBtnClicked() {
        this.selectYear = !this.selectYear;
        this.selectMonth = false;
        this.cdr.detectChanges();
        if (this.selectYear) {
            this.generateYears(this.visibleMonth.year);
        }
        else {
            const { year, monthNbr } = this.selectedMonth;
            this.visibleMonth = { monthTxt: this.opts.monthLabels[monthNbr], monthNbr, year };
            this.generateCalendar(monthNbr, year, true);
        }
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    onYearCellClicked(cell) {
        this.viewChanged = true;
        const { year, monthNbr, monthTxt } = this.visibleMonth;
        /** @type {?} */
        const yc = cell.year !== year;
        this.visibleMonth = { monthTxt, monthNbr, year: cell.year };
        this.selectedMonth.year = cell.year;
        this.generateCalendar(monthNbr, cell.year, yc);
        this.selectYear = false;
        this.focusToSelector();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onYearCellKeyDown(event) {
        // Move focus by arrow keys
        const { sourceRow, sourceCol } = this.getSourceRowAndColumnFromEvent(event);
        const { moveFocus, targetRow, targetCol, direction } = this.getTargetFocusRowAndColumn(event, sourceRow, sourceCol, YEAR_ROW_COUNT, YEAR_COL_COUNT);
        if (moveFocus) {
            this.focusCellElement(Y, targetRow, targetCol, direction, YEAR_COL_COUNT);
        }
    }
    /**
     * @return {?}
     */
    generateMonths() {
        /** @type {?} */
        const today = this.utilService.getToday();
        this.months.length = 0;
        const { year, monthNbr } = this.visibleMonth;
        const { rtl, monthLabels } = this.opts;
        /** @type {?} */
        let row = 0;
        for (let i = 1; i <= 12; i += 3) {
            /** @type {?} */
            const rowData = [];
            /** @type {?} */
            let col = rtl ? 2 : 0;
            for (let j = i; j < i + 3; j++) {
                /** @type {?} */
                const disabled = this.utilService.isDisabledMonth(year, j, this.opts);
                rowData.push({
                    nbr: j,
                    year,
                    name: monthLabels[j],
                    currMonth: j === today.month && year === today.year,
                    selected: j === monthNbr && year === this.selectedMonth.year,
                    disabled,
                    row,
                    col: rtl ? col-- : col++
                });
            }
            row++;
            this.months.push(rowData);
        }
        this.setMonthViewHeaderBtnDisabledState(year);
    }
    /**
     * @param {?} inputYear
     * @return {?}
     */
    generateYears(inputYear) {
        const { minYear, maxYear, rtl } = this.opts;
        /** @type {?} */
        let y = inputYear - 12;
        if (inputYear < minYear) {
            y = minYear;
        }
        if (inputYear + 25 > maxYear) {
            y = maxYear - 24;
        }
        const { year } = this.visibleMonth;
        this.years.length = 0;
        /** @type {?} */
        const today = this.utilService.getToday();
        /** @type {?} */
        let row = 0;
        for (let i = y; i < y + 25; i += 5) {
            /** @type {?} */
            const rowData = [];
            /** @type {?} */
            let col = rtl ? 4 : 0;
            for (let j = i; j < i + 5; j++) {
                /** @type {?} */
                const disabled = this.utilService.isDisabledYear(j, this.opts);
                rowData.push({
                    year: j,
                    currYear: j === today.year,
                    selected: j === year,
                    disabled,
                    row,
                    col: rtl ? col-- : col++
                });
            }
            row++;
            this.years.push(rowData);
        }
        /** @type {?} */
        const beginYear = this.getYearValueByRowAndCol(0, 0);
        /** @type {?} */
        const endYear = beginYear + 24;
        this.yearsDuration = (!rtl ? beginYear : endYear) + YEAR_SEPARATOR + (!rtl ? endYear : beginYear);
        this.setYearViewHeaderBtnDisabledState(beginYear, endYear);
    }
    /**
     * @return {?}
     */
    onTodayFooterClicked() {
        /** @type {?} */
        const date = this.utilService.getToday();
        this.selectDate(date);
    }
    /**
     * @param {?} row
     * @param {?} col
     * @return {?}
     */
    getYearValueByRowAndCol(row, col) {
        const { years } = this;
        if (!years || years.length === 0) {
            const { year } = this.utilService.getToday();
            return year;
        }
        return years[row][col].year;
    }
    /**
     * @return {?}
     */
    setCalendarVisibleMonth() {
        // Sets visible month of calendar
        const { year, monthNbr } = this.selectedMonth;
        this.visibleMonth = { monthTxt: this.opts.monthLabels[monthNbr], monthNbr, year };
        // Create current month
        this.generateCalendar(monthNbr, year, true);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onViewActivated(event) {
        this.viewActivated(event);
    }
    /**
     * @return {?}
     */
    onPrevNavigateBtnClicked() {
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
    }
    /**
     * @return {?}
     */
    onNextNavigateBtnClicked() {
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
    }
    /**
     * @param {?} isNext
     * @return {?}
     */
    setDateViewMonth(isNext) {
        /** @type {?} */
        let change = isNext ? 1 : -1;
        const { year, monthNbr } = this.visibleMonth;
        /** @type {?} */
        const d = this.utilService.getJsDate(year, monthNbr, 1);
        d.setMonth(d.getMonth() + change);
        /** @type {?} */
        const y = d.getFullYear();
        /** @type {?} */
        const m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onCloseSelector(event) {
        /** @type {?} */
        const keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (keyCode === KeyCode.esc) {
            this.closedByEsc();
        }
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    onDayCellClicked(cell) {
        // Cell clicked on the calendar
        this.selectDate(cell.dateObj);
        this.resetMonthYearSelect();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDayCellKeyDown(event) {
        // Move focus by arrow keys
        const { sourceRow, sourceCol } = this.getSourceRowAndColumnFromEvent(event);
        const { moveFocus, targetRow, targetCol, direction } = this.getTargetFocusRowAndColumn(event, sourceRow, sourceCol, DATE_ROW_COUNT, DATE_COL_COUNT);
        if (moveFocus) {
            this.focusCellElement(D, targetRow, targetCol, direction, DATE_COL_COUNT);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getSourceRowAndColumnFromEvent(event) {
        /** @type {?} */
        let sourceRow = 0;
        /** @type {?} */
        let sourceCol = 0;
        if (event.target && event.target.id) {
            // value of id is for example: m_0_1 (first number = row, second number = column)
            /** @type {?} */
            const arr = event.target.id.split(UNDER_LINE);
            sourceRow = Number(arr[1]);
            sourceCol = Number(arr[2]);
        }
        return { sourceRow, sourceCol };
    }
    /**
     * @param {?} event
     * @param {?} row
     * @param {?} col
     * @param {?} rowCount
     * @param {?} colCount
     * @return {?}
     */
    getTargetFocusRowAndColumn(event, row, col, rowCount, colCount) {
        /** @type {?} */
        let moveFocus = true;
        /** @type {?} */
        let targetRow = row;
        /** @type {?} */
        let targetCol = col;
        /** @type {?} */
        let direction = false;
        /** @type {?} */
        const keyCode = this.utilService.getKeyCodeFromEvent(event);
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
        return { moveFocus, targetRow, targetCol, direction };
    }
    /**
     * @param {?} type
     * @param {?} row
     * @param {?} col
     * @param {?} direction
     * @param {?} colCount
     * @return {?}
     */
    focusCellElement(type, row, col, direction, colCount) {
        /** @type {?} */
        const className = type + UNDER_LINE + row + UNDER_LINE + col;
        /** @type {?} */
        let elem = this.selectorEl.nativeElement.querySelector(DOT + className);
        if (elem.getAttribute(TABINDEX) !== ZERO_STR) {
            // if the selected element is disabled move a focus to next/previous enabled element
            /** @type {?} */
            let tdList = this.getCalendarElements();
            /** @type {?} */
            const idx = row * (colCount + 1) + col;
            /** @type {?} */
            let enabledElem = null;
            if (direction) {
                // find next enabled
                enabledElem = tdList.slice(idx).find((/**
                 * @param {?} td
                 * @return {?}
                 */
                (td) => td.getAttribute(TABINDEX) === ZERO_STR));
            }
            else {
                // find previous enabled
                enabledElem = tdList.slice(0, idx).reverse().find((/**
                 * @param {?} td
                 * @return {?}
                 */
                (td) => td.getAttribute(TABINDEX) === ZERO_STR));
            }
            elem = enabledElem ? enabledElem : this.selectorEl.nativeElement;
        }
        else {
            elem.focus();
        }
    }
    /**
     * @return {?}
     */
    focusToSelector() {
        this.selectorEl.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    getCalendarElements() {
        return Array.from(this.selectorEl.nativeElement.querySelectorAll(TD_SELECTOR));
    }
    /**
     * @param {?} date
     * @return {?}
     */
    selectDate(date) {
        const { dateRange, dateFormat, monthLabels, dateRangeDatesDelimiter, closeSelectorOnDateSelect } = this.opts;
        if (dateRange) {
            // Date range
            /** @type {?} */
            const isBeginDateInitialized = this.utilService.isInitializedDate(this.selectedDateRange.begin);
            /** @type {?} */
            const isEndDateInitialized = this.utilService.isInitializedDate(this.selectedDateRange.end);
            if (isBeginDateInitialized && isEndDateInitialized) {
                // both already selected - set begin date and reset end date
                this.selectedDateRange.begin = date;
                this.selectedDateRange.end = this.utilService.resetDate();
                this.rangeDateSelection({
                    isBegin: true,
                    date,
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
                    date,
                    jsDate: this.utilService.myDateToJsDate(date),
                    dateFormat: dateFormat,
                    formatted: this.utilService.formatDate(date, dateFormat, monthLabels),
                    epoc: this.utilService.getEpocTime(date)
                });
            }
            else {
                // second selection
                /** @type {?} */
                const firstDateEarlier = this.utilService.isDateEarlier(date, this.selectedDateRange.begin);
                if (firstDateEarlier) {
                    this.selectedDateRange.begin = date;
                    this.rangeDateSelection({
                        isBegin: true,
                        date,
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
                        date,
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
    }
    /**
     * @param {?} y
     * @param {?} m
     * @return {?}
     */
    monthStartIdx(y, m) {
        // Month start index
        /** @type {?} */
        const d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        /** @type {?} */
        const idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }
    /**
     * @param {?} d
     * @param {?} m
     * @param {?} y
     * @param {?} today
     * @return {?}
     */
    isCurrDay(d, m, y, today) {
        // Check is a given date the today
        return d === today.day && m === today.month && y === today.year;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayNumber(date) {
        // Get day number: su=0, mo=1, tu=2, we=3 ...
        const { year, month, day } = date;
        /** @type {?} */
        const d = this.utilService.getJsDate(year, month, day);
        return d.getDay();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        // Get weekday: su, mo, tu, we ...
        return this.weekDayOpts[this.getDayNumber(date)];
    }
    /**
     * @return {?}
     */
    sundayIdx() {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }
    /**
     * @param {?} m
     * @param {?} y
     * @param {?} notifyChange
     * @return {?}
     */
    generateCalendar(m, y, notifyChange) {
        this.dates.length = 0;
        /** @type {?} */
        const today = this.utilService.getToday();
        /** @type {?} */
        const monthStart = this.monthStartIdx(y, m);
        /** @type {?} */
        const dInThisM = this.utilService.datesInMonth(m, y);
        /** @type {?} */
        const dInPrevM = this.utilService.datesInPrevMonth(m, y);
        /** @type {?} */
        let dayNbr = 1;
        /** @type {?} */
        let month = m;
        /** @type {?} */
        let cmo = MonthId.prev;
        const { rtl, showWeekNumbers, firstDayOfWeek } = this.opts;
        for (let i = 1; i < 7; i++) {
            /** @type {?} */
            let col = rtl ? 6 : 0;
            /** @type {?} */
            const week = [];
            if (i === 1) {
                // First week
                /** @type {?} */
                const pm = dInPrevM - monthStart + 1;
                // Previous month
                for (let j = pm; j <= dInPrevM; j++) {
                    /** @type {?} */
                    const date = { year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: j };
                    week.push({
                        dateObj: date,
                        cmo,
                        currDay: this.isCurrDay(j, month - 1, y, today),
                        disabledDate: this.utilService.isDisabledDate(date, this.opts),
                        markedDate: this.utilService.isMarkedDate(date, this.opts),
                        highlight: this.utilService.isHighlightedDate(date, this.opts),
                        row: i - 1,
                        col: rtl ? col-- : col++,
                        dateData: this.opts.dateData && this.opts.dateData[`${date.day}-${date.month}-${date.year}`] ? this.opts.dateData[`${date.day}-${date.month}-${date.year}`] : null
                    });
                }
                cmo = MonthId.curr;
                // Current month
                /** @type {?} */
                const daysLeft = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    /** @type {?} */
                    const date = { year: y, month: m, day: dayNbr };
                    week.push({
                        dateObj: date,
                        cmo,
                        currDay: this.isCurrDay(dayNbr, m, y, today),
                        disabledDate: this.utilService.isDisabledDate(date, this.opts),
                        markedDate: this.utilService.isMarkedDate(date, this.opts),
                        highlight: this.utilService.isHighlightedDate(date, this.opts),
                        row: i - 1,
                        col: rtl ? col-- : col++,
                        dateData: this.opts.dateData && this.opts.dateData[`${date.day}-${date.month}-${date.year}`] ? this.opts.dateData[`${date.day}-${date.month}-${date.year}`] : null
                    });
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (let j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = MonthId.next;
                        month = m + 1;
                    }
                    /** @type {?} */
                    const date = { year: cmo === MonthId.next && m === 12 ? y + 1 : y, month: cmo === MonthId.curr ? m : cmo === MonthId.next && m < 12 ? m + 1 : 1, day: dayNbr };
                    week.push({
                        dateObj: date,
                        cmo,
                        currDay: this.isCurrDay(dayNbr, month, y, today),
                        disabledDate: this.utilService.isDisabledDate(date, this.opts),
                        markedDate: this.utilService.isMarkedDate(date, this.opts),
                        highlight: this.utilService.isHighlightedDate(date, this.opts),
                        row: i - 1,
                        col: rtl ? col-- : col++,
                        dateData: this.opts.dateData && this.opts.dateData[`${date.day}-${date.month}-${date.year}`] ? this.opts.dateData[`${date.day}-${date.month}-${date.year}`] : null
                    });
                    dayNbr++;
                }
            }
            /** @type {?} */
            const weekNbr = showWeekNumbers && firstDayOfWeek === MO ? this.utilService.getWeekNumber(week[0].dateObj) : 0;
            this.dates.push({ week, weekNbr });
        }
        this.setDateViewHeaderBtnDisabledState(m, y);
        if (notifyChange) {
            // Notify parent
            this.calendarViewChanged({ year: y, month: m, first: { number: 1, weekday: this.getWeekday({ year: y, month: m, day: 1 }) }, last: { number: dInThisM, weekday: this.getWeekday({ year: y, month: m, day: dInThisM }) } });
        }
    }
    /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    setDateViewHeaderBtnDisabledState(m, y) {
        /** @type {?} */
        let dpm = false;
        /** @type {?} */
        let dnm = false;
        const { disableHeaderButtons, disableUntil, disableSince, enableDates, minYear, maxYear, rtl } = this.opts;
        if (disableHeaderButtons) {
            /** @type {?} */
            const duDate = { year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: this.utilService.datesInMonth(m === 1 ? 12 : m - 1, m === 1 ? y - 1 : y) };
            /** @type {?} */
            const dsDate = { year: m === 12 ? y + 1 : y, month: m === 12 ? 1 : m + 1, day: 1 };
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
    }
    /**
     * @param {?} y
     * @return {?}
     */
    setMonthViewHeaderBtnDisabledState(y) {
        /** @type {?} */
        let dpm = false;
        /** @type {?} */
        let dnm = false;
        const { disableHeaderButtons, disableUntil, disableSince, enableDates, minYear, maxYear, rtl } = this.opts;
        if (disableHeaderButtons) {
            /** @type {?} */
            const duDate = { year: y - 1, month: 12, day: 31 };
            /** @type {?} */
            const dsDate = { year: y + 1, month: 1, day: 1 };
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
    }
    /**
     * @param {?} yp
     * @param {?} yn
     * @return {?}
     */
    setYearViewHeaderBtnDisabledState(yp, yn) {
        /** @type {?} */
        let dpy = false;
        /** @type {?} */
        let dny = false;
        const { disableHeaderButtons, disableUntil, disableSince, enableDates, minYear, maxYear, rtl } = this.opts;
        if (disableHeaderButtons) {
            /** @type {?} */
            const duDate = { year: yp - 1, month: 12, day: 31 };
            /** @type {?} */
            const dsDate = { year: yn + 1, month: 1, day: 1 };
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
    }
    /**
     * @return {?}
     */
    swapHeaderBtnDisabled() {
        [this.prevViewDisabled, this.nextViewDisabled] = [this.nextViewDisabled, this.prevViewDisabled];
    }
}
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
CalendarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: UtilService }
];
CalendarComponent.propDecorators = {
    selectorEl: [{ type: ViewChild, args: ["selectorEl",] }],
    styleEl: [{ type: ViewChild, args: ["styleEl",] }],
    position: [{ type: HostBinding, args: ["style.position",] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1teWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jYWxlbmRhci9jYWxlbmRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQTRCLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQWdCdkosT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQzdFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzFELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFFNUQsT0FBTyxFQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQ2hJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFTcEwsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7OztJQXFDNUIsWUFB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QkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7OztZQXp5QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQ0FBbUM7Z0JBQzdDLG84RUFBd0M7Z0JBRXhDLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFDeEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7O1lBaENrQixVQUFVO1lBQWdDLFNBQVM7WUFBRSxpQkFBaUI7WUFnQmpGLFdBQVc7Ozt5QkFrQmhCLFNBQVMsU0FBQyxZQUFZO3NCQUN0QixTQUFTLFNBQUMsU0FBUzt1QkFFbkIsV0FBVyxTQUFDLGdCQUFnQjs7OztJQUg3Qix1Q0FBZ0Q7O0lBQ2hELG9DQUEwQzs7SUFFMUMscUNBQW1EOztJQUVuRCxpQ0FBaUI7O0lBQ2pCLHlDQUFxRTs7SUFDckUsMENBQWlEOztJQUNqRCx5Q0FBb0Q7O0lBQ3BELDhDQUF5Rzs7SUFDekcscUNBQTZCOztJQUM3QixrQ0FBMkI7O0lBQzNCLG1DQUE0Qzs7SUFDNUMsa0NBQTBDOztJQUMxQywwQ0FBMkI7O0lBQzNCLG1DQUFtQjs7SUFDbkIsd0NBQTBEOztJQUUxRCx3Q0FBNkI7O0lBQzdCLHVDQUE0Qjs7SUFFNUIsd0NBQTZCOztJQUU3Qix3Q0FBd0Q7O0lBQ3hELGdEQUEyRDs7SUFDM0QsK0NBQXlEOztJQUN6RCwwQ0FBd0M7O0lBQ3hDLHdDQUF3Qjs7SUFFeEIsd0NBQXdDOztJQUV4Qyw2Q0FBa0M7O0lBQ2xDLDZDQUFrQzs7SUFFbEMsMENBQTBCOzs7OztJQUVkLGlDQUF3Qjs7Ozs7SUFBRSxxQ0FBMkI7Ozs7O0lBQUUsZ0NBQThCOzs7OztJQUFFLHdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3RW5jYXBzdWxhdGlvbiwgVmlld0NoaWxkLCBSZW5kZXJlcjIsIENoYW5nZURldGVjdG9yUmVmLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEhvc3RCaW5kaW5nfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJTXlEYXRlfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1kYXRlLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlEYXRlUmFuZ2V9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LWRhdGUtcmFuZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeU1vbnRofSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1tb250aC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15Q2FsZW5kYXJEYXl9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LWNhbGVuZGFyLWRheS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15Q2FsZW5kYXJNb250aH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktY2FsZW5kYXItbW9udGguaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeUNhbGVuZGFyWWVhcn0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktY2FsZW5kYXIteWVhci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15V2Vla30gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktd2Vlay5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15T3B0aW9uc30gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktb3B0aW9ucy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15U2VsZWN0b3JQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktc2VsZWN0b3ItcG9zLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlDYWxlbmRhclZpZXdDaGFuZ2VkfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1jYWxlbmRhci12aWV3LWNoYW5nZWQuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeURhdGVNb2RlbH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktZGF0ZS1tb2RlbC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15UmFuZ2VEYXRlU2VsZWN0aW9ufSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1yYW5nZS1kYXRlLXNlbGVjdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15Q2FsZW5kYXJBbmltYXRpb259IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LWNhbGVuZGFyLWFuaW1hdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15VmFsaWRhdGVPcHRpb25zfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS12YWxpZGF0ZS1vcHRpb25zLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlEZWZhdWx0TW9udGh9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LWRlZmF1bHQtbW9udGguaW50ZXJmYWNlXCI7XG5pbXBvcnQge1V0aWxTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYW5ndWxhci1teWRhdGVwaWNrZXIudXRpbC5zZXJ2aWNlXCI7XG5pbXBvcnQge0tleUNvZGV9IGZyb20gXCIuLi8uLi9lbnVtcy9rZXktY29kZS5lbnVtXCI7XG5pbXBvcnQge01vbnRoSWR9IGZyb20gXCIuLi8uLi9lbnVtcy9tb250aC1pZC5lbnVtXCI7XG5pbXBvcnQge0RlZmF1bHRWaWV3fSBmcm9tIFwiLi4vLi4vZW51bXMvZGVmYXVsdC12aWV3LmVudW1cIjtcbmltcG9ydCB7Q2FsQW5pbWF0aW9ufSBmcm9tIFwiLi4vLi4vZW51bXMvY2FsLWFuaW1hdGlvbi5lbnVtXCI7XG5pbXBvcnQge0hlYWRlckFjdGlvbn0gZnJvbSBcIi4uLy4uL2VudW1zL2hlYWRlci1hY3Rpb24uZW51bVwiO1xuaW1wb3J0IHtBY3RpdmVWaWV3fSBmcm9tIFwiLi4vLi4vZW51bXMvYWN0aXZlLXZpZXcuZW51bVwiO1xuaW1wb3J0IHtET1QsIFVOREVSX0xJTkUsIEQsIE0sIFksIERBVEVfUk9XX0NPVU5ULCBEQVRFX0NPTF9DT1VOVCwgTU9OVEhfUk9XX0NPVU5ULCBNT05USF9DT0xfQ09VTlQsIFlFQVJfUk9XX0NPVU5ULCBZRUFSX0NPTF9DT1VOVCwgXG4gIFNVLCBNTywgVFUsIFdFLCBUSCwgRlIsIFNBLCBFTVBUWV9TVFIsIENMSUNLLCBTVFlMRSwgTVlfRFBfQU5JTUFUSU9OLCBBTklNQVRJT05fTkFNRVMsIElOLCBPVVQsIFRBQklOREVYLCBURF9TRUxFQ1RPUiwgWkVST19TVFIsIFlFQVJfU0VQQVJBVE9SfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2NvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibGliLWFuZ3VsYXItbXlkYXRlcGlja2VyLWNhbGVuZGFyXCIsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuLi8uLi9jc3MvYW5ndWxhci1teWRhdGVwaWNrZXIuc3R5bGUuY3NzJ10sXG4gIHByb3ZpZGVyczogW1V0aWxTZXJ2aWNlXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoXCJzZWxlY3RvckVsXCIpIHNlbGVjdG9yRWw6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJzdHlsZUVsXCIpIHN0eWxlRWw6IEVsZW1lbnRSZWY7XG4gIFxuICBASG9zdEJpbmRpbmcoXCJzdHlsZS5wb3NpdGlvblwiKSBwb3NpdGlvbiA9IFwic3RhdGljXCI7XG5cbiAgb3B0czogSU15T3B0aW9ucztcbiAgdmlzaWJsZU1vbnRoOiBJTXlNb250aCA9IHttb250aFR4dDogRU1QVFlfU1RSLCBtb250aE5icjogMCwgeWVhcjogMH07XG4gIHNlbGVjdGVkTW9udGg6IElNeU1vbnRoID0ge21vbnRoTmJyOiAwLCB5ZWFyOiAwfTtcbiAgc2VsZWN0ZWREYXRlOiBJTXlEYXRlID0ge3llYXI6IDAsIG1vbnRoOiAwLCBkYXk6IDB9O1xuICBzZWxlY3RlZERhdGVSYW5nZTogSU15RGF0ZVJhbmdlID0ge2JlZ2luOiB7eWVhcjogMCwgbW9udGg6IDAsIGRheTogMH0sIGVuZDoge3llYXI6IDAsIG1vbnRoOiAwLCBkYXk6IDB9fTtcbiAgd2Vla0RheXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgZGF0ZXM6IEFycmF5PElNeVdlZWs+ID0gW107XG4gIG1vbnRoczogQXJyYXk8QXJyYXk8SU15Q2FsZW5kYXJNb250aD4+ID0gW107XG4gIHllYXJzOiBBcnJheTxBcnJheTxJTXlDYWxlbmRhclllYXI+PiA9IFtdO1xuICB5ZWFyc0R1cmF0aW9uOiBzdHJpbmcgPSBcIlwiO1xuICBkYXlJZHg6IG51bWJlciA9IDA7XG4gIHdlZWtEYXlPcHRzOiBBcnJheTxzdHJpbmc+ID0gW1NVLCBNTywgVFUsIFdFLCBUSCwgRlIsIFNBXTtcblxuICBzZWxlY3RNb250aDogYm9vbGVhbiA9IGZhbHNlO1xuICBzZWxlY3RZZWFyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgdmlld0NoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBkYXRlQ2hhbmdlZDogKGRtOiBJTXlEYXRlTW9kZWwsIGNsb3NlOiBib29sZWFuKSA9PiB2b2lkO1xuICBjYWxlbmRhclZpZXdDaGFuZ2VkOiAoY3ZjOiBJTXlDYWxlbmRhclZpZXdDaGFuZ2VkKSA9PiB2b2lkO1xuICByYW5nZURhdGVTZWxlY3Rpb246IChyZHM6IElNeVJhbmdlRGF0ZVNlbGVjdGlvbikgPT4gdm9pZDtcbiAgdmlld0FjdGl2YXRlZDogKHZhOiBBY3RpdmVWaWV3KSA9PiB2b2lkO1xuICBjbG9zZWRCeUVzYzogKCkgPT4gdm9pZDtcbiAgXG4gIHNlbGVjdG9yUG9zOiBJTXlTZWxlY3RvclBvc2l0aW9uID0gbnVsbDtcblxuICBwcmV2Vmlld0Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIG5leHRWaWV3RGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjbGlja0xpc3RlbmVyOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbTogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgdXRpbFNlcnZpY2U6IFV0aWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5jbGlja0xpc3RlbmVyID0gcmVuZGVyZXIubGlzdGVuKGVsZW0ubmF0aXZlRWxlbWVudCwgQ0xJQ0ssIChldmVudDogYW55KSA9PiB7XG4gICAgICBpZiAoKHRoaXMub3B0cy5tb250aFNlbGVjdG9yIHx8IHRoaXMub3B0cy55ZWFyU2VsZWN0b3IpICYmIGV2ZW50LnRhcmdldCkge1xuICAgICAgICB0aGlzLnJlc2V0TW9udGhZZWFyU2VsZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3Qge3N0eWxlc0RhdGEsIGNhbGVuZGFyQW5pbWF0aW9uLCBpbmxpbmV9ID0gdGhpcy5vcHRzO1xuXG4gICAgaWYgKHN0eWxlc0RhdGEuc3R5bGVzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgc3R5bGVFbFRlbXA6IGFueSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChTVFlMRSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHN0eWxlRWxUZW1wLCB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQoc3R5bGVzRGF0YS5zdHlsZXMpKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5zdHlsZUVsLm5hdGl2ZUVsZW1lbnQsIHN0eWxlRWxUZW1wKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsZW5kYXJBbmltYXRpb24uaW4gIT09IENhbEFuaW1hdGlvbi5Ob25lKSB7XG4gICAgICB0aGlzLnNldENhbGVuZGFyQW5pbWF0aW9uKGNhbGVuZGFyQW5pbWF0aW9uLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoIWlubGluZSkge1xuICAgICAgdGhpcy5mb2N1c1RvU2VsZWN0b3IoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsaWNrTGlzdGVuZXIoKTtcbiAgfVxuXG4gIGluaXRpYWxpemVDb21wb25lbnQob3B0czogSU15T3B0aW9ucywgZGVmYXVsdE1vbnRoOiBJTXlEZWZhdWx0TW9udGgsIHNlbGVjdGVkVmFsdWU6IGFueSwgaW5wdXRWYWx1ZTogc3RyaW5nLCBzZWxlY3RvclBvczogSU15U2VsZWN0b3JQb3NpdGlvbiwgZGM6IChkbTogSU15RGF0ZU1vZGVsLCBjbG9zZTogYm9vbGVhbikgPT4gdm9pZCwgY3ZjOiAoY3ZjOiBJTXlDYWxlbmRhclZpZXdDaGFuZ2VkKSA9PiB2b2lkLCByZHM6IChyZHM6IElNeVJhbmdlRGF0ZVNlbGVjdGlvbikgPT4gdm9pZCwgdmE6ICh2YTogQWN0aXZlVmlldykgPT4gdm9pZCwgY2JlOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICB0aGlzLnNlbGVjdG9yUG9zID0gc2VsZWN0b3JQb3M7XG4gICAgXG4gICAgdGhpcy5kYXRlQ2hhbmdlZCA9IGRjO1xuICAgIHRoaXMuY2FsZW5kYXJWaWV3Q2hhbmdlZCA9IGN2YztcbiAgICB0aGlzLnJhbmdlRGF0ZVNlbGVjdGlvbiA9IHJkcztcbiAgICB0aGlzLnZpZXdBY3RpdmF0ZWQgPSB2YTtcbiAgICB0aGlzLmNsb3NlZEJ5RXNjID0gY2JlO1xuXG4gICAgY29uc3Qge2RlZmF1bHRWaWV3LCBmaXJzdERheU9mV2VlaywgZGF5TGFiZWxzfSA9IG9wdHM7XG5cbiAgICB0aGlzLndlZWtEYXlzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5kYXlJZHggPSB0aGlzLndlZWtEYXlPcHRzLmluZGV4T2YoZmlyc3REYXlPZldlZWspO1xuICAgIGlmICh0aGlzLmRheUlkeCAhPT0gLTEpIHtcbiAgICAgIGxldCBpZHg6IG51bWJlciA9IHRoaXMuZGF5SWR4O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndlZWtEYXlPcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMud2Vla0RheXMucHVzaChkYXlMYWJlbHNbdGhpcy53ZWVrRGF5T3B0c1tpZHhdXSk7XG4gICAgICAgIGlkeCA9IHRoaXMud2Vla0RheU9wdHNbaWR4XSA9PT0gU0EgPyAwIDogaWR4ICsgMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmluaXRpYWxpemVWaWV3KGRlZmF1bHRNb250aCwgc2VsZWN0ZWRWYWx1ZSwgaW5wdXRWYWx1ZSk7XG4gICAgdGhpcy5zZXRDYWxlbmRhclZpc2libGVNb250aCgpO1xuICAgIHRoaXMuc2V0RGVmYXVsdFZpZXcoZGVmYXVsdFZpZXcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZVZpZXcoZGVmYXVsdE1vbnRoOiBJTXlEZWZhdWx0TW9udGgsIHNlbGVjdGVkVmFsdWU6IGFueSwgaW5wdXRWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qge2RhdGVSYW5nZX0gPSB0aGlzLm9wdHM7XG5cbiAgICAvLyB1c2UgdG9kYXkgYXMgYSBzZWxlY3RlZCBtb250aFxuICAgIGNvbnN0IHRvZGF5OiBJTXlEYXRlID0gdGhpcy51dGlsU2VydmljZS5nZXRUb2RheSgpO1xuICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IHttb250aE5icjogdG9kYXkubW9udGgsIHllYXI6IHRvZGF5LnllYXJ9O1xuXG4gICAgLy8gSWYgZGVmYXVsdCBtb250aCBhdHRyaWJ1dGUgdmFsdXIgZ2l2ZW4gdXNlIGl0IGFzIGEgc2VsZWN0ZWQgbW9udGhcbiAgICBjb25zdCB7ZGVmTW9udGgsIG92ZXJyaWRlU2VsZWN0aW9ufSA9IGRlZmF1bHRNb250aDtcbiAgICBpZiAoZGVmTW9udGggJiYgZGVmTW9udGgubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSB0aGlzLnV0aWxTZXJ2aWNlLnBhcnNlRGVmYXVsdE1vbnRoKGRlZk1vbnRoKTtcbiAgICB9XG5cbiAgICBsZXQgdmFsaWRhdGVPcHRzOiBJTXlWYWxpZGF0ZU9wdGlvbnMgPSBudWxsO1xuICAgIGlmICghZGF0ZVJhbmdlKSB7XG4gICAgICAvLyBTaW5nbGUgZGF0ZSBtb2RlIC0gSWYgZGF0ZSBzZWxlY3RlZCB1c2UgaXQgYXMgc2VsZWN0ZWQgbW9udGhcbiAgICAgIHZhbGlkYXRlT3B0cyA9IHt2YWxpZGF0ZURpc2FibGVkRGF0ZXM6IGZhbHNlLCBzZWxlY3RlZFZhbHVlOiB0aGlzLnV0aWxTZXJ2aWNlLmdldFNlbGVjdGVkVmFsdWUoc2VsZWN0ZWRWYWx1ZSwgZGF0ZVJhbmdlKX07XG4gICAgICBjb25zdCBkYXRlOiBJTXlEYXRlID0gdGhpcy51dGlsU2VydmljZS5pc0RhdGVWYWxpZChpbnB1dFZhbHVlLCB0aGlzLm9wdHMsIHZhbGlkYXRlT3B0cyk7XG5cbiAgICAgIGlmICh0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGRhdGUpKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICAgICAgaWYgKCFvdmVycmlkZVNlbGVjdGlvbikge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IHttb250aE5icjogZGF0ZS5tb250aCwgeWVhcjogZGF0ZS55ZWFyfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIERhdGUgcmFuZ2UgbW9kZSAtIElmIGRhdGUgcmFuZ2Ugc2VsZWN0ZWQgdXNlIGJlZ2luIGRhdGUgYXMgc2VsZWN0ZWQgbW9udGhcbiAgICAgIHZhbGlkYXRlT3B0cyA9IHt2YWxpZGF0ZURpc2FibGVkRGF0ZXM6IGZhbHNlLCBzZWxlY3RlZFZhbHVlOiB0aGlzLnV0aWxTZXJ2aWNlLmdldFNlbGVjdGVkVmFsdWUoc2VsZWN0ZWRWYWx1ZSwgZGF0ZVJhbmdlKX07XG4gICAgICBjb25zdCB7YmVnaW4sIGVuZH0gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVZhbGlkRGF0ZVJhbmdlKGlucHV0VmFsdWUsIHRoaXMub3B0cywgdmFsaWRhdGVPcHRzKTtcblxuICAgICAgaWYgKHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoYmVnaW4pICYmIHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoZW5kKSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlID0ge2JlZ2luLCBlbmR9O1xuICAgICAgICBpZiAoIW92ZXJyaWRlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoID0ge21vbnRoTmJyOiBiZWdpbi5tb250aCwgeWVhcjogYmVnaW4ueWVhcn07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWZyZXNoQ29tcG9uZW50KG9wdHM6IElNeU9wdGlvbnMsIGRlZmF1bHRNb250aDogSU15RGVmYXVsdE1vbnRoLCBzZWxlY3RlZFZhbHVlOiBhbnksIGlucHV0VmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMub3B0cyA9IG9wdHM7XG5cbiAgICBjb25zdCB7ZGVmYXVsdFZpZXd9ID0gb3B0cztcblxuICAgIHRoaXMuaW5pdGlhbGl6ZVZpZXcoZGVmYXVsdE1vbnRoLCBzZWxlY3RlZFZhbHVlLCBpbnB1dFZhbHVlKTtcbiAgICB0aGlzLnNldENhbGVuZGFyVmlzaWJsZU1vbnRoKCk7XG4gICAgdGhpcy5zZXREZWZhdWx0VmlldyhkZWZhdWx0Vmlldyk7XG4gIH1cblxuICBoZWFkZXJBY3Rpb24oaGVhZGVyQWN0aW9uOiBIZWFkZXJBY3Rpb24pOiB2b2lkIHtcbiAgICBjb25zdCB7bW9udGhTZWxlY3RvciwgeWVhclNlbGVjdG9yfSA9IHRoaXMub3B0cztcblxuICAgIGlmIChoZWFkZXJBY3Rpb24gPT09IEhlYWRlckFjdGlvbi5QcmV2QnRuQ2xpY2spIHtcbiAgICAgIGlmICghdGhpcy5wcmV2Vmlld0Rpc2FibGVkKSB7XG4gICAgICAgIHRoaXMub25QcmV2TmF2aWdhdGVCdG5DbGlja2VkKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGhlYWRlckFjdGlvbiA9PT0gSGVhZGVyQWN0aW9uLk5leHRCdG5DbGljaykge1xuICAgICAgaWYgKCF0aGlzLm5leHRWaWV3RGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5vbk5leHROYXZpZ2F0ZUJ0bkNsaWNrZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaGVhZGVyQWN0aW9uID09PSBIZWFkZXJBY3Rpb24uTW9udGhCdG5DbGljaykge1xuICAgICAgaWYgKG1vbnRoU2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5vbk1vbnRoVmlld0J0bkNsaWNrZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaGVhZGVyQWN0aW9uID09PSBIZWFkZXJBY3Rpb24uWWVhckJ0bkNsaWNrKSB7XG4gICAgICBpZiAoeWVhclNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMub25ZZWFyVmlld0J0bkNsaWNrZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXREZWZhdWx0VmlldyhkZWZhdWx0VmlldzogRGVmYXVsdFZpZXcpOiB2b2lkIHtcbiAgICBpZiAoZGVmYXVsdFZpZXcgPT09IERlZmF1bHRWaWV3Lk1vbnRoKSB7XG4gICAgICB0aGlzLm1vbnRoVmlld0J0bkNsaWNrZWQoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGVmYXVsdFZpZXcgPT09IERlZmF1bHRWaWV3LlllYXIpIHtcbiAgICAgIHRoaXMueWVhclZpZXdCdG5DbGlja2VkKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q2FsZW5kYXJBbmltYXRpb24oY2FsQW5pbWF0aW9uOiBJTXlDYWxlbmRhckFuaW1hdGlvbiwgaXNPcGVuOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3Qge25hdGl2ZUVsZW1lbnR9ID0gdGhpcy5zZWxlY3RvckVsO1xuICAgIGNvbnN0IHtyZW5kZXJlcn0gPSB0aGlzO1xuXG4gICAgY29uc3QgY2xhc3NJbiA9IE1ZX0RQX0FOSU1BVElPTiArIEFOSU1BVElPTl9OQU1FU1tjYWxBbmltYXRpb24uaW4gLSAxXTtcbiAgICBpZiAoaXNPcGVuKSB7XG4gICAgICByZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCBjbGFzc0luICsgSU4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IGNsYXNzT3V0ID0gTVlfRFBfQU5JTUFUSU9OICsgQU5JTUFUSU9OX05BTUVTW2NhbEFuaW1hdGlvbi5vdXQgLSAxXTtcbiAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKG5hdGl2ZUVsZW1lbnQsIGNsYXNzSW4gKyBJTik7XG4gICAgICByZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCBjbGFzc091dCArIE9VVCk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXREYXRlVmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9wdHMuZGF0ZVJhbmdlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHRoaXMudXRpbFNlcnZpY2UucmVzZXREYXRlKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZERhdGVSYW5nZS5iZWdpbiA9IHRoaXMudXRpbFNlcnZpY2UucmVzZXREYXRlKCk7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLmVuZCA9IHRoaXMudXRpbFNlcnZpY2UucmVzZXREYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJEYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IHttb250aCwgeWVhcn0gPSB0aGlzLnV0aWxTZXJ2aWNlLmdldFRvZGF5KCk7XG4gICAgdGhpcy5zZWxlY3RlZE1vbnRoID0ge21vbnRoTmJyOiBtb250aCwgeWVhcjogeWVhcn07XG4gICAgXG4gICAgdGhpcy5yZXNldERhdGVWYWx1ZSgpO1xuICAgIHRoaXMuc2V0Q2FsZW5kYXJWaXNpYmxlTW9udGgoKTtcbiAgICB0aGlzLnJlc2V0TW9udGhZZWFyU2VsZWN0KCk7XG4gIH1cblxuICByZXNldE1vbnRoWWVhclNlbGVjdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdE1vbnRoID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RZZWFyID0gZmFsc2U7XG4gIH1cblxuICBvbk1vbnRoVmlld0J0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3Q2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy5tb250aFZpZXdCdG5DbGlja2VkKCk7XG4gIH1cblxuICBtb250aFZpZXdCdG5DbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0TW9udGggPSAhdGhpcy5zZWxlY3RNb250aDtcbiAgICB0aGlzLnNlbGVjdFllYXIgPSBmYWxzZTtcbiAgICBcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgaWYgKHRoaXMuc2VsZWN0TW9udGgpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVNb250aHMoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCB7eWVhciwgbW9udGhOYnJ9ID0gdGhpcy5zZWxlY3RlZE1vbnRoO1xuICAgICAgdGhpcy52aXNpYmxlTW9udGggPSB7bW9udGhUeHQ6IHRoaXMub3B0cy5tb250aExhYmVsc1ttb250aE5icl0sIG1vbnRoTmJyLCB5ZWFyfTtcbiAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcihtb250aE5iciwgeWVhciwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgb25Nb250aENlbGxDbGlja2VkKGNlbGw6IElNeUNhbGVuZGFyTW9udGgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdDaGFuZ2VkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHt5ZWFyLCBtb250aE5icn0gPSB0aGlzLnZpc2libGVNb250aDtcbiAgICBjb25zdCBtb250aENoYW5nZTogYm9vbGVhbiA9IGNlbGwubmJyICE9PSBtb250aE5icjtcbiAgICB0aGlzLnZpc2libGVNb250aCA9IHttb250aFR4dDogdGhpcy5vcHRzLm1vbnRoTGFiZWxzW2NlbGwubmJyXSwgbW9udGhOYnI6IGNlbGwubmJyLCB5ZWFyfTtcbiAgICB0aGlzLnNlbGVjdGVkTW9udGgueWVhciA9IHllYXI7XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKGNlbGwubmJyLCB5ZWFyLCBtb250aENoYW5nZSk7XG4gICAgdGhpcy5zZWxlY3RNb250aCA9IGZhbHNlO1xuICAgIHRoaXMuZm9jdXNUb1NlbGVjdG9yKCk7XG4gIH1cblxuICBvbk1vbnRoQ2VsbEtleURvd24oZXZlbnQ6IGFueSkge1xuICAgIC8vIE1vdmUgZm9jdXMgYnkgYXJyb3cga2V5c1xuICAgIGNvbnN0IHtzb3VyY2VSb3csIHNvdXJjZUNvbH0gPSB0aGlzLmdldFNvdXJjZVJvd0FuZENvbHVtbkZyb21FdmVudChldmVudCk7XG4gICAgY29uc3Qge21vdmVGb2N1cywgdGFyZ2V0Um93LCB0YXJnZXRDb2wsIGRpcmVjdGlvbn0gPSB0aGlzLmdldFRhcmdldEZvY3VzUm93QW5kQ29sdW1uKGV2ZW50LCBzb3VyY2VSb3csIHNvdXJjZUNvbCwgTU9OVEhfUk9XX0NPVU5ULCBNT05USF9DT0xfQ09VTlQpO1xuXG4gICAgaWYgKG1vdmVGb2N1cykge1xuICAgICAgdGhpcy5mb2N1c0NlbGxFbGVtZW50KE0sIHRhcmdldFJvdywgdGFyZ2V0Q29sLCBkaXJlY3Rpb24sIE1PTlRIX0NPTF9DT1VOVCk7XG4gICAgfVxuICB9XG5cbiAgb25ZZWFyVmlld0J0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3Q2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy55ZWFyVmlld0J0bkNsaWNrZWQoKTtcbiAgfVxuXG4gIHllYXJWaWV3QnRuQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdFllYXIgPSAhdGhpcy5zZWxlY3RZZWFyO1xuICAgIHRoaXMuc2VsZWN0TW9udGggPSBmYWxzZTtcblxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICBpZiAodGhpcy5zZWxlY3RZZWFyKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlWWVhcnModGhpcy52aXNpYmxlTW9udGgueWVhcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3Qge3llYXIsIG1vbnRoTmJyfSA9IHRoaXMuc2VsZWN0ZWRNb250aDtcbiAgICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge21vbnRoVHh0OiB0aGlzLm9wdHMubW9udGhMYWJlbHNbbW9udGhOYnJdLCBtb250aE5iciwgeWVhcn07XG4gICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIobW9udGhOYnIsIHllYXIsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIG9uWWVhckNlbGxDbGlja2VkKGNlbGw6IElNeUNhbGVuZGFyWWVhcik6IHZvaWQge1xuICAgIHRoaXMudmlld0NoYW5nZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qge3llYXIsIG1vbnRoTmJyLCBtb250aFR4dH0gPSB0aGlzLnZpc2libGVNb250aDtcbiAgICBjb25zdCB5YzogYm9vbGVhbiA9IGNlbGwueWVhciAhPT0geWVhcjtcbiAgICB0aGlzLnZpc2libGVNb250aCA9IHttb250aFR4dCwgbW9udGhOYnIsIHllYXI6IGNlbGwueWVhcn07XG4gICAgdGhpcy5zZWxlY3RlZE1vbnRoLnllYXIgPSBjZWxsLnllYXI7XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKG1vbnRoTmJyLCBjZWxsLnllYXIsIHljKTtcbiAgICB0aGlzLnNlbGVjdFllYXIgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzVG9TZWxlY3RvcigpO1xuICB9XG5cbiAgb25ZZWFyQ2VsbEtleURvd24oZXZlbnQ6IGFueSkge1xuICAgIC8vIE1vdmUgZm9jdXMgYnkgYXJyb3cga2V5c1xuICAgIGNvbnN0IHtzb3VyY2VSb3csIHNvdXJjZUNvbH0gPSB0aGlzLmdldFNvdXJjZVJvd0FuZENvbHVtbkZyb21FdmVudChldmVudCk7XG4gICAgY29uc3Qge21vdmVGb2N1cywgdGFyZ2V0Um93LCB0YXJnZXRDb2wsIGRpcmVjdGlvbn0gPSB0aGlzLmdldFRhcmdldEZvY3VzUm93QW5kQ29sdW1uKGV2ZW50LCBzb3VyY2VSb3csIHNvdXJjZUNvbCwgWUVBUl9ST1dfQ09VTlQsIFlFQVJfQ09MX0NPVU5UKTtcblxuICAgIGlmIChtb3ZlRm9jdXMpIHtcbiAgICAgIHRoaXMuZm9jdXNDZWxsRWxlbWVudChZLCB0YXJnZXRSb3csIHRhcmdldENvbCwgZGlyZWN0aW9uLCBZRUFSX0NPTF9DT1VOVCk7XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVNb250aHMoKTogdm9pZCB7XG4gICAgY29uc3QgdG9kYXk6IElNeURhdGUgPSB0aGlzLnV0aWxTZXJ2aWNlLmdldFRvZGF5KCk7XG4gICAgdGhpcy5tb250aHMubGVuZ3RoID0gMDtcblxuICAgIGNvbnN0IHt5ZWFyLCBtb250aE5icn0gPSB0aGlzLnZpc2libGVNb250aDtcbiAgICBjb25zdCB7cnRsLCBtb250aExhYmVsc30gPSB0aGlzLm9wdHM7XG5cbiAgICBsZXQgcm93OiBudW1iZXIgPSAwO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEyOyBpICs9IDMpIHtcbiAgICAgIGNvbnN0IHJvd0RhdGE6IEFycmF5PElNeUNhbGVuZGFyTW9udGg+ID0gW107XG4gICAgICBsZXQgY29sID0gcnRsID8gMiA6IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSBpOyBqIDwgaSArIDM7IGorKykge1xuICAgICAgICBjb25zdCBkaXNhYmxlZDogYm9vbGVhbiA9IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZE1vbnRoKHllYXIsIGosIHRoaXMub3B0cyk7XG4gICAgICAgIHJvd0RhdGEucHVzaCh7XG4gICAgICAgICAgbmJyOiBqLFxuICAgICAgICAgIHllYXIsXG4gICAgICAgICAgbmFtZTogbW9udGhMYWJlbHNbal0sIFxuICAgICAgICAgIGN1cnJNb250aDogaiA9PT0gdG9kYXkubW9udGggJiYgeWVhciA9PT0gdG9kYXkueWVhciwgXG4gICAgICAgICAgc2VsZWN0ZWQ6IGogPT09IG1vbnRoTmJyICYmIHllYXIgPT09IHRoaXMuc2VsZWN0ZWRNb250aC55ZWFyLCBcbiAgICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgICByb3csXG4gICAgICAgICAgY29sOiBydGwgPyBjb2wtLSA6IGNvbCsrXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcm93Kys7XG4gICAgICB0aGlzLm1vbnRocy5wdXNoKHJvd0RhdGEpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0TW9udGhWaWV3SGVhZGVyQnRuRGlzYWJsZWRTdGF0ZSh5ZWFyKTtcbiAgfVxuXG4gIGdlbmVyYXRlWWVhcnMoaW5wdXRZZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB7bWluWWVhciwgbWF4WWVhciwgcnRsfSA9IHRoaXMub3B0cztcblxuICAgIGxldCB5OiBudW1iZXIgPSBpbnB1dFllYXIgLSAxMjtcbiAgICBpZiAoaW5wdXRZZWFyIDwgbWluWWVhcikge1xuICAgICAgeSA9IG1pblllYXI7XG4gICAgfVxuXG4gICAgaWYgKGlucHV0WWVhciArIDI1ID4gbWF4WWVhcikge1xuICAgICAgeSA9IG1heFllYXIgLSAyNDtcbiAgICB9XG5cbiAgICBjb25zdCB7eWVhcn0gPSB0aGlzLnZpc2libGVNb250aDtcblxuICAgIHRoaXMueWVhcnMubGVuZ3RoID0gMDtcbiAgICBjb25zdCB0b2RheTogSU15RGF0ZSA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0VG9kYXkoKTtcblxuICAgIGxldCByb3c6IG51bWJlciA9IDA7XG4gICAgZm9yIChsZXQgaSA9IHk7IGkgPCB5ICsgMjU7IGkgKz0gNSkge1xuICAgICAgY29uc3Qgcm93RGF0YTogQXJyYXk8SU15Q2FsZW5kYXJZZWFyPiA9IFtdO1xuICAgICAgbGV0IGNvbDogbnVtYmVyID0gcnRsID8gNCA6IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSBpOyBqIDwgaSArIDU7IGorKykge1xuICAgICAgICBjb25zdCBkaXNhYmxlZDogYm9vbGVhbiA9IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZFllYXIoaiwgdGhpcy5vcHRzKTtcbiAgICAgICAgcm93RGF0YS5wdXNoKHtcbiAgICAgICAgICB5ZWFyOiBqLCBcbiAgICAgICAgICBjdXJyWWVhcjogaiA9PT0gdG9kYXkueWVhciwgXG4gICAgICAgICAgc2VsZWN0ZWQ6IGogPT09IHllYXIsIFxuICAgICAgICAgIGRpc2FibGVkLFxuICAgICAgICAgIHJvdyxcbiAgICAgICAgICBjb2w6IHJ0bCA/IGNvbC0tIDogY29sKytcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByb3crKztcbiAgICAgIHRoaXMueWVhcnMucHVzaChyb3dEYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdCBiZWdpblllYXI6IG51bWJlciA9IHRoaXMuZ2V0WWVhclZhbHVlQnlSb3dBbmRDb2woMCwgMCk7XG4gICAgY29uc3QgZW5kWWVhcjogbnVtYmVyID0gYmVnaW5ZZWFyICsgMjQ7XG4gICAgdGhpcy55ZWFyc0R1cmF0aW9uID0gKCFydGwgPyBiZWdpblllYXIgOiBlbmRZZWFyKSArIFlFQVJfU0VQQVJBVE9SICsgKCFydGwgPyBlbmRZZWFyIDogYmVnaW5ZZWFyKTtcblxuICAgIHRoaXMuc2V0WWVhclZpZXdIZWFkZXJCdG5EaXNhYmxlZFN0YXRlKGJlZ2luWWVhciwgZW5kWWVhcik7XG4gIH1cblxuICBvblRvZGF5Rm9vdGVyQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRlID0gdGhpcy51dGlsU2VydmljZS5nZXRUb2RheSgpO1xuICAgIHRoaXMuc2VsZWN0RGF0ZShkYXRlKTtcbiAgfVxuXG4gIGdldFllYXJWYWx1ZUJ5Um93QW5kQ29sKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qge3llYXJzfSA9IHRoaXM7XG4gICAgaWYgKCF5ZWFycyB8fCB5ZWFycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IHt5ZWFyfSA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0VG9kYXkoKTtcbiAgICAgIHJldHVybiB5ZWFyO1xuICAgIH1cbiAgICByZXR1cm4geWVhcnNbcm93XVtjb2xdLnllYXI7XG4gIH1cblxuICBzZXRDYWxlbmRhclZpc2libGVNb250aCgpOiB2b2lkIHtcbiAgICAvLyBTZXRzIHZpc2libGUgbW9udGggb2YgY2FsZW5kYXJcbiAgICBjb25zdCB7eWVhciwgbW9udGhOYnJ9ID0gdGhpcy5zZWxlY3RlZE1vbnRoO1xuICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge21vbnRoVHh0OiB0aGlzLm9wdHMubW9udGhMYWJlbHNbbW9udGhOYnJdLCBtb250aE5iciwgeWVhcn07XG5cbiAgICAvLyBDcmVhdGUgY3VycmVudCBtb250aFxuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcihtb250aE5iciwgeWVhciwgdHJ1ZSk7XG4gIH1cblxuICBvblZpZXdBY3RpdmF0ZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmlld0FjdGl2YXRlZChldmVudCk7XG4gIH1cblxuICBvblByZXZOYXZpZ2F0ZUJ0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdE1vbnRoICYmICF0aGlzLnNlbGVjdFllYXIpIHtcbiAgICAgIHRoaXMuc2V0RGF0ZVZpZXdNb250aChmYWxzZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuc2VsZWN0TW9udGgpIHtcbiAgICAgIHRoaXMudmlzaWJsZU1vbnRoLnllYXItLTtcbiAgICAgIHRoaXMuZ2VuZXJhdGVNb250aHMoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5zZWxlY3RZZWFyKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlWWVhcnModGhpcy5nZXRZZWFyVmFsdWVCeVJvd0FuZENvbCgyLCAyKSAtIDI1KTtcbiAgICB9XG4gIH1cblxuICBvbk5leHROYXZpZ2F0ZUJ0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdE1vbnRoICYmICF0aGlzLnNlbGVjdFllYXIpIHtcbiAgICAgIHRoaXMuc2V0RGF0ZVZpZXdNb250aCh0cnVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5zZWxlY3RNb250aCkge1xuICAgICAgdGhpcy52aXNpYmxlTW9udGgueWVhcisrO1xuICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRocygpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnNlbGVjdFllYXIpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVZZWFycyh0aGlzLmdldFllYXJWYWx1ZUJ5Um93QW5kQ29sKDIsIDIpICsgMjUpO1xuICAgIH1cbiAgfVxuXG4gIHNldERhdGVWaWV3TW9udGgoaXNOZXh0OiBib29sZWFuKTogdm9pZCB7XG4gICAgbGV0IGNoYW5nZTogbnVtYmVyID0gaXNOZXh0ID8gMSA6IC0xO1xuXG4gICAgY29uc3Qge3llYXIsIG1vbnRoTmJyfSA9IHRoaXMudmlzaWJsZU1vbnRoO1xuXG4gICAgY29uc3QgZDogRGF0ZSA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0SnNEYXRlKHllYXIsIG1vbnRoTmJyLCAxKTtcbiAgICBkLnNldE1vbnRoKGQuZ2V0TW9udGgoKSArIGNoYW5nZSk7XG5cbiAgICBjb25zdCB5OiBudW1iZXIgPSBkLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgbTogbnVtYmVyID0gZC5nZXRNb250aCgpICsgMTtcblxuICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge21vbnRoVHh0OiB0aGlzLm9wdHMubW9udGhMYWJlbHNbbV0sIG1vbnRoTmJyOiBtLCB5ZWFyOiB5fTtcbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIobSwgeSwgdHJ1ZSk7XG4gIH1cblxuICBvbkNsb3NlU2VsZWN0b3IoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGtleUNvZGU6IG51bWJlciA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0S2V5Q29kZUZyb21FdmVudChldmVudCk7XG4gICAgaWYgKGtleUNvZGUgPT09IEtleUNvZGUuZXNjKSB7XG4gICAgICB0aGlzLmNsb3NlZEJ5RXNjKCk7XG4gICAgfVxuICB9XG5cbiAgb25EYXlDZWxsQ2xpY2tlZChjZWxsOiBJTXlDYWxlbmRhckRheSk6IHZvaWQge1xuICAgIC8vIENlbGwgY2xpY2tlZCBvbiB0aGUgY2FsZW5kYXJcbiAgICB0aGlzLnNlbGVjdERhdGUoY2VsbC5kYXRlT2JqKTtcbiAgICB0aGlzLnJlc2V0TW9udGhZZWFyU2VsZWN0KCk7XG4gIH1cblxuICBvbkRheUNlbGxLZXlEb3duKGV2ZW50OiBhbnkpIHtcbiAgICAvLyBNb3ZlIGZvY3VzIGJ5IGFycm93IGtleXNcbiAgICBjb25zdCB7c291cmNlUm93LCBzb3VyY2VDb2x9ID0gdGhpcy5nZXRTb3VyY2VSb3dBbmRDb2x1bW5Gcm9tRXZlbnQoZXZlbnQpO1xuICAgIGNvbnN0IHttb3ZlRm9jdXMsIHRhcmdldFJvdywgdGFyZ2V0Q29sLCBkaXJlY3Rpb259ID0gdGhpcy5nZXRUYXJnZXRGb2N1c1Jvd0FuZENvbHVtbihldmVudCwgc291cmNlUm93LCBzb3VyY2VDb2wsIERBVEVfUk9XX0NPVU5ULCBEQVRFX0NPTF9DT1VOVCk7XG4gICAgaWYgKG1vdmVGb2N1cykge1xuICAgICAgdGhpcy5mb2N1c0NlbGxFbGVtZW50KEQsIHRhcmdldFJvdywgdGFyZ2V0Q29sLCBkaXJlY3Rpb24sIERBVEVfQ09MX0NPVU5UKTtcbiAgICB9XG4gIH1cblxuICBnZXRTb3VyY2VSb3dBbmRDb2x1bW5Gcm9tRXZlbnQoZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgbGV0IHNvdXJjZVJvdzogbnVtYmVyID0gMDtcbiAgICBsZXQgc291cmNlQ29sOiBudW1iZXIgPSAwO1xuICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmlkKSB7XG4gICAgICAvLyB2YWx1ZSBvZiBpZCBpcyBmb3IgZXhhbXBsZTogbV8wXzEgKGZpcnN0IG51bWJlciA9IHJvdywgc2Vjb25kIG51bWJlciA9IGNvbHVtbilcbiAgICAgIGNvbnN0IGFycjogQXJyYXk8c3RyaW5nPiA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChVTkRFUl9MSU5FKTtcbiAgICAgIHNvdXJjZVJvdyA9IE51bWJlcihhcnJbMV0pO1xuICAgICAgc291cmNlQ29sID0gTnVtYmVyKGFyclsyXSk7XG4gICAgfVxuICAgIHJldHVybiB7c291cmNlUm93LCBzb3VyY2VDb2x9O1xuICB9XG5cbiAgZ2V0VGFyZ2V0Rm9jdXNSb3dBbmRDb2x1bW4oZXZlbnQ6IGFueSwgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCByb3dDb3VudDogbnVtYmVyLCBjb2xDb3VudDogbnVtYmVyKTogYW55IHtcbiAgICBsZXQgbW92ZUZvY3VzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBsZXQgdGFyZ2V0Um93OiBudW1iZXIgPSByb3c7XG4gICAgbGV0IHRhcmdldENvbDogbnVtYmVyID0gY29sO1xuICAgIGxldCBkaXJlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0IGtleUNvZGU6IG51bWJlciA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0S2V5Q29kZUZyb21FdmVudChldmVudCk7XG4gICAgaWYgKGtleUNvZGUgPT09IEtleUNvZGUudXBBcnJvdyAmJiByb3cgPiAwKSB7XG4gICAgICB0YXJnZXRSb3ctLTtcbiAgICB9XG4gICAgZWxzZSBpZiAoa2V5Q29kZSA9PT0gS2V5Q29kZS5kb3duQXJyb3cgJiYgcm93IDwgcm93Q291bnQpIHtcbiAgICAgIHRhcmdldFJvdysrO1xuICAgICAgZGlyZWN0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoa2V5Q29kZSA9PT0gS2V5Q29kZS5sZWZ0QXJyb3cgJiYgY29sID4gMCkge1xuICAgICAgdGFyZ2V0Q29sLS07XG4gICAgfVxuICAgIGVsc2UgaWYgKGtleUNvZGUgPT09IEtleUNvZGUucmlnaHRBcnJvdyAmJiBjb2wgPCBjb2xDb3VudCkge1xuICAgICAgdGFyZ2V0Q29sKys7XG4gICAgICBkaXJlY3Rpb24gPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG1vdmVGb2N1cyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4ge21vdmVGb2N1cywgdGFyZ2V0Um93LCB0YXJnZXRDb2wsIGRpcmVjdGlvbn07XG4gIH1cblxuICBmb2N1c0NlbGxFbGVtZW50KHR5cGU6IHN0cmluZywgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBkaXJlY3Rpb246IGJvb2xlYW4sIGNvbENvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBjbGFzc05hbWU6IHN0cmluZyA9IHR5cGUgKyBVTkRFUl9MSU5FICsgcm93ICsgVU5ERVJfTElORSArIGNvbDtcbiAgICBsZXQgZWxlbTogYW55ID0gdGhpcy5zZWxlY3RvckVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihET1QgKyBjbGFzc05hbWUpO1xuXG4gICAgaWYgKGVsZW0uZ2V0QXR0cmlidXRlKFRBQklOREVYKSAhPT0gWkVST19TVFIpIHtcbiAgICAgIC8vIGlmIHRoZSBzZWxlY3RlZCBlbGVtZW50IGlzIGRpc2FibGVkIG1vdmUgYSBmb2N1cyB0byBuZXh0L3ByZXZpb3VzIGVuYWJsZWQgZWxlbWVudFxuICAgICAgbGV0IHRkTGlzdDogYW55ID0gdGhpcy5nZXRDYWxlbmRhckVsZW1lbnRzKCk7XG4gICAgICBjb25zdCBpZHg6IG51bWJlciA9IHJvdyAqIChjb2xDb3VudCArIDEpICsgY29sO1xuXG4gICAgICBsZXQgZW5hYmxlZEVsZW06IGFueSA9IG51bGw7XG4gICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGZpbmQgbmV4dCBlbmFibGVkXG4gICAgICAgIGVuYWJsZWRFbGVtID0gdGRMaXN0LnNsaWNlKGlkeCkuZmluZCgodGQ6IGFueSkgPT4gdGQuZ2V0QXR0cmlidXRlKFRBQklOREVYKSA9PT0gWkVST19TVFIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGZpbmQgcHJldmlvdXMgZW5hYmxlZFxuICAgICAgICBlbmFibGVkRWxlbSA9IHRkTGlzdC5zbGljZSgwLCBpZHgpLnJldmVyc2UoKS5maW5kKCh0ZDogYW55KSA9PiB0ZC5nZXRBdHRyaWJ1dGUoVEFCSU5ERVgpID09PSBaRVJPX1NUUik7XG4gICAgICB9XG5cbiAgICAgIGVsZW0gPSBlbmFibGVkRWxlbSA/IGVuYWJsZWRFbGVtIDogdGhpcy5zZWxlY3RvckVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZWxlbS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzVG9TZWxlY3RvcigpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdG9yRWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgZ2V0Q2FsZW5kYXJFbGVtZW50cygpOiBhbnkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2VsZWN0b3JFbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoVERfU0VMRUNUT1IpKTtcbiAgfVxuXG4gIHNlbGVjdERhdGUoZGF0ZTogSU15RGF0ZSk6IHZvaWQge1xuICAgIGNvbnN0IHtkYXRlUmFuZ2UsIGRhdGVGb3JtYXQsIG1vbnRoTGFiZWxzLCBkYXRlUmFuZ2VEYXRlc0RlbGltaXRlciwgY2xvc2VTZWxlY3Rvck9uRGF0ZVNlbGVjdH0gPSB0aGlzLm9wdHM7XG5cbiAgICBpZiAoZGF0ZVJhbmdlKSB7XG4gICAgICAvLyBEYXRlIHJhbmdlXG4gICAgICBjb25zdCBpc0JlZ2luRGF0ZUluaXRpYWxpemVkOiBib29sZWFuID0gdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLmJlZ2luKTtcbiAgICAgIGNvbnN0IGlzRW5kRGF0ZUluaXRpYWxpemVkOiBib29sZWFuID0gdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLmVuZCk7XG4gICAgICBpZiAoaXNCZWdpbkRhdGVJbml0aWFsaXplZCAmJiBpc0VuZERhdGVJbml0aWFsaXplZCkge1xuICAgICAgICAvLyBib3RoIGFscmVhZHkgc2VsZWN0ZWQgLSBzZXQgYmVnaW4gZGF0ZSBhbmQgcmVzZXQgZW5kIGRhdGVcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVSYW5nZS5iZWdpbiA9IGRhdGU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlUmFuZ2UuZW5kID0gdGhpcy51dGlsU2VydmljZS5yZXNldERhdGUoKTtcbiAgICAgICAgdGhpcy5yYW5nZURhdGVTZWxlY3Rpb24oe1xuICAgICAgICAgIGlzQmVnaW46IHRydWUsXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICBqc0RhdGU6IHRoaXMudXRpbFNlcnZpY2UubXlEYXRlVG9Kc0RhdGUoZGF0ZSksXG4gICAgICAgICAgZGF0ZUZvcm1hdDogZGF0ZUZvcm1hdCxcbiAgICAgICAgICBmb3JtYXR0ZWQ6IHRoaXMudXRpbFNlcnZpY2UuZm9ybWF0RGF0ZShkYXRlLCBkYXRlRm9ybWF0LCBtb250aExhYmVscyksXG4gICAgICAgICAgZXBvYzogdGhpcy51dGlsU2VydmljZS5nZXRFcG9jVGltZShkYXRlKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFpc0JlZ2luRGF0ZUluaXRpYWxpemVkKSB7XG4gICAgICAgIC8vIGJlZ2luIGRhdGVcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVSYW5nZS5iZWdpbiA9IGRhdGU7XG4gICAgICAgIHRoaXMucmFuZ2VEYXRlU2VsZWN0aW9uKHtcbiAgICAgICAgICBpc0JlZ2luOiB0cnVlLFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAganNEYXRlOiB0aGlzLnV0aWxTZXJ2aWNlLm15RGF0ZVRvSnNEYXRlKGRhdGUpLFxuICAgICAgICAgIGRhdGVGb3JtYXQ6IGRhdGVGb3JtYXQsXG4gICAgICAgICAgZm9ybWF0dGVkOiB0aGlzLnV0aWxTZXJ2aWNlLmZvcm1hdERhdGUoZGF0ZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMpLFxuICAgICAgICAgIGVwb2M6IHRoaXMudXRpbFNlcnZpY2UuZ2V0RXBvY1RpbWUoZGF0ZSlcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBzZWNvbmQgc2VsZWN0aW9uXG4gICAgICAgIGNvbnN0IGZpcnN0RGF0ZUVhcmxpZXI6IGJvb2xlYW4gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZUVhcmxpZXIoZGF0ZSwgdGhpcy5zZWxlY3RlZERhdGVSYW5nZS5iZWdpbik7XG4gICAgICAgIGlmIChmaXJzdERhdGVFYXJsaWVyKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVSYW5nZS5iZWdpbiA9IGRhdGU7XG4gICAgICAgICAgdGhpcy5yYW5nZURhdGVTZWxlY3Rpb24oe1xuICAgICAgICAgICAgaXNCZWdpbjogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICBqc0RhdGU6IHRoaXMudXRpbFNlcnZpY2UubXlEYXRlVG9Kc0RhdGUoZGF0ZSksXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiBkYXRlRm9ybWF0LFxuICAgICAgICAgICAgZm9ybWF0dGVkOiB0aGlzLnV0aWxTZXJ2aWNlLmZvcm1hdERhdGUoZGF0ZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMpLFxuICAgICAgICAgICAgZXBvYzogdGhpcy51dGlsU2VydmljZS5nZXRFcG9jVGltZShkYXRlKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlUmFuZ2UuZW5kID0gZGF0ZTtcbiAgICAgICAgICB0aGlzLnJhbmdlRGF0ZVNlbGVjdGlvbih7XG4gICAgICAgICAgICBpc0JlZ2luOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICBqc0RhdGU6IHRoaXMudXRpbFNlcnZpY2UubXlEYXRlVG9Kc0RhdGUoZGF0ZSksXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiBkYXRlRm9ybWF0LFxuICAgICAgICAgICAgZm9ybWF0dGVkOiB0aGlzLnV0aWxTZXJ2aWNlLmZvcm1hdERhdGUoZGF0ZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMpLFxuICAgICAgICAgICAgZXBvYzogdGhpcy51dGlsU2VydmljZS5nZXRFcG9jVGltZShkYXRlKVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5kYXRlQ2hhbmdlZCh0aGlzLnV0aWxTZXJ2aWNlLmdldERhdGVNb2RlbChudWxsLCB0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLCBkYXRlRm9ybWF0LCBtb250aExhYmVscywgZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXIpLCBjbG9zZVNlbGVjdG9yT25EYXRlU2VsZWN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIFNpbmdsZSBkYXRlXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGU7XG4gICAgICB0aGlzLmRhdGVDaGFuZ2VkKHRoaXMudXRpbFNlcnZpY2UuZ2V0RGF0ZU1vZGVsKHRoaXMuc2VsZWN0ZWREYXRlLCBudWxsLCBkYXRlRm9ybWF0LCBtb250aExhYmVscywgZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXIpLCBjbG9zZVNlbGVjdG9yT25EYXRlU2VsZWN0KTtcbiAgICB9XG4gIH1cblxuICBtb250aFN0YXJ0SWR4KHk6IG51bWJlciwgbTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAvLyBNb250aCBzdGFydCBpbmRleFxuICAgIGNvbnN0IGQ6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGQuc2V0RGF0ZSgxKTtcbiAgICBkLnNldE1vbnRoKG0gLSAxKTtcbiAgICBkLnNldEZ1bGxZZWFyKHkpO1xuICAgIGNvbnN0IGlkeCA9IGQuZ2V0RGF5KCkgKyB0aGlzLnN1bmRheUlkeCgpO1xuICAgIHJldHVybiBpZHggPj0gNyA/IGlkeCAtIDcgOiBpZHg7XG4gIH1cblxuICBpc0N1cnJEYXkoZDogbnVtYmVyLCBtOiBudW1iZXIsIHk6IG51bWJlciwgdG9kYXk6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICAvLyBDaGVjayBpcyBhIGdpdmVuIGRhdGUgdGhlIHRvZGF5XG4gICAgcmV0dXJuIGQgPT09IHRvZGF5LmRheSAmJiBtID09PSB0b2RheS5tb250aCAmJiB5ID09PSB0b2RheS55ZWFyO1xuICB9XG5cbiAgZ2V0RGF5TnVtYmVyKGRhdGU6IElNeURhdGUpOiBudW1iZXIge1xuICAgIC8vIEdldCBkYXkgbnVtYmVyOiBzdT0wLCBtbz0xLCB0dT0yLCB3ZT0zIC4uLlxuICAgIGNvbnN0IHt5ZWFyLCBtb250aCwgZGF5fSA9IGRhdGU7XG4gICAgY29uc3QgZDogRGF0ZSA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0SnNEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIHJldHVybiBkLmdldERheSgpO1xuICB9XG5cbiAgZ2V0V2Vla2RheShkYXRlOiBJTXlEYXRlKTogc3RyaW5nIHtcbiAgICAvLyBHZXQgd2Vla2RheTogc3UsIG1vLCB0dSwgd2UgLi4uXG4gICAgcmV0dXJuIHRoaXMud2Vla0RheU9wdHNbdGhpcy5nZXREYXlOdW1iZXIoZGF0ZSldO1xuICB9XG5cbiAgc3VuZGF5SWR4KCk6IG51bWJlciB7XG4gICAgLy8gSW5kZXggb2YgU3VuZGF5IGRheVxuICAgIHJldHVybiB0aGlzLmRheUlkeCA+IDAgPyA3IC0gdGhpcy5kYXlJZHggOiAwO1xuICB9XG5cbiAgZ2VuZXJhdGVDYWxlbmRhcihtOiBudW1iZXIsIHk6IG51bWJlciwgbm90aWZ5Q2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kYXRlcy5sZW5ndGggPSAwO1xuICAgIGNvbnN0IHRvZGF5OiBJTXlEYXRlID0gdGhpcy51dGlsU2VydmljZS5nZXRUb2RheSgpO1xuICAgIGNvbnN0IG1vbnRoU3RhcnQ6IG51bWJlciA9IHRoaXMubW9udGhTdGFydElkeCh5LCBtKTtcbiAgICBjb25zdCBkSW5UaGlzTTogbnVtYmVyID0gdGhpcy51dGlsU2VydmljZS5kYXRlc0luTW9udGgobSwgeSk7XG4gICAgY29uc3QgZEluUHJldk06IG51bWJlciA9IHRoaXMudXRpbFNlcnZpY2UuZGF0ZXNJblByZXZNb250aChtLCB5KTtcblxuICAgIGxldCBkYXlOYnI6IG51bWJlciA9IDE7XG4gICAgbGV0IG1vbnRoOiBudW1iZXIgPSBtO1xuICAgIGxldCBjbW86IG51bWJlciA9IE1vbnRoSWQucHJldjtcbiAgICBjb25zdCB7cnRsLCBzaG93V2Vla051bWJlcnMsIGZpcnN0RGF5T2ZXZWVrfSA9IHRoaXMub3B0cztcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDc7IGkrKykge1xuICAgICAgbGV0IGNvbDogbnVtYmVyID0gcnRsID8gNiA6IDA7XG4gICAgICBjb25zdCB3ZWVrOiBBcnJheTxJTXlDYWxlbmRhckRheT4gPSBbXTtcbiAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgIC8vIEZpcnN0IHdlZWtcbiAgICAgICAgY29uc3QgcG0gPSBkSW5QcmV2TSAtIG1vbnRoU3RhcnQgKyAxO1xuICAgICAgICAvLyBQcmV2aW91cyBtb250aFxuICAgICAgICBmb3IgKGxldCBqID0gcG07IGogPD0gZEluUHJldk07IGorKykge1xuICAgICAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB7eWVhcjogbSA9PT0gMSA/IHkgLSAxIDogeSwgbW9udGg6IG0gPT09IDEgPyAxMiA6IG0gLSAxLCBkYXk6IGp9O1xuICAgICAgICAgIHdlZWsucHVzaCh7XG4gICAgICAgICAgICBkYXRlT2JqOiBkYXRlLFxuICAgICAgICAgICAgY21vLFxuICAgICAgICAgICAgY3VyckRheTogdGhpcy5pc0N1cnJEYXkoaiwgbW9udGggLSAxLCB5LCB0b2RheSksXG4gICAgICAgICAgICBkaXNhYmxlZERhdGU6IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZERhdGUoZGF0ZSwgdGhpcy5vcHRzKSxcbiAgICAgICAgICAgIG1hcmtlZERhdGU6IHRoaXMudXRpbFNlcnZpY2UuaXNNYXJrZWREYXRlKGRhdGUsIHRoaXMub3B0cyksXG4gICAgICAgICAgICBoaWdobGlnaHQ6IHRoaXMudXRpbFNlcnZpY2UuaXNIaWdobGlnaHRlZERhdGUoZGF0ZSwgdGhpcy5vcHRzKSxcbiAgICAgICAgICAgIHJvdzogaSAtIDEsXG4gICAgICAgICAgICBjb2w6IHJ0bCA/IGNvbC0tIDogY29sKyssXG4gICAgICAgICAgICBkYXRlRGF0YTogIHRoaXMub3B0cy5kYXRlRGF0YSAmJiB0aGlzLm9wdHMuZGF0ZURhdGFbYCR7ZGF0ZS5kYXl9LSR7ZGF0ZS5tb250aH0tJHtkYXRlLnllYXJ9YF0gPyB0aGlzLm9wdHMuZGF0ZURhdGFbYCR7ZGF0ZS5kYXl9LSR7ZGF0ZS5tb250aH0tJHtkYXRlLnllYXJ9YF0gOiBudWxsXG4gICAgICAgICAgfSk7IFxuICAgICAgICB9XG5cbiAgICAgICAgY21vID0gTW9udGhJZC5jdXJyO1xuICAgICAgICAvLyBDdXJyZW50IG1vbnRoXG4gICAgICAgIGNvbnN0IGRheXNMZWZ0OiBudW1iZXIgPSA3IC0gd2Vlay5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF5c0xlZnQ7IGorKykge1xuICAgICAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB7eWVhcjogeSwgbW9udGg6IG0sIGRheTogZGF5TmJyfTtcbiAgICAgICAgICB3ZWVrLnB1c2goe1xuICAgICAgICAgICAgZGF0ZU9iajogZGF0ZSxcbiAgICAgICAgICAgIGNtbyxcbiAgICAgICAgICAgIGN1cnJEYXk6IHRoaXMuaXNDdXJyRGF5KGRheU5iciwgbSwgeSwgdG9kYXkpLFxuICAgICAgICAgICAgZGlzYWJsZWREYXRlOiB0aGlzLnV0aWxTZXJ2aWNlLmlzRGlzYWJsZWREYXRlKGRhdGUsIHRoaXMub3B0cyksXG4gICAgICAgICAgICBtYXJrZWREYXRlOiB0aGlzLnV0aWxTZXJ2aWNlLmlzTWFya2VkRGF0ZShkYXRlLCB0aGlzLm9wdHMpLFxuICAgICAgICAgICAgaGlnaGxpZ2h0OiB0aGlzLnV0aWxTZXJ2aWNlLmlzSGlnaGxpZ2h0ZWREYXRlKGRhdGUsIHRoaXMub3B0cyksXG4gICAgICAgICAgICByb3c6IGkgLSAxLFxuICAgICAgICAgICAgY29sOiBydGwgPyBjb2wtLSA6IGNvbCsrLFxuICAgICAgICAgICAgZGF0ZURhdGE6IHRoaXMub3B0cy5kYXRlRGF0YSAmJiB0aGlzLm9wdHMuZGF0ZURhdGFbYCR7ZGF0ZS5kYXl9LSR7ZGF0ZS5tb250aH0tJHtkYXRlLnllYXJ9YF0gPyB0aGlzLm9wdHMuZGF0ZURhdGFbYCR7ZGF0ZS5kYXl9LSR7ZGF0ZS5tb250aH0tJHtkYXRlLnllYXJ9YF0gOiBudWxsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZGF5TmJyKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBSZXN0IG9mIHRoZSB3ZWVrc1xuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDg7IGorKykge1xuICAgICAgICAgIGlmIChkYXlOYnIgPiBkSW5UaGlzTSkge1xuICAgICAgICAgICAgLy8gTmV4dCBtb250aFxuICAgICAgICAgICAgZGF5TmJyID0gMTtcbiAgICAgICAgICAgIGNtbyA9IE1vbnRoSWQubmV4dDtcbiAgICAgICAgICAgIG1vbnRoID0gbSArIDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB7eWVhcjogY21vID09PSBNb250aElkLm5leHQgJiYgbSA9PT0gMTIgPyB5ICsgMSA6IHksIG1vbnRoOiBjbW8gPT09IE1vbnRoSWQuY3VyciA/IG0gOiBjbW8gPT09IE1vbnRoSWQubmV4dCAmJiBtIDwgMTIgPyBtICsgMSA6IDEsIGRheTogZGF5TmJyfTtcbiAgICAgICAgICB3ZWVrLnB1c2goe1xuICAgICAgICAgICAgZGF0ZU9iajogZGF0ZSxcbiAgICAgICAgICAgIGNtbyxcbiAgICAgICAgICAgIGN1cnJEYXk6IHRoaXMuaXNDdXJyRGF5KGRheU5iciwgbW9udGgsIHksIHRvZGF5KSxcbiAgICAgICAgICAgIGRpc2FibGVkRGF0ZTogdGhpcy51dGlsU2VydmljZS5pc0Rpc2FibGVkRGF0ZShkYXRlLCB0aGlzLm9wdHMpLFxuICAgICAgICAgICAgbWFya2VkRGF0ZTogdGhpcy51dGlsU2VydmljZS5pc01hcmtlZERhdGUoZGF0ZSwgdGhpcy5vcHRzKSxcbiAgICAgICAgICAgIGhpZ2hsaWdodDogdGhpcy51dGlsU2VydmljZS5pc0hpZ2hsaWdodGVkRGF0ZShkYXRlLCB0aGlzLm9wdHMpLFxuICAgICAgICAgICAgcm93OiBpIC0gMSxcbiAgICAgICAgICAgIGNvbDogcnRsID8gY29sLS0gOiBjb2wrKyxcbiAgICAgICAgICAgIGRhdGVEYXRhOiB0aGlzLm9wdHMuZGF0ZURhdGEgJiYgdGhpcy5vcHRzLmRhdGVEYXRhW2Ake2RhdGUuZGF5fS0ke2RhdGUubW9udGh9LSR7ZGF0ZS55ZWFyfWBdID8gdGhpcy5vcHRzLmRhdGVEYXRhW2Ake2RhdGUuZGF5fS0ke2RhdGUubW9udGh9LSR7ZGF0ZS55ZWFyfWBdIDogbnVsbFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGRheU5icisrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB3ZWVrTmJyOiBudW1iZXIgPSBzaG93V2Vla051bWJlcnMgICYmIGZpcnN0RGF5T2ZXZWVrID09PSBNTyA/IHRoaXMudXRpbFNlcnZpY2UuZ2V0V2Vla051bWJlcih3ZWVrWzBdLmRhdGVPYmopIDogMDtcbiAgICAgIHRoaXMuZGF0ZXMucHVzaCh7d2Vlaywgd2Vla05icn0pO1xuICAgIH1cblxuICAgIHRoaXMuc2V0RGF0ZVZpZXdIZWFkZXJCdG5EaXNhYmxlZFN0YXRlKG0sIHkpO1xuXG4gICAgaWYgKG5vdGlmeUNoYW5nZSkge1xuICAgICAgLy8gTm90aWZ5IHBhcmVudFxuICAgICAgdGhpcy5jYWxlbmRhclZpZXdDaGFuZ2VkKHt5ZWFyOiB5LCBtb250aDogbSwgZmlyc3Q6IHtudW1iZXI6IDEsIHdlZWtkYXk6IHRoaXMuZ2V0V2Vla2RheSh7eWVhcjogeSwgbW9udGg6IG0sIGRheTogMX0pfSwgbGFzdDoge251bWJlcjogZEluVGhpc00sIHdlZWtkYXk6IHRoaXMuZ2V0V2Vla2RheSh7eWVhcjogeSwgbW9udGg6IG0sIGRheTogZEluVGhpc019KX19KTtcbiAgICB9XG4gIH1cblxuICBzZXREYXRlVmlld0hlYWRlckJ0bkRpc2FibGVkU3RhdGUobTogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBsZXQgZHBtOiBib29sZWFuID0gZmFsc2U7XG4gICAgbGV0IGRubTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3Qge2Rpc2FibGVIZWFkZXJCdXR0b25zLCBkaXNhYmxlVW50aWwsIGRpc2FibGVTaW5jZSwgZW5hYmxlRGF0ZXMsIG1pblllYXIsIG1heFllYXIsIHJ0bH0gPSB0aGlzLm9wdHM7XG5cbiAgICBpZiAoZGlzYWJsZUhlYWRlckJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGR1RGF0ZTogSU15RGF0ZSA9IHt5ZWFyOiBtID09PSAxID8geSAtIDEgOiB5LCBtb250aDogbSA9PT0gMSA/IDEyIDogbSAtIDEsIGRheTogdGhpcy51dGlsU2VydmljZS5kYXRlc0luTW9udGgobSA9PT0gMSA/IDEyIDogbSAtIDEsIG0gPT09IDEgPyB5IC0gMSA6IHkpfTtcbiAgICAgIGNvbnN0IGRzRGF0ZTogSU15RGF0ZSA9IHt5ZWFyOiBtID09PSAxMiA/IHkgKyAxIDogeSwgbW9udGg6IG0gPT09IDEyID8gMSA6IG0gKyAxLCBkYXk6IDF9O1xuICAgICAgXG4gICAgICBkcG0gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGlzYWJsZWRCeURpc2FibGVVbnRpbChkdURhdGUsIGRpc2FibGVVbnRpbCkgXG4gICAgICAgICYmICF0aGlzLnV0aWxTZXJ2aWNlLmlzUGFzdERhdGVzRW5hYmxlZChkdURhdGUsIGVuYWJsZURhdGVzKTtcbiAgICAgIGRubSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZEJ5RGlzYWJsZVNpbmNlKGRzRGF0ZSwgZGlzYWJsZVNpbmNlKVxuICAgICAgICAmJiAhdGhpcy51dGlsU2VydmljZS5pc0Z1dHVyZURhdGVzRW5hYmxlZChkc0RhdGUsIGVuYWJsZURhdGVzKTtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZWaWV3RGlzYWJsZWQgPSBtID09PSAxICYmIHkgPT09IG1pblllYXIgfHwgZHBtO1xuICAgIHRoaXMubmV4dFZpZXdEaXNhYmxlZCA9IG0gPT09IDEyICYmIHkgPT09IG1heFllYXIgfHwgZG5tO1xuXG4gICAgaWYgKHJ0bCkge1xuICAgICAgdGhpcy5zd2FwSGVhZGVyQnRuRGlzYWJsZWQoKTtcbiAgICB9XG4gIH1cblxuICBzZXRNb250aFZpZXdIZWFkZXJCdG5EaXNhYmxlZFN0YXRlKHk6IG51bWJlcik6IHZvaWQge1xuICAgIGxldCBkcG06IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBsZXQgZG5tOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdCB7ZGlzYWJsZUhlYWRlckJ1dHRvbnMsIGRpc2FibGVVbnRpbCwgZGlzYWJsZVNpbmNlLCBlbmFibGVEYXRlcywgbWluWWVhciwgbWF4WWVhciwgcnRsfSA9IHRoaXMub3B0cztcblxuICAgIGlmIChkaXNhYmxlSGVhZGVyQnV0dG9ucykge1xuICAgICAgY29uc3QgZHVEYXRlOiBJTXlEYXRlID0ge3llYXI6IHkgLSAxLCBtb250aDogMTIsIGRheTogMzF9O1xuICAgICAgY29uc3QgZHNEYXRlOiBJTXlEYXRlID0ge3llYXI6IHkgKyAxLCBtb250aDogMSwgZGF5OiAxfTtcblxuICAgICAgZHBtID0gdGhpcy51dGlsU2VydmljZS5pc0Rpc2FibGVkQnlEaXNhYmxlVW50aWwoZHVEYXRlLCBkaXNhYmxlVW50aWwpXG4gICAgICAgICYmICF0aGlzLnV0aWxTZXJ2aWNlLmlzUGFzdERhdGVzRW5hYmxlZChkdURhdGUsIGVuYWJsZURhdGVzKTtcbiAgICAgIGRubSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZEJ5RGlzYWJsZVNpbmNlKGRzRGF0ZSwgZGlzYWJsZVNpbmNlKVxuICAgICAgICAmJiAhdGhpcy51dGlsU2VydmljZS5pc0Z1dHVyZURhdGVzRW5hYmxlZChkc0RhdGUsIGVuYWJsZURhdGVzKTtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZWaWV3RGlzYWJsZWQgPSB5ID09PSBtaW5ZZWFyIHx8IGRwbTtcbiAgICB0aGlzLm5leHRWaWV3RGlzYWJsZWQgPSB5ID09PSBtYXhZZWFyIHx8IGRubTtcblxuICAgIGlmIChydGwpIHtcbiAgICAgIHRoaXMuc3dhcEhlYWRlckJ0bkRpc2FibGVkKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0WWVhclZpZXdIZWFkZXJCdG5EaXNhYmxlZFN0YXRlKHlwOiBudW1iZXIsIHluOiBudW1iZXIpOiB2b2lkIHtcbiAgICBsZXQgZHB5OiBib29sZWFuID0gZmFsc2U7XG4gICAgbGV0IGRueTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3Qge2Rpc2FibGVIZWFkZXJCdXR0b25zLCBkaXNhYmxlVW50aWwsIGRpc2FibGVTaW5jZSwgZW5hYmxlRGF0ZXMsIG1pblllYXIsIG1heFllYXIsIHJ0bH0gPSB0aGlzLm9wdHM7XG5cbiAgICBpZiAoZGlzYWJsZUhlYWRlckJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGR1RGF0ZTogSU15RGF0ZSA9IHt5ZWFyOiB5cCAtIDEsIG1vbnRoOiAxMiwgZGF5OiAzMX07XG4gICAgICBjb25zdCBkc0RhdGU6IElNeURhdGUgPSB7eWVhcjogeW4gKyAxLCBtb250aDogMSwgZGF5OiAxfTtcblxuICAgICAgZHB5ID0gdGhpcy51dGlsU2VydmljZS5pc0Rpc2FibGVkQnlEaXNhYmxlVW50aWwoZHVEYXRlLCBkaXNhYmxlVW50aWwpXG4gICAgICAgICYmICF0aGlzLnV0aWxTZXJ2aWNlLmlzUGFzdERhdGVzRW5hYmxlZChkdURhdGUsIGVuYWJsZURhdGVzKTtcbiAgICAgIGRueSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZEJ5RGlzYWJsZVNpbmNlKGRzRGF0ZSwgZGlzYWJsZVNpbmNlKVxuICAgICAgICAmJiAhdGhpcy51dGlsU2VydmljZS5pc0Z1dHVyZURhdGVzRW5hYmxlZChkc0RhdGUsIGVuYWJsZURhdGVzKTtcbiAgICB9XG4gICAgdGhpcy5wcmV2Vmlld0Rpc2FibGVkID0geXAgPD0gbWluWWVhciB8fCBkcHk7XG4gICAgdGhpcy5uZXh0Vmlld0Rpc2FibGVkID0geW4gPj0gbWF4WWVhciB8fCBkbnk7XG5cbiAgICBpZiAocnRsKSB7XG4gICAgICB0aGlzLnN3YXBIZWFkZXJCdG5EaXNhYmxlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHN3YXBIZWFkZXJCdG5EaXNhYmxlZCgpOiB2b2lkIHtcbiAgICBbdGhpcy5wcmV2Vmlld0Rpc2FibGVkLCB0aGlzLm5leHRWaWV3RGlzYWJsZWRdID0gW3RoaXMubmV4dFZpZXdEaXNhYmxlZCwgdGhpcy5wcmV2Vmlld0Rpc2FibGVkXTtcbiAgfVxufVxuIl19