import {Directive, ContentChildren, QueryList, ElementRef} from '@angular/core';
import {ChartDataDirective} from './chart-data.directive';
import {ChartService} from './chart.service';
import {getByString} from '../planimetryts/renderers/color';

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

interface Rectangle {
    x: number;
    y: number;
    w: number;
    h: number;
}

@Directive({
    selector: '[pie]'
})
export class PieDirective {

    private _dataDirectives: QueryList<ChartDataDirective>;

    @ContentChildren(ChartDataDirective)
    public set dataDirectives(value: QueryList<ChartDataDirective>) {
        this._dataDirectives = value;
        this.render(value.toArray());
    }

    private canvas: HTMLCanvasElement;

    private getCanvasRect(): Rectangle {
        return {x: 0, y: 0, w: this.canvas.width, h: this.canvas.height};
    }

    private prepare(): void {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.elementRef.nativeElement.appendChild(this.canvas);
    }

    private clear(): void {
        const {x, y, w, h} = this.getCanvasRect();
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(x, y, w, h);
    }

    private render(data: ChartDataDirective[]) {
        this.clear();
        const {x, y, w, h} = this.getCanvasRect();
        const c = {x: x + w / 2, y: y + w / 2};
        const ctx = this.canvas.getContext('2d');

        const radius = w / 2 - 2;

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
                private chartService: ChartService) {
    }

    ngOnInit() {
        this.prepare();

        this.chartService.reRender$.subscribe(() => {
            this.render(this._dataDirectives.toArray())
        });
    }

}
