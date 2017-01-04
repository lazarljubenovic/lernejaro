import {Component, OnInit, Input} from '@angular/core';
import {Lesson} from "./lesson";
import {LessonColor} from "./lesson-color.enum";
import {LessonIcon} from "./lesson-icon.enum";

@Component({
    selector: 'lrn-lesson-navigator',
    templateUrl: './lesson-navigator.component.html',
    styleUrls: ['./lesson-navigator.component.scss']
})
export class LessonNavigatorComponent implements OnInit {

    @Input()
    public lessons: Lesson[] = [
        {
            id: '1',
            name: 'Introduction',
            color: LessonColor.Orange,
            icon: LessonIcon.Circle,
        },
        {
            id: '2',
            name: 'Foo Path',
            color: LessonColor.Green,
            icon: LessonIcon.Circle,
            dependencies: ['1'],
        },
        {
            id: '3',
            name: 'Bar Path',
            color: LessonColor.Purple,
            icon: LessonIcon.Circle,
            dependencies: ['1'],
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
