import {Pipe, PipeTransform} from '@angular/core';
import {GeometryObject} from '../../../planimetryts/geometry-objects/geometry-object';

@Pipe({
    name: 'label'
})
export class LabelPipe implements PipeTransform {

    transform(geometryObject: GeometryObject): string {
        if (!geometryObject) {
            return '';
        }
        const label = geometryObject.label();
        if (label == null) {
            return 'Unlabeled';
        } else {
            return label;
        }
    }

}
