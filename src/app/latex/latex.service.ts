import {Injectable} from '@angular/core'
import * as _ from 'lodash'

type LatexNodeType = 'env' | 'tag' | 'command'

type LatexContent = string | LatexNode

interface LatexNode {
  type: LatexNodeType
}

interface LatexNodeEnv extends LatexNode {
  type: 'env'
  name: string
  opts?: string[]
  content: LatexContent[]
}

interface LatexNodeTag extends LatexNode {
  type: 'tag'
  name: string
  opts?: string[]
  content: LatexContent[]
}

interface LatexNodeCommand extends LatexNode {
  type: 'command',
  name: string,
}

function env(name: string, content: LatexContent[]): LatexNodeEnv
function env(name: string, opts: string[], content: LatexContent[]): LatexNodeEnv
function env(arg1: string, arg2: string[] | LatexContent[], arg3?: LatexContent[]): LatexNodeEnv {
  if (arguments.length == 2) {
    const [name, content] = Array.from(arguments)
    return {
      type: 'env',
      name, content,
    }
  } else if (arguments.length == 3) {
    const [name, opts, content] = Array.from(arguments)
    return {
      type: 'env',
      name, opts, content,
    }
  }
}

function renderEnv(env: LatexNodeEnv): string {
  return `\n\\begin${env.opts == null ? '' : `[${env.opts.join(',')}]`}{${env.name}}\n` +
    `${render(env.content)}`.replace(/^/gm, '  ') +
    `\n\\end{${env.name}}\n`
}

function tag(name: string, content: LatexContent[]): LatexNodeTag
function tag(name: string, opts: string[], content: LatexContent[]): LatexNodeTag
function tag(arg1: string, arg2: string[] | LatexContent[], arg3?: LatexContent[]): LatexNodeTag {
  if (arguments.length == 2) {
    const [name, content] = Array.from(arguments)
    return {
      type: 'tag',
      name, content,
    }
  } else if (arguments.length == 3) {
    const [name, opts, content] = Array.from(arguments)
    return {
      type: 'tag',
      name, opts, content,
    }
  }
}

function renderTag(tag: LatexNodeTag): string {
  return `\\${tag.name}` +
    `${tag.opts == null ? '' : `[${tag.opts.join(',')}]`}` +
    `{${render(tag.content)}}`
}

function command(name: string): LatexNodeCommand {
  return {
    type: 'command',
    name,
  }
}

function renderCommand(command: LatexNodeCommand): string {
  return ` \\${command.name} `
}

function render(node: LatexContent | LatexContent[]): string {
  if (Array.isArray(node)) {
    const r = node.map(x => render(x)).join('')
    return r
  } else {
    if (typeof node === 'string') {
      return node
    } else {
      if (node.type == 'env') {
        return renderEnv(<LatexNodeEnv>node)
      } else if (node.type == 'tag') {
        return renderTag(<LatexNodeTag>node)
      } else {
        throw new Error(`Unknown node type ${node.type}`)
      }
    }
  }

}


type Generator = (content: LatexContent[]) => LatexContent[]

// Map HTMLElement's tagName to a generator function
const htmlTagsMap = new Map<string, Generator>()
  .set('b', c => [tag('textbf', c)])
  .set('strong', c => [tag('textbf', c)])
  .set('i', c => [tag('textit', c)])
  .set('em', c => [tag('textit', c)])
  .set('div', c => c)
  .set('span', c => c)
  .set('article', c => [
    tag('documentclass', ['article']),
    '\n',
    '\n',
    env('document', c),
  ])
  .set('p', c => [...c, '\n\n'])


@Injectable()
export class LatexService {

  constructor() {
  }

  public transform(el: HTMLElement): string {
    const nodes = this.createContent(el)
    return render(nodes)
  }

  public createContent(el: Node): LatexContent[] {
    switch (el.nodeType) {
      case Node.TEXT_NODE:
        const text = (el as Text).wholeText
          .replace(/\n/g, '')
          .replace(/\s+/g, ' ')
        return [text]
      case Node.ELEMENT_NODE:
        const tagName = (el as Element).tagName.toLowerCase()

        const generator = htmlTagsMap.has(tagName)
          ? htmlTagsMap.get(tagName)
          : null

        if (generator == null) {
          console.error(`No idea what to do with tag ${tagName}, so I will ignore it.`)
          return []
        }

        const childNodes = Array.from(el.childNodes)
        const content = _.flatMap(childNodes, cn => this.createContent(cn))
        return generator(content)
      default:
        return []
    }
  }

}
