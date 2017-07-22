import {EvaluateFunction} from '../../../planimetrics/planimetrics.component'

export interface AxisConfiguration {
  hideX?: boolean
  hideY?: boolean
  hideNotchesX?: boolean
  hideNotchesY?: boolean
  hideNumbersX?: boolean
  hideNumbersY?: boolean
  notchDistanceX?: number
  notchDistanceY?: number
}

interface ExpandedAxisConfiguration {
  hideX: boolean
  hideY: boolean
  hideNotchesX: boolean
  hideNotchesY: boolean
  hideNumbersX: boolean
  hideNumbersY: boolean
  notchDistanceX: number
  notchDistanceY: number
}

function expandAxisConfiguration(configuration: AxisConfiguration): ExpandedAxisConfiguration {
  const {
    hideX = false,
    hideY = false,
    hideNotchesX = false,
    hideNotchesY = false,
    hideNumbersX = false,
    hideNumbersY = false,
    notchDistanceX = 25,
    notchDistanceY = 25,
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
  }
}

export function Axis(configuration: AxisConfiguration): EvaluateFunction {
  const expandedConfiguration = expandAxisConfiguration(configuration)

  return function evaluate({interactivePoints, transformationMatrix}) {
    return []
  }
}
