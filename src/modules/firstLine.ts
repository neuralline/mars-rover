import {Schema} from '../index-env'
import {byLetter} from '../providers/state'
import validations from '../validations/validations'

/**
 *
 * Rover input decoding, positioning and maneuvering unit
 *
 * process first line of code and set initial rover position
 *
 * {x: 'x-axis', y: 'y-axis', d: 'direction', e: 'error'}
 *
 */

export const setInitialPosition = (
  firstLineOfCode: string,
  currentPosition: Schema
): Schema => {
  //check if the first line is a valid input
  const {x, y, d, e} = validations(firstLineOfCode, 3)

  //if received value is not valid send transmission error
  if (e)
    return {
      ...currentPosition,
      e
    }

  //if direction value is not recognisable send transmission error
  if (typeof byLetter[d] === 'undefined')
    return {
      ...currentPosition,
      e: 'Bad transmission signal: unknown direction'
    }

  return {x, y, d, e}
}
