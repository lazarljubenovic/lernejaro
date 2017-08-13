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


@Component({
  template: `
    <lrn-warning heading="No External Resources"
                 suppress="suppressNoExternalResourcesWarning">
      <p>
        Looks like your notebook “{{ this.notebookTitle }}” contains <b>no links</b> to any
        external resources.
      </p>

      <p>
        This might be fine for shorter notebooks, but yours has about
        {{ numberOfWords }} words! It's the right time to start adding some.
      </p>

      <p>
        You should consider adding references to
        webpages where students can <b>read more about the topic you're covering</b>.
        To add a link, wrap it in anchor tags (<code>&lt;a></code>) and optionally
        add a title attrbiute which will be used
        for displaying a list of all references at the bottom of the page. Without a
        title attribute, the text inside the anchor tags will be used for the list of
        references.
      </p>
    </lrn-warning>
  `,
})
export class NoExternalResourcesWarningComponent {
  notebookTitle: string
  numberOfWords: number
}
