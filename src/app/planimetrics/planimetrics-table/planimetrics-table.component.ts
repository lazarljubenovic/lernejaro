import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import {GeometryObject, Point} from '../../planimetryts/geometry-objects/everything'

@Component({
    selector: 'lrn-planimetrics-table',
    templateUrl: './planimetrics-table.component.html',
    styleUrls: ['./planimetrics-table.component.scss']
})
export class PlanimetricsTableComponent implements OnInit {

    private _interactivePoints: Point[]

    @Input() public objects: GeometryObject[]

    @Input()
    public set interactivePoints(value: Point[]) {
        this._interactivePoints = value.map(p => p.clone())
    }

    public get interactivePoints(): Point[] {
        return this._interactivePoints
    }

    @Output() public interactivePointsChange = new EventEmitter<Point[]>()

    public testObj = {x: 10, y: 20, z: 30}

    public onObjectChange(obj, i) {
        this.interactivePointsChange.next(
            [...this.interactivePoints.slice(0, i), obj, ...this.interactivePoints.slice(i + 1)])
    }

    constructor() {
    }

    ngOnInit() {
    }

    public trackBy(index: number, item: any): number {
        return index
    }

}
