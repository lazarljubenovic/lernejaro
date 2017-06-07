import {
    Component,
    OnInit,
    Input,
    HostBinding,
    ChangeDetectionStrategy,
    OnChanges, ViewEncapsulation
} from '@angular/core'
import {PaletteService} from '../palette.service'

@Component({
    selector: 'button[lrnButton]',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnChanges {

    @Input('lrnButton') public style: 'raised' | 'flat' | 'fab' = 'raised'
    public color: string = 'blue'

    @HostBinding('class') public klass: string

    constructor(private palette: PaletteService) {
        this.color = palette.color
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.klass = 'lrnButton ' + (this.style || 'raised') + ' ' + this.color
    }

}
