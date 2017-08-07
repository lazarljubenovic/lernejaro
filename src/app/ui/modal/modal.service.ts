import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core'
import {ModalComponent} from './modal.component'
import {BlackoutService} from '../blackout/blackout.service'

@Injectable()
export class ModalService {

  private modelComponentFactory: ComponentFactory<ModalComponent>
  private modalCmp: ComponentRef<ModalComponent>
  private modalEmbeddedViewRef: EmbeddedViewRef<void>

  public open(contentTemplate: TemplateRef<void>): void {
    this.blackout.show(true).take(1).subscribe(() => {
      this.close()
    })
    this.modalEmbeddedViewRef = contentTemplate.createEmbeddedView(null)
    this.modalCmp = this.modelComponentFactory.create(
      this.injector,
      [this.modalEmbeddedViewRef.rootNodes],
    )
    document.body.appendChild(this.modalCmp.location.nativeElement)
    this.applicationRef.attachView(this.modalEmbeddedViewRef)
  }

  public close() {
    if (this.modalCmp != null) {
      this.blackout.hide()
      this.modalCmp.destroy()
      this.applicationRef.detachView(this.modalEmbeddedViewRef)
      this.modalCmp = null
    }
  }

  constructor(private cfr: ComponentFactoryResolver,
              private injector: Injector,
              private applicationRef: ApplicationRef,
              private blackout: BlackoutService) {
    this.modelComponentFactory = cfr.resolveComponentFactory(ModalComponent)
  }

}
