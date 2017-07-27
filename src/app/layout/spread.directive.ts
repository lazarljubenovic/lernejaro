import {Directive, HostBinding} from '@angular/core'

@Directive({selector: '[lrnSpread]'})
export class SpreadDirective {
  @HostBinding('style.height') public height: string = '100%'
  @HostBinding('style.width') public width: string = '100%'
}
