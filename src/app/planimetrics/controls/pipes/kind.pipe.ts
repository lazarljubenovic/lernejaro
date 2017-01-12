import {Pipe, PipeTransform} from '@angular/core';
import {GeometryObject} from '../../../planimetryts/geometry-objects/geometry-object';

@Pipe({
    name: 'kind'
})
export class KindPipe implements PipeTransform {

    transform(geometryObject: GeometryObject): string {
        if (geometryObject == null) {
            return '';
        } else {
            return geometryObject.kind;
        }
    }

}
