import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'lrn-digression',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./digression.component.scss'],
})
export class DigressionComponent implements OnInit {

  @Input() anchor: HTMLElement
  @Input() heading: string

  constructor() {
  }

  ngOnInit() {
  }

}
