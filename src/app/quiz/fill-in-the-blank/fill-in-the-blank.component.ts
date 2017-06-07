// tslint:disable-next-line
import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewEncapsulation} from '@angular/core'
import {UniqueIdService} from '../../unique-id.service'
import {BlankComponent} from './blank/blank.component'
import {AnswerInfo} from './answer-info'

@Component({
    selector: 'lrn-fill-in-the-blank',
    templateUrl: './fill-in-the-blank.component.html',
    styleUrls: ['./fill-in-the-blank.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FillInTheBlankComponent implements OnInit, AfterContentInit {

    @Input() public header: string = 'Fill in the blank'

    public isCorrectAnswer: (answer: string) => boolean
    public formId: string

    @Output() public answerChange = new EventEmitter<AnswerInfo[]>()
    @Output() public answerSubmit = new EventEmitter<AnswerInfo[]>()

    @Output() public correctSubmit = new EventEmitter<AnswerInfo[]>()
    @Output() public wrongSubmit = new EventEmitter<AnswerInfo[]>()

    @ContentChildren(BlankComponent) public blanks: QueryList<BlankComponent>

    public emitChange(): void {
        const answerInfos: AnswerInfo[] = this.blanks.map(cmp => cmp.answerInfo)
        this.answerChange.emit(answerInfos)
    }

    public emitSubmit(event: Event): void {
        event.preventDefault()
        const answerInfos: AnswerInfo[] = this.blanks.map(cmp => cmp.answerInfo)
        const allCorrect = answerInfos.every(info => info.correct)
        if (allCorrect) {
            this.submitCorrect(answerInfos)
        }
        this.answerSubmit.emit(answerInfos)
    }

    public submitCorrect(answerInfos: AnswerInfo[]): void {
        this.correctSubmit.emit(answerInfos)
    }

    public submitWrong(answerInfos: AnswerInfo[]): void {
        this.wrongSubmit.emit(answerInfos)
    }

    constructor(uniqueId: UniqueIdService) {
        this.formId = uniqueId.getUniqueId('fill-in-the-blank')
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
    }

}
