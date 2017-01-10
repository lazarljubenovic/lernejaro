import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObjectEditorComponent} from './object-editor.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ObjectEditorComponent,
    ],
    exports: [
        ObjectEditorComponent,
    ],
})
export class ObjectEditorModule {
}
