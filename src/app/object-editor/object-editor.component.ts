import {
    Component, OnInit, Input, OnChanges, Output, EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core'

@Component({
    selector: 'lrn-object-editor',
    templateUrl: './object-editor.component.html',
    styleUrls: ['./object-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectEditorComponent implements OnInit, OnChanges {

    @Input() public editable: boolean = true

    @Input() public inline: boolean = true // TODO

    @Input() public excludeKeys: string[] = [] // TODO

    private _object: {[key: string]: any}

    @Input()
    public set object(object: {[key: string]: any}) {
        if (object == null) {
            return
        }
        this._object = Object.assign({}, object)
    }

    public get object(): {[key: string]: any} {
        return this._object
    }

    @Output() public objectChange = new EventEmitter<{[key: string]: any}>()

    public onChange(key: string, value: any): void {
        let change = {}
        change[key] = value
        const object = Object.assign({}, this._object, change)
        this.objectChange.emit(object)
    }

    constructor() {
    }

    public trackBy(index: number, item: any): number {
        return index
    }

    public isNumber(x: any): boolean {
        return typeof x == 'number'
    }

    ngOnInit() {
    }

    ngOnChanges() {

    }

}
