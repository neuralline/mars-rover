const roverMatrix = (i, minMax = [0, 3]) => {
  if (i < minMax[0]) return minMax[1]
  else if (i > minMax[1]) return minMax[0]
  return i
}
module.exports = roverMatrix
