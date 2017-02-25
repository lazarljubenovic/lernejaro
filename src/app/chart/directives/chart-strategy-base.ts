import {ChartService} from '../chart.service';
import {QueryList, AfterViewInit} from '@angular/core';
import {ChartDataDirective} from '../chart-data.directive';

export interface Rectangle {
    x: number;
    y: number;
    w: number;
    h: number;
}

export abstract class ChartStrategyBase implements AfterViewInit {

    protected _dataDirectives: QueryList<ChartDataDirective>;
    public canvas: HTMLCanvasElement;

    public isReady: boolean = false;

    protected getDefaultColor(index: number): string {
        return this.chartService
            .getEquallySpacedColors(this._dataDirectives.length)[index];
    }

    public abstract render();

    protected getCanvasRect(): Rectangle {
        return {x: 0, y: 0, w: this.canvas.width, h: this.canvas.height};
    }

    protected clear(): void {
        const {x, y, w, h} = this.getCanvasRect();
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(x, y, w, h);
    }

    constructor(protected chartService: ChartService) {

    }

    ngAfterViewInit() {
    }

}
