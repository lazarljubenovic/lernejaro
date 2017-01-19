import {
    Component,
    EventEmitter,
    Output,
    ContentChildren,
    QueryList,
    AfterContentInit,
    AfterViewInit, TemplateRef
} from '@angular/core';
import {ChoiceComponent} from './choice/choice.component';

@Component({
    selector: 'lrn-multiple-choice',
    templateUrl: './multiple-choice.component.html',
    styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements AfterContentInit, AfterViewInit {

    @ContentChildren(ChoiceComponent)
    public choicesQueryList: QueryList<ChoiceComponent>;

    public choices: {template: TemplateRef<any>, isCorrect: boolean, value: string}[];

    public correctChoiceValue: string;

    public onChoicePick(answerValue: string) {
        console.log('in multiple choice component', answerValue);
        const correct = this.correctChoiceValue == answerValue;
        this.answerChoose.emit({correct, answer: answerValue});
    }

    @Output() public answerChoose = new EventEmitter<{correct: boolean, answer: string}>();

    constructor() {
    }

    ngAfterContentInit() {
        this.choices = this.choicesQueryList.toArray().map(choiceComponent => {
            return {
                template: choiceComponent.template,
                isCorrect: choiceComponent.isCorrect(),
                value: choiceComponent.value,
            };
        });
        this.correctChoiceValue = this.choices.find(choice => choice.isCorrect).value;
    }

    ngAfterViewInit() {
    }

}
