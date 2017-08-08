import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
} from '@angular/core'
import {Subject} from 'rxjs/Subject'
import {BlackoutComponent} from './blackout.component'

@Injectable()
export class BlackoutService {

  constructor(private applicationRef: ApplicationRef,
              private cfr: ComponentFactoryResolver,
              private injector: Injector) {
    this.blackoutComponentFactory = this.cfr.resolveComponentFactory(BlackoutComponent)
  }

  private rootEl = <HTMLElement>document.querySelector('app-root')

  public click$ = new Subject<MouseEvent>()

  private blackoutComponentFactory: ComponentFactory<BlackoutComponent>
  private blackoutComponent: ComponentRef<BlackoutComponent>

  public show(isVisible: boolean = false): Subject<MouseEvent> {
    this.blurApp()
    this.blackoutComponent = this.blackoutComponentFactory.create(this.injector)
    this.blackoutComponent.instance.service = this
    this.blackoutComponent.instance.isVisible = isVisible
    document.body.appendChild(this.blackoutComponent.location.nativeElement)
    this.applicationRef.attachView(this.blackoutComponent.hostView)
    return this.click$
  }

  public hide() {
    if (this.blackoutComponent == null) {
      return
    }
    this.unblurApp()
    this.applicationRef.detachView(this.blackoutComponent.hostView)
    this.blackoutComponent = null
  }

  private blurApp() {
    this.rootEl.style.filter = 'blur(3px)'
  }

  private unblurApp() {
    this.rootEl.style.filter = ''
  }

}
