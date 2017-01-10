import {Directive, ContentChildren, QueryList, ElementRef, forwardRef} from '@angular/core';
import {ChartDataDirective} from '../../chart-data.directive';
import {ChartService} from '../../chart.service';
import {getByString} from '../../../planimetryts/renderers/color';
import {ChartComponent} from '../../chart/chart.component';
import {ChartStrategyBase} from '../chart-strategy-base';

function getColor(name: string, variant: string = '500'): string {
    return getByString(name, variant).hex();
}

function polarToCartesian(center: {x: number, y: number},
                          r: number,
                          phi: number): {x: number, y: number} {
    const c = Math.cos(phi);
    const s = Math.sin(phi);
    return {x: c * r + center.x, y: c * r + center.y};
}

@Directive({
    selector: '[pie]',
    providers: [{
        provide: ChartStrategyBase,
        useExisting: forwardRef(() => PieDirective),
    }],
})
export class PieDirective extends ChartStrategyBase {

    @ContentChildren(ChartDataDirective)
    public set dataDirectives(value: QueryList<ChartDataDirective>) {
        this._dataDirectives = value;
        if (this.isReady) {
            this.render(value.toArray());
        }
    }

    public render(data: ChartDataDirective[] = this._dataDirectives.toArray()) {
        this.clear();
        const {x, y, w, h} = this.getCanvasRect();
        const radius: number = Math.min(w, h) / 2 - 2;

        const c = {x: x + w / 2, y: y + h /2};
        const ctx = this.canvas.getContext('2d');

        const total = data.reduce((acc, curr) => acc + curr.value, 0);
        const mul = 2 * Math.PI / total;
        let previousAngle = 0;

        data.forEach(current => {
            // console.log(current);
            const angle = previousAngle + mul * current.value;
            ctx.beginPath();
            ctx.strokeStyle = getColor(current.color, '600');
            ctx.fillStyle = getColor(current.color, '300');
            ctx.moveTo(c.x, c.y);
            ctx.arc(c.x, c.y, radius, previousAngle, angle);
            ctx.lineTo(c.x, c.y);
            previousAngle = angle;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        });
    }

    constructor(private elementRef: ElementRef,
                chartService: ChartService) {
        super(chartService);
    }

}
