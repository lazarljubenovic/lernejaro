import {Component, OnInit, Input} from '@angular/core'
import {Lesson} from './lesson'

@Component({
    selector: 'lrn-lesson-navigator',
    templateUrl: './lesson-navigator.component.html',
    styleUrls: ['./lesson-navigator.component.scss']
})
export class LessonNavigatorComponent implements OnInit {

    @Input() public lessons: Lesson[]

    constructor() {
    }

    ngOnInit() {
    }

}
