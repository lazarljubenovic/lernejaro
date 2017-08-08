import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef, EmbeddedViewRef,
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
    this.applicationRef.attachView(this.modalCmp.hostView)
    this.applicationRef.attachView(this.modalEmbeddedViewRef)
    this.modalEmbeddedViewRef.detectChanges()
  }

  public close() {
    if (this.modalCmp != null) {
      this.blackout.hide()
      this.applicationRef.detachView(this.modalCmp.hostView)
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
