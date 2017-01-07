import {Component, OnInit} from '@angular/core';
import {GeometryObject} from '../../planimetryts/geometry-objects/geometry-object';
import {Point} from '../../planimetryts/geometry-objects/point';

@Component({
    selector: 'lrn-introducing-geometry',
    templateUrl: './introducing-geometry.component.html',
    styleUrls: ['./introducing-geometry.component.scss']
})
export class IntroducingGeometryComponent implements OnInit {

    public objects: Set<GeometryObject>;

    private createObjects() {
        const point1 = Point.FromCartesianCoordinates(10, 10);
        const point2 = Point.FromCartesianCoordinates(100, 10);
        const point3 = Point.FromCartesianCoordinates(10, 100);

        const objects = new Set<GeometryObject>();
        this.objects = objects.add(point1).add(point2).add(point3);
    }

    constructor() {
    }

    ngOnInit() {
        this.createObjects();
    }

}
