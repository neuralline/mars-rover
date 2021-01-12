//rotation adjustment
/**
 *
 * @param {number} rotation
 * @param {[number,number]} minMax
 */
const rotationAdjustment = (rotation, minMax = [0, 3]) => {
  if (rotation < minMax[0]) return minMax[1]
  else if (rotation > minMax[1]) return minMax[0]
  return rotation
}
module.exports = rotationAdjustment
