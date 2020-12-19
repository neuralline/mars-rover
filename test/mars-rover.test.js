const rover = require('../src/index')

test('Rover ERROR CONtROL', () => {
  const t = () => {
    throw new TypeError()
  }
  expect(t).toThrow(TypeError)
})

test('Rover should respond undefined', () => {
  expect(rover()).toBeUndefined()
})

test('Rover should throw error', () => {
  expect(rover()).toBeUndefined()
})

test('Rover second line of input must not be empty', () => {
  const mars = rover('5 5')
  expect(mars()).toBeUndefined()
})

test('Rover should return a function on the second run', () => {
  const mars = rover('5 5')
  expect(mars('1 2 N')).toBeInstanceOf(Function)
})

test('Rover should detect invalid x and y input and return undefined', () => {
  const mars = rover('5 5')
  expect(mars('u 2 N')).toBeUndefined()
})

test('Rover should detect missing direction letter and return undefined', () => {
  const mars = rover('5 5')

  expect(mars('1 2 ')).toBeUndefined()
})

test('single Rover should return 1 3 N', () => {
  const mars = rover('5 5')
  expect(mars('1 2 N')('LMLMLMLMM')).toBe('1 3 N')
})

test('single Rover should return 5 1 E', () => {
  const mars = rover('5 5')
  expect(mars('3 3 E')('MMRMMRMRRM')).toBe('5 1 E')
})

test('Rover can be called one at a time', () => {
  const mars = rover('5 5')
  expect(mars('3 3 E')).toBeInstanceOf(Function)
  expect(mars('MMRMMRMRRM')).toBe('5 1 E')
})
test('Rover should be able to run squad of rovers', () => {
  const mars = rover('5 5')
  expect(mars('1 2 N')('LMLMLMLMM')).toBe('1 3 N')
  expect(mars('3 3 E')('MMRMMRMRRM')).toBe('5 1 E')
})

test('Rover should detect invalid direction(d) value and return undefined', () => {
  const mars = rover('5 5')
  expect(mars('1 2 3')).toBeUndefined()
})

test('Rover should detect missing second line of input and return undefined', () => {
  const mars = rover('5 5')
  expect(mars('3 3 E')).toBeInstanceOf(Function)
  expect(mars()).toBeUndefined()
})

test('Rover should handle invalid second line of input', () => {
  const mars = rover('5 5')
  expect(mars('3 3 E')).toBeInstanceOf(Function)
  expect(mars('546516')).toBeUndefined()
})

test('Rover must not fall off the plateau', () => {
  const mars = rover('5 5')
  expect(mars('3 3 E')).toBeInstanceOf(Function)
  expect(mars('MMMMMMMMMMMMMMMMMMM')).toBeUndefined()
})

test('Rover check if recursive chaining works', () => {
  expect(rover('5 5')('3 3 E')('MMRMMRMRRM')).toBe('5 1 E')
})
