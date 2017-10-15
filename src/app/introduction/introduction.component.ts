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

  constructor() {
  }

  ngOnInit() {
  }

}
