import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
    selector: 'lrn-view-input',
    templateUrl: './view-input.component.html',
    styleUrls: ['./view-input.component.scss']
})
export class ViewInputComponent implements OnInit {

    @Input() public type: 'number' | 'text' = 'text'
    @Input() public name: string
    @Input() public step: number = 1
    @Input() public decimals: number = 2
    @Input() public latex: boolean = false

    @Input() public value: any
    @Output() public valueChange = new EventEmitter<any>()

    constructor() {
    }

    ngOnInit() {
        if (this.name == null) {
            console.warn('view-input without a name; useless component')
        }
    }

}
