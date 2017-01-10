import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {GeometryObject} from '../../planimetryts/geometry-objects/geometry-object';
import {Point} from '../../planimetryts/geometry-objects/point';

@Component({
    selector: 'lrn-planimetrics-table',
    templateUrl: './planimetrics-table.component.html',
    styleUrls: ['./planimetrics-table.component.scss']
})
export class PlanimetricsTableComponent implements OnInit {

    @Input() public objects: GeometryObject[];
    @Input() public interactivePoints: Point[];

    @Output() public interactivePointsChange = new EventEmitter<Point[]>();

    public testObj = {x: 10, y: 20, z: 30};

    public onObjectChange(obj) {

    }

    constructor() {
    }

    ngOnInit() {
    }

}
