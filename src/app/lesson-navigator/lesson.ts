import {LessonIcon} from "./lesson-icon.enum";
import {LessonColor} from "./lesson-color.enum";

export interface Lesson {
    id: string;
    name: string;
    color: LessonColor;
    icon: LessonIcon;
    isUnlocked?: boolean;
}
