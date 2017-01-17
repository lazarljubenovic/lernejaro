import {
    Component,
    OnInit,
    Input,
    HostBinding,
    ChangeDetectionStrategy,
    OnChanges, ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'button[lrnButton]',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnChanges {

    @Input('lrnButton') public type: 'raised' | 'flat' | 'fab' = 'raised';
    @Input() public color: string = 'blue';

    @HostBinding('class') public klass: string;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.klass = 'lrnButton ' + this.type + ' ' + this.color;
    }

}
