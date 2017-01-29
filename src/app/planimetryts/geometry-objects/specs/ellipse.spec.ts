import {Ellipse} from '../ellipse';
import {Point} from '../point';


const customEqualities = function (first: any, second: any) {
    if (first.kind == 'point' && second.kind == 'point') {
        return Point.AreEqual(first, second);
    }
};

describe(`Ellipse`, () => {

    beforeEach(() => jasmine.addCustomEqualityTester(customEqualities));

    describe(`FromCanonicalForm`, () => {

        it(`should create a new ellipse from canonical form`, () => {
            const ellipse = Ellipse.FromCanonicalForm(2, 5);
            const actual = ellipse.getGeneralForm();
            const expected = {A: 25, B: 0, C: 4, D: 0, E: 0, F: -100};
            expect(actual).toEqual(expected);
        });

        it(`should throw if one of parameters is zero`, () => {
            expect(() => Ellipse.FromCanonicalForm(0, 1)).toThrow();
            expect(() => Ellipse.FromCanonicalForm(1, 0)).toThrow();
            expect(() => Ellipse.FromCanonicalForm(0, 0)).toThrow();
        });

    });

    describe(`FromGeneralForm`, () => {

        it(`should create a simple ellipse`, () => {
            const [A, B, C, D, E, F] = [25, 0, 4, 0, 0, -100];
            const ellipse = Ellipse.FromGeneralForm(A, B, C, D, E, F);
            const actual = ellipse.getGeneralForm();
            const expected = {A, B, C, D, E, F};
            expect(actual).toEqual(expected);
        });

        it(`should create a rotated ellipse`, () => {
            const [A, B, C, D, E, F] = [29 / 2, -21, 29 / 2, 0, 0, -100];
            const ellipse = Ellipse.FromGeneralForm(A, B, C, D, E, F);
            const actual = ellipse.getGeneralForm();
            const expected = {A, B, C, D, E, F};
            expect(actual).toEqual(expected);
        });

        it(`should throw if given parameters do not form an ellipse (hyperbola)`, () => {
            const creatingHyperbola = () => {
                Ellipse.FromGeneralForm(29 / 2, 21, -29 / 2, 0, 0, -100);
            };
            expect(creatingHyperbola).toThrow();
        });

        it(`should throw if given parameters do not form an ellipse (parabola`, () => {
            const creatingParabola = () => Ellipse.FromGeneralForm(1, 0, 0, 0, 1, -1);
            expect(creatingParabola).toThrow();
        });

    });

    describe(`FromMatrix`, () => {

        it(`should create a simple ellipse from matrix`, () => {
            const matrix = [
                [25, 0, 0],
                [0, 4, 0],
                [0, 0, -100],
            ];
            const ellipse = Ellipse.FromMatrix(matrix);
            const actual = ellipse.getGeneralForm();
            const expected = {A: 25, B: 0, C: 4, D: 0, E: 0, F: -100};
            expect(actual).toEqual(expected);
        });

        it(`should create a rotated ellipse from matrix`, () => {
            const matrix = [
                [29 / 2, -21 / 2, 0],
                [-21 / 2, 29 / 2, 0],
                [0, 0, -100],
            ];
            const ellipse = Ellipse.FromMatrix(matrix);
            const actual = ellipse.getGeneralForm();
            const expected = {A: 29 / 2, B: -21, C: 29 / 2, D: 0, E: 0, F: -100};
            expect(actual).toEqual(expected);
        });

        it(`should throw if given matrix is not an ellipse (hyperbola)`, () => {
            const matrix = [
                [29 / 2, 21 / 2, 0],
                [21 / 2, -29 / 2, 0],
                [0, 0, -100],
            ];
            const creatingHyperbola = () => Ellipse.FromMatrix(matrix);
            expect(creatingHyperbola).toThrow();
        });

        it(`should throw if given matrix is not an ellipse (parabola)`, () => {
            const matrix = [
                [1, 0, 0],
                [0, 0, 1 / 2],
                [0, 1 / 2, -1]
            ];
            const creatingParabola = () => Ellipse.FromMatrix(matrix);
            expect(creatingParabola).toThrow();
        });

        it(`should throw if given matrix is not orthogonal`, () => {
            const matrix = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];
            const creatingNonesense = () => Ellipse.FromMatrix(matrix);
            expect(creatingNonesense).toThrow();
        });

    });

    describe(`IsCircle`, () => {

        it(`should return true if an ellipse is also a circle`, () => {
            const ellipse = Ellipse.FromCanonicalForm(1, 1);
            expect(ellipse.isCircle()).toBe(true);
        });

        it(`should return false if an ellipse is not a circle`, () => {
            const ellipse = Ellipse.FromCanonicalForm(1, 2);
            expect(ellipse.isCircle()).toBe(false);
        });

    });

    describe(`getRadii`, () => {

        it(`should get radii for standard ellipse`, () => {
            const ellipse = Ellipse.FromCanonicalForm(1, 2);
            expect(ellipse.getRadii().sort()).toEqual([1, 2].sort());
        });

        it(`should get radii for a rotated ellipse`, () => {
            const ellipse = Ellipse.FromGeneralForm(29 / 2, 21, 29 / 2, 0, 0, -100);
            expect(ellipse.getRadii().sort()).toEqual([2, 5].sort());
        });

    });

    describe(`getCenter`, () => {

        it(`should get center`, () => {
            const ellipse = Ellipse.FromCanonicalForm(1, 1);
            expect(ellipse.getCenter()).toEqual(Point.CENTER);
        });

    });

    describe(`getAngle`, () => {

        it(`should get angle for standard ellipse`, () => {
            const ellipse = Ellipse.FromCanonicalForm(1, 2);
            expect(ellipse.getAngle()).toBeCloseTo(Math.PI / 2);
        });

        it(`should get angle for a rotated ellipse`, () => {
            const ellipse = Ellipse.FromGeneralForm(29 / 2, 21, 29 / 2, 0, 0, -100);
            expect(ellipse.getAngle()).toBeCloseTo(-Math.PI / 4);
        });

        it(`should get angle for standard ellipse`, () => {
            const ellipse = Ellipse.FromCanonicalForm(2, 1);
            expect(ellipse.getAngle()).toBeCloseTo(0);
        });

    });

    describe(`getMatrix`, () => {

        it(`should get matrix for a standard ellipse`, () => {
            const ellipse = Ellipse.FromCanonicalForm(1, 2);
            const expected = [
                [4, 0, 0],
                [0, 1, 0],
                [0, 0, -4],
            ];
            expect(ellipse.getMatrix()).toEqual(expected);
        });

        it(`should get matrix for a rotated ellipse`, () => {
            const ellipse = Ellipse.FromGeneralForm(29 / 2, -21, 29 / 2, 0, 0, -100);
            const expected = [
                [29 / 2, -21 / 2, 0],
                [-21 / 2, 29 / 2, 0],
                [0, 0, -100],
            ];
            expect(ellipse.getMatrix()).toEqual(expected);
        });

    });

    describe(`getArea`, () => {

        it(`should get area of a standard ellipse`, () => {

        });

        it(`should get area of a rotated ellipse`, () => {
            const ellipse = Ellipse.FromGeneralForm(29 / 2, 21, 29 / 2, 0, 0, -100);
            const area = 10 * Math.PI;
            expect(ellipse.getArea()).toEqual(area);
        });

    });

    xdescribe(`getPerimeter`, () => {

        it(`should get perimeter of a standard ellipse`, () => {
            const ellipse = Ellipse.FromCanonicalForm(2, 1);
            expect(ellipse.getPerimeter()).toBeCloseTo(9.68845);
        });

        it(`should get perimeter of a rotated ellipse`, () => {
            const ellipse = Ellipse.FromGeneralForm(29 / 2, 21, 29 / 2, 0, 0, -100);
            expect(ellipse.getPerimeter()).toBeCloseTo(23.0131);
        });

    });

});
