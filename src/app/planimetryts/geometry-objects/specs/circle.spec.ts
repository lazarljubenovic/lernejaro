import {Line} from '../line';
import {Point} from '../point';
import {Circle} from '../circle';

const customEqualities = function (first: any, second: any) {
    if (first.kind == 'line' && second.kind == 'line') {
        return Line.AreEqual(first, second);
    }
    if (first.kind == 'point' && second.kind == 'point') {
        return Point.AreEqual(first, second);
    }
    if (first.kind == 'circle' && second.kind == 'circle') {
        return Circle.AreEqual(first, second);
    }
};

describe(`Circle`, () => {

    beforeEach(() => jasmine.addCustomEqualityTester(customEqualities));

    it(`should get two intersections with line`, () => {
        const line = Line.Y_EQUALS_X;
        const center = Point.FromCartesianCoordinates(2, 2);
        const radius = 1;
        const circle = Circle.FromCenterAndRadius(center, radius);
        const x = radius * (Math.SQRT1_2 * (Math.SQRT2 - 1));
        const expected0 = Point.FromCartesianCoordinates(1 + x, 1 + x);
        const expected1 = Point.FromCartesianCoordinates(3 - x, 3 - x);
        const actual = Circle.GetIntersectionsWithLine(circle, line);
        expect(actual).toEqual([expected0, expected1]);
    });

    it(`should get one intersection with line`, () => {
        const radius = 1;
        const center = Point.FromCartesianCoordinates(2, 2);
        const circle = Circle.FromCenterAndRadius(center, radius);
        const x = radius * (Math.SQRT1_2 * (Math.SQRT2 - 1));
        const line = Line.FromExplicitForm(1, 2 - 2 * x);
        const expected0 = Point.FromCartesianCoordinates(1 + x, 3 - x);
        const actual = Circle.GetIntersectionsWithLine(circle, line);
        expect(actual).toEqual([expected0]);
    });

    it(`should get no intersections with line`, () => {
        const line = Line.FromExplicitForm(1, 2);
        const center = Point.FromCartesianCoordinates(2, 2);
        const circle = Circle.FromCenterAndRadius(center, 1);
        const actual = Circle.GetIntersectionsWithLine(circle, line);
        expect(actual).toEqual([]);
    });

    // TODO test for horizontal and vertical lines, all 3 cases

    it(`should contain a point, not in/out`, () => {
        const circle = Circle.FromGeneralForm(2, 2, 1);
        const point = Point.FromCartesianCoordinates(2, 1);
        expect(circle.containsPoint(point)).toBe(true);
        expect(circle.isPointInside(point)).toBe(false);
        expect(circle.isPointOutside(point)).toBe(false);
    });

    it(`should have a point inside, not on/out`, () => {
        const circle = Circle.FromGeneralForm(2, 2, 1);
        const point = Point.FromCartesianCoordinates(2.5, 1.5);
        expect(circle.containsPoint(point)).toBe(false);
        expect(circle.isPointInside(point)).toBe(true);
        expect(circle.isPointOutside(point)).toBe(false);
    });

    it(`should have a point outside, not on/in`, () => {
        const circle = Circle.FromGeneralForm(2, 2, 1);
        const point = Point.FromCartesianCoordinates(2, 0);
        expect(circle.containsPoint(point)).toBe(false);
        expect(circle.isPointInside(point)).toBe(false);
        expect(circle.isPointOutside(point)).toBe(true);
    });

    it(`should get the right point on the circle`, () => {
        const circle = Circle.FromGeneralForm(2, 2, 1);
        const rightPoint = Point.FromCartesianCoordinates(3, 2);
        expect(circle.getRightPoint()).toEqual(rightPoint);
    });



});
