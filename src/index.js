/**
 * @title mars-rover
 * @author Darik Hart
 * @github @neuralline/mars-rover
 

Test Input:
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
Expected Output:
1 3 N
5 1 E`

*/

//simple input validation
const inputValidation = (input, number = 2) => {
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
      return console.log('invalid input ')

    if (number === 3 && typeof code[2] === 'undefined') {
      return console.log('direction is not defined')
    } else position.d = code[2]

    return {
      ...position
    }
  } catch (err) {
    return console.log('input validation error')
  }
}

const matrixCheck = (i, minMax = [0, 3]) => {
  if (i < minMax[0]) return minMax[1]
  else if (i > minMax[1]) return minMax[0]
  return i
}

const moveRoverForward = (x, y, d, m = 1) => {
  const move = {
    N: () => (y += m),
    W: () => (x -= m),
    S: () => (y -= m),
    E: () => (x += m)
  }
  move[d]()
  return {x, y, d}
}

const rover = upperCoordinates => {
  //Rover state and variables
  const state = {currentPosition: {x: 0, y: 0, d: 'N'}}
  let run = 0
  let plateau = []

  //rover matrix and schematics
  const byNumber = {0: 'N', 1: 'E', 2: 'S', 3: 'W'}
  const byLetter = {N: 0, E: 1, S: 2, W: 3}
  const schema = {L: -1, R: 1, M: 0}

  //update Rover's state
  const setState = ({x, y, d}) => {
    //prevent Rover falling
    if (x > plateau[0] || y > plateau[y] || x < 0 || y < 0)
      return console.log('Rover should not move past the plateau')
    state.currentPosition = {...state.currentPosition, x, y, d}
    return {...state.currentPosition, x, y, d}
  }

  //return rover's state
  const getState = () => {
    return {...state.currentPosition}
  }

  //process first line of command and set initial rover position
  const firstLine = initialPosition => {
    const position = inputValidation(initialPosition, 3)
    if (!position) return console.log('Please provide first line of code')
    const {x, y, d} = position
    if (typeof byLetter[d] === 'undefined') return
    setState({x, y, d})
    run = 1
    return taskSwitcher
  }

  //decode second line of instructions and manuever rover
  const secondLine = instructions => {
    const coordinates = [...instructions].map(code => {
      const tempXYD = theCoordinator(code, {...getState()})
      if (!tempXYD) return
      return setState({...tempXYD})
    })

    if (new Set(coordinates).has(undefined)) return
    const {x, y, d} = coordinates.slice(-1)[0]
    run = 0
    return `${x} ${y} ${d}`
  }

  //rover manuever algorithm unit
  const theCoordinator = (code, {x, y, d}) => {
    if (code === 'M') {
      return moveRoverForward(x, y, d)
    } else if (code === 'L' || code === 'R') {
      const rotationSchema = byLetter[d] + schema[code]
      const calculatedDirection = matrixCheck(rotationSchema)
      return {x, y, d: byNumber[calculatedDirection]}
    } else {
      return undefined
    }
  }

  const taskSwitcher = line => {
    if (!line) return console.log('Please provide the next line of code')
    if (run === 0) return firstLine(line)
    else return secondLine(line)
  }

  if (inputValidation(upperCoordinates, 2)) {
    const {x, y} = inputValidation(upperCoordinates, 2)
    plateau = [x, y]
  } else {
    return console.log('Please provide upper right coordinate of the plateau')
  }

  return taskSwitcher
}

module.exports = rover
/*


    rover('5 5')('1 2 N')('MMRMMRMRRM')


*/
