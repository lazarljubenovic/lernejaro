import {
    Component, OnInit, Input, ElementRef, OnChanges,
    ChangeDetectionStrategy
} from '@angular/core';
import {FlowchartArrow} from '../flowchart-arrow.interface';

@Component({
    selector: 'lrn-flowchart-arrow',
    templateUrl: './flowchart-arrow.component.html',
    styleUrls: ['./flowchart-arrow.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowchartArrowComponent implements OnInit, OnChanges {

    @Input() public arrow: FlowchartArrow;

    public topLeft: {x: number; y: number};
    public bottomRight: {x: number; y: number};

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.arrow) {
            const top = this.arrow.begin;
            const bottom = this.arrow.end;
            const left = this.elementRef.nativeElement.getBoundingClientRect().width / 2;
            const right = left + this.arrow.offset;
            this.topLeft = {x: left, y: top};
            this.bottomRight = {x: right, y: bottom};
        }
    }

}
