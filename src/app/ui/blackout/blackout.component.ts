import {Component, HostBinding, HostListener} from '@angular/core'
import {BlackoutService} from './blackout.service'
import {animate, state, style, transition, trigger} from '@angular/animations'

@Component({
  selector: 'lrn-blackout',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./blackout.component.scss'],
  animations: [
    trigger('showHide', [
      state('*', style({
        opacity: 1,
      })),
      state('void', style({
        opacity: 0,
      })),
      transition('* <=> void', animate('.33s ease')),
    ]),
  ],
})
export class BlackoutComponent {

  // Set from the service.
  public service: BlackoutService

  @HostBinding('class.visible')
  public isVisible: boolean = false

  @HostBinding('@showHide') showHide = true

  @HostListener('click', ['$event'])
  public onClick(event): void {
    this.service.click$.next(event)
  }

}
