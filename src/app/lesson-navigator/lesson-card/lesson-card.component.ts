import {Component, OnInit, Input} from '@angular/core'
import {Lesson} from "../lesson"

@Component({
    selector: 'lrn-lesson-card',
    templateUrl: './lesson-card.component.html',
    styleUrls: ['./lesson-card.component.scss']
})
export class LessonCardComponent implements OnInit {

    @Input() public lesson: Lesson

    constructor() {
    }

    ngOnInit() {
    }

}
