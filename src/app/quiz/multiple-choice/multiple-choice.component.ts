// tslint:disable-next-line
import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    TemplateRef,
} from '@angular/core'
import {ChoiceComponent} from './choice/choice.component'
import * as _ from 'lodash'
import {UniqueIdService} from '../../unique-id.service'
import {LoggerService} from '../../logger.service'
import {QuestionComponent} from '../question/question.component'

export interface MultipleChoiceInfo {
    answers?: string[]
    answer?: string
    correct: boolean
    additional?: string[]
    missing?: string[]
}

@Component({
    selector: 'lrn-multiple-choice',
    templateUrl: './multiple-choice.component.html',
    styleUrls: ['./multiple-choice.component.scss'],
})
export class MultipleChoiceComponent implements AfterContentInit, AfterViewInit {

    @ContentChildren(ChoiceComponent) public choicesQueryList: QueryList<ChoiceComponent>
    @ContentChild(QuestionComponent) public questionComponent: QuestionComponent

    @Input() public shuffle: boolean = true
    @Input() public header: string = 'Choose the correct answer'
    @Input() public formId: string = this._uniqueId.getUniqueId('multiple-choice-')

    public hasSingleCorrectAnswer: boolean

    private chosenValue: string
    private chosenValues = new Set<string>()

    public correctChoiceValue: string
    public correctChoiceValues = new Set<string>()

    public choices: { template: TemplateRef<any>, isCorrect: boolean, value: string }[]

    public emit(emitter: EventEmitter<MultipleChoiceInfo>) {
        if (this.hasSingleCorrectAnswer) {
            const answer = this.chosenValue
            const correct = this.correctChoiceValue == answer
            emitter.emit({answer, correct})
        } else {
            const answers = Array.from(this.chosenValues)
            const additional: string[] = answers
                .filter(value => !this.correctChoiceValues.has(value))
            const missing: string[] = Array.from(this.correctChoiceValues)
                .filter(value => answers.indexOf(value) == -1)
            const correct = additional.length == 0 && missing.length == 0
            emitter.emit({
                answers,
                correct,
                additional,
                missing,
            })
        }
    }

    public onChoicePick(answer: string | string[]): void {
        if (typeof answer == 'string') {
            this.chosenValue = <string>answer
        } else {
            this.chosenValues = new Set(answer)
        }
        this.emit(this.answerChange)
    }

    public onSubmit(event: Event): void {
        event.preventDefault()
        this.emit(this.answerSubmit)
    }

    @Output() public answerChange = new EventEmitter<MultipleChoiceInfo>()
    @Output() public answerSubmit = new EventEmitter<MultipleChoiceInfo>()

    constructor(private _uniqueId: UniqueIdService,
                private logger: LoggerService,
                private elementRef: ElementRef) {
    }

    ngAfterContentInit() {
        this.assert()

        this.choices = this.choicesQueryList.map(choiceComponent => {
            return {
                template: choiceComponent.template,
                isCorrect: choiceComponent.isCorrect(),
                value: choiceComponent.value,
            }
        })
        if (this.shuffle) {
            this.choices = _.shuffle(this.choices)
        }

        const correct = this.choices.filter(choice => choice.isCorrect).map(({value}) => value)
        this.hasSingleCorrectAnswer = correct.length == 1

        if (this.hasSingleCorrectAnswer) {
            this.correctChoiceValue = correct[0]
        } else {
            this.correctChoiceValues = new Set(correct)
        }
    }

    ngAfterViewInit() {
    }

    private assert() {
        if (this.questionComponent == null) {
            this.logger.error(`Multiple choice must have a question (lrn-question).`,
                this.elementRef.nativeElement)
        }

        if (this.choicesQueryList.length == 0) {
            this.logger.error(`Multiple choice must have at least one lrn-choice inside.`,
                this.elementRef.nativeElement)
        }

        if (!this.choicesQueryList.some(choice => choice.isCorrect())) {
            this.logger.error(`At least one choice must be marked as correct.`,
                this.elementRef.nativeElement)
        }
    }

}
