import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {GeometryObjectController} from '../geometry-object-controllers/geometry-object-controller';
import {GeometryObject} from '../../../planimetryts/geometry-objects/geometry-object';
import {WrapGeometryObjectIntoController} from '../geometry-object-controllers/wrapper';

@Component({
    selector: 'lrn-planimetrics-control',
    templateUrl: './planimetrics-control.component.html',
    styleUrls: ['./planimetrics-control.component.scss'],
})
export class PlanimetricsControlComponent implements OnInit {

    public controller: GeometryObjectController;

    @Input()
    public set object(object: GeometryObject) {
        this.controller = WrapGeometryObjectIntoController(object);
    }

    @Output() public objectChange = new EventEmitter<GeometryObject>();

    @Input('strategies') public strategyNames: string[];

    public onChange(strategyName: string, object: any): void {
        const newObject = this.controller.reconstruct(strategyName, object);
        this.objectChange.next(newObject);
    }

    constructor() {
    }

    ngOnInit() {
    }

}
