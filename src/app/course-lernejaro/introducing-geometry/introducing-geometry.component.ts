import {Component, OnInit} from '@angular/core';
import {GeometryObject} from '../../planimetryts/geometry-objects/geometry-object';
import {Point} from '../../planimetryts/geometry-objects/point';
import {Segment} from '../../planimetryts/geometry-objects/segment';
import {Circle} from '../../planimetryts/geometry-objects/circle';
import {Line} from '../../planimetryts/geometry-objects/line';

@Component({
    selector: 'lrn-introducing-geometry',
    templateUrl: './introducing-geometry.component.html',
    styleUrls: ['./introducing-geometry.component.scss']
})
export class IntroducingGeometryComponent implements OnInit {

    public objects: Set<GeometryObject>;

    public interactivePoints: Point[] = [
        Point.FromCartesianCoordinates(-200, -200),
        Point.FromCartesianCoordinates(200, -200),
        Point.FromCartesianCoordinates(30, 200),
    ];

    public evaluateObjects(...points: Point[]): void {
        const A = points[0];
        const B = points[1];
        const C = points[2];
        const segmentAB = Segment.FromTwoPoints(A, B);
        const segmentBC = Segment.FromTwoPoints(B, C);
        const segmentCA = Segment.FromTwoPoints(C, A);
        const bisectorA: Line = Line.GetBisector(A, B, C);
        const bisectorB: Line = Line.GetBisector(B, A, C);
        const bisectorC: Line = Line.GetBisector(C, A, B);
        const intersection: Point = Line.GetIntersection(bisectorA, bisectorB);
        const inscribedCircle = Circle.FromCenterAndLine(intersection, segmentAB.getLine());
        this.objects = new Set<GeometryObject>()
            .add(segmentAB).add(segmentBC).add(segmentCA)
            .add(bisectorA).add(bisectorB).add(bisectorC)
            .add(intersection).add(inscribedCircle);
    }

    public onInteractivePointsChange(points: Point[]): void {
        this.evaluateObjects(...points);
    }

    constructor() {
    }

    ngOnInit() {
        this.evaluateObjects(...this.interactivePoints);
    }

}
