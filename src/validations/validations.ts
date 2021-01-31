import {Schema} from '../index-env'
import {initialState} from '../providers/state'

//simple input validation
//{x: 'x-axis', y: 'y-axis', d: 'direction', e: 'error'}
const validations = (
  input: string,
  requiredNumberOfInstructions: number = 2
): Schema => {
  try {
    const code = input.trim().split(' ')

    const position: Schema = {
      x: Number.parseInt(code[0]),
      y: Number.parseInt(code[1]),
      d: 'N'
    }

    if (code.length < requiredNumberOfInstructions) {
      return {
        ...position,
        e: 'Bad transmission signal: not all instructions has been detected'
      }
    }

    //validating the first round of instructions
    //check if the input values are a number
    if (!Number.isInteger(position.x) || !Number.isInteger(position.y)) {
      return {...position, e: 'Bad transmission signal: invalid (x,y) signal'}
    }

    //validation for second line of instructions
    if (requiredNumberOfInstructions === 3 && !code[2]) {
      return {
        ...position,
        e: 'Missed in transmission: direction is not defined'
      }
    } else {
      position.d = code[2]
    }

    return {
      ...position,
      e: ''
    }
  } catch (err) {
    return {
      ...initialState,
      e: 'Euston we have a problem: please check the transmission line'
    }
  }
}
export default validations
