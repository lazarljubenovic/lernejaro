import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'lrn-object-editor',
    templateUrl: './object-editor.component.html',
    styleUrls: ['./object-editor.component.scss']
})
export class ObjectEditorComponent implements OnInit, OnChanges {

    @Input() public inline: boolean = true; // TODO

    @Input() public excludeKeys: string[] = [];

    private _object: {[key: string]: any};

    @Input()
    public set object(object: {[key: string]: any}) {
        if (object == null) {
            return;
        }
        this._object = object;
        this.keyValuePairs = this.getKeyValuePairs(object);
    }

    public get object(): {[key: string]: any} {
        return this._object;
    }

    @Output() public objectChange = new EventEmitter<{[key: string]: any}>();

    public keyValuePairs: {key: string, value: any}[];

    private getKeyValuePairs(object = this.object): {key: string, value: any}[] {
        if (object == null) {
            return [];
        }
        return Object.keys(object).map(key => {

            return {
                key,
                value: object[key],
            }
        });
    }

    private getObject(keyValuePairs = this.keyValuePairs): {[key: string]: any} {
        if (keyValuePairs == null) {
            return {};
        }
        let object = {};
        keyValuePairs.forEach(keyValuePair => {
            object[keyValuePair.key] = keyValuePair.value;
        });
        return object;
    }

    private onObjectChange(): void {
        console.log('object change');
        this.objectChange.emit(this.getObject());
    }

    constructor() {
    }

    public trackBy(index: number, item: any): number {
        return index;
    }

    public isNumber(x: any): boolean {
        return typeof x == 'number';
    }

    ngOnInit() {
    }

    ngOnChanges() {

    }

}
