import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanimetricsComponent} from './planimetrics.component';
import {RendererService} from './renderer.service';
import {PlanimetricsTableComponent} from './planimetrics-table/planimetrics-table.component';
import {TableModule} from '../table/table.module';
import {ObjectRowComponent} from './planimetrics-table/object-row/object-row.component';
import {ObjectEditorModule} from '../object-editor/object-editor.module';
import {FormsModule} from '@angular/forms';
import {UiModule} from '../ui/ui.module';
import {LinePipe} from './controls/pipes/line.pipe';
// tslint:disable-next-line
import {PlanimetricsControlComponent} from './controls/planimetrics-control/planimetrics-control.component';
import {KindPipe} from './controls/planimetrics-control/pipes/kind.pipe';
import {LabelPipe} from './controls/planimetrics-control/pipes/label.pipe';
import {FillColorPipe} from './controls/planimetrics-control/pipes/fill-color.pipe';
import {StrokeColorPipe} from './controls/planimetrics-control/pipes/stroke-color.pipe';
import {DestructPipe} from './controls/planimetrics-control/pipes/destruct.pipe';

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
        LinePipe,
        PlanimetricsControlComponent,
        KindPipe,
        LabelPipe,
        FillColorPipe,
        StrokeColorPipe,
        DestructPipe,
    ],
    exports: [
        PlanimetricsComponent,
        PlanimetricsTableComponent,
        PlanimetricsControlComponent,
    ],
    providers: [
        RendererService,
    ],
})
export class PlanimetricsModule {
}
