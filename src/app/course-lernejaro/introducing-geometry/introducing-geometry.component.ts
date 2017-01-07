import {Component, OnInit} from '@angular/core';
import {GeometryObject} from '../../planimetryts/geometry-objects/geometry-object';
import {Point} from '../../planimetryts/geometry-objects/point';
import {Segment} from '../../planimetryts/geometry-objects/segment';
import {Circle} from '../../planimetryts/geometry-objects/circle';

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

        const segment1Start = Point.FromCartesianCoordinates(30, 30);
        const segment1End = Point.FromCartesianCoordinates(100, 30);
        const segment1 = Segment.FromTwoPoints(segment1Start, segment1End);

        const circleCenter = Point.Add(segment1End, Point.FromPolarCoordinates(200, Math.PI/2)).label('CIRCLE CENTER');
        const circle = Circle.FromCenterAndPoint(circleCenter, point1);

        const objects = new Set<GeometryObject>();
        this.objects = objects.add(point1).add(point2).add(point3).add(segment1).add(circle).add(segment1End);
    }

    constructor() {
    }

    ngOnInit() {
        this.createObjects();
    }

}
