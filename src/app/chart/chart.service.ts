import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

@Injectable()
export class ChartService {

    constructor() {
    }

    public reRender() {
        this.reRender$.next()
    }

    public onSizeChange() {
        this.sizeChange$.next()
    }

    public reRender$ = new Subject<void>()
    public sizeChange$ = new Subject<void>()

    public getEquallySpacedColors(numberOfColors: number): string[] {
        const colors = [
            'red', 'pink', 'purple', 'deep-purple', 'indigo',
            'blue', 'light-blue', 'cyan', 'teal', 'green',
            'light-green', 'lime', 'yellow', 'amber', 'orange',
            'deep-orange', 'brown', 'grey', 'blue-grey',
        ]
        let indexes
        switch (numberOfColors) {
            case 1:
                indexes = [0]
                break
            case 2:
                indexes = [0, 8]
                break
            case 3:
                indexes = [0, 5, 10]
                break
            case 4:
                indexes = [0, 4, 8, 12]
                break
            case 5:
                indexes = [0, 4, 7, 11, 15]
                break
            case 6:
                indexes = [0, 3, 6, 9, 12, 15]
                break
            case 7:
                indexes = [0, 2, 5, 7, 10, 12, 15]
                break
            case 8:
                indexes = [0, 2, 4, 6, 8, 10, 12, 14]
                break
            case 9:
                indexes = [0, 1, 3, 4, 6, 8, 9, 11, 13, 15]
                break
            case 10:
                indexes = [0, 1, 3, 5, 6, 8, 10, 11, 13, 15]
                break
            case 11:
                indexes = [0, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15]
                break
            case 12:
                indexes = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14]
                break
            case 13:
                indexes = [0, 1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15]
                break
            case 14:
                indexes = [0, 1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15]
                break
            case 15:
                indexes = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15]
                break
            case 16:
                indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
                break
            default:
                indexes = []
        }
        return indexes.map(i => colors[i])
    }

}
