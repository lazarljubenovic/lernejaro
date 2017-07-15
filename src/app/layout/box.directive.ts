import {Directive, HostBinding} from '@angular/core'
import {LoggerService} from '../logger.service'

@Directive({
    selector: '[lrnBox]',
})
export class BoxDirective {

    @HostBinding('style.height') public height: string = '100%'
    @HostBinding('style.width') public width: string = '100%'

    constructor(protected logger: LoggerService) {
    }

}
