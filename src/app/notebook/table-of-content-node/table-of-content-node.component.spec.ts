/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {TableOfContentNodeComponent} from './table-of-content-node.component'

xdescribe('TableOfContentNodeComponent', () => {
    let component: TableOfContentNodeComponent
    let fixture: ComponentFixture<TableOfContentNodeComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableOfContentNodeComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(TableOfContentNodeComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
