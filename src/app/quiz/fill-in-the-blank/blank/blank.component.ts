import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core'
import {FillInTheBlankComponent} from '../fill-in-the-blank.component'
import {UniqueIdService} from '../../../unique-id.service'
import {AnswerInfo} from '../answer-info'

@Component({
    selector: 'lrn-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {

    private _isCorrectAnswer: (answer: string) => boolean

    @Input()
    public set correct(newValue: string | string[] | ((answer: string) => boolean) | RegExp) {
        if (Array.isArray(newValue)) {
            this._isCorrectAnswer = (answer: string) => newValue.indexOf(answer) > -1
        } else if (typeof newValue == 'function') {
            this._isCorrectAnswer = newValue
        } else if (typeof newValue == 'object') {
            this._isCorrectAnswer = (answer: string) => !!newValue.exec(answer)
        } else {
            this._isCorrectAnswer = (answer: string) => newValue === answer
        }
        console.log(this._isCorrectAnswer)
    }

    @Input() public hint: string = 'Type your answer'

    @Input() public name: string

    public answer: string

    public answerInfo: AnswerInfo = null

    public onValueChange(answer: string): void {
        this.updateAnswerInfo(answer)
        this._fillInTheBlankComponent.emitChange()
    }

    public updateAnswerInfo(answer: string): void {
        this.answerInfo = {
            answer,
            name: this.name,
            correct: this._isCorrectAnswer(answer),
            hint: this.hint,
        }
    }

    constructor(@Inject(forwardRef(() => FillInTheBlankComponent))
                private _fillInTheBlankComponent: FillInTheBlankComponent,
                private _uniqueId: UniqueIdService) {
    }

    ngOnInit() {
        if (!this.name) {
            this.name = this._uniqueId.getUniqueId('lrn-blank')
        }
        this.updateAnswerInfo('')
    }

}
