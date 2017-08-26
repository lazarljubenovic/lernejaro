export interface Interpreter {
  language: string
  handle(input: string): string
}
