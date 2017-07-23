import {Component, Input, TemplateRef, ViewContainerRef, ViewEncapsulation} from '@angular/core'
import {PaletteService} from '../../ui/palette.service'

@Component({
  selector: 'lrn-title-slide',
  templateUrl: './title-slide.component.html',
  styleUrls: ['./title-slide.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TitleSlideComponent {

  @Input() author: string | TemplateRef<any> = 'Unknown Author'
  @Input() description: string | TemplateRef<any>
  @Input() title: string | TemplateRef<any>

  @Input() backgroundImageUrl: string = '' // https://unsplash.it/1080?image=987'

  public typeOf(something: any): string {
    return typeof something
  }

  constructor(private palette: PaletteService,
              private viewContainerRef: ViewContainerRef) {
    this.palette.selectColor(this.palette.color, this.viewContainerRef.element.nativeElement)
  }

}
