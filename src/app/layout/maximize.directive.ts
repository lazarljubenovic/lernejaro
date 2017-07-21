import {Directive, HostBinding} from '@angular/core'

@Directive({selector: '[lrnMaximize]'})
export class MaximizeDirective {
  @HostBinding('style.width') public width: string = '100%'
  @HostBinding('style.height') public height: string = '100%'
  @HostBinding('style.display') public display: string = 'flex'
}
