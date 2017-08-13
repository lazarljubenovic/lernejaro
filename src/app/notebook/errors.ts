import {Component} from '@angular/core'
import {format} from '../code/code'

@Component({
  template: `
    <lrn-error heading="Empty title">
      <p>
        A title is not of much help if it's <strong>empty</strong>...
      </p>
      
      <p>
        Learning is better when it can be done in smaller chunks. 
        This is why dividing your lesson into smaller parts is super-important.
        The easiest way to do so is by having headings!
      </p>
      
      <p>
        The notebook can have only a single <code>&lt;h1></code> heading,
        but can (and <i>should</i>) have multiples headings of lower level.
        These are also used to generate a table of contents.
      </p>
      
      <pre><code [lrnCode]="'html'">{{ example }}</code></pre>
    </lrn-error>
  `,
})
export class NotebookTitleWithoutContentErrorComponent {
  example = format`
    <h2>Title</h2>
  `
}
