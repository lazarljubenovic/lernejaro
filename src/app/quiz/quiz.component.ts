import {Component, OnInit, ContentChild, Input, AfterContentInit} from '@angular/core';

@Component({
    selector: 'lrn-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, AfterContentInit {

    @Input() public shuffle: boolean = false;

    constructor() {
    }

    public ngOnInit(): void {
    }

    public ngAfterContentInit(): void {

    }

}
