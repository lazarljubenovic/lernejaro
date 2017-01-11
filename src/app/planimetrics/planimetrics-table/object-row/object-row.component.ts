import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {GeometryObject} from '../../../planimetryts/geometry-objects/geometry-object';

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
    defaultValue: string;
}

@Component({
    selector: '[lrnObjectRow]',
    templateUrl: './object-row.component.html',
    styleUrls: ['./object-row.component.scss'],
})
export class ObjectRowComponent implements OnInit {

    private _object: GeometryObject;

    public strategy = ''; // TODO allow user to change strategy to displaying

    @Input()
    public set object(object: GeometryObject) {
        if (this._object == object) {
            return;
        }
        this._object = object;
        // TODO: polygons break
        if (object.kind != 'polygon') {
            this.jsonObject = object.writeJson();
        }
    }

    public get object(): GeometryObject {
        return this._object;
    }

    @Output() objectChange = new EventEmitter<GeometryObject>();

    private _jsonObject: GeometryJsonObject<any>;

    public set jsonObject (value: GeometryJsonObject<any>) {
        if (value == null) {
            this._jsonObject = null;
            this.partialJsonObject = null;
        }
        this._jsonObject = value;
        this.partialJsonObject = value.value[value.defaultValue];
    }

    public get jsonObject(): GeometryJsonObject<any> {
        return this._jsonObject;
    }

    public partialJsonObject;

    public onObjectUpdate(obj) {
        let newJson = this._object.writeJson();
        newJson.value[newJson.defaultValue] = obj;
        this._object = this._object.readJson(newJson).clone();
        this.objectChange.next(this._object);
    }

    @Input() editable: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
