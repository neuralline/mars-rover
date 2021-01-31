import {Schema} from '../index-env'

//Rover state and variables
//{x: 'x-axis', y: 'y-axis', d: 'direction', e: 'error'}

export const initialState: Schema = {x: 0, y: 0, d: 'N', e: ''}

//rover matrix and schematics
export const byNumber = {0: 'N', 1: 'E', 2: 'S', 3: 'W'}
export const byLetter = {N: 0, E: 1, S: 2, W: 3}
export const byDirection = {L: -1, R: 1, M: 0}
