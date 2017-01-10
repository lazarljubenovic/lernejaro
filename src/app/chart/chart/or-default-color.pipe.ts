import {Pipe, PipeTransform} from '@angular/core';
import {ChartService} from '../chart.service';

@Pipe({
    name: 'orDefaultColor'
})
export class OrDefaultColorPipe implements PipeTransform {

    constructor(private chartService: ChartService) {
    }

    transform(value: string, index: number, total: number): string {
        if (value) {
            return value;
        } else {
            return this.chartService.getEquallySpacedColors(total)[index];
        }
    }

}
