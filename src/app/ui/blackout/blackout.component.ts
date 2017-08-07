import {Component, HostBinding, HostListener} from '@angular/core'
import {BlackoutService} from './blackout.service'

@Component({
  selector: 'lrn-blackout',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./blackout.component.scss'],
})
export class BlackoutComponent {

  // Set from the service.
  public service: BlackoutService

  @HostBinding('class.visible')
  public isVisible: boolean = false

  @HostListener('click', ['$event'])
  public onClick(event): void {
    this.service.click$.next(event)
  }

}
