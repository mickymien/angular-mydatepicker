/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import { KeyCode } from "../../enums/key-code.enum";
import { MonthId } from "../../enums/month-id.enum";
import { ActiveView } from "../../enums/active-view.enum";
import { OPTS, DATES, WEEK_DAYS, SELECTED_DATE, SELECTED_DATE_RANGE } from "../../constants/constants";
export class DayViewComponent {
    /**
     * @param {?} utilService
     */
    constructor(utilService) {
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
    ngOnChanges(changes) {
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
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.viewActivated.emit(ActiveView.Date);
    }
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    onDayCellClicked(event, cell) {
        event.stopPropagation();
        if (cell.disabledDate.disabled) {
            return;
        }
        this.dayCellClicked.emit(cell);
    }
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    onDayCellKeyDown(event, cell) {
        /** @type {?} */
        const keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (keyCode !== KeyCode.tab) {
            event.preventDefault();
            if (keyCode === KeyCode.enter || keyCode === KeyCode.space) {
                this.onDayCellClicked(event, cell);
            }
            else if (this.opts.moveFocusByArrowKeys) {
                this.dayCellKeyDown.emit(event);
            }
        }
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    onDayCellMouseEnter(cell) {
        if (this.utilService.isInitializedDate(this.selectedDateRange.begin) && !this.utilService.isInitializedDate(this.selectedDateRange.end)) {
            for (const w of this.dates) {
                for (const day of w.week) {
                    day.range = this.utilService.isDateSameOrEarlier(this.selectedDateRange.begin, day.dateObj) && this.utilService.isDateSameOrEarlier(day.dateObj, cell.dateObj);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    onDayCellMouseLeave() {
        for (const w of this.dates) {
            for (const day of w.week) {
                day.range = false;
            }
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDateInRange(date) {
        return this.utilService.isDateInRange(date, this.selectedDateRange);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDateSame(date) {
        return this.utilService.isDateSame(this.selectedDate, date);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDateRangeBeginOrEndSame(date) {
        return this.utilService.isDateRangeBeginOrEndSame(this.selectedDateRange, date);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDateRangeBegin(date) {
        return this.utilService.isDateRangeBegin(this.selectedDateRange, date);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDateRangeEnd(date) {
        return this.utilService.isDateRangeEnd(this.selectedDateRange, date);
    }
}
DayViewComponent.decorators = [
    { type: Component, args: [{
                selector: "lib-day-view",
                template: "<table class=\"myDpCalTable\" [ngClass]=\"{'ng-myrtl': opts.rtl, 'myDpFooter': opts.showFooterToday, 'myDpNoFooter': !opts.showFooterToday, 'myDpViewChangeAnimation': opts.viewChangeAnimation && viewChanged}\">\n  <thead>\n    <tr>\n      <th class=\"myDpWeekDayTitle myDpWeekDayTitleWeekNbr\" *ngIf=\"opts.showWeekNumbers && opts.firstDayOfWeek==='mo'\">#</th>\n      <th class=\"myDpWeekDayTitle\" scope=\"col\" *ngFor=\"let d of weekDays\">{{d}}</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let w of dates\">\n      <td class=\"myDpDaycellWeekNbr\" *ngIf=\"opts.showWeekNumbers && opts.firstDayOfWeek==='mo'\">{{w.weekNbr}}</td>\n      <td id=\"d_{{d.row}}_{{d.col}}\" class=\"d_{{d.row}}_{{d.col}} myDpDaycell {{d.markedDate.styleClass}} {{d.disabledDate.styleClass}}\" *ngFor=\"let d of w.week\"\n          [ngClass]=\"{'myDpRangeColor': isDateInRange(d.dateObj) || d.range,\n                'myDpPrevMonth': d.cmo === prevMonthId,\n                'myDpCurrMonth':d.cmo === currMonthId && !d.disabledDate.disabled,\n                'myDpNextMonth': d.cmo === nextMonthId,\n                'myDpSelectedDay':!this.opts.dateRange && isDateSame(d.dateObj) || this.opts.dateRange && isDateRangeBeginOrEndSame(d.dateObj),\n                'myDpRangeBegin':this.opts.dateRange && isDateRangeBegin(d.dateObj),\n                'myDpRangeEnd':this.opts.dateRange && isDateRangeEnd(d.dateObj),\n                'myDpDisabled': d.disabledDate.disabled && !d.disabledDate.styleClass.length,\n                'myDpTableSingleDay': !d.disabledDate.disabled}\"\n          (click)=\"onDayCellClicked($event, d)\" (keydown)=\"onDayCellKeyDown($event, d)\"\n          (mouseenter)=\"onDayCellMouseEnter(d)\" (mouseleave)=\"onDayCellMouseLeave()\" [attr.tabindex]=\"!d.disabledDate.disabled ? 0 : -1\">\n        <div class=\"myDpContainer\">\n          <span *ngIf=\"d.markedDate.marked && d.markedDate.color.length\" class=\"myDpMarkDate\" [ngStyle]=\"{'border-top': '8px solid ' + d.markedDate.color}\"></span>\n          <span  class=\"myDpDayValue\" \n          [attr.aria-label]=\"[(d.dateObj.month + '/' + d.dateObj.day + '/' + d.dateObj.year | date:'fullDate')]\" \n          [ngClass]=\"{'myDpMarkCurrDay': d.currDay && opts.markCurrentDay, 'myDpDimDay': d.highlight && (d.cmo===prevMonthId || d.cmo===nextMonthId || d.disabledDate.disabled), 'myDpHighlight': d.highlight}\">{{d.dateObj.day}}</span>\n          <span *ngIf=\"d.dateData\" class=\"myDpDataValue\">{{d.dateData.text}}</span>\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n",
                providers: [UtilService],
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
DayViewComponent.ctorParameters = () => [
    { type: UtilService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1teWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kYXktdmlldy9kYXktdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBNEIsTUFBTSxFQUFFLGlCQUFpQixFQUFnQixNQUFNLGVBQWUsQ0FBQztBQU1qSSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDN0UsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBUXJHLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFnQjNCLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBUmxDLG1CQUFjLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBQ2xGLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDNUQsa0JBQWEsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUVuRixnQkFBVyxHQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDbkMsZ0JBQVcsR0FBVyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ25DLGdCQUFXLEdBQVcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUVhLENBQUM7Ozs7O0lBRWpELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMs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QzFCLGlDQUErQjs7SUFDL0Isb0NBQWlDOztJQUNqQyx3Q0FBK0I7O0lBQy9CLDZDQUF5Qzs7SUFDekMsdUNBQThCOztJQUU5QiwwQ0FBNEY7O0lBQzVGLDBDQUFzRTs7SUFDdEUseUNBQW1GOztJQUVuRix1Q0FBbUM7O0lBQ25DLHVDQUFtQzs7SUFDbkMsdUNBQW1DOzs7OztJQUV2Qix1Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBTaW1wbGVDaGFuZ2VzfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJTXlDYWxlbmRhckRheX0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktY2FsZW5kYXItZGF5LmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlEYXRlfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1kYXRlLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlEYXRlUmFuZ2V9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LWRhdGUtcmFuZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeU9wdGlvbnN9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LW9wdGlvbnMuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeVdlZWt9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LXdlZWsuaW50ZXJmYWNlXCI7XG5pbXBvcnQge1V0aWxTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYW5ndWxhci1teWRhdGVwaWNrZXIudXRpbC5zZXJ2aWNlXCI7XG5pbXBvcnQge0tleUNvZGV9IGZyb20gXCIuLi8uLi9lbnVtcy9rZXktY29kZS5lbnVtXCI7XG5pbXBvcnQge01vbnRoSWR9IGZyb20gXCIuLi8uLi9lbnVtcy9tb250aC1pZC5lbnVtXCI7XG5pbXBvcnQge0FjdGl2ZVZpZXd9IGZyb20gXCIuLi8uLi9lbnVtcy9hY3RpdmUtdmlldy5lbnVtXCI7XG5pbXBvcnQge09QVFMsIERBVEVTLCBXRUVLX0RBWVMsIFNFTEVDVEVEX0RBVEUsIFNFTEVDVEVEX0RBVEVfUkFOR0V9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvY29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJsaWItZGF5LXZpZXdcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9kYXktdmlldy5jb21wb25lbnQuaHRtbFwiLFxuICBwcm92aWRlcnM6IFtVdGlsU2VydmljZV0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRGF5Vmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIG9wdHM6IElNeU9wdGlvbnM7XG4gIEBJbnB1dCgpIGRhdGVzOiBBcnJheTxJTXlXZWVrPjtcbiAgQElucHV0KCkgd2Vla0RheXM6IEFycmF5PHN0cmluZz47XG4gIEBJbnB1dCgpIHNlbGVjdGVkRGF0ZTogSU15RGF0ZTtcbiAgQElucHV0KCkgc2VsZWN0ZWREYXRlUmFuZ2U6IElNeURhdGVSYW5nZTtcbiAgQElucHV0KCkgdmlld0NoYW5nZWQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGRheUNlbGxDbGlja2VkOiBFdmVudEVtaXR0ZXI8SU15Q2FsZW5kYXJEYXk+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTXlDYWxlbmRhckRheT4oKTtcbiAgQE91dHB1dCgpIGRheUNlbGxLZXlEb3duOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgdmlld0FjdGl2YXRlZDogRXZlbnRFbWl0dGVyPEFjdGl2ZVZpZXc+ID0gbmV3IEV2ZW50RW1pdHRlcjxBY3RpdmVWaWV3PigpO1xuXG4gIHByZXZNb250aElkOiBudW1iZXIgPSBNb250aElkLnByZXY7XG4gIGN1cnJNb250aElkOiBudW1iZXIgPSBNb250aElkLmN1cnI7XG4gIG5leHRNb250aElkOiBudW1iZXIgPSBNb250aElkLm5leHQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsU2VydmljZTogVXRpbFNlcnZpY2UpIHsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShPUFRTKSkge1xuICAgICAgdGhpcy5vcHRzID0gY2hhbmdlc1tPUFRTXS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KERBVEVTKSkge1xuICAgICAgdGhpcy5kYXRlcyA9IGNoYW5nZXNbREFURVNdLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoV0VFS19EQVlTKSkge1xuICAgICAgdGhpcy53ZWVrRGF5cyA9IGNoYW5nZXNbV0VFS19EQVlTXS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KFNFTEVDVEVEX0RBVEUpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGNoYW5nZXNbU0VMRUNURURfREFURV0uY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShTRUxFQ1RFRF9EQVRFX1JBTkdFKSkge1xuICAgICAgdGhpcy5zZWxlY3RlZERhdGVSYW5nZSA9IGNoYW5nZXNbU0VMRUNURURfREFURV9SQU5HRV0uY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdBY3RpdmF0ZWQuZW1pdChBY3RpdmVWaWV3LkRhdGUpO1xuICB9XG5cbiAgb25EYXlDZWxsQ2xpY2tlZChldmVudDogYW55LCBjZWxsOiBJTXlDYWxlbmRhckRheSk6IHZvaWQge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKGNlbGwuZGlzYWJsZWREYXRlLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5kYXlDZWxsQ2xpY2tlZC5lbWl0KGNlbGwpO1xuICB9XG5cbiAgb25EYXlDZWxsS2V5RG93bihldmVudDogYW55LCBjZWxsOiBJTXlDYWxlbmRhckRheSkge1xuICAgIGNvbnN0IGtleUNvZGU6IG51bWJlciA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0S2V5Q29kZUZyb21FdmVudChldmVudCk7XG4gICAgaWYgKGtleUNvZGUgIT09IEtleUNvZGUudGFiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoa2V5Q29kZSA9PT0gS2V5Q29kZS5lbnRlciB8fCBrZXlDb2RlID09PSBLZXlDb2RlLnNwYWNlKSB7XG4gICAgICAgIHRoaXMub25EYXlDZWxsQ2xpY2tlZChldmVudCwgY2VsbCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLm9wdHMubW92ZUZvY3VzQnlBcnJvd0tleXMpIHtcbiAgICAgICAgdGhpcy5kYXlDZWxsS2V5RG93bi5lbWl0KGV2ZW50KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uRGF5Q2VsbE1vdXNlRW50ZXIoY2VsbDogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUodGhpcy5zZWxlY3RlZERhdGVSYW5nZS5iZWdpbikgJiYgIXRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUodGhpcy5zZWxlY3RlZERhdGVSYW5nZS5lbmQpKSB7XG4gICAgICBmb3IgKGNvbnN0IHcgb2YgdGhpcy5kYXRlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGRheSBvZiB3LndlZWspIHtcbiAgICAgICAgICBkYXkucmFuZ2UgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVNhbWVPckVhcmxpZXIodGhpcy5zZWxlY3RlZERhdGVSYW5nZS5iZWdpbiwgZGF5LmRhdGVPYmopICYmIHRoaXMudXRpbFNlcnZpY2UuaXNEYXRlU2FtZU9yRWFybGllcihkYXkuZGF0ZU9iaiwgY2VsbC5kYXRlT2JqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uRGF5Q2VsbE1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCB3IG9mIHRoaXMuZGF0ZXMpIHtcbiAgICAgIGZvciAoY29uc3QgZGF5IG9mIHcud2Vlaykge1xuICAgICAgICBkYXkucmFuZ2UgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc0RhdGVJblJhbmdlKGRhdGU6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51dGlsU2VydmljZS5pc0RhdGVJblJhbmdlKGRhdGUsIHRoaXMuc2VsZWN0ZWREYXRlUmFuZ2UpO1xuICB9XG5cbiAgaXNEYXRlU2FtZShkYXRlOiBJTXlEYXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXRpbFNlcnZpY2UuaXNEYXRlU2FtZSh0aGlzLnNlbGVjdGVkRGF0ZSwgZGF0ZSk7XG4gIH1cblxuICBpc0RhdGVSYW5nZUJlZ2luT3JFbmRTYW1lKGRhdGU6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51dGlsU2VydmljZS5pc0RhdGVSYW5nZUJlZ2luT3JFbmRTYW1lKHRoaXMuc2VsZWN0ZWREYXRlUmFuZ2UsIGRhdGUpO1xuICB9XG5cbiAgaXNEYXRlUmFuZ2VCZWdpbihkYXRlOiBJTXlEYXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXRpbFNlcnZpY2UuaXNEYXRlUmFuZ2VCZWdpbih0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLCBkYXRlKTtcbiAgfVxuXG4gIGlzRGF0ZVJhbmdlRW5kKGRhdGU6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51dGlsU2VydmljZS5pc0RhdGVSYW5nZUVuZCh0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLCBkYXRlKTtcbiAgfVxufVxuIl19