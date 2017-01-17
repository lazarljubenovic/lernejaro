import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'lrn-multiple-choice',
    templateUrl: './multiple-choice.component.html',
    styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {

    public options: {value: string, label: string}[];

    @Input()
    public set choices(value: string[]) {
        this.correctAnswer = value[0];
        this.options = _.shuffle(value).map((choice, i) => ({
            value: choice,
            label: choice,
        }));
    }

    public correctAnswer: string;

    public onChoicePick(answer: string) {
        const correct = this.correctAnswer == answer;
        this.answerChoose.emit({correct, answer});
    }

    @Output() public answerChoose = new EventEmitter<{correct: boolean, answer: string}>();

    constructor() {
    }

    ngOnInit() {
    }

}
