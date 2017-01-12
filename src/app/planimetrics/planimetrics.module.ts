import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanimetricsComponent} from './planimetrics.component';
import {RendererService} from './renderer.service';
import {PlanimetricsTableComponent} from './planimetrics-table/planimetrics-table.component';
import {TableModule} from '../table/table.module';
import {ObjectRowComponent} from './planimetrics-table/object-row/object-row.component';
import {ObjectEditorModule} from '../object-editor/object-editor.module';
import {FormsModule} from '@angular/forms';
import {PlanimetricsControlPointComponent} from './controls/planimetrics-control-point/planimetrics-control-point.component';
import {UiModule} from '../ui/ui.module';
import {CartesianPipe} from './controls/planimetrics-control-point/cartesian.pipe';
import {PolarPipe} from './controls/planimetrics-control-point/polar.pipe';
import {LabelPipe} from './controls/pipes/label.pipe';
import {KindPipe} from './controls/pipes/kind.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UiModule,
        TableModule,
        ObjectEditorModule,
    ],
    declarations: [
        PlanimetricsComponent,
        PlanimetricsTableComponent,
        ObjectRowComponent,
        PlanimetricsControlPointComponent,
        CartesianPipe,
        PolarPipe,
        LabelPipe,
        KindPipe,
    ],
    exports: [
        PlanimetricsComponent,
        PlanimetricsTableComponent,
        PlanimetricsControlPointComponent,
    ],
    providers: [
        RendererService,
    ],
})
export class PlanimetricsModule {
}
