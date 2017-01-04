import {Pipe, PipeTransform} from '@angular/core';
import {LessonIconMappingService} from "./lesson-icon-mapping.service";
import {LessonIcon} from "./lesson-icon.enum";

@Pipe({name: 'icon'})
export class IconPipe implements PipeTransform {

    constructor(private iconMapper: LessonIconMappingService) {
    }

    transform(icon: LessonIcon): string {
        return this.iconMapper.getIconString(icon);
    }

}
