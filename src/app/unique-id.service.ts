import {Injectable} from '@angular/core';

@Injectable()
export class UniqueIdService {

    constructor() {
    }

    private _counter: number = 0;

    private getUniqueValue() {
        return ++this._counter;
    }

    public getUniqueId(prefix: string = ''): string {
        return prefix + this.getUniqueValue();
    }

}
