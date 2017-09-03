import {inject, TestBed} from '@angular/core/testing'

import {LatexService} from './latex.service'

describe('LatexService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LatexService],
    })
  })

  it('should be created', inject([LatexService], (service: LatexService) => {
    expect(service).toBeTruthy()
  }))
})

const a = (html: string) => {
  const article = document.createElement('article')
  article.innerHTML = html
  return article
}

const latexService = new LatexService()

describe(`Latex Service`, () => {

  it(`should render a simple tag`, () => {
    const article = a(`<b>something bold</b>`)
    const actual = latexService.transform(article)
    const expected = `\\documentclass{article}


\\begin{document}
  \\textbf{something bold}
\\end{document}
`
    expect(actual).toEqual(expected)
  })

  it(`should render a few paragraphs`, () => {
    const article = a(`
      <p>This is a <b>paragraph</b>.</p>
      <p>And this is the <i>next</i> one.</p>
    `)
    const actual = latexService.transform(article)
    const expected = `\\documentclass{article}


\\begin{document}
   This is a \\textbf{paragraph}.
  
   And this is the \\textit{next} one.
  
   
\\end{document}
`
    expect(actual).toEqual(expected)
  })

})
