import {
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core'
import {SlideColumnComponent} from '../slide-column/slide-column.component'

@Component({
  selector: 'lrn-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SlideComponent implements OnInit {

  @Input() public title: string = 'Untitled'
  @Input() public subtitle: string
  @Input() public logo: string | TemplateRef<any>

  @ContentChildren(SlideColumnComponent)
  public slideColumnComponents: QueryList<SlideColumnComponent>

  public typeOf(something: any): string {
    return typeof something
  }

  constructor(public elementRef: ElementRef) {
  }

  ngOnInit() {
  }

}
