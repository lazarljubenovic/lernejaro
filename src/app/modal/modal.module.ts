import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core'
import {ModalService} from './modal.service'

export const LRN_MODAL = new InjectionToken<any>('lrn.modal')

@NgModule()
export class ModalModule {
  public static forRoot(modalComponent: any): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: [
        ModalService,
        {
          provide: LRN_MODAL,
          useValue: modalComponent,
        },
      ],
    }
  }
}
