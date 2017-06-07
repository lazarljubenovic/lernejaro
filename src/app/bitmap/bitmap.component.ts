import {Component, OnInit, ChangeDetectionStrategy, OnChanges, Input} from '@angular/core'

@Component({
    selector: 'lrn-bitmap',
    templateUrl: './bitmap.component.html',
    styleUrls: ['./bitmap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BitmapComponent implements OnInit, OnChanges {

    @Input() public bitmap: string[][] = []

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {

    }

}
