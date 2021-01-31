import {Schema} from '../index-env'
import {byDirection, byLetter, byNumber} from '../providers/state'
import {rotationAdjustment} from './rotationAdjustment'

export const roverPositioningSystem = (
  code: string,
  {x, y, d, e}: Schema
): Schema => {
  if (code === 'L' || code === 'R') {
    //L and r are rotation codes
    //calculate rotation by looking up the value of d[N,W,S,E] plus code[L,R] from the matrix
    const rotation = byLetter[d] + byDirection[code]
    //adjust rotation overflow
    const direction = rotationAdjustment(rotation)
    //get direction by using by number schema
    return {x, y, d: byNumber[direction], e}
  } else {
    //received unknown code
    return {x, y, d, e: 'Bad transmission signal: unknown instruction'}
  }
}
