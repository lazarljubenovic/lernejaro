import {Component, OnInit} from '@angular/core';
import {GeometryObject} from '../../planimetryts/geometry-objects/geometry-object';
import {Point} from '../../planimetryts/geometry-objects/point';
import {Line} from '../../planimetryts/geometry-objects/line';
import {Polygon} from '../../planimetryts/geometry-objects/polygon';
import {MaterialColor} from '../../planimetryts/geometry-objects/material-colors';
import {Segment} from '../../planimetryts/geometry-objects/segment';
import {Circle} from '../../planimetryts/geometry-objects/circle';
import {Triangle} from '../../planimetryts/geometry-objects/triangle';

@Component({
    selector: 'lrn-introducing-geometry',
    templateUrl: './introducing-geometry.component.html',
    styleUrls: ['./introducing-geometry.component.scss']
})
export class IntroducingGeometryComponent implements OnInit {

    public point: Point = Point.FromCartesianCoordinates(2, 3).strokeColor(MaterialColor.BLUE).fillColor(MaterialColor.GREEN).label('A');
    public line: Line = Line.FromGeneralForm(10, 20, 30).strokeColor(MaterialColor.RED).fillColor(MaterialColor.YELLOW).label('a');

    public objects: GeometryObject[];

    public interactivePoints: Point[] = [
        Point.FromCartesianCoordinates(-30, -200)
            .label('A').strokeColor(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(30, -200)
            .label('B').strokeColor(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(0, -170)
            .label('C').strokeColor(MaterialColor.AMBER),
        // Point.FromCartesianCoordinates(0, 0).label('X').strokeColor(MaterialColor.LIGHT_GREEN),
        // Point.FromCartesianCoordinates(+290, 0).label('Y').strokeColor(MaterialColor.LIGHT_GREEN),
    ];

    public evaluateObjects(...points: Point[]): void {
        const [A, B, C] = points;
        //
        // const triangle = Polygon.FromVertices(A, B, C)
        //     .fillColor(MaterialColor.RED)
        //     .strokeColor(MaterialColor.RED);
        //
        // const mirrorTriangles = triangle
        //     .radialSymmetry(X, 8).map(triangle => triangle
        //         .fillColor(MaterialColor.TEAL)
        //         .strokeColor(MaterialColor.TEAL));
        //
        // this.objects = [triangle, ...mirrorTriangles];

        const polygon = Polygon.FromVertices(A, B, C);
        const segmentAB = Segment.FromTwoPoints(A, B);
        const bisectorA: Line = Line.GetBisector(A, B, C).strokeColor(MaterialColor.RED);
        const bisectorB: Line = Line.GetBisector(B, A, C).strokeColor(MaterialColor.GREEN);
        const bisectorC: Line = Line.GetBisector(C, A, B).strokeColor(MaterialColor.BLUE);
        const intersection: Point = Line.GetIntersection(bisectorA, bisectorB).strokeColor(MaterialColor.PINK);
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
