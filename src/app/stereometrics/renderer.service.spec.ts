/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { RendererService } from './renderer.service'

describe('RendererService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RendererService]
    })
  })

  it('should ...', inject([RendererService], (service: RendererService) => {
    expect(service).toBeTruthy()
  }))
})
