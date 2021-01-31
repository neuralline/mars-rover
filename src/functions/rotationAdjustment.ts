//rotation adjustment
/**
 *
 * definitions : {x: 'x-axis', y: 'y-axis', d: 'direction', e: 'error'}
 */
export const rotationAdjustment = (
  rotation: number,
  minMax: number[] = [0, 3]
) => {
  if (rotation < minMax[0]) return minMax[1]
  else if (rotation > minMax[1]) return minMax[0]
  return rotation
}
