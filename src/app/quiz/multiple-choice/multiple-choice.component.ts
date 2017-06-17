// tslint:disable-next-line
import {AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef} from '@angular/core'
import {ChoiceComponent} from './choice/choice.component'
import * as _ from 'lodash'
import {UniqueIdService} from '../../unique-id.service'

@Component({
    selector: 'lrn-multiple-choice',
    templateUrl: './multiple-choice.component.html',
    styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements AfterContentInit, AfterViewInit, OnInit {

    @ContentChildren(ChoiceComponent)
    public choicesQueryList: QueryList<ChoiceComponent>

    @Input() public shuffle: boolean = true
    @Input() public header: string = 'Choose the correct answer'
    @Input() public formId: string

    private answer: string

    public choices: { template: TemplateRef<any>, isCorrect: boolean, value: string }[]

    public correctChoiceValue: string

    public onChoicePick(answer: string): void {
        this.answer = answer
        const correct = this.correctChoiceValue == answer
        this.answerChoose.emit({correct, answer})
    }

    public onSubmit(event: Event): void {
        event.preventDefault()
        const answer = this.answer
        const correct = this.correctChoiceValue == answer
        this.answerSubmit.emit({correct, answer})
    }

    @Output() public answerChoose = new EventEmitter<{ correct: boolean, answer: string }>()
    @Output() public answerSubmit = new EventEmitter<{ correct: boolean, answer: string }>()

    constructor(private _uniqueId: UniqueIdService) {
    }

    ngOnInit() {
        this.formId = this.formId || this._uniqueId.getUniqueId('multiple-choice-')
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
