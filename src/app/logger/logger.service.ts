import {Injectable} from '@angular/core'
import {ModalService} from '../modal/modal.service'

@Injectable()
export class LoggerService {

  public display(component: any, context = {}): void {
    this.modal.open(component, context)
  }

  constructor(private modal: ModalService) {
  }

}
