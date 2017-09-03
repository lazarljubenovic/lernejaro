import {
  DestructImpossibleError,
  GeometryObjectController,
  Strategy,
} from '../geometry-object-controller'
import {Line} from '../../../../planimetryts/geometry-objects/everything'

export class LineController extends GeometryObjectController {

  private line: Line

  private generalDestructStrategy(): { A: number, B: number, C: number } {
    return this.line.getGeneralForm()
  }

  private generalReconstructStrategy(obj: { A: number, B: number, C: number }): Line {
    const {A, B, C} = obj
    return Line.FromGeneralForm(A, B, C).copyViewDataFrom(this.line)
  }

  private explicitDestructStrategy(): { k: number, n: number } {
    try {
      return this.line.getExplicitForm()
    } catch (e) {
      throw new DestructImpossibleError()
    }
  }

  private explicitReconstructStrategy(obj: { k: number, n: number }): Line {
    const {k, n} = obj
    return Line.FromExplicitForm(k, n).copyViewDataFrom(this.line)
  }

  private segmentDestructStrategy(): { m: number, n: number } {
    try {
      return this.line.getSegmentForm()
    } catch (e) {
      throw new DestructImpossibleError()
    }
  }

  private segmentReconstructStrategy(obj: { m: number, n: number }): Line {
    const {n, m} = obj
    return Line.FromSegmentForm(m, n).copyViewDataFrom(this.line)
  }

  private generalStrategy: Strategy = {
    destruct: this.generalDestructStrategy.bind(this),
    reconstruct: this.generalReconstructStrategy.bind(this),
  }

  private explicitStrategy: Strategy = {
    destruct: this.explicitDestructStrategy.bind(this),
    reconstruct: this.explicitReconstructStrategy.bind(this),
  }

  private segmentStrategy: Strategy = {
    destruct: this.segmentDestructStrategy.bind(this),
    reconstruct: this.segmentReconstructStrategy.bind(this),
  }

  constructor(line: Line) {
    super()
    this.line = line.clone()
    this.strategies
      .set('general', this.generalStrategy)
      .set('explicit', this.explicitStrategy)
      .set('segment', this.segmentStrategy)
  }

  public getGeometryObject(): Line {
    return this.line
  }

}
