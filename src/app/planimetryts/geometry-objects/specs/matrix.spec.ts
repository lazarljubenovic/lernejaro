import {Matrix} from '../matrix';
import {areEqualFloats} from '../../util';


const customEqualities = function (first: any, second: any) {
    if (typeof first == 'number' && typeof second == 'number') {
        return areEqualFloats(first, second);
    }
};

describe(`Matrix`, () => {

    beforeEach(() => jasmine.addCustomEqualityTester(customEqualities));

    it(`should transpose a matrix`, () => {
        const a = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        const b = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
        expect(Matrix.Transpose(a)).toEqual(b);

        const c = [[1], [2], [3]];
        const d = [[1, 2, 3]];
        expect(Matrix.Transpose(c)).toEqual(d);
        expect(Matrix.Transpose(d)).toEqual(c);
    });

    it(`should multiply matrices`, () => {
        const m = [[1, 2], [3, 4]];

        const a = [[0], [0]];
        expect(Matrix.Multiply(m, a)).toEqual([[0], [0]]);

        const b = [[1], [1]];
        expect(Matrix.Multiply(m, b)).toEqual([[3], [7]]);

        const x = [[1, 2]];
        const y = [[1], [2]];
        expect(Matrix.Multiply(x, y)).toEqual([[5]]);
        expect(Matrix.Multiply(y, x)).toEqual([[1, 2], [2, 4]]);

        const t = [[1, 2, 3, 4, 5, 6]];
        const s = Matrix.Transpose(t);
        expect(Matrix.Multiply(s, t)).toEqual(
            [
                [1, 2, 3, 4, 5, 6],
                [2, 4, 6, 8, 10, 12],
                [3, 6, 9, 12, 15, 18],
                [4, 8, 12, 16, 20, 24],
                [5, 10, 15, 20, 25, 30],
                [6, 12, 18, 24, 30, 36],
            ]
        );
    });

    it(`should generate identity matrices`, () => {
        const i1 = [[1]];
        const i2 = [[1, 0], [0, 1]];
        const i3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        expect(Matrix.GetIdentity(1)).toEqual(i1);
        expect(Matrix.GetIdentity(2)).toEqual(i2);
        expect(Matrix.GetIdentity(3)).toEqual(i3);
    });

    it(`should get homogeneous inverse for I3`, () => {
        const M = Matrix.GetIdentity(3);
        const actual = Matrix.HomogeneousInverse(M);
        expect(actual).toEqual(M);
    });

    it(`should get homogeneous inverse for translation`, () => {
        const A = Matrix.Homogeneous.Translate(1, 2);
        const E = Matrix.Homogeneous.Translate(-1, -2);
        expect(Matrix.HomogeneousInverse(A)).toEqual(E);
        expect(Matrix.HomogeneousInverse(E)).toEqual(A);
    });

    describe(`should get homogeneous matrix for`, () => {
        it(`translation along X`, () => {
            const m = [[1, 0, 2], [0, 1, 0], [0, 0, 1]];
            expect(Matrix.Homogeneous.TranslateX(2)).toEqual(m);
        });
        it(`translation along Y`, () => {
            const m = [[1, 0, 0], [0, 1, 2], [0, 0, 1]];
            expect(Matrix.Homogeneous.TranslateY(2)).toEqual(m);
        });
        it(`translation along X and Y`, () => {
            const m = [[1, 0, 2], [0, 1, 3], [0, 0, 1]];
            expect(Matrix.Homogeneous.Translate(2, 3)).toEqual(m);
        });
        it(`stretching along X`, () => {
            const m = [[2, 0, 0], [0, 1, 0], [0, 0, 1]];
            expect(Matrix.Homogeneous.StretchX(2)).toEqual(m);
        });
        it(`stretching along Y`, () => {
            const m = [[1, 0, 0], [0, 2, 0], [0, 0, 1]];
            expect(Matrix.Homogeneous.StretchY(2)).toEqual(m);
        });
        it(`stretching along X and Y`, () => {
            const m = [[2, 0, 0], [0, 2, 0], [0, 0, 1]];
            expect(Matrix.Homogeneous.Stretch(2)).toEqual(m);
        });
        it(`rotation`, () => {
            const m = [[0, -1, 0], [1, 0, 0], [0, 0, 1]];
            const n = Matrix.Homogeneous.Rotate(Math.PI / 2);
            m.forEach((_, i) => {
                _.forEach((_, j) => {
                    expect(_).toBeCloseTo(n[i][j]);
                });
            });
        });
        it(`shearing along X axis`, () => {
            const m = [[1, 2, 0], [0, 1, 0], [0, 0, 1]];
            expect(Matrix.Homogeneous.ShearX(2));
        });
        it(`shearing along Y axis`, () => {
            const m = [[1, 0, 0], [2, 1, 0], [0, 0, 1]];
            expect(Matrix.Homogeneous.ShearY(2)).toEqual(m);
        });
    });

});
