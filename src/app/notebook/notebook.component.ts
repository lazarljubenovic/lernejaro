import {
    Component,
    OnInit,
    ViewEncapsulation,
    ContentChildren,
    QueryList,
    AfterContentInit,
    ElementRef,
    ViewChild
} from '@angular/core';
import {
    H1Directive,
    H2Directive,
    H3Directive,
    H4Directive,
    H5Directive,
    H6Directive,
    HDirective
} from './directives/heading-directives';
import {Tree} from './tree/tree';
import {TreeNode} from './tree/tree-node';

@Component({
    selector: 'lrn-notebook',
    templateUrl: './notebook.component.html',
    styleUrls: ['./notebook.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class NotebookComponent implements OnInit, AfterContentInit {

    @ContentChildren(H1Directive) public heading1: QueryList<H1Directive>;
    @ContentChildren(H2Directive) public heading2: QueryList<H2Directive>;
    @ContentChildren(H3Directive) public heading3: QueryList<H3Directive>;
    @ContentChildren(H4Directive) public heading4: QueryList<H4Directive>;
    @ContentChildren(H5Directive) public heading5: QueryList<H5Directive>;
    @ContentChildren(H6Directive) public heading6: QueryList<H6Directive>;

    public headings: HDirective[][];

    public notebookTitle: string;

    public tableOfContents: Tree<string>;

    @ViewChild('article') public article: ElementRef;

    public isVisibleTableOfContent: boolean = true;

    public toggleTableOfContentVisibility() {
        this.isVisibleTableOfContent = !this.isVisibleTableOfContent;
    }

    constructor(private elementRef: ElementRef) {
    }

    private prepareTableOfContents(): void {
        this.tableOfContents = new Tree(new TreeNode<string>(null, this.notebookTitle));
        let currentNode: TreeNode<string> = this.tableOfContents.getRoot();

        const childrenArray: HTMLElement[] = <any>Array.from(this.article.nativeElement.children);
        const n = childrenArray.length;
        for (let i = 0; i < n; i++) {
            const child: HTMLElement =  childrenArray[i];

            let childLevel: number;
            switch (child.nodeName.toLowerCase()) {
                case 'h2':
                    childLevel = 2;
                    break;
                case 'h3':
                    childLevel = 3;
                    break;
                case 'h4':
                    childLevel = 4;
                    break;
                case 'h5':
                    childLevel = 5;
                    break;
                case 'h6':
                    childLevel = 6;
                    break;
                default:
                    continue;
            }

            if (childLevel > currentNode.getLevel()) {
                currentNode.addChild(child.textContent);
                currentNode = currentNode.getLastChild();
            } else if (childLevel == currentNode.getLevel()) {
                currentNode = currentNode.getParent();
                currentNode.addChild(child.textContent);
                currentNode = currentNode.getLastChild();
            } else {
                const difference = currentNode.getLevel() - childLevel + 1;
                for (let i = 0; i < difference; i++) {
                    currentNode = currentNode.getParent();
                }
                currentNode.addChild(child.textContent);
                currentNode = currentNode.getLastChild();
            }
        }
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.headings = [
            this.heading1, this.heading2, this.heading3, this.heading4, this.heading5, this.heading6]
            .map(queryList => queryList.toArray());

        this.notebookTitle = this.heading1.toArray()[0].title;

        this.prepareTableOfContents();
    }

}
