export interface Schema {
  x: number
  y: number
  d: 'N' | 'W' | 'S' | 'E' | string
  e?: string
}

export type Plateau = [number, number]

export interface State {
  currentPosition: Schema
  plateau: Plateau
  processor: number
}
