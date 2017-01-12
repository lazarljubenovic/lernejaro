import {Pipe, PipeTransform} from '@angular/core';
import {GeometryObjectController} from '../../geometry-object-controllers/geometry-object-controller';

@Pipe({name: 'kind'})
export class KindPipe implements PipeTransform {

    transform(controller: GeometryObjectController): string {
        try {
            return controller.getGeometryObject().kind;
        } catch (e) {
            return '';
        }
    }

}
