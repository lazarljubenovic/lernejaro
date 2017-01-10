import {Component, OnInit} from '@angular/core';
import {GeometryObject} from '../../planimetryts/geometry-objects/geometry-object';
import {Point} from '../../planimetryts/geometry-objects/point';
import {Segment} from '../../planimetryts/geometry-objects/segment';
import {Circle} from '../../planimetryts/geometry-objects/circle';
import {Line} from '../../planimetryts/geometry-objects/line';
import {Polygon} from '../../planimetryts/geometry-objects/polygon';
import {MaterialColor} from '../../planimetryts/geometry-objects/material-colors';
import {Triangle} from '../../planimetryts/geometry-objects/triangle';

@Component({
    selector: 'lrn-introducing-geometry',
    templateUrl: './introducing-geometry.component.html',
    styleUrls: ['./introducing-geometry.component.scss']
})
export class IntroducingGeometryComponent implements OnInit {

    public objects: GeometryObject[];

    public interactivePoints: Point[] = [
        Point.FromCartesianCoordinates(-200, -200)
            .label('A').color(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(200, -200)
            .label('B').color(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(30, 200)
            .label('C').color(MaterialColor.AMBER),
    ];

    public evaluateObjects(...points: Point[]): void {
        const A = points[0];
        const B = points[1];
        const C = points[2];
        const polygon = Polygon.FromVertices(A, B, C);
        const segmentAB = Segment.FromTwoPoints(A, B);
        const bisectorA: Line = Line.GetBisector(A, B, C).color(MaterialColor.RED);
        const bisectorB: Line = Line.GetBisector(B, A, C).color(MaterialColor.GREEN);
        const bisectorC: Line = Line.GetBisector(C, A, B).color(MaterialColor.BLUE);
        const intersection: Point = Line.GetIntersection(bisectorA, bisectorB).color(MaterialColor.PINK);
        const inscribedCircle = Circle.FromCenterAndLine(intersection, segmentAB.getLine());

        this.objects = [bisectorA, bisectorB, bisectorC, inscribedCircle, polygon, intersection];

        let eqTrianglePoints, eqTriangle;
        try {
            eqTrianglePoints = polygon.segments().map(segment => {
                return Circle.GetIntersectionsWithLine(inscribedCircle, Line.FromSegment(segment))[0].label('X');
            });
            eqTriangle = Triangle.FromVertices(...eqTrianglePoints).fillColor(MaterialColor.PINK);
            this.objects = [...this.objects, eqTriangle, ...eqTrianglePoints];
        } catch (e) {
            console.log(e);
        }

    }

    public onInteractivePointsChange(points: Point[]): void {
        this.interactivePoints = [...points];
        this.evaluateObjects(...points);
    }

    public onExternalChange() {
        this.evaluateObjects(...this.interactivePoints);
    }

    constructor() {
        this.evaluateObjects(...this.interactivePoints);
    }

    ngOnInit() {
    }

}
