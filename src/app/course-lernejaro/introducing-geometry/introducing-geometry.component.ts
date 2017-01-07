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
        Point.FromCartesianCoordinates(400, 200),
        Point.FromCartesianCoordinates(250, 500),
        Point.FromCartesianCoordinates(50, 50),
    ];

    public evaluateObjects(...points: Point[]): void {
        const A = points[0];
        const B = points[1];
        const C = points[2];
        const segmentAB = Segment.FromTwoPoints(A, B);
        const segmentBC = Segment.FromTwoPoints(B, C);
        const segmentCA = Segment.FromTwoPoints(C, A);
        const lineAB = Line.FromTwoPoints(A, B);
        const lineBC = Line.FromTwoPoints(B, C);
        const lineCA = Line.FromTwoPoints(C, A);
        const bisector1: Line = Line.GetBisectors(lineAB, lineBC)[0];
        const bisector2: Line = Line.GetBisectors(lineBC, lineCA)[0];
        const bisector3: Line = Line.GetBisectors(lineCA, lineAB)[0];
        const intersection: Point = Line.GetIntersection(bisector1, bisector2);
        this.objects = new Set<GeometryObject>()
            .add(segmentAB).add(segmentBC).add(segmentCA)
            .add(bisector1).add(bisector2).add(bisector3)
            .add(intersection);
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
