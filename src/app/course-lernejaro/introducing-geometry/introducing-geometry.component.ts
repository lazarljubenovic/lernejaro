import {Component, OnInit} from '@angular/core';
import {GeometryObject} from '../../planimetryts/geometry-objects/geometry-object';
import {Point} from '../../planimetryts/geometry-objects/point';
import {Line} from '../../planimetryts/geometry-objects/line';
import {MaterialColor} from '../../planimetryts/geometry-objects/material-colors';
import {Segment} from '../../planimetryts/geometry-objects/segment';
import {Circle} from '../../planimetryts/geometry-objects/circle';
import {Ellipse} from '../../planimetryts/geometry-objects/ellipse';

@Component({
    selector: 'lrn-introducing-geometry',
    templateUrl: './introducing-geometry.component.html',
    styleUrls: ['./introducing-geometry.component.scss']
})
export class IntroducingGeometryComponent implements OnInit {

    public point: Point = Point.FromCartesianCoordinates(2, 3)
        .strokeColor(MaterialColor.BLUE)
        .fillColor(MaterialColor.GREEN)
        .label('A');

    public line: Line = Line.FromGeneralForm(10, 20, 30)
        .strokeColor(MaterialColor.RED)
        .fillColor(MaterialColor.YELLOW)
        .label('l');

    public circle: Circle = Circle.FromGeneralForm(0, 1, 2)
        .strokeColor(MaterialColor.AMBER)
        .fillColor(MaterialColor.INDIGO)
        .label('k');

    public segment: Segment = Segment
        .FromTwoPoints(Point.FromCartesianCoordinates(1, 2), Point.FromCartesianCoordinates(3, 4))
        .strokeColor(MaterialColor.INDIGO)
        .fillColor(MaterialColor.LIGHT_BLUE)
        .label('a');

    public objects: GeometryObject[];

    public interactivePoints: Point[] = [
        Point.FromCartesianCoordinates(-200, -200)
            .label('A').strokeColor(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(200, -200)
            .label('B').strokeColor(MaterialColor.AMBER),
        // Point.FromCartesianCoordinates(0, 200)
        //     .label('C').strokeColor(MaterialColor.AMBER),
    ];

    public evaluateObjects(...points: Point[]): void {
        const [A, B] = points;

        // const polygon = Polygon.FromVertices(A, B, C);
        // const segmentAB = Segment.FromTwoPoints(A, B);
        // const bisectorA: Line = Line.GetBisector(A, B, C).strokeColor(MaterialColor.RED);
        // const bisectorB: Line = Line.GetBisector(B, A, C).strokeColor(MaterialColor.GREEN);
        // const bisectorC: Line = Line.GetBisector(C, A, B).strokeColor(MaterialColor.BLUE);
        // const intersection: Point = Line.GetIntersection(bisectorA, bisectorB)
        // .strokeColor(MaterialColor.PINK);
        // const inscribedCircle = Circle.FromCenterAndLine(intersection, segmentAB.getLine());

        // this.objects = [bisectorA, bisectorB, bisectorC, inscribedCircle, polygon, intersection];

        // const originalCircle = Circle.FromCenterAndPoint(A, B).strokeColor(MaterialColor.RED);
        // const skewedCircle = originalCircle.clone().shearX(2).strokeColor(MaterialColor.BLUE);

        const ellipse = Ellipse.FromCanonicalForm(80, 80)
            .translate(A.x(), A.y())
            .strokeColor(MaterialColor.INDIGO);

        const rotatedEllipse = ellipse.clone().rotate(Math.PI / 4)
            .strokeColor(MaterialColor.PINK);

        const skewedEllipse = ellipse.clone().shearX(0.33)
            .strokeColor(MaterialColor.TEAL);

        this.objects = [ellipse, rotatedEllipse, skewedEllipse];
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
