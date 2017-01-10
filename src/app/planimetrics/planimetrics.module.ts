import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanimetricsComponent} from './planimetrics.component';
import {RendererService} from './renderer.service';
import {PlanimetricsTableComponent} from './planimetrics-table/planimetrics-table.component';
import {TableModule} from '../table/table.module';
import {ObjectRowComponent} from './planimetrics-table/object-row/object-row.component';
import {ObjectEditorModule} from '../object-editor/object-editor.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ObjectEditorModule,
    ],
    declarations: [
        PlanimetricsComponent,
        PlanimetricsTableComponent,
        ObjectRowComponent,
    ],
    exports: [
        PlanimetricsComponent,
        PlanimetricsTableComponent,
    ],
    providers: [
        RendererService,
    ],
})
export class PlanimetricsModule {
}
