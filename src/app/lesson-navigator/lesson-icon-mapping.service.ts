import {Injectable} from '@angular/core';
import {LessonIcon} from "./lesson-icon.enum";

@Injectable()
export class LessonIconMappingService {

    constructor() {
    }

    public getIconString(icon: LessonIcon): string {
        return 'A';
    }

}
