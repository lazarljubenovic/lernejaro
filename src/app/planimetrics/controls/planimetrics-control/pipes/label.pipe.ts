import {Pipe, PipeTransform} from '@angular/core';
import {GeometryObjectController} from '../../geometry-object-controllers/geometry-object-controller';

@Pipe({name: 'label'})
export class LabelPipe implements PipeTransform {

    transform(controller: GeometryObjectController): string {
        try {
            const label = controller.getGeometryObject().label();
            if (!label) {
                return 'Unlabeled';
            } else {
                return label;
            }
        } catch (e) {
            return '';
        }
    }

}
