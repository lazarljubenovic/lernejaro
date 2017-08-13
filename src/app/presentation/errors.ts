import {Component} from '@angular/core'
import {format} from '../code/code'


@Component({
  selector: 'lrn-presentation-missing-input-base-error',
  template: `
    <p>
      Here's a list of all stuff that you must provide.
    </p>

    <ul>
      <li><b>title</b> of your presentation</li>
      <li><b>author</b> (that's you!)</li>
      <li><b>email</b> so your students can contact you</li>
    </ul>

    <pre><code [lrnCode]="'html'">{{ example }}</code></pre>
  `,
})
export class PresentationMissingInputBaseErrorComponent {
  example = format`
    <lrn-presentation [title]="'My Awesome Presentation'"
                      [author]="'Chuck Norris'"
                      [email]="'name@example.com'"
    ></lrn-presentation>
  `
}


@Component({
  template: `
    <lrn-error heading="Untitled presentation">
      <p>
        Woah! How 'bout giving your presentation a title?
        Every presentation needs a title slide, but without an actual title,
        it simply can't be generated.
      </p>

      <p>
        Don't worry, it's super-simple to add one.
        Just provide it through a <code>[title]</code> input to
        <code>&lt;lrn-presentation></code> component.
      </p>

      <lrn-presentation-missing-input-base-error></lrn-presentation-missing-input-base-error>
    </lrn-error>
  `,
})
export class UntitledPresentationErrorComponent {
}


@Component({
  template: `
    <lrn-error heading="Missing author's name">
      <p>
        Are you on the run from the police?
      </p>

      <p>
        Unless you actually <i>are</i>, you should tell your students who you are.
        Don't reveal all your darkest secrets; just give them <strong>your name</strong>.
      </p>

      <lrn-presentation-missing-input-base-error></lrn-presentation-missing-input-base-error>
    </lrn-error>
  `,
})
export class PresentationWithoutAuthorErrorComponent {
}


@Component({
  template: `
    <lrn-error heading="Missing email address">
      <p>
        Your students will not send an owl to your house with a letter describing their problems.
        They will want to send you an email.
      </p>
      
      <p>
        Go ahead and tell your users how they can contact you.
      </p>
      
      <p>
        This information will also be used for generating some slides, such as
        the title slide and the thank-you slide.
      </p>
      
      <lrn-presentation-missing-input-base-error></lrn-presentation-missing-input-base-error>
    </lrn-error>
  `,
})
export class PresentationWithoutEmailErrorComponent {
}
