import {Injectable} from '@angular/core'
import {LessonColor} from "./lesson-color.enum"

@Injectable()
export class LessonColorMappingService {

    constructor() {
    }

    public getColorString(color: LessonColor): string {
        switch (color) {
            case LessonColor.Amber:
                return '#FFC107'
            case LessonColor.Blue:
                return '#2196F3'
            case LessonColor.BlueGrey:
                return '#607D8B'
            case LessonColor.Brown:
                return '#795548'
            case LessonColor.Cyan:
                return '#00BCD4'
            case LessonColor.DeepOrange:
                return '#FF5722'
            case LessonColor.DeepPurple:
                return '#673AB7'
            case LessonColor.Green:
                return '#4CAF50'
            case LessonColor.Grey:
                return '#9E9E9E'
            case LessonColor.Indigo:
                return '#3F51B5'
            case LessonColor.LightBlue:
                return '#03A9F4'
            case LessonColor.LightGreen:
                return '#8BC34A'
            case LessonColor.Lime:
                return '#CDDC39'
            case LessonColor.Orange:
                return '#FF9800'
            case LessonColor.Pink:
                return '#E91E63'
            case LessonColor.Purple:
                return '#9C27B0'
            case LessonColor.Red:
                return '#F44336'
            case LessonColor.Teal:
                return '#009688'
            case LessonColor.Yellow:
                return '#FFEB3B'
        }
    }

}
