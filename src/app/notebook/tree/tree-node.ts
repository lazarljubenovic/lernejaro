export interface TreeNodeJSON<Type> {
    data: Type;
    children: TreeNodeJSON<Type>[];
}

export class TreeNode<Type> {

    protected data: Type;
    protected level: number;
    protected parent: TreeNode<Type>;
    protected children: TreeNode<Type>[];

    constructor(parent: TreeNode<Type>, data: Type) {
        this.parent = parent;
        this.data = data;
        if (parent) {
            this.level = parent.level + 1;
        } else {
            this.level = 1;
        }
        this.children = [];
    }

    public getData(): Type {
        return this.data;
    }

    public getLevel(): number {
        return this.level;
    }

    public getParent(): TreeNode<Type> {
        return this.parent;
    }

    public getChildren(): TreeNode<Type>[] {
        return this.children;
    }

    public addChild(data: Type): this {
        this.children.push(new TreeNode(this, data));
        return this;
    }

    public prependChild(data: Type): this {
        this.children.unshift(new TreeNode(this, data));
        return this;
    }

    public isLeaf(): boolean {
        return this.children.length == 0;
    }

    public forEachChild(fn: (value: TreeNode<Type>) => any): this {
        this.children.forEach(fn);
        return this;
    }

    public getFirstChild(): TreeNode<Type> {
        return this.children[0];
    }

    public getLastChild(): TreeNode<Type> {
        return this.children[this.children.length - 1];
    }

    public toJSON(): TreeNodeJSON<Type> {
        const data = this.data;
        let children = this.children.map(child => child.toJSON());
        if (children.length == 0) {
            children = null;
        }
        return {data, children};
    }

}
