/**
 *
 * //move rover forward in d direction for u unit
 *
 * @param {number} x x coordinates
 * @param {number} y y coordinates
 * @param {string} d direction
 * @param {number} u unit of distance
 */

const moveRoverForward = (x, y, d, u = 1) => {
  const move = {
    N: () => (y += u),
    W: () => (x -= u),
    S: () => (y -= u),
    E: () => (x += u)
  }
  move[d]()
  return {x, y, d}
}
module.exports = moveRoverForward
