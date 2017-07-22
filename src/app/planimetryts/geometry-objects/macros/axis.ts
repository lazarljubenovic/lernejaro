import {EvaluateFunction} from '../../../planimetrics/planimetrics.component'
import {Line} from '../line'
import {Segment} from '../segment'
import {AxisConfiguration} from './axis.interface'

const arrayGen = length => Array.from({length}).map((_, index) => index)

interface ExpandedAxisConfiguration {
  hideX: boolean
  hideY: boolean
  hideNotchesX: boolean
  hideNotchesY: boolean
  hideNumbersX: boolean
  hideNumbersY: boolean
  notchDistanceX: number
  notchDistanceY: number
  notchLength: number
}

function expandAxisConfiguration(configuration: AxisConfiguration = {}): ExpandedAxisConfiguration {
  const {
    hideX = false,
    hideY = false,
    hideNotchesX = hideX,
    hideNotchesY = hideY,
    hideNumbersX = hideNotchesX,
    hideNumbersY = hideNotchesY,
    notchDistanceX = 50,
    notchDistanceY = 50,
    notchLength = 6,
  } = configuration
  return {
    hideX,
    hideY,
    hideNotchesX,
    hideNotchesY,
    hideNumbersX,
    hideNumbersY,
    notchDistanceX,
    notchDistanceY,
    notchLength,
  }
}

const horizontalNotch = (length, x, y) =>
  Segment.FromGeneralForm(x - length / 2, y, x + length / 2, y)

const verticalNotch = (length, x, y) =>
  Segment.FromGeneralForm(x, y - length / 2, x, y + length / 2)

export function Axis(configuration: AxisConfiguration = {}): EvaluateFunction {
  const expandedConfiguration = expandAxisConfiguration(configuration)

  return function evaluate({inverseTransformationMatrix}) {

    const xNotches = arrayGen(100).map(x => x - 50)
      .map(index => index * expandedConfiguration.notchDistanceX)
      .map(x => verticalNotch(expandedConfiguration.notchLength, x, 0))

    const yNotches = arrayGen(100).map(x => x - 50)
      .map(index => index * expandedConfiguration.notchDistanceY)
      .map(y => horizontalNotch(expandedConfiguration.notchLength, 0, y))

    return [
      ...(!expandedConfiguration.hideX ? [Line.X_AXIS] : []),
      ...(!expandedConfiguration.hideY ? [Line.Y_AXIS] : []),
      ...(!expandedConfiguration.hideNotchesX ? xNotches : []),
      ...(!expandedConfiguration.hideNotchesY ? yNotches : []),
    ]
  }
}
