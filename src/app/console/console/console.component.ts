import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/scan'
import {ModalService} from '../../ui/modal/modal.service'
import {
  ConsoleClashingInterpretersErrorComponent,
  ConsoleNoLanguageErrorComponent,
  ConsoleUnknownLanguageErrorComponent,
} from '../errors'
import {LRN_CONSOLE_INTERPRETER} from '../console'
import {Interpreter} from '../interpreter.interface'
import * as _ from 'lodash'

@Component({
  selector: 'lrn-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {

  @Input() public language: string

  @ViewChild('prompt') public prompt: ElementRef

  public interpreter: Interpreter

  private inputs$ = new Subject<string>()
  private outputs$ = new Subject<string>()

  public log$ = Observable
    .merge(this.inputs$, this.outputs$)
    .scan((acc, curr) => [...acc, curr], [])

  public handle(input: string): string {
    return this.interpreter.handle(input)
  }

  public onSubmit(event: KeyboardEvent) {
    if (event.key == 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault()
      event.stopPropagation()
      const input = (event.target as HTMLElement).innerText
      this.inputs$.next(input)
      try {
        const output = this.handle(input)
        this.outputs$.next(output)
      } catch (e) {
        const output = e.toString()
        this.outputs$.next(output)
      }
      // Clear text inside the prompt
      (this.prompt.nativeElement as HTMLElement).innerText = ''
      // Scroll to bottom
      this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight
    }
  }

  constructor(private elementRef: ElementRef,
              private modal: ModalService,
              @Inject(LRN_CONSOLE_INTERPRETER) private interpreters: Interpreter[]) {
  }

  ngOnInit() {
    if (this.language == null) {
      this.modal.open(ConsoleNoLanguageErrorComponent)
      return
    }

    const listOfPossibleLanguages = this.interpreters.map(({language}) => language)

    if (listOfPossibleLanguages.length != _.uniq(listOfPossibleLanguages).length) {
      this.modal.open(ConsoleClashingInterpretersErrorComponent, {
        listOfPossibleLanguages,
      })
      return
    }

    this.interpreter = this.interpreters
      .find(({language}) => language == this.language)

    if (this.interpreter == null) {
      this.modal.open(ConsoleUnknownLanguageErrorComponent, {
        language: this.language,
        listOfPossibleLanguages,
      })
      return
    }
  }

}
