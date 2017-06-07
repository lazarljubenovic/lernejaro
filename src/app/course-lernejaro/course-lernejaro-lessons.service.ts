import {Injectable} from '@angular/core'
import {Lesson} from "../lesson-navigator/lesson"
import {Observable} from 'rxjs'
import {LESSONS} from './lessons.data'

@Injectable()
export class CourseLernejaroLessonsService {

    public getAllLessons(userId: string): Observable<Lesson[]> {
        return Observable.of(LESSONS)
    }

    constructor() {
    }

}
