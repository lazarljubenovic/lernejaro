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

    // export function GetIdentity(dimension: number): number[][] {
    // TODO
    // }

}
