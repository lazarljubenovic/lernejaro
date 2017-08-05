import {AfterContentInit, Directive, ElementRef, Injectable, Renderer2} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import * as _ from 'lodash'

@Injectable()
export abstract class HDirective implements AfterContentInit {
  constructor(protected elementRef: ElementRef,
              protected renderer: Renderer2,
              private route: ActivatedRoute,
              private router: Router) {
  }

  public title: string

  ngAfterContentInit() {
    const {nativeElement} = this.elementRef
    this.title = nativeElement.textContent

    const id = this.title.replace(/ /g, '_')

    const url = this.route.snapshot.pathFromRoot
      .map(x => x.url)
      .map(x => x.map(segment => segment.path))
      .join('/')
    const link = `${url}#${id}`
    const anchorButton = document.createElement('button')
    anchorButton.innerText = `#`
    anchorButton.onclick = () => {
      // https://github.com/angular/angular/issues/13636#issuecomment-297083132
      window.location.hash = ''
      window.location.hash = id
    }

    this.renderer.setProperty(nativeElement, 'id', id)
    this.renderer.appendChild(nativeElement, anchorButton)
  }
}

@Directive({selector: 'h1'})
export class H1Directive extends HDirective {
}

@Directive({selector: 'h2'})
export class H2Directive extends HDirective {
}

@Directive({selector: 'h3'})
export class H3Directive extends HDirective {
}

@Directive({selector: 'h4'})
export class H4Directive extends HDirective {
}

@Directive({selector: 'h5'})
export class H5Directive extends HDirective {
}

@Directive({selector: 'h6'})
export class H6Directive extends HDirective {
}
