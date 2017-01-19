import {Injectable} from '@angular/core';

@Injectable()
export class UniqueIdService {

    constructor() {
    }

    private _counter: number = 0;

    private getRandomString(length: number = 6): string {
        return (Math.random() + 1).toString(36).substr(3, length);
    }

    private getUniqueValue() {
        return ++this._counter;
    }

    public getUniqueId(prefix: string = ''): string {
        return prefix + this.getUniqueValue();
    }

}
