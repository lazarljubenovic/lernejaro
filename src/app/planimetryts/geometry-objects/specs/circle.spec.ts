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

    it(`should get two intersections with a horizontal line`, () => {
        const line = Line.HorizontalThroughPoint(1);
        const circle = Circle.FromGeneralForm(1, 1, 1);
        const expected0 = Point.FromCartesianCoordinates(0, 1);
        const expected1 = Point.FromCartesianCoordinates(2, 1);
        const actual = Circle.GetIntersectionsWithLine(circle, line);
        expect(actual).toEqual([expected0, expected1]);
    });

    it(`should get one intersection with a horizontal line`, () => {
        const line = Line.HorizontalThroughPoint(1);
        const circle = Circle.FromGeneralForm(2, 2, 1);
        const actual = Circle.GetIntersectionsWithLine(circle, line);
        const expected = Point.FromCartesianCoordinates(2, 1);
        expect(actual).toEqual([expected]);
    });

    it(`should get no intersections with a horizontal line`, () => {
        const line = Line.HorizontalThroughPoint(-1);
        const circle = Circle.FromGeneralForm(2, 2, 1);
        const actual = Circle.GetIntersectionsWithLine(circle, line);
        expect(actual).toEqual([]);
    });

    it(`should get two intersections with a vertical line`, () => {
        const line = Line.VerticalThroughPoint(1);
        const circle = Circle.FromGeneralForm(1, 1, 1);
        const actual = Circle.GetIntersectionsWithLine(circle, line);
        const expected = [
            Point.FromCartesianCoordinates(1, 0),
            Point.FromCartesianCoordinates(1, 2),
        ];
        expect(actual).toEqual(expected);
    });

    it(`should get one intersection with a vertical line`, () => {
        const line = Line.VerticalThroughPoint(1);
        const circle = Circle.FromGeneralForm(2, 1, 1);
        const actual = Circle.GetIntersectionsWithLine(circle, line);
        const expected = Point.FromCartesianCoordinates(1, 1);
        expect(actual).toEqual([expected]);
    });

    it(`should get no intersections with a vertical line`, () => {
        const line = Line.VerticalThroughPoint(1);
        const circle = Circle.FromGeneralForm(10, 10, 1);
        const actual = Circle.GetIntersectionsWithLine(circle, line);
        expect(actual).toEqual([]);
    });

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

    describe(`should determine if points are one the same side`, () => {
        const circle = Circle.FromGeneralForm(1, 1, 1);
        const on1 = Point.FromCartesianCoordinates(0, 1);
        const on2 = Point.FromCartesianCoordinates(1, 0);
        const outside1 = Point.FromCartesianCoordinates(0, 0);
        const outside2 = Point.FromCartesianCoordinates(2, 2);
        const inside1 = Point.FromCartesianCoordinates(1, 1);
        const inside2 = Point.FromCartesianCoordinates(1, 1.5);

        it(`when both are outside`, () => {
            expect(circle.pointsAreOnSameSide(outside1, outside2)).toBe(true);
        });

        it(`when one is outside and one is on the circle`, () => {
            expect(circle.pointsAreOnSameSide(outside1, on1)).toBe(false);
            expect(circle.pointsAreOnSameSide(outside2, on1)).toBe(false);
            expect(circle.pointsAreOnSameSide(outside1, on2)).toBe(false);
            expect(circle.pointsAreOnSameSide(outside2, on2)).toBe(false);
        });

        it(`when one is outside and one is inside`, () => {
            expect(circle.pointsAreOnSameSide(outside1, inside1)).toBe(false);
            expect(circle.pointsAreOnSameSide(outside2, inside1)).toBe(false);
            expect(circle.pointsAreOnSameSide(outside2, inside2)).toBe(false);
            expect(circle.pointsAreOnSameSide(outside1, inside2)).toBe(false);
        });

        it(`when both are on the circle`, () => {
            expect(circle.pointsAreOnSameSide(on1, on2)).toBe(false);
        });

        it(`when one is on the circle and one is inside`, () => {
            expect(circle.pointsAreOnSameSide(inside1, on1)).toBe(false);
            expect(circle.pointsAreOnSameSide(inside2, on1)).toBe(false);
            expect(circle.pointsAreOnSameSide(inside1, on2)).toBe(false);
            expect(circle.pointsAreOnSameSide(inside2, on2)).toBe(false);
        });

        it(`when both are inside`, () => {
            expect(circle.pointsAreOnSameSide(inside1, inside2)).toBe(true);
        });
    });


});
