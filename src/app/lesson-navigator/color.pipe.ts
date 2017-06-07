import {Pipe, PipeTransform} from '@angular/core'
import {LessonColorMappingService} from "./lesson-color-mapping.service"
import {LessonColor} from "./lesson-color.enum"

@Pipe({ name: 'color' })
export class ColorPipe implements PipeTransform {

    constructor(private colorMapper: LessonColorMappingService) {
    }

    transform(color: LessonColor, grayscale: boolean): string {
        return this.colorMapper.getColorString(!grayscale ? color : LessonColor.BlueGrey)
    }

}
