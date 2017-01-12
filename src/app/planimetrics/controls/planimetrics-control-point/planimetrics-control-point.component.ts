import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Point} from '../../../planimetryts/geometry-objects/point';

@Component({
    selector: 'lrn-planimetrics-control-point',
    templateUrl: './planimetrics-control-point.component.html',
    styleUrls: ['../planimetrics-control.component.scss']
})
export class PlanimetricsControlPointComponent implements OnInit {

    @Input() public strategy: 'cartesian' | 'polar' = 'cartesian';

    @Input() public point: Point;
    @Output() public pointChange = new EventEmitter<Point>();

    public onChangeX(newX: string): void {
        const x: number = Number.parseFloat(newX);
        const {y} = this.point.getCartesianCoordinates();
        const newPoint = Point.FromCartesianCoordinates(x, y);
        this.pointChange.emit(newPoint);
    }

    public onChangeY(newY: string): void {
        const y = Number.parseFloat(newY);
        const {x} = this.point.getCartesianCoordinates();
        const newPoint = Point.FromCartesianCoordinates(x, y);
        this.pointChange.emit(newPoint);
    }

    public onChangeR(newR: number): void {
        const {φ} = this.point.getPolarCoordinates();
        const newPoint = Point.FromPolarCoordinates(newR, φ);
        this.pointChange.emit(newPoint);
    }

    public onChangePhi(newPhi: number): void {
        const {r} = this.point.getPolarCoordinates();
        const newPoint = Point.FromPolarCoordinates(r, newPhi);
        this.pointChange.emit(newPoint);
    }

    constructor() {
    }

    ngOnInit() {
    }

}
