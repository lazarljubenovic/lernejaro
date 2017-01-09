import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ChartService {

    constructor() {
        console.log('chart service init');
    }

    public reRender() {
        this.reRender$.next();
    }

    public reRender$ = new Subject<void>();

}
