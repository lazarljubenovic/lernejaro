import {Directive, HostBinding, Input} from '@angular/core'

@Directive({selector: '[lrnFullScreen]'})
export class FullScreenDirective {
  @HostBinding('style.position') public position: string = 'fixed'
  @HostBinding('style.top') public top: number = 0
  @HostBinding('style.left') public left: number = 0
  @HostBinding('style.right') public right: number = 0
  @HostBinding('style.bottom') public bottom: number = 0
  @HostBinding('style.width') public width: string = '100%'
  @HostBinding('style.height') public height: string = '100vh'
  @Input() @HostBinding('style.background-color') public backgroundColor: string = 'white'
}
