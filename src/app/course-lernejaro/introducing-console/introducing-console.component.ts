import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {format} from '../../code/code'
import {Interpreter} from '../../console/interpreter.interface'

export class PalindromeInterpreter implements Interpreter {
  language = 'palindrome'

  handle(input: string): string {
    return input.split('').reverse().join('') == input
      ? `${input} jeste palindrom!`
      : `${input} nije palindrom!`
  }
}

@Component({
  selector: 'lrn-introducing-console',
  templateUrl: './introducing-console.component.html',
  styleUrls: ['./introducing-console.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroducingConsoleComponent implements OnInit {

  public basicExampleJs = format`
    <lrn-console language="javascript"></lrn-console>
  `

  public palindromeInterpreterExample = format`
    class PalindromeInterpreter implements Interpreter {
      language = 'palindrome'
      handle(input: string): string {
        return input.split('').reverse().join('') == input
          ? \`\${input} jeste palindrom!\`
          : \`\${input} nije palindrom!\`
      }
    }
  `

  public palindromeProviders = format`
    {
      provide: LRN_CONSOLE_INTERPRETERS,
      useClass: PalindromeInterpreter,
      multi: true,
    }
  `

  public palindromeUsageExample = format`
    <lrn-console language="palindrome"></lrn-console>
  `

  constructor() {
  }

  ngOnInit() {
  }

}
