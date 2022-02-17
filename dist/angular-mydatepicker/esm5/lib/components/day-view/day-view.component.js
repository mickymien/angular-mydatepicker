/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import { KeyCode } from "../../enums/key-code.enum";
import { MonthId } from "../../enums/month-id.enum";
import { ActiveView } from "../../enums/active-view.enum";
import { OPTS, DATES, WEEK_DAYS, SELECTED_DATE, SELECTED_DATE_RANGE } from "../../constants/constants";
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
                for (var _c = tslib_1.__values(this.dates), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var w = _d.value;
                    try {
                        for (var _e = tslib_1.__values(w.week), _f = _e.next(); !_f.done; _f = _e.next()) {
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
            for (var _c = tslib_1.__values(this.dates), _d = _c.next(); !_d.done; _d = _c.next()) {
                var w = _d.value;
                try {
                    for (var _e = tslib_1.__values(w.week), _f = _e.next(); !_f.done; _f = _e.next()) {
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
export { DayViewComponent };
if (false) {
    /** @type {?} */
    DayViewComponent.prototype.opts;
    /** @type {?} */
    DayViewComponent.prototype.dates;
    /** @type {?} */
    DayViewComponent.prototype.weekDays;
    /** @type {?} */
    DayViewComponent.prototype.selectedDate;
    /** @type {?} */
    DayViewComponent.prototype.selectedDateRange;
    /** @type {?} */
    DayViewComponent.prototype.viewChanged;
    /** @type {?} */
    DayViewComponent.prototype.dayCellClicked;
    /** @type {?} */
    DayViewComponent.prototype.dayCellKeyDown;
    /** @type {?} */
    DayViewComponent.prototype.viewActivated;
    /** @type {?} */
    DayViewComponent.prototype.prevMonthId;
    /** @type {?} */
    DayViewComponent.prototype.currMonthId;
    /** @type {?} */
    DayViewComponent.prototype.nextMonthId;
    /**
     * @type {?}
     * @private
     */
    DayViewComponent.prototype.utilService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1teWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kYXktdmlldy9kYXktdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQTRCLE1BQU0sRUFBRSxpQkFBaUIsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFNakksT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQzdFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRztJQXNCRSwwQkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFSbEMsbUJBQWMsR0FBaUMsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFDbEYsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1RCxrQkFBYSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRW5GLGdCQUFXLEdBQVcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNuQyxnQkFBVyxHQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDbkMsZ0JBQVcsR0FBVyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBRWEsQ0FBQzs7Ozs7SUFFakQsc0NBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMs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RSxDQUFDOztnQkExR0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4Qiw0Z0ZBQXdDO29CQUN4QyxTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQ3hCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0Qzs7OztnQkFYTyxXQUFXOzs7dUJBYWhCLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLOytCQUNMLEtBQUs7b0NBQ0wsS0FBSzs4QkFDTCxLQUFLO2lDQUVMLE1BQU07aUNBQ04sTUFBTTtnQ0FDTixNQUFNOztJQTJGVCx1QkFBQztDQUFBLEFBM0dELElBMkdDO1NBckdZLGdCQUFnQjs7O0lBQzNCLGdDQUEwQjs7SUFDMUIsaUNBQStCOztJQUMvQixvQ0FBaUM7O0lBQ2pDLHdDQUErQjs7SUFDL0IsNkNBQXlDOztJQUN6Qyx1Q0FBOEI7O0lBRTlCLDBDQUE0Rjs7SUFDNUYsMENBQXNFOztJQUN0RSx5Q0FBbUY7O0lBRW5GLHVDQUFtQzs7SUFDbkMsdUNBQW1DOztJQUNuQyx1Q0FBbUM7Ozs7O0lBRXZCLHVDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIFNpbXBsZUNoYW5nZXN9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0lNeUNhbGVuZGFyRGF5fSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1jYWxlbmRhci1kYXkuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeURhdGV9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LWRhdGUuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeURhdGVSYW5nZX0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktZGF0ZS1yYW5nZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15T3B0aW9uc30gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktb3B0aW9ucy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15V2Vla30gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktd2Vlay5pbnRlcmZhY2VcIjtcbmltcG9ydCB7VXRpbFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hbmd1bGFyLW15ZGF0ZXBpY2tlci51dGlsLnNlcnZpY2VcIjtcbmltcG9ydCB7S2V5Q29kZX0gZnJvbSBcIi4uLy4uL2VudW1zL2tleS1jb2RlLmVudW1cIjtcbmltcG9ydCB7TW9udGhJZH0gZnJvbSBcIi4uLy4uL2VudW1zL21vbnRoLWlkLmVudW1cIjtcbmltcG9ydCB7QWN0aXZlVmlld30gZnJvbSBcIi4uLy4uL2VudW1zL2FjdGl2ZS12aWV3LmVudW1cIjtcbmltcG9ydCB7T1BUUywgREFURVMsIFdFRUtfREFZUywgU0VMRUNURURfREFURSwgU0VMRUNURURfREFURV9SQU5HRX0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9jb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImxpYi1kYXktdmlld1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2RheS12aWV3LmNvbXBvbmVudC5odG1sXCIsXG4gIHByb3ZpZGVyczogW1V0aWxTZXJ2aWNlXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBEYXlWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgb3B0czogSU15T3B0aW9ucztcbiAgQElucHV0KCkgZGF0ZXM6IEFycmF5PElNeVdlZWs+O1xuICBASW5wdXQoKSB3ZWVrRGF5czogQXJyYXk8c3RyaW5nPjtcbiAgQElucHV0KCkgc2VsZWN0ZWREYXRlOiBJTXlEYXRlO1xuICBASW5wdXQoKSBzZWxlY3RlZERhdGVSYW5nZTogSU15RGF0ZVJhbmdlO1xuICBASW5wdXQoKSB2aWV3Q2hhbmdlZDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgZGF5Q2VsbENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxJTXlDYWxlbmRhckRheT4gPSBuZXcgRXZlbnRFbWl0dGVyPElNeUNhbGVuZGFyRGF5PigpO1xuICBAT3V0cHV0KCkgZGF5Q2VsbEtleURvd246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB2aWV3QWN0aXZhdGVkOiBFdmVudEVtaXR0ZXI8QWN0aXZlVmlldz4gPSBuZXcgRXZlbnRFbWl0dGVyPEFjdGl2ZVZpZXc+KCk7XG5cbiAgcHJldk1vbnRoSWQ6IG51bWJlciA9IE1vbnRoSWQucHJldjtcbiAgY3Vyck1vbnRoSWQ6IG51bWJlciA9IE1vbnRoSWQuY3VycjtcbiAgbmV4dE1vbnRoSWQ6IG51bWJlciA9IE1vbnRoSWQubmV4dDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxTZXJ2aWNlOiBVdGlsU2VydmljZSkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KE9QVFMpKSB7XG4gICAgICB0aGlzLm9wdHMgPSBjaGFuZ2VzW09QVFNdLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoREFURVMpKSB7XG4gICAgICB0aGlzLmRhdGVzID0gY2hhbmdlc1tEQVRFU10uY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShXRUVLX0RBWVMpKSB7XG4gICAgICB0aGlzLndlZWtEYXlzID0gY2hhbmdlc1tXRUVLX0RBWVNdLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoU0VMRUNURURfREFURSkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gY2hhbmdlc1tTRUxFQ1RFRF9EQVRFXS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KFNFTEVDVEVEX0RBVEVfUkFOR0UpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlID0gY2hhbmdlc1tTRUxFQ1RFRF9EQVRFX1JBTkdFXS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudmlld0FjdGl2YXRlZC5lbWl0KEFjdGl2ZVZpZXcuRGF0ZSk7XG4gIH1cblxuICBvbkRheUNlbGxDbGlja2VkKGV2ZW50OiBhbnksIGNlbGw6IElNeUNhbGVuZGFyRGF5KTogdm9pZCB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoY2VsbC5kaXNhYmxlZERhdGUuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmRheUNlbGxDbGlja2VkLmVtaXQoY2VsbCk7XG4gIH1cblxuICBvbkRheUNlbGxLZXlEb3duKGV2ZW50OiBhbnksIGNlbGw6IElNeUNhbGVuZGFyRGF5KSB7XG4gICAgY29uc3Qga2V5Q29kZTogbnVtYmVyID0gdGhpcy51dGlsU2VydmljZS5nZXRLZXlDb2RlRnJvbUV2ZW50KGV2ZW50KTtcbiAgICBpZiAoa2V5Q29kZSAhPT0gS2V5Q29kZS50YWIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChrZXlDb2RlID09PSBLZXlDb2RlLmVudGVyIHx8IGtleUNvZGUgPT09IEtleUNvZGUuc3BhY2UpIHtcbiAgICAgICAgdGhpcy5vbkRheUNlbGxDbGlja2VkKGV2ZW50LCBjZWxsKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMub3B0cy5tb3ZlRm9jdXNCeUFycm93S2V5cykge1xuICAgICAgICB0aGlzLmRheUNlbGxLZXlEb3duLmVtaXQoZXZlbnQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25EYXlDZWxsTW91c2VFbnRlcihjZWxsOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLmJlZ2luKSAmJiAhdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLmVuZCkpIHtcbiAgICAgIGZvciAoY29uc3QgdyBvZiB0aGlzLmRhdGVzKSB7XG4gICAgICAgIGZvciAoY29uc3QgZGF5IG9mIHcud2Vlaykge1xuICAgICAgICAgIGRheS5yYW5nZSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEYXRlU2FtZU9yRWFybGllcih0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLmJlZ2luLCBkYXkuZGF0ZU9iaikgJiYgdGhpcy51dGlsU2VydmljZS5pc0RhdGVTYW1lT3JFYXJsaWVyKGRheS5kYXRlT2JqLCBjZWxsLmRhdGVPYmopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25EYXlDZWxsTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHcgb2YgdGhpcy5kYXRlcykge1xuICAgICAgZm9yIChjb25zdCBkYXkgb2Ygdy53ZWVrKSB7XG4gICAgICAgIGRheS5yYW5nZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzRGF0ZUluUmFuZ2UoZGF0ZTogSU15RGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZUluUmFuZ2UoZGF0ZSwgdGhpcy5zZWxlY3RlZERhdGVSYW5nZSk7XG4gIH1cblxuICBpc0RhdGVTYW1lKGRhdGU6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51dGlsU2VydmljZS5pc0RhdGVTYW1lKHRoaXMuc2VsZWN0ZWREYXRlLCBkYXRlKTtcbiAgfVxuXG4gIGlzRGF0ZVJhbmdlQmVnaW5PckVuZFNhbWUoZGF0ZTogSU15RGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVJhbmdlQmVnaW5PckVuZFNhbWUodGhpcy5zZWxlY3RlZERhdGVSYW5nZSwgZGF0ZSk7XG4gIH1cblxuICBpc0RhdGVSYW5nZUJlZ2luKGRhdGU6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51dGlsU2VydmljZS5pc0RhdGVSYW5nZUJlZ2luKHRoaXMuc2VsZWN0ZWREYXRlUmFuZ2UsIGRhdGUpO1xuICB9XG5cbiAgaXNEYXRlUmFuZ2VFbmQoZGF0ZTogSU15RGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVJhbmdlRW5kKHRoaXMuc2VsZWN0ZWREYXRlUmFuZ2UsIGRhdGUpO1xuICB9XG59XG4iXX0=