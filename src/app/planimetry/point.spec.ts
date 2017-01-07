import {Point} from './point';

let pointEquality = function(first: any, second: any) {
    if (first.kind == 'point' && second.kind == 'point') {
        return Point.AreEqual(first, second);
    }
};

describe(`Point`, () => {

    beforeEach(() => jasmine.addCustomEqualityTester(pointEquality));

    it(`should report very close points as the same (eps = 1e-6)`, () => {
        const diff = 1e-7;
        const point1 = new Point(1, 2);
        const point2 = new Point(1 + diff, 2 - diff);
        const equality: boolean = Point.AreEqual(point1, point2);
        expect(equality).toBe(true);
    });

    it(`should get x`, () => {
        const point = Point.FromCartesianCoordinates(1, 2);
        expect(point.x()).toBe(1);
    });

    it(`should set x`, () => {
        const point1 = Point.FromCartesianCoordinates(1, 2);
        const point2 = point1.x(0);
        expect(point1).toBe(point2);
        expect(point2.x()).toBe(0);
    });

    it(`should map x`, () => {
        const point1 = Point.FromCartesianCoordinates(3, 2);
        const point2 = point1.x(x => x * x);
        expect(point1).toBe(point2);
        expect(point2.x()).toBe(9);
    });

    it(`should get y`, () => {
        const point = Point.FromCartesianCoordinates(1, 2);
        expect(point.y()).toBe(2);
    });

    it(`should set y`, () => {
        const point1 = Point.FromCartesianCoordinates(1, 2);
        const point2 = point1.y(0);
        expect(point1).toBe(point2);
        expect(point2.y()).toBe(0);
    });

    it(`should map y`, () => {
        const point1 = Point.FromCartesianCoordinates(3, 2);
        const point2 = point1.y(y => y * y + 1);
        expect(point1).toBe(point2);
        expect(point2.y()).toBe(5);
    });

    it(`should set label during creation`, () => {
        const point = Point.FromCartesianCoordinates(1, 2, 'label');
        expect(point.label()).toEqual('label');
    });

    it(`should change label`, () => {
        const point1 = Point.FromCartesianCoordinates(1, 2);
        const point2 = point1.label('label');
        expect(point1).toBe(point2);
        expect(point2.label()).toEqual('label');
    });

    it(`should chain method calls`, () => {
        const point1 = Point.FromCartesianCoordinates(1, 2, 'label')
            .x(3).y(4).label('lebal');
        const point2 = Point.FromCartesianCoordinates(3, 4, 'lebal');
        expect(point1).toEqual(point2);
    });

    it(`should create a point from polar coordinates`, () => {
        const point1 = Point.FromPolarCoordinates(1, 0);
        const point2 = Point.FromCartesianCoordinates(1, 0);
        expect(point1).toEqual(point2);

        const point3 = Point.FromPolarCoordinates(2, Math.PI / 4);
        const point4 = Point.FromCartesianCoordinates(Math.sqrt(2), Math.sqrt(2));
        expect(point3).toEqual(point4);

        const point5 = Point.FromPolarCoordinates(1, Math.PI / 2);
        const point6 = Point.FromCartesianCoordinates(0, 1);
        expect(point5).toEqual(point6);
    });

    it(`should get polar coordinates`, () => {
        const point = Point.FromCartesianCoordinates(1, 1);
        const polar = point.getPolarCoordinates();
        expect(polar.r).toBe(Math.sqrt(2));
        expect(polar.φ).toBe(Math.PI / 4);
    });

    it(`should create a point from matrix`, () => {
        const matrix = [[1], [2]];
        const point1 = Point.FromMatrix(matrix);
        const point2 = Point.FromCartesianCoordinates(1, 2);
        expect(point1).toEqual(point2);
    });

    it(`should get matrix from a point`, () => {
        const point = Point.FromCartesianCoordinates(1, 2);
        const matrix = point.getMatrixCoordinates();
        expect(matrix).toEqual([[1], [2]]);
    });

    it(`should create a point as negative of the given`, () => {
        const point = Point.FromCartesianCoordinates(1, 2);
        const negative = Point.Negative(point);
        const expected = Point.FromCartesianCoordinates(-1, -2);
        expect(point).not.toBe(negative); // we expect a different reference
        expect(negative).toEqual(expected);
    });

    it(`should create a point as addition of two`, () => {
        const point1 = Point.FromCartesianCoordinates(1, 2);
        const point2 = Point.FromCartesianCoordinates(3, 4);
        const addition = Point.Add(point1, point2);
        const point = Point.FromCartesianCoordinates(4, 6);
        expect(point1).not.toBe(addition); // we expect a different reference
        expect(point2).not.toBe(addition); // we expect a different reference
        expect(addition).toEqual(point);
    });

    it(`should create a point as subtraction of two`, () => {
        const point1 = Point.FromCartesianCoordinates(1, 2);
        const point2 = Point.FromCartesianCoordinates(3, 4);
        const subtraction = Point.Subtract(point1, point2);
        const point = Point.FromCartesianCoordinates(-2, -2);
        expect(point1).not.toBe(subtraction); // we expect a different reference
        expect(point2).not.toBe(subtraction); // we expect a different reference
        expect(subtraction).toEqual(point);
    });

    it(`should calculate dot product of two points`, () => {
        const point1 = Point.FromCartesianCoordinates(-1, 2);
        const point2 = Point.FromCartesianCoordinates(3, 4);
        const dotProduct = -1 * 3 + 2 * 4;
        expect(Point.DotProduct(point1, point2)).toBe(dotProduct);
    });

    it(`should get distance between two points`, () => {
        const point1 = Point.FromCartesianCoordinates(1, 2);
        const point2 = Point.FromCartesianCoordinates(3, 4);
        expect(Point.GetDistanceBetween(point1, point2)).toBe(2 * Math.sqrt(2));

        const point3 = Point.FromCartesianCoordinates(1, 0);
        const point4 = Point.FromCartesianCoordinates(2, 0);
        expect(Point.GetDistanceBetween(point3, point4)).toBe(1);

        const point5 = Point.FromCartesianCoordinates(0, 1);
        const point6 = Point.FromCartesianCoordinates(0, 2);
        expect(Point.GetDistanceBetween(point5, point6)).toBe(1);
    });

    it(`should get point at given ratio`, () => {
        const point1 = Point.FromCartesianCoordinates(0, 0);
        const point2 = Point.FromCartesianCoordinates(6, 3);
        const third = Point.FromCartesianCoordinates(2, 1);
        expect(Point.GetPointAtRatio(point1, point2, 1, 2)).toEqual(third);
    });

    it(`should get point at the middle`, () => {
        const point1 = Point.FromCartesianCoordinates(1, 2);
        const point2 = Point.FromCartesianCoordinates(3, 4);
        const middle = Point.FromCartesianCoordinates(2, 3);
        expect(Point.GetPointBetween(point1, point2)).toEqual(middle);
    });

    it(`should translate the point`, () => {
        const point1 = Point.FromCartesianCoordinates(1, 2);
        const diff = Point.FromPolarCoordinates(3, Math.PI);
        const point2 = point1.translate(diff);
        expect(point1).toBe(point2);
        expect(point2).toEqual(Point.FromCartesianCoordinates(-2, 2));
    });

    it(`should get distance to a point (non-static)`, () => {
        const point1 = Point.FromCartesianCoordinates(1, 2);
        const point2 = Point.FromCartesianCoordinates(-1, 2);
        expect(point1.distanceTo(point2)).toBe(2);
    });

    it(`should not change reference when applying matrix`, () => {
        const p1 = Point.FromCartesianCoordinates(1, 2);
        const p2 = p1.applyMatrix([[1, 0], [0, 1]]);
        expect(p1).toBe(p2);
    });

    it(`should apply transformation matrix`, () => {
        const m = [[1, 2], [3, 4]];

        const p1 = Point.FromCartesianCoordinates(0, 0);
        const p2 = Point.FromCartesianCoordinates(0, 0);
        expect(p1.applyMatrix(m)).toEqual(p2);

        const p3 = Point.FromCartesianCoordinates(1, 1);
        const p4 = Point.FromCartesianCoordinates(3, 7);
        expect(p3.applyMatrix(m)).toEqual(p4);

        const p5 = Point.FromCartesianCoordinates(-1, 1);
        const p6 = Point.FromCartesianCoordinates(1, 1);
        expect(p5.applyMatrix(m)).toEqual(p6);

        const p7 = Point.FromCartesianCoordinates(2, -3);
        const p8 = Point.FromCartesianCoordinates(-4, -6);
        expect(p7.applyMatrix(m)).toEqual(p8);
    });

    it(`should stretch X`, () => {
        const point1 = Point.FromCartesianCoordinates(2, 1);
        const point2 = Point.FromCartesianCoordinates(4, 1);
        expect(point1.stretchX(2)).toEqual(point2);
    });

    it(`should stretch Y`, () => {
        const point1 = Point.FromCartesianCoordinates(2, 1);
        const point2 = Point.FromCartesianCoordinates(2, 2);
        expect(point1.stretchY(2)).toEqual(point2);
    });

    it(`should stretch`, () => {
        const point1 = Point.FromCartesianCoordinates(1, 2);
        const point2 = Point.FromCartesianCoordinates(5, 10);
        expect(point1.stretch(5)).toEqual(point2);
    });

});
