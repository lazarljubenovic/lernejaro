import {Injectable} from '@angular/core'
import {Interpreter} from '../interpreter.interface'

@Injectable()
export class CounterInterpreter implements Interpreter {
  public language = 'counter'

  public handle(input: string): string {
    return input.length == 0
      ? 'Empty line!'
      : input.length == 1
        ? `A single line!`
        : `A line of ${input.length} characters!`
  }
}

