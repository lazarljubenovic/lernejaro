import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnInit,
    Output,
    QueryList
} from '@angular/core'
import {ViewInputComponent} from '../view-input/view-input.component'
import {MultipleViewsComponent} from '../multiple-views/multiple-views.component'

@Component({
    selector: 'lrn-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, AfterContentInit {

    @Input()
    public title: string

    @Output()
    public modelChange = new EventEmitter<any>()

    private _model

    public get model() {
        return this._model
    }

    @Input()
    public set model(newModel) {
        this._model = newModel
        this.updateInputValues()
    };

    @ContentChildren(ViewInputComponent)
    public viewInputs: QueryList<ViewInputComponent>

    public updateInputValues() {
        if (this.viewInputs == null) {
            return
        }
        this.viewInputs.forEach(viewInput => {
            viewInput.value = this.model[viewInput.name]
        })
    }

    constructor(@Inject(forwardRef(() => MultipleViewsComponent))
                private _foo: MultipleViewsComponent) {
        console.log('foo', this._foo)
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.viewInputs.forEach(viewInput => {
            if (!(viewInput.name in this.model)) {
                console.warn(`view with model ${this.model} contains an input ` +
                    `with an unknown name ${viewInput.name}`)
            }
            viewInput.valueChange.subscribe(newValue => {
                const newModel = {...this.model, [viewInput.name]: newValue}
                this.modelChange.emit(newModel)
            })
        })
        this.updateInputValues()
    }

}
