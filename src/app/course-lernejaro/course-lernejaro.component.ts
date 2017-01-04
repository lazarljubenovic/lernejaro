import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Lesson} from '../lesson-navigator/lesson';
import {CourseLernejaroLessonsService} from './course-lernejaro-lessons.service';

@Component({
    selector: 'lrn-course-lernejaro',
    templateUrl: './course-lernejaro.component.html',
    styleUrls: ['./course-lernejaro.component.scss']
})
export class CourseLernejaroComponent implements OnInit {

    public lessons: Observable<Lesson[]> = this._lessonsService.getAllLessons('1');

    constructor(private _lessonsService: CourseLernejaroLessonsService) {
    }

    ngOnInit() {
    }

}
