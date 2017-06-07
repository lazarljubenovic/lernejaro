import {
    Component,
    EventEmitter,
    Output,
    ContentChildren,
    QueryList,
    AfterContentInit,
    AfterViewInit, TemplateRef, Input
} from '@angular/core'
import {ChoiceComponent} from './choice/choice.component'
import * as _ from 'lodash'

@Component({
    selector: 'lrn-multiple-choice',
    templateUrl: './multiple-choice.component.html',
    styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements AfterContentInit, AfterViewInit {

    @ContentChildren(ChoiceComponent)
    public choicesQueryList: QueryList<ChoiceComponent>

    @Input() public shuffle: boolean = true

    public choices: {template: TemplateRef<any>, isCorrect: boolean, value: string}[]

    public correctChoiceValue: string

    public onChoicePick(answerValue: string) {
        const correct = this.correctChoiceValue == answerValue
        this.answerChoose.emit({correct, answer: answerValue})
    }

    @Output() public answerChoose = new EventEmitter<{correct: boolean, answer: string}>()

    constructor() {
    }

    ngAfterContentInit() {
        this.choices = this.choicesQueryList.toArray().map(choiceComponent => {
            return {
                template: choiceComponent.template,
                isCorrect: choiceComponent.isCorrect(),
                value: choiceComponent.value,
            }
        })
        if (this.shuffle) {
            this.choices = _.shuffle(this.choices)
        }
        this.correctChoiceValue = this.choices.find(choice => choice.isCorrect).value
    }

    ngAfterViewInit() {
    }

}
