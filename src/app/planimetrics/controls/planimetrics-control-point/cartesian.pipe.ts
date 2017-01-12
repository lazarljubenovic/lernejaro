import {Pipe, PipeTransform} from '@angular/core';
import {Point} from '../../../planimetryts/geometry-objects/point';

@Pipe({
    name: 'cartesian'
})
export class CartesianPipe implements PipeTransform {

    transform(point: Point, get?: string): any {
        const {x, y} = point.getCartesianCoordinates();
        if (get == null) {
            return {x, y};
        }
        if (get == 'x') {
            return x;
        }
        if (get == 'y') {
            return y;
        }
    }

}
