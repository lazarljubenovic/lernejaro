import {Injectable} from '@angular/core';
import {Lesson, LessonExpanded} from "./lesson";

@Injectable()
export class LessonNavigatorService {

    public expandLessonInformation(lesson: Lesson): LessonExpanded {
        return null;
    }

    constructor() {
    }

}
