import {Pipe, PipeTransform} from '@angular/core'
import {MaterialColor as MaterialColorEnum} from '../planimetryts/geometry-objects/material-colors'
import {enumToString} from '../planimetryts/renderers/color'


@Pipe({name: 'getColorString'})
export class GetColorNamePipe implements PipeTransform {

    transform(color: MaterialColorEnum): string {
        return enumToString(color)
    }

}
