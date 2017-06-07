import {Component, OnInit, EventEmitter, Output} from '@angular/core'

@Component({
    selector: 'lrn-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Output() public close = new EventEmitter<void>()

    public onClick(event: MouseEvent) {
        if (event.srcElement.className == 'full-screen') {
            this.close.emit()
        }
    }

    constructor() {
    }

    ngOnInit() {
    }

}
