import {Injectable} from '@angular/core';

@Injectable()
export class UniqueIdService {

    constructor() {
    }

    private getRandomString(length: number = 6): string {
        return (Math.random() + 1).toString(36).substr(3, length);
    }

    public getUniqueId(prefix: string = ''): string {
        return prefix + this.getRandomString(6);
    }

}
