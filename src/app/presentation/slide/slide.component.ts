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
import {LoggerService} from '../../logger.service'

@Component({
  selector: 'lrn-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SlideComponent implements OnInit {

  @Input() public section: string
  @Input() public title: string
  @Input() public subtitle: string
  @Input() public logo: string | TemplateRef<any>

  @ContentChildren(SlideColumnComponent)
  public slideColumnComponents: QueryList<SlideColumnComponent>

  public typeOf(something: any): string {
    return typeof something
  }

  constructor(public elementRef: ElementRef,
              public logger: LoggerService) {
  }

  ngOnInit() {
    this.assert()
  }

  private assert() {
    if (this.title == null) {
      this.logger.warn(`You've created a slide without a title.`, this.elementRef.nativeElement)
    }
  }

}
