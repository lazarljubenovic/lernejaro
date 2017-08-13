import {Injectable} from '@angular/core'
import {ModalService} from '../ui/modal/modal.service'

@Injectable()
export class LoggerService {

  /**
   * @deprecated
   */
  public warn(description, ...args) {
    console.warn(`LERNEJARO AWARE WARNING:\n${description}\n`, ...args)
  }

  public displayError(component: any, context = {}): void {
    this.modal.open(component, context)
  }

  constructor(private modal: ModalService) {
  }

}
