import {Component, OnInit} from '@angular/core'
import {GeometryObject} from '../../planimetryts/geometry-objects/geometry-object'
import {Point} from '../../planimetryts/geometry-objects/point'
import {Line} from '../../planimetryts/geometry-objects/line'
import {MaterialColor} from '../../planimetryts/geometry-objects/material-colors'
import {Segment} from '../../planimetryts/geometry-objects/segment'
import {Circle} from '../../planimetryts/geometry-objects/circle'
import {Ellipse} from '../../planimetryts/geometry-objects/ellipse'
import {Polygon} from '../../planimetryts/geometry-objects/polygon'

@Component({
    selector: 'lrn-introducing-geometry',
    templateUrl: './introducing-geometry.component.html',
    styleUrls: ['./introducing-geometry.component.scss']
})
export class IntroducingGeometryComponent implements OnInit {

    public point: Point = Point.FromCartesianCoordinates(2, 3)
        .strokeColor(MaterialColor.BLUE)
        .fillColor(MaterialColor.GREEN)
        .label('Z')

    public line: Line = Line.FromGeneralForm(10, 20, 30)
        .strokeColor(MaterialColor.RED)
        .fillColor(MaterialColor.YELLOW)
        .label('l')

    public objects: GeometryObject[]

    public interactivePoints: Point[] = [
        Point.FromCartesianCoordinates(-200, -200)
            .label('A').strokeColor(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(200, -200)
            .label('B').strokeColor(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(0, 200)
            .label('C').strokeColor(MaterialColor.AMBER),
        this.point,
    ]

    public evaluateObjects(...points: Point[]): void {
        const [A, B, C] = points

        const polygon = Polygon.FromVertices(A, B, C)
            .strokeColor(MaterialColor.DEEP_PURPLE)
            .fillColor(MaterialColor.DEEP_PURPLE)

        const segmentAB = Segment.FromTwoPoints(A, B)
        const bisectorA: Line = Line.GetBisector(A, B, C).strokeColor(MaterialColor.RED)
        const bisectorB: Line = Line.GetBisector(B, A, C).strokeColor(MaterialColor.GREEN)
        const bisectorC: Line = Line.GetBisector(C, A, B).strokeColor(MaterialColor.BLUE)

        const intersection: Point = Line
            .GetIntersection(bisectorA, bisectorB)
            .strokeColor(MaterialColor.PINK)
            .fillColor(MaterialColor.PINK)

        // const inscribedCircle = Ellipse.Circle
        //     .FromCenterAndRadius(Point.FromCartesianCoordinates(-200, 100), 10);
            // .FromCenterAndLine(intersection, segmentAB.getLine())
            // .translateY(10);

        const ellipse = Ellipse.Circle.FromGeneralForm(1, 2, 3)

        const circle = Circle.FromCenterAndLine(intersection, segmentAB.getLine())
            .strokeColor(MaterialColor.GREEN)

        // this.objects = [bisectorA, bisectorB, bisectorC, inscribedCircle, polygon, intersection];
        this.objects = [circle, polygon, intersection, ellipse]
    }

    public onInteractivePointsChange(points: Point[]): void {
        this.interactivePoints = [...points]
        this.evaluateObjects(...points)
    }

    public onExternalChange() {
        this.evaluateObjects(...this.interactivePoints)
    }

    constructor() {
        this.evaluateObjects(...this.interactivePoints)
    }

    ngOnInit() {
    }

}
