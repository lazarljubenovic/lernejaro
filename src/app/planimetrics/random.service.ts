import {Injectable, Optional} from '@angular/core'
import {Point} from '../planimetryts/geometry-objects/point'

@Injectable()
export class RandomService {

  private that = this

  private multi(fn, ...args) {
    return new Array(this.numberOfMultiples).fill(null).map(() => fn(...args))
  }

  public Numerical = ((that) => ({

    Number(min: number, max: number): number | number[] {
      return that.multi((_min, _max) => {
        return Math.random() * (_max - _min) + _min
      }, min, max)
    },

    Integer(min: number, max: number): number | number[] {
      min = Math.ceil(min)
      max = Math.floor(max)
      return that.multi((_min, _max) => {
        return Math.floor(Math.random() * (_max - _min)) + _min
      }, min, max)
    },

    IntegerInclusive(min: number, max: number): number[] {
      min = Math.ceil(min)
      max = Math.floor(max)
      return that.multi((_min, _max) => {
        return Math.floor(Math.random() * (_max - _min + 1)) + _min
      }, min, max)
    },

  }))(this)

  public Point = ((that) => ({

    InRectangle(minX: number, maxX: number, minY: number, maxY: number): Point[] {
      return that.multi((_minX, _maxX, _minY, _maxY) => {
        const randomX: number = <number>that.Multiple(1).Numerical.Number(minX, maxX)
        const randomY: number = <number>that.Multiple(1).Numerical.Number(minY, maxY)
        return Point.FromCartesianCoordinates(randomX, randomY)
      }, minX, maxX, minY, maxY)
    },

  }))(this)

  public Multiple(value: number): RandomService {
    return new RandomService(value)
  }

  constructor(@Optional() private numberOfMultiples: number = 1) {
  }

}
