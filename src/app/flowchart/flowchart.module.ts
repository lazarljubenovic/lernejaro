import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FlowchartComponent} from './flowchart.component'
import { FlowchartWhileComponent } from './flowchart-while/flowchart-while.component'
import { FlowchartConditionComponent } from './flowchart-condition/flowchart-condition.component'
import { FlowchartBlockComponent } from './flowchart-block/flowchart-block.component'
import { FlowchartConnectorComponent } from './flowchart-connector/flowchart-connector.component'
import { FlowchartArrowComponent } from './flowchart-arrow/flowchart-arrow.component'
import { FlowchartLineComponent } from './flowchart-line/flowchart-line.component'
import { FlowchartNextComponent } from './flowchart-next/flowchart-next.component'
import { FlowchartRepeatComponent } from './flowchart-repeat/flowchart-repeat.component'
import { FlowchartIfComponent } from './flowchart-if/flowchart-if.component'
import { FlowchartThenComponent } from './flowchart-then/flowchart-then.component'
import { FlowchartElseComponent } from './flowchart-else/flowchart-else.component'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FlowchartComponent,
        FlowchartWhileComponent,
        FlowchartConditionComponent,
        FlowchartBlockComponent,
        FlowchartConnectorComponent,
        FlowchartArrowComponent,
        FlowchartLineComponent,
        FlowchartNextComponent,
        FlowchartRepeatComponent,
        FlowchartIfComponent,
        FlowchartThenComponent,
        FlowchartElseComponent,
    ],
    exports: [
        FlowchartComponent,
    ],
})
export class FlowchartModule {
}
