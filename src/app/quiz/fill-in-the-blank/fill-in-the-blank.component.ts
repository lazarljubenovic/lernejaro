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

    public correctAnswers: string[];

    @Output() public answerChange = new EventEmitter<{correct: boolean, answer: string}>();

    public onAnswerChange(answer: string): void {
        const correct = this.correctAnswers.indexOf(answer) > -1;
        this.answerChange.emit({answer, correct});
    }

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
    }

}
