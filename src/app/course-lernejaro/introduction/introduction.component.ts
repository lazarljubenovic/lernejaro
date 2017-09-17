import {Component, OnInit} from '@angular/core'
import {format} from '../../code/code'

@Component({
  selector: 'lrn-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent implements OnInit {

  codeExample = format`
    let foo = 'a string'
    const add => x => y => x + y
    const fn = function fun(one, two, ...rest) {
      console.log(one + two) // write to console
      return [...rest, one, two] /* spread */
    }
  `

  constructor() {
  }

  ngOnInit() {
  }

}
