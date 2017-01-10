import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {GeometryObject} from '../../../planimetryts/geometry-objects/geometry-object';
import {Point} from '../../../planimetryts/geometry-objects/point';

export interface PointCartesian {
    x: number;
    y: number;
}

export interface PointPolar {
    r: number;
    φ: number;
}

export interface GeometryJsonObject<Value> {
    kind: string;
    label: string;
    value: Value;
}

@Component({
    selector: '[lrnObjectRow]',
    templateUrl: './object-row.component.html',
    styleUrls: ['./object-row.component.scss'],
})
export class ObjectRowComponent implements OnInit {

    private _object: GeometryObject;

    public strategy = '';

    @Input()
    public set object(object: GeometryObject) {
        if (this._object == object) {
            return;
        }
        console.log('setting ', object);
        this._object = object;
        switch (object.kind) {
            case 'point':
                this.jsonObject = object.writeJson();
                break;
        }
    }

    public get object(): GeometryObject {
        return this._object;
    }

    @Output() objectChange = new EventEmitter<GeometryObject>();

    public jsonObject: GeometryJsonObject<any>;

    public onObjectUpdate(obj) {
        let newJson = this._object.writeJson();
        newJson.value[newJson.defaultValue] = obj;
        this._object = this._object.readJson(newJson).clone();
    }

    @Input() editable: boolean = false;

    // public getStrategy: (obj: GeometryObject) => {[name: string]: number};
    // public setStrategy: (data: {[name: string]: number}) => GeometryObject;

    public getStrategy: Function = x => x;
    public setStrategy: Function = x => x;

    constructor() {
    }

    ngOnInit() {
    }

}
