//simple input validation
const transmissionValidations = (input, number = 2) => {
  try {
    const code = input.trim().split(' ')
    const position = {
      x: Number.parseInt(code[0]),
      y: Number.parseInt(code[1]),
      d: 'N'
    }
    if (
      code.length < number ||
      !Number.isInteger(position.x) ||
      !Number.isInteger(position.y)
    )
      return console.log('Bad transmission, invalid (x, y) signal')

    if (number === 3 && typeof code[2] === 'undefined') {
      return console.log('Missed in transmission: direction is not defined')
    } else position.d = code[2]

    return {
      ...position
    }
  } catch (err) {
    return console.log(
      'Euston we have a problem, please check transmission line'
    )
  }
}
module.exports = transmissionValidations
