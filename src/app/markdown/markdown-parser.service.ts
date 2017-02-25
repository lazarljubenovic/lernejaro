import {Injectable} from '@angular/core';
import * as marked from 'marked';

@Injectable()
export class MarkdownParserService {

    private geFirstNonEmptyLine(text: string): string {
        return text.split('\n').find(line => line !== '');
    }

    // Find the gobble automatically
    private getGobble(text: string): number {
        const firstLine: string = this.geFirstNonEmptyLine(text);
        const spaces: string = firstLine.match(/(^\s*)/)[0];
        return spaces.length;
    }

    private gobble(text: string): string {
        const gobble = this.getGobble(text);
        return text
            .split('\n')
            .map(line => line.slice(gobble))
            .join('\n');
    }

    private encloseInTag(text: string,
                         tagName: string,
                         className: string,
                         on: boolean = true): string {
        return on ?
            `<${tagName} class="${className}">${text}</${tagName}>` :
            text;
    }

    public transform(text: string): string {
        if (text) {
            text = text.replace(/&gt;/g, '>');
            const gobbledText = this.gobble(text);
            const markedText: string = marked(gobbledText);
            return this.encloseInTag(markedText, 'div', 'slide-inner', false);
        } else {
            return '';
        }
    }

    constructor() {
        marked.setOptions({
            smartypants: true,
            gfm: true,
        });
    }

}
