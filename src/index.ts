import {setInitialPosition} from './modules/firstLine'
import {initialState} from './providers/state'
import {driveRover} from './modules/secondLine'
import {useState} from './providers/useState'
import validations from './validations/validations'
import {Schema, Plateau} from './index-env'
/**
 * 
 * @title mars-rover
 * @author Darik Hart
 * @github @neuralline/mars-rover
 
    Test Input:
    -plateau
    5 5
    --------------
    -Rover 1
    1 2 N
    LMLMLMLMM
    Output:
    1 3 N
    --------------
    -Rover 2
    3 3 E
    MMRMMRMRRM
    Output:
    5 1 E
    --------------

   usage: rover('5 5')('1 2 N')('MMRMMRMRRM')

 * MARS ROVER
 *
 * 
 * definitions : {x: 'x-axis', y: 'y-axis', d: 'direction', e: 'error'}
 */

const rover = (upperCoordinates: string) => {
  /**
   * rover state managers
   * {x: 'x-axis', y: 'y-axis', d: 'direction', e: 'error'}
   */
  const [getState, setState] = useState<Schema>(initialState)
  const [plateau, setPlateau] = useState<Plateau>([0, 0])
  const [processor, setProcessor] = useState<number>(0)
  /**
   *
   * switches the recursive function between [firstLine, secondLine]
   *
   */
  const recursiveLineSwitcher = (instructions: string) => {
    //definitions : {x: 'x-axis', y: 'y-axis', d: 'direction', e: 'error'}
    try {
      if (!instructions)
        return console.log(
          'Missed in transmission: please provide initial position of the Rover'
        )
      if (processor() === 0) {
        const {x, y, d, e} = setInitialPosition(instructions, getState())
        if (e) return console.log(e)
        console.log('initial position has been set to: ', {x, y, d})
        setState({x, y, d})
        setProcessor(1)
        return recursiveLineSwitcher
      } else {
        const {x, y, d, e} = driveRover(instructions, getState(), plateau())
        if (e) return console.log(e)
        console.log('current position has been set to: ', {x, y, d})
        setProcessor(0)
        return `${x} ${y} ${d}`
      }
    } catch (err) {}
  }
  /**
   *
   * Establish connection with Mars Rover app
   */
  try {
    //{x: 'x-axis', y: 'y-axis', d: 'direction', e: 'error'}
    const {x, y, e} = validations(upperCoordinates, 2)
    //let rover know the  dimensions of current plateau
    if (e) return console.log(e)
    setPlateau([x, y])
    //on set get reddy for first line of input
    return recursiveLineSwitcher
  } catch (err) {
    return console.log(
      'Euston we have a problem: please check the transmission line'
    )
  }
}

module.exports = rover
/**
   usage: rover('5 5')('1 2 N')('MMRMMRMRRM')
 */
