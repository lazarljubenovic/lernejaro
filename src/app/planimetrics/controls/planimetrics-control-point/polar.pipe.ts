import {Pipe, PipeTransform} from '@angular/core';
import {Point} from '../../../planimetryts/geometry-objects/point';

@Pipe({
    name: 'polar'
})
export class PolarPipe implements PipeTransform {

    transform(point: Point, get?: string): any {
        const {r, φ} = point.getPolarCoordinates();
        if (get == null) {
            return {r, phi: φ};
        }
        if (get == 'r') {
            return r;
        }
        if (get == 'phi' || get == 'φ') {
            return φ;
        }
    }

}
