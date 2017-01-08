export namespace Matrix {

    export function Multiply(a: number[][], b: number[][]): number[][] {
        let result: number[][] = Array(a.length).fill(null).map(_ => []);
        for (let row = 0; row < a.length; row++) {
            for (let col = 0; col < b[0].length; col++) {
                let sum = 0;
                for (let inner = 0; inner < b.length; inner++) {
                    sum += a[row][inner] * b[inner][col];
                }
                result[row][col] = sum;
            }
        }
        return result;
    }

    export function Transpose(matrix: number[][]): number[][] {
        return matrix[0].map((_, i) => matrix.map(x => x[i]));
    }

    export function GetIdentity(dimension: number): number[][] {
        return Array(dimension).fill(null)
            .map((_, i) => Array(dimension).fill(null)
                .map((_, j) => i == j ? 1 : 0));
    }

    /**
     * Assumes that matrix has the following form.
     *
     * a c e
     * b d f
     * 0 0 1
     *
     * @param matrix
     * @constructor
     */
    export function HomogeneousInverse(matrix: number[][]): number[][] {
        const a = matrix[0][0];
        const c = matrix[0][1];
        const e = matrix[0][2];
        const b = matrix[1][0];
        const d = matrix[1][1];
        const f = matrix[1][2];
        const λ = 1 / (a * d - b * c);
        return [
            [d, -c, c * f - d * e],
            [-b, a, b * e - a * f],
            [0, 0, 1],
        ].map(_ => _.map(el => el * λ));
    }

    export function StretchX(k: number): number[][] {
        return [[k, 0], [0, 1]];
    }

    export function StretchY(k: number): number[][] {
        return [[1, 0], [0, k]];
    }

    export function Stretch(k: number): number[][] {
        return [[k, 0], [0, k]];
    }

    export function Rotate(θ: number): number[][] {
        const c = Math.cos(θ);
        const s = Math.sin(θ);
        return [[c, -s], [s, c]];
    }

    export function ShearX(k: number): number[][] {
        return [[1, k], [0, 1]];
    }

    export function ShearY(k: number): number[][] {
        return [[1, 0], [k, 1]];
    }

    export namespace Homogeneous {

        export function TranslateX(dx: number): number[][] {
            return [[1, 0, dx], [0, 1, 0], [0, 0, 1]];
        }

        export function TranslateY(dy: number): number[][] {
            return [[1, 0, 0], [0, 1, dy], [0, 0, 1]];
        }

        export function Translate(dx: number, dy: number): number[][] {
            return [[1, 0, dx], [0, 1, dy], [0, 0, 1]];
        }

        export function StretchX(k: number): number[][] {
            return [[k, 0, 0], [0, 1, 0], [0, 0, 1]];
        }

        export function StretchY(k: number): number[][] {
            return [[1, 0, 0], [0, k, 0], [0, 0, 1]];
        }

        export function Stretch(k: number): number[][] {
            return [[k, 0, 0], [0, k, 0], [0, 0, 1]];
        }

        export function Rotate(θ: number): number[][] {
            const c = Math.cos(θ);
            const s = Math.sin(θ);
            return [[c, s, 0], [-s, c, 0], [0, 0, 1]];
        }

        export function ShearX(k: number): number[][] {
            return [[1, k, 0], [0, 1, 0], [0, 0, 1]];
        }

        export function ShearY(k: number): number[][] {
            return [[1, 0, 0], [k, 1, 0], [0, 0, 1]];
        }

    }

}