import {Plateau, Schema} from '../index-env'
import moveRoverForward from '../functions/moveRoverForward'
import {roverPositioningSystem} from '../functions/roverPositioningSystem'

//decode second line of instructions and manuever rover
//{x: 'x-axis', y: 'y-axis', d: 'direction', e: 'error'}
export const driveRover = (
  instructions: Schema['d'],
  currentPosition: Schema,
  plateau: Plateau
) => {
  //set initial position of the rover to start with
  let position: Schema = {...currentPosition}
  //break down second line of codes and map through
  //using for in loop because it gives me greater control
  //avoid mutation
  for (let i in [...instructions]) {
    const code = instructions[i]
    const {x, y, d, e} =
      code === 'M'
        ? moveRoverForward(plateau, {...position})
        : roverPositioningSystem(code, {...position})
    //if error is detected abort maneuvering
    if (e) return {x, y, d, e}
    //update position with current position{x.y.d.e}
    position = {x, y, d, e}
  }

  return {...position}
}
