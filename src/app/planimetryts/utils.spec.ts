import {Equation} from './util';

describe(`Equation`, () => {

    xdescribe(`Linear`, () => {



    });

    describe(`Quadratic`, () => {

        describe(`should get discriminant for`, () => {
            it(`non-zero A, B, C`, () => {
                const D = Equation.Quadratic.getDiscriminant(1, -5, 6);
                expect(D).toBeCloseTo(1);
            });

            it(`C = 0`, () => {
                const D = Equation.Quadratic.getDiscriminant(1, -2, 0);
                expect(D).toBeCloseTo(4);
            });

            it(`B = 0`, () => {
                const D = Equation.Quadratic.getDiscriminant(1, 0, -4);
                expect(D).toBeCloseTo(16);
            });

            it(`B = C = 0`, () => {
                const D = Equation.Quadratic.getDiscriminant(1, 0, 0);
                expect(D).toBeCloseTo(0);
            });

            it(`D = 0 and non-zero A, B, C`, () => {
                const D = Equation.Quadratic.getDiscriminant(1, -2, 1);
                expect(D).toBeCloseTo(0);
            });
        });

        it(`should get solutions for`, () => {
            it(`non-zero A, B, C`, () => {
                const solutions = Equation.Quadratic.solve(1, -5, 6);
                expect(solutions.length).toBe(2);
                expect(solutions[0]).toBeCloseTo(2);
                expect(solutions[1]).toBeCloseTo(3);
            });

            it(`C = 0`, () => {
                const solutions = Equation.Quadratic.solve(1, -2, 0);
                expect(solutions.length).toBe(2);
                expect(solutions[0]).toBeCloseTo(0);
                expect(solutions[1]).toBeCloseTo(2);
            });

            it(`B = 0`, () => {
                const solutions = Equation.Quadratic.solve(1, 0, -4);
                expect(solutions.length).toBe(2);
                expect(solutions[0]).toBeCloseTo(-2);
                expect(solutions[1]).toBeCloseTo(+2);
            });

            it(`B = C = 0`, () => {
                const solutions = Equation.Quadratic.solve(1, 0, 0);
                expect(solutions.length).toBe(1);
                expect(solutions[0]).toBeCloseTo(0);
            });

            it(`D = 0 and non-zero A, B, C`, () => {
                const solutions = Equation.Quadratic.solve(1, -2, 1);
                expect(solutions.length).toBe(1);
                expect(solutions[0]).toBeCloseTo(1);
            });

            it(`impossible to solve`, () => {
                const solutions = Equation.Quadratic.solve(1, 2, 1);
                expect(solutions).toBe(null);
            });
        });

    });

});
