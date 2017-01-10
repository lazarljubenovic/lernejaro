import {Directive, ContentChildren, QueryList, ElementRef, Input, forwardRef} from '@angular/core';
import {ChartDataDirective} from '../../../chart-data.directive';
import {CanvasUtil} from '../../../canvas-util';
import {ChartService} from '../../../chart.service';
import {getByString} from '../../../../planimetryts/renderers/color';
import {ChartStrategyBase, Rectangle} from '../../chart-strategy-base';

function getColor(name: string, variant: string = '500'): string {
    return getByString(name, variant).hex();
}

interface VerticalBar {
    label: string;
    value: number;
    color: string;
}

@Directive({
    selector: 'lrn-chart[verticalBars]',
    providers: [{
        provide: ChartStrategyBase,
        useExisting: forwardRef(() => VerticalBarsDirective),
    }],
})
export class VerticalBarsDirective extends ChartStrategyBase {

    @Input() public displayScale: boolean = true;
    @Input() public displayGuidelines: boolean = true;
    @Input() public displayLabels: boolean = true;
    @Input() public labelsAbove: boolean = false;

    @ContentChildren(ChartDataDirective)
    public set dataDirectives(value: QueryList<ChartDataDirective>) {
        this._dataDirectives = value;
        if (this.isReady) {
            this.render(value.toArray());
        }
    }

    /**
     * Area for actual bars (not scale, not labels)
     */
    private getBarsArea(): Rectangle {
        const [x, y] = [20, 20];
        const {w, h} = this.getCanvasRect();
        return {x, y, w: w - 40, h: h - 40};
    }

    private getNotches(bars: VerticalBar[]): number[] {
        // TODO We need a method for automatically calculating a nice step if none is given

        // Scale options -- These need to be set by consumer
        // TODO
        const step = 5;

        const maxValue = Math.max(...bars.map(bar => bar.value));
        return Array(Math.ceil(maxValue / step) + 1).fill(0)
            .map((_, i) => (i + 1) * step);
    }

    private getScaleAreaWidth(notches: number[]): number {
        const maxNotchWidth = Math.max(...notches.map(number => {
            const text = number.toString();
            return this.canvas.getContext('2d').measureText(text).width;
        }));
        const leftPadding = 10;
        const rightPadding = 5;
        return Math.round(leftPadding + maxNotchWidth + rightPadding);
    }

    // TODO
    private getLabelAreaHeight(bars: VerticalBar[]): number {
        return 20;
    }

    private renderBarsArea(bars: VerticalBar[], boundingBox: Rectangle): void {
        const ctx = this.canvas.getContext('2d');
        const {x, y, w, h} = boundingBox;
        const notches = this.getNotches(bars);
        const topNotch = notches.slice(-1)[0];

        ctx.save();

        ctx.transform(1, 0, 0, 1, x, y);

        // TODO These parameters should be settable by consumer
        const spaceAround: number = 20;
        const spaceBetween: number = 10;

        // These parameters are calculated by the ones given above
        const barWidth: number = (w - 2 * spaceAround - (bars.length + 1) * spaceBetween) / bars.length;

        const maxValue = Math.max(...bars.map(bar => bar.value));
        const normalizingRatio = h / topNotch; // TODO probably multiply this further by a constant eg 9/10

        let currentX = spaceAround + spaceBetween;

        bars.forEach((current, i) => {
            ctx.beginPath();
            const barHeight = current.value * normalizingRatio;
            CanvasUtil.Rectangle(ctx, currentX, h - barHeight, barWidth, barHeight);
            const color = current.color ? current.color : this.getDefaultColor(i);
            ctx.strokeStyle = getColor(color, '600');
            ctx.fillStyle = getColor(color, '300');
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            currentX += barWidth + spaceBetween;
        });

        ctx.restore();
    }

    private renderScaleArea(notches: number[], boundingBox: Rectangle): void {
        const ctx = this.canvas.getContext('2d');
        const {x, y, w, h} = boundingBox;

        const step = h / (notches.length);
        let currentY = step;

        ctx.save();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        //ctx.translate(1, 1);

        notches.reverse().slice(1).forEach(notch => {
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';

            ctx.fillText(notch.toString(), w - 5, currentY);
            ctx.beginPath();
            //ctx.arc(w - 5, currentY, 3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            currentY += step;
        });

        ctx.restore();
    }

    private renderLabelsArea(bars: VerticalBar[], boundingBox: Rectangle): void {
        const ctx = this.canvas.getContext('2d');
        const {x, y, w, h} = boundingBox;

        // Rectangle for debugging purposes
        ctx.beginPath();
        CanvasUtil.Rectangle(ctx, x, y, w, h);
        ctx.stroke();
        ctx.closePath();

        // TODO
    }

    public render(bars: VerticalBar[] = this._dataDirectives.toArray()): void {
        this.clear();
        const {w, h} = this.getCanvasRect();
        const notches = this.getNotches(bars);

        const left = this.getScaleAreaWidth(notches);
        const bottom = this.getLabelAreaHeight(bars);

        const scaleAreaRectangle: Rectangle = {
            x: 0,
            y: 0,
            w: left,
            h: h - bottom,
        };

        const labelAreaRectangle: Rectangle = {
            x: left,
            y: h - bottom,
            w: w - left,
            h: bottom,
        };

        const barsAreaRectangle: Rectangle = {
            x: left,
            y: 0,
            w: w - left,
            h: h - bottom,
        };

        this.renderScaleArea(notches, scaleAreaRectangle);
        this.renderLabelsArea(bars, labelAreaRectangle);
        this.renderBarsArea(bars, barsAreaRectangle);
    }

    constructor(private elementRef: ElementRef,
                chartService: ChartService) {
        super(chartService);
    }

}
