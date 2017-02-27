import {
    Injectable, ComponentFactoryResolver, ApplicationRef, Injector,
    ComponentFactory
} from '@angular/core';
import {ModalComponent} from './modal.component';

@Injectable()
export class ModalService {

    private modalCF: ComponentFactory<ModalComponent>;

    public show() {
        const modalCmp = this.modalCF.create(this.injector);
        document.body.appendChild(modalCmp.location.nativeElement);
        this.applicationRef.attachView(modalCmp.hostView);
    }

    public hide() {

    }

    constructor(cfr: ComponentFactoryResolver,
                private injector: Injector,
                private applicationRef: ApplicationRef) {
        this.modalCF = cfr.resolveComponentFactory(ModalComponent);
    }

}
