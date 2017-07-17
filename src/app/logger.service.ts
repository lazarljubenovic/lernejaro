import {Injectable} from '@angular/core'

@Injectable()
export class LoggerService {

    public error(description, ...args) {
        console.error(`LERNEJARO AWARE ERROR:\n${description}\n`, ...args)
    }

    public warn(description, ...args) {
        console.warn(`LERNEJARO AWARE WARNING:\n${description}\n`, ...args)
    }

    constructor() {
    }

}
