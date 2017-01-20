import {Component, OnInit, Input, Output} from '@angular/core';
import {FillInTheBlankComponent} from '../fill-in-the-blank.component';

@Component({
    selector: 'lrn-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {

    @Input() public answer: string;

    @Input() public hint: string = 'Type your answer';

    public onValueChange(newValue: string) {
        this._fillInTheBlankComponent.onAnswerChange(newValue);
    }

    constructor(private _fillInTheBlankComponent: FillInTheBlankComponent) {
    }

    ngOnInit() {
        this._fillInTheBlankComponent.correctAnswer = this.answer;
    }

}
