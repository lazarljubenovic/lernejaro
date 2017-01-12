import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Line} from '../../../planimetryts/geometry-objects/line';

@Component({
    selector: 'lrn-planimetrics-control-line',
    templateUrl: './planimetrics-control-line.component.html',
    styleUrls: ['../planimetrics-control.component.scss'],
})
export class PlanimetricsControlLineComponent implements OnInit {

    @Input() public strategy: 'general' | 'explicit' | 'segment' = 'general';

    @Input() public line: Line;
    @Output() public lineChange = new EventEmitter<Line>();

    public onChangeA(newA: string): void {
        const A: number = Number.parseFloat(newA);
        const {B, C} = this.line.getGeneralForm();
        const newLine = Line.FromGeneralForm(A, B, C);
        this.lineChange.emit(newLine);
    }

    public onChangeB(newB: string): void {
        const B: number = Number.parseFloat(newB);
        const {A, C} = this.line.getGeneralForm();
        const newLine = Line.FromGeneralForm(A, B, C);
        this.lineChange.emit(newLine);
    }

    public onChangeC(newC: string): void {
        const C: number = Number.parseFloat(newC);
        const {A, B} = this.line.getGeneralForm();
        const newLine = Line.FromGeneralForm(A, B, C);
        this.lineChange.emit(newLine);
    }

    public onChangeK(newK: string): void {
        const k: number = Number.parseFloat(newK);
        const {n} = this.line.getExplicitForm();
        const newLine = Line.FromExplicitForm(k, n);
        this.lineChange.emit(newLine);
    }

    public onChangeN(newN: string): void {
        const n: number = Number.parseFloat(newN);
        const {k} = this.line.getExplicitForm();
        const newLine = Line.FromExplicitForm(k, n);
        this.lineChange.emit(newLine);
    }

    public onChangeSegmentN(newN: string): void {
        const n: number = Number.parseFloat(newN);
        const {m} = this.line.getSegmentForm();
        const newLine = Line.FromSegmentForm(m, n);
        this.lineChange.emit(newLine);
    }

    public onChangeSegmentM(newM: string): void {
        const m: number = Number.parseFloat(newM);
        const {n} = this.line.getSegmentForm();
        const newLine = Line.FromSegmentForm(m, n);
        this.lineChange.emit(newLine);
    }

    constructor() {
    }

    ngOnInit() {
    }

}
