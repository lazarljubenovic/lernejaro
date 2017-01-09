// import {Renderer, RootRenderer, RenderComponentType, Injectable} from '@angular/core';
//
//
// // We render everything into a forest of Nodes.
// // View, Element, and Text are different types of nodes.
// class View {
//     children: Node[] = [];
// }
//
// class Element {
//     constructor(public name: string) {
//     }
//
//     attributes: {[n: string]: string} = {};
//     properties: {[n: string]: any} = {};
//     children: Node[] = [];
//     view: View = null;
// }
//
// class Text {
//     constructor(public value: string) {
//     }
// }
//
// type Node = Element | View | Text;
//
//
// @Injectable()
// export class ChartRootRenderer implements RootRenderer {
//     public roots: any[] = [];
//
//     constructor() {
//         console.log('ChartRootRenderer constructor');
//     };
//
//     renderComponent(componentProto: RenderComponentType): Renderer {
//         // return new ChartRenderer(this.roots);
//         throw "nope";
//     }
// }
//
// @Injectable()
// export class ChartRenderer implements Renderer {
//
//     constructor(private roots: any[]) {
//         console.log('ChartRenderer constructor');
//     }
//
//     selectRootElement(selectorOrNode: string|any, debugInfo?: any): Element {
//         // const root = new Element(selectorOrNode);
//         // this.roots.push(root);
//         // console.log('selectRootElement', selectorOrNode);
//         // return root;
//         throw "nope";
//     }
//
//     createElement(parentElement: any, name: string, debugInfo?: any): Element {
//         // const element = new Element(name);
//         // parentElement.children.push(element);
//         // console.log('createElement', name);
//         // return element;
//         throw "nope";
//     }
//
//     createViewRoot(hostElement: Element): View {
//         // const view = new View();
//         // hostElement.view = view;
//         // return view;
//         throw "nope";
//     }
//
//     createText(parentElement: Element, value: string, debugInfo?: any): Text {
//         // const text = new Text(value);
//         // parentElement.children.push(text);
//         // return text;
//         throw "nope";
//     }
//
//     setElementProperty(renderElement: Element, propertyName: string, propertyValue: any): void {
//         // renderElement.properties[propertyName] = propertyValue;
//         throw "nope";
//     }
//
//     setElementAttribute(renderElement: Element, attributeName: string, attributeValue: string): void {
//         // renderElement.attributes[attributeName] = attributeValue;
//         throw "nope";
//     }
//
//     setText(renderNode: Text, text: string): void {
//         // renderNode.value = text;
//         throw "nope";
//     }
//
//     setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string): void {
//         throw "nope"
//     }
//
//     createTemplateAnchor(parentElement: any): any {
//         throw new Error("not implemented");
//     }
//
//     projectNodes(parentElement: any, nodes: any[]): void {
//         throw new Error("not implemented");
//     }
//
//     attachViewAfter(node: any, viewRootNodes: any[]): void {
//         throw new Error("not implemented");
//     }
//
//     detachView(viewRootNodes: any[]): void {
//         throw new Error("not implemented");
//     }
//
//     destroyView(hostElement: any, viewAllNodes: any[]): void {
//         throw new Error("not implemented");
//     }
//
//     listen(renderElement: any, name: string, callback: Function): Function {
//         throw new Error("not implemented");
//     }
//
//     listenGlobal(target: string, name: string, callback: Function): Function {
//         throw new Error("not implemented");
//     }
//
//     setElementClass(renderElement: any, className: string, isAdd: boolean): void {
//         throw new Error("not implemented");
//     }
//
//     setElementStyle(renderElement: any, styleName: string, styleValue: string): void {
//         throw new Error("not implemented");
//     }
//
//     invokeElementMethod(renderElement: any, methodName: string, args?: any[]): void {
//         throw new Error("not implemented");
//     }
//
//     animate(element: any, startingStyles: any, keyframes: any[], duration: number, delay: number, easing: string): any {
//         throw new Error("not implemented");
//     }
//
// }
