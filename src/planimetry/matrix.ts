// export class Matrix {
//
//     public static Multiply(a: Matrix, b: Matrix): Matrix {
//         let result = new Matrix();
//         for (let row = 0; row < a.rows(); row++) {
//             for (let col = 0; col < b.cols(); col++) {
//                 let sum = 0;
//                 for (let inner = 0; inner < a.cols(); inner++) {
//                     sum += a[row][inner] * b[inner][col];
//                 }
//                 result.setValue(row, col, sum);
//             }
//         }
//         return result;
//     }
//
//     public static Transpose(matrix: Matrix): Matrix {
//         return new Matrix(matrix.data.map((_, i) => matrix.data.map(x => x[i])));
//     }
//
//     protected _data: number[][];
//
//     public get data(): number[][] {
//         return this._data;
//     }
//
//     constructor(data?: number[][]) {
//         this._data = data;
//     }
//
//     public rows(): number {
//         return this._data.length;
//     }
//
//     public cols(): number {
//         return this._data[0].length;
//     }
//
//     public setValue(i: number, j: number, value: number): this {
//         this._data[i][j] = value;
//         return this;
//     }
//
//
// }
