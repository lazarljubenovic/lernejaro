import {
    Component,
    OnInit,
    ViewEncapsulation,
    Output,
    EventEmitter,
    AfterContentInit
} from '@angular/core';

@Component({
    selector: 'lrn-fill-in-the-blank',
    templateUrl: './fill-in-the-blank.component.html',
    styleUrls: ['./fill-in-the-blank.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FillInTheBlankComponent implements OnInit, AfterContentInit {

    public correctAnswer: string;

    @Output() public answerChange = new EventEmitter<{correct: boolean, answer: string}>();

    public onAnswerChange(answer: string): void {
        const correct = answer == this.correctAnswer;
        this.answerChange.emit({answer, correct});
    }

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
    }

}
