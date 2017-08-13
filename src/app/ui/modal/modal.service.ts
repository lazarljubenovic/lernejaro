import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
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
  // private modalEmbeddedViewRef: EmbeddedViewRef<void>

  public open(templateOrComponentRef: TemplateRef<any> | Function, context = {}): void {
    if (templateOrComponentRef instanceof TemplateRef) {
      return this.openFromTemplate(templateOrComponentRef)
    } else {
      return this.openFromComponent(templateOrComponentRef, context)
    }
  }

  private openFromTemplate(contentTemplate: TemplateRef<void>): void {
    this.blackout.show(true).take(1).subscribe(this.close.bind(this))
    const modalEmbeddedViewRef = contentTemplate.createEmbeddedView(null)
    this.modalCmp = this.modelComponentFactory.create(
      this.injector,
      [modalEmbeddedViewRef.rootNodes],
    )
    document.body.appendChild(this.modalCmp.location.nativeElement)
    this.applicationRef.attachView(this.modalCmp.hostView)
    this.applicationRef.attachView(modalEmbeddedViewRef)
    modalEmbeddedViewRef.detectChanges()
  }

  private openFromComponent(component, context = {}): void {
    const componentFactory = this.cfr.resolveComponentFactory(component)
    const cmp = componentFactory.create(this.injector)
    this.modalCmp = this.modelComponentFactory.create(
      this.injector,
      [[cmp.location.nativeElement]],
    )
    setTimeout(() => {
      this.blackout.show(true).take(1).subscribe(this.close.bind(this))
      document.body.appendChild(this.modalCmp.location.nativeElement)
      this.applicationRef.attachView(this.modalCmp.hostView)
      this.applicationRef.attachView(cmp.hostView)
      Object.keys(context).forEach(key => {
        cmp.instance[key] = context[key]
      })
      cmp.changeDetectorRef.detectChanges()
    })
  }

  public close() {
    this.blackout.hide()
    if (this.modalCmp != null) {
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
