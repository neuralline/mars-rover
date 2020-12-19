const moveRoverForward = require('./components/moveRoverForward')
const roverMatrix = require('./components/roverMatrix')
const transmissionValidations = require('./components/transmissionValidations')
/**
 * 
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

   usage: rover('5 5')('1 2 N')('MMRMMRMRRM')

 * MARS ROVER APP
 *
 * @param {string} upperCoordinates
 *
 *
 */

const rover = upperCoordinates => {
  //Rover state and variables
  const state = {
    currentPosition: {x: 0, y: 0, d: 'N'},
    plateau: [],
    run: 0
  }

  //rover matrix and schematics
  const byNumber = {0: 'N', 1: 'E', 2: 'S', 3: 'W'}
  const byLetter = {N: 0, E: 1, S: 2, W: 3}
  const schema = {L: -1, R: 1, M: 0}

  /**
   *
   * rover state managers
   */
  const setState = ({x, y, d}) => {
    //prevent Rover falling off the plateau
    if (x > state.plateau[0] || y > state.plateau[y] || x < 0 || y < 0)
      return console.log('Rover should not move past the plateau')
    //update state
    state.currentPosition = {...state.currentPosition, x, y, d}
    return {...state.currentPosition, x, y, d}
  }

  //return rover's state
  const getState = () => {
    return {...state.currentPosition}
  }

  /**
   *
   * Rover decoding, positioning and maneuvering
   */
  //process first line of code and set initial rover position
  const firstLine = initialPosition => {
    const position = transmissionValidations(initialPosition, 3)
    if (!position)
      return console.log(
        'Missed in transmission: please provide first line of code'
      )
    const {x, y, d} = position
    if (typeof byLetter[d] === 'undefined')
      return console.log('Bad transmission signal: unknown direction ')
    setState({x, y, d})
    state.run = 1
    return recursiveLineSwitcher
  }

  //decode second line of instructions and manuever rover
  const secondLine = instructions => {
    const coordinates = [...instructions].map(code => {
      const tempXYD = roverPositioningSystem(code, {
        ...getState()
      })
      if (!tempXYD) return
      return setState({...tempXYD})
    })

    //check if coordinates has a bad apple aka [undefined]
    if (new Set(coordinates).has(undefined))
      return console.log(
        'Transmission error: please provide second line of code'
      )
    //return the last data in the array
    const {x, y, d} = coordinates.slice(-1)[0]

    //set the next recursive function to [firstLine]
    state.run = 0
    return `${x} ${y} ${d}`
  }

  //rover manuever unit
  const roverPositioningSystem = (code, {x, y, d}) => {
    if (code === 'M') {
      return moveRoverForward(x, y, d, 1)
    } else if (code === 'L' || code === 'R') {
      const rotationSchema = byLetter[d] + schema[code]
      const calculatedDirection = roverMatrix(rotationSchema)
      return {x, y, d: byNumber[calculatedDirection]}
    } else {
      return undefined
    }
  }

  /**
   *
   * switches the recursive function between [firstLine, secondLine]
   * @param {string} line
   */
  const recursiveLineSwitcher = line => {
    if (!line)
      return console.log(
        'Missed in transmission: please provide the next line of code'
      )
    if (state.run === 0) return firstLine(line)
    else return secondLine(line)
  }

  /**
   *
   * Establish connection with Mars Rover app
   */
  try {
    const {x, y} = transmissionValidations(upperCoordinates, 2)
    state.plateau = [x, y]
    return recursiveLineSwitcher
  } catch (err) {
    return console.log(
      'Missed in transmission: please set upper right coordinates of the plateau'
    )
  }
}

module.exports = rover
