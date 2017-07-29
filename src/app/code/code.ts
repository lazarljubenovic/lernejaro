import * as _ from 'lodash'

export function format(literals, ...placeholders): string {
  let string = ''
  for (let i = 0; i < placeholders.length; i++) {
    string += literals[i]
    string += placeholders[i]
  }
  string += literals[literals.length - 1]

  const relevantLines = _(string)
    .split('\n')
    .dropWhile(line => line.trim() == '')
    .dropRightWhile(line => line.trim() == '')
    .value()

  const indentLength = _(relevantLines[0])
    .split('')
    .takeWhile(letter => letter == ' ')
    .value()
    .length

  return relevantLines
    .map(line => line.slice(indentLength))
    .join('\n')
}
