import {Component, OnInit} from '@angular/core'
import {format} from '../code/code'

@Component({
  selector: 'lrn-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent implements OnInit {

  htmlExample = format`
    <p>
      Paragraf sa <b>bold</b> i <i>italic</i> tekstom
    </p>
    
    <ul>
      <li>Neuređene</li>
      <li>Liste</li>
    </ul>
  `

  markdownExample = format`
    <lrn-markdown>
      Paragraf sa **bold** i _italic_ tekstom
      
      - Neuređene
      - Liste
    </lrn-markdown>
  `

  codeExample = format`
    let foo = 'a string'
    const add => x => y => x + y
    
    const fn = function fun(one, two, ...rest) {
      console.log(one + two) // write to console
      return [...rest, one, two] /* spread */
    }
  `

  formula = format`
    \\int_{-\\infty}^{+\\infty} e^{-x^2} \\, \\mathrm dx = \\sqrt \\pi
  `

  katexExample = format`
    <lrn-katex [displayMode]="true"
               math="${this.formula}"
    ></lrn-katex>
  `

  quizExample = format`
    <lrn-multiple-choice>
      <lrn-question>
        What is the answer to life,
        the universe and everything?
      </lrn-question>
      
      <lrn-choice>Angular</lrn-choice>
      <lrn-choice lrnCorrect>42</lrn-choice>
    </lrn-multiple-choice>
  `

  slidesExample = format`
    <lrn-presentation>
      <lrn-slide>
        <!-- Content -->
      </lrn-slide>
    </lrn-presentation>
  `

  declarative = {
    sample: format`
      <section>
        <h1>Title</h1>
        <p>Paragraph</p>
        <img src="cat.jpg" alt="A cat">
      </section>
    `,
    interpolation: {
      view: format`
        <section>
          Welcome, {{ user.name }}!
        </section>
      `,
      model: format`
        class UserComponent {
          user = { name: 'John Doe' }
        }
      `,
    },
    dataBinding: {
      view: format`
        <img [src]="imageUrl" [alt]="description">
      `,
      model: format`
        class ImageComponent {
          imageUrl = 'cat.jpg'
          description = 'A cat'
        }
      `,
    },
    eventBinding: {
      view: format`
        <button (click)="logIn()">Log in</button>
      `,
      model: format`
        class LogInComponent {
          logIn() {
            fetch(\`example.com/log-in\`)
          }
        }
      `,
    },
    twoWay: {
      view: format`
        <label>
          <span>Username</span>
          <input type="text" [(ngModel)]="username">
        </label>
      `,
      model: format`
        class SomeComponent {
          username = ''
        }
      `,
    },
    structural: {
      view: format`
        <div *ngIf="isUserLoggedIn">
          Welcome, {{ user.name }}!
        </div>
      `,
      viewExpanded: format`
        <ng-template [ngIf]="isUserLoggedIn">
          <div>Welcome, {{ user.name }}!</div>
        </ng-template>
      `,
    },
  }

  typescript = {
    simple: {
      input: format`
        const a: number = 1
        const b = 1
      `,
      output: format`
        const a = 1
        const b = 1
      `,
    },
    interfaces: {
      input: format`
        interface User { name: string }
        
        const user: User = {
          firstName: 'John', // error
        }
      `,
    },
    others: {
      input: format`
        async function() {
          let data: number | string
          data = await fetch('example.api/data')
          if (typeof data == 'number') {
            // ...
          } else {
            // ...
          }
        }
      `,
    },
    generics: format`
      function sort<T>(arr:  T[]):  T[] {
        // ...
      }
    `,
    targetEs5: {
      input: format`
        const arr = [1, 2, 3].map(x => x ** 2)    
      `,
      output: format`
        var arr = [1, 2, 3].map(function(x) {
          return Math.pow(x, 2)
        })
      `,
    },
  }

  di = {
    api: format`
      @Injectable()
      class ServiceA { /* ... */ }
      
      @Injectable()
      class ServiceB {
        constructor(a: ServiceA) {}
      }
    `,
  }

  constructor() {
  }

  ngOnInit() {
  }

}
