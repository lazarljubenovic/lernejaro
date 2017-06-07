import {
    Component,
    OnInit,
    ViewEncapsulation,
    ContentChildren,
    QueryList,
    AfterContentInit,
    ElementRef,
    ViewChild,
    HostBinding
} from '@angular/core'
import {
    H1Directive,
    H2Directive,
    H3Directive,
    H4Directive,
    H5Directive,
    H6Directive,
    HDirective
} from './directives/heading-directives'
import {Tree} from './tree/tree'
import {TreeNode} from './tree/tree-node'
import {
    TreeTableOfContent,
    TreeNodeTableOfContent,
    NodeDataTableOfContent
} from './table-of-content/table-of-content-tree-node.interface'

@Component({
    selector: 'lrn-notebook',
    templateUrl: './notebook.component.html',
    styleUrls: ['./notebook.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class NotebookComponent implements OnInit, AfterContentInit {

    @ContentChildren(H1Directive) public heading1: QueryList<H1Directive>
    @ContentChildren(H2Directive) public heading2: QueryList<H2Directive>
    @ContentChildren(H3Directive) public heading3: QueryList<H3Directive>
    @ContentChildren(H4Directive) public heading4: QueryList<H4Directive>
    @ContentChildren(H5Directive) public heading5: QueryList<H5Directive>
    @ContentChildren(H6Directive) public heading6: QueryList<H6Directive>

    public headings: HDirective[][]

    public notebookTitle: string

    public tableOfContents: TreeTableOfContent

    @ViewChild('article') public article: ElementRef

    public isVisibleTableOfContent: boolean = false

    @HostBinding('class') public themeName: 'white' | 'sepia' | 'dark' = 'white'

    public setWhiteTheme(): void {
        this.themeName = 'white'
    }

    public setSepiaTheme(): void {
        this.themeName = 'sepia'
    }

    public setDarkTheme(): void {
        this.themeName = 'dark'
    }

    public toggleTableOfContentVisibility() {
        this.isVisibleTableOfContent = !this.isVisibleTableOfContent
    }

    constructor(private elementRef: ElementRef) {
    }

    private prepareTableOfContents(): void {
        this.tableOfContents = new Tree<NodeDataTableOfContent>(
            new TreeNode<NodeDataTableOfContent>(
                null, {
                    title: this.notebookTitle,
                    id: 'top'
                }))
        let currentNode: TreeNodeTableOfContent = this.tableOfContents.getRoot()

        const childrenArray: HTMLElement[] = <any>Array.from(this.article.nativeElement.children)
        const n = childrenArray.length
        for (let i = 0; i < n; i++) {
            const child: HTMLElement = childrenArray[i]

            let childLevel: number
            switch (child.nodeName.toLowerCase()) {
                case 'h2':
                    childLevel = 2
                    break
                case 'h3':
                    childLevel = 3
                    break
                case 'h4':
                    childLevel = 4
                    break
                case 'h5':
                    childLevel = 5
                    break
                case 'h6':
                    childLevel = 6
                    break
                default:
                    continue
            }

            const title = child.textContent
            let id = 'unknown'
            let nodeData = {title, id}

            if (childLevel > currentNode.getLevel()) {
                currentNode.addChild(nodeData)
                currentNode = currentNode.getLastChild()
            } else if (childLevel == currentNode.getLevel()) {
                currentNode = currentNode.getParent()
                currentNode.addChild(nodeData)
                currentNode = currentNode.getLastChild()
            } else {
                const difference = currentNode.getLevel() - childLevel + 1
                for (let j = 0; j < difference; j++) {
                    currentNode = currentNode.getParent()
                }
                currentNode.addChild(nodeData)
                currentNode = currentNode.getLastChild()
            }

            id = currentNode.getPathEnumeration() + "_" + title.replace(/ /g, '_')
            child.id = id

            nodeData = {title, id}
            currentNode.setData(nodeData)
        }
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.headings = [
            this.heading1,
            this.heading2,
            this.heading3,
            this.heading4,
            this.heading5,
            this.heading6
        ].map(queryList => queryList.toArray())

        const heading1 = this.heading1.toArray()[0]
        if (heading1) {
            this.notebookTitle = heading1.title
        } else {
            throw new Error(`Every notebook must have a title. Include a <h1>Title</h1> inside ` +
                `your <lrn-notebook></lrn-notebook>.`)
        }

        this.prepareTableOfContents()
    }

}
