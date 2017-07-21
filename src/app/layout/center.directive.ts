import {Directive, HostBinding} from '@angular/core'

@Directive({selector: '[lrnCenter]'})
export class CenterDirective {
  @HostBinding('style.display') public display: string = 'flex'
  @HostBinding('style.justify-content') public justifyContent: string = 'center'
  @HostBinding('style.align-items') public alignItems: string = 'center'
}
