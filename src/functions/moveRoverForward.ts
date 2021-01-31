import {Schema, Plateau} from '../index-env'
/**
 * move rover forward in d direction for 1 unit
 * {x: 'x-axis', y: 'y-axis', d: 'direction', e: 'error'}
 *
 */

const moveRoverForward = (plateau: Plateau, {x, y, d, e}: Schema) => {
  const move = {
    N: () => (y += 1),
    W: () => (x -= 1),
    S: () => (y -= 1),
    E: () => (x += 1)
  }
  move[d]()

  /**
   * prevent the rover from exceeding the limit
   * validate new position is within the plateau
   */
  if (x > plateau[0] || y > plateau[y] || x < 0 || y < 0) {
    return {
      x,
      y,
      d,
      e: 'Bad transmission signal: Rover should not fall off the plateau'
    }
  }

  return {x, y, d, e}
}
export default moveRoverForward
