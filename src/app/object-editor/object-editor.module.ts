import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObjectEditorComponent} from './object-editor.component';
import {FormsModule} from '@angular/forms';
import {KeyValuePairsPipe} from './key-value-pairs.pipe';
import {UiModule} from '../ui/ui.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UiModule,
    ],
    declarations: [
        ObjectEditorComponent,
        KeyValuePairsPipe,
    ],
    exports: [
        ObjectEditorComponent,
    ],
})
export class ObjectEditorModule {
}
