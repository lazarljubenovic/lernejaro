import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'lrn-slide-controls',
  templateUrl: './slide-controls.component.html',
  styleUrls: ['./slide-controls.component.scss'],
})
export class SlideControlsComponent implements OnInit {

  @Input() public totalNumberOfSlides: number = 1
  @Input() public currentSlide: number = 0
  @Input() public tableOfContents = new Map<string, number>()

  @Output() public first = new EventEmitter<void>()
  @Output() public prev = new EventEmitter<void>()
  @Output() public next = new EventEmitter<void>()
  @Output() public last = new EventEmitter<void>()

  public showPalettePicker: boolean = false
  public showNavigation: boolean = false

  constructor() {
  }

  ngOnInit() {
  }

}
