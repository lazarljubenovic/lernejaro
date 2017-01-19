import {
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    AfterContentInit,
    ContentChild
} from '@angular/core';
import {UniqueIdService} from '../../../unique-id.service';
import {RadioButtonComponent} from '../../../ui/radio-button/radio-button.component';

@Component({
    selector: 'lrn-choice',
    templateUrl: './choice.component.html',
    styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent implements OnInit {

    @ViewChild('template', {read: TemplateRef})
    public template: TemplateRef<any>;

    public value: string;

    private _correct: boolean = false;

    public setAsCorrect() {
        this._correct = true;
    }

    public isCorrect(): boolean {
        return this._correct;
    }

    constructor(uniqueIdService: UniqueIdService) {
        this.value = uniqueIdService.getUniqueId('lrn-choice-radio-button-');
    }

    ngOnInit() {
    }

}
