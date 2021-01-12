const moveRoverForward = require('./components/moveRoverForward')
const rotationAdjustment = require('./components/roverMatrix')
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
  const byDirection = {L: -1, R: 1, M: 0}

  /**
   *
   * rover state managers
   * @returns void
   */
  const setState = ({x, y, d}) => {
    //prevent Rover falling off the plateau
    if (x > state.plateau[0] || y > state.plateau[y] || x < 0 || y < 0) {
      return console.log('Rover should not move past the plateau')
    }
    //update state
    return (state.currentPosition = {...state.currentPosition, x, y, d})
  }

  //return rover's state
  /**
   * @returns {state} state current position
   */
  const getState = () => {
    return {...state.currentPosition}
  }

  /**
   *
   * Rover input decoding, positioning and maneuvering unit
   */
  //process first line of code and set initial rover position
  const firstLine = initialPosition => {
    //check if the first line is a valid input
    const position = transmissionValidations(initialPosition, 3)
    if (!position)
      return console.log(
        'Missed in transmission: please provide first line of code'
      )
    const {x, y, d} = position
    //if received value is recognisable by the rover
    if (typeof byLetter[d] === 'undefined')
      return console.log('Bad transmission signal: unknown direction ')
    //set rover to its initial state
    setState({x, y, d})

    // let rover know the first line of code has been set
    state.run = 1
    //get ready for second line of input
    return recursiveLineSwitcher
  }

  //decode second line of instructions and manuever rover
  const secondLine = instructions => {
    //break down second line of codes and map through
    const coordinates = [...instructions].map(code => {
      //process each code also send current position of the rover
      const xyd = roverPositioningSystem(code, {
        ...getState()
      })
      //if xyd value is not recognised terminate
      if (!xyd) return
      //update rover current state
      return setState({...xyd})
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

  /***
   *
   * //rover manuever unit
   *
   */

  const roverPositioningSystem = (code, {x, y, d}) => {
    if (code === 'M') {
      //if the code is M it means move forward
      return moveRoverForward(x, y, d, 1)
    } else if (code === 'L' || code === 'R') {
      //L and r are rotation codes
      //calculate rotation by looking up the value of d[N,W,S,E] plus code[L,R] from the matrix
      const rotationSchema = byLetter[d] + byDirection[code]
      //adjust direction to rotation overflow
      const calculatedDirection = rotationAdjustment(rotationSchema)
      //return {x, y, and d value from the matrix}
      return {x, y, d: byNumber[calculatedDirection]}
    } else {
      //received unknown code
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
    //let rover know the  dimensions of current plateau
    state.plateau = [x, y]
    //on set get reddy for first line of input
    return recursiveLineSwitcher
  } catch (err) {
    return console.log(
      'Missed in transmission: please set upper right coordinates of the plateau'
    )
  }
}

module.exports = rover
