# MARS ROVER

<br/>

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.
This plateau, which is curiously rectangular, must be navigated by the rovers so that their on board cameras can get a complete view of the surrounding terrain to send back to Earth. <br/>
A rover's position is represented by a combination of an x and y co-ordinates and a letter representing one of the four cardinal
compass points.<br/>
The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left
corner and facing North.<br/>
In order to control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover
spin 90<br/>
degrees left or right respectively, without moving from its current spot.<br/>
'M' means move forward one grid point, and maintain the same heading.<br/>
Assume that the square directly North from (x, y) is (x, y+1).<br/><br/><br/>
![Screenshot](mars-rover.jpg)
<br/>

## Input:

The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.<br/>
The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover's position, and the second line is a series of instructions telling the rover how to explore the plateau.<br/>
The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover's orientation.<br/>
Each rover will be finished sequentially, which means that the second rover won't start to move until the first one has finished moving.<br/><br/>
Output:
The output for each rover should be its final co-ordinates and heading.<br/>

## rover 1

Input:<br/>

> 5 5<br/>
> 1 2 N<br/>
> LMLMLMLMM<br/>

Expected Output:<br/>

> 1 3 N<br/>

## reover 2

Input:<br/>

> 5 5<br/>
> 3 3 E<br/>
> MMRMMRMRRM<br/>

Expected Output:<br/>

> 5 1 E<br/>

## Installation

```sh
npm install then npm start
#or
yarn install then yarn start
```

## Test

```sh
npm run build then npm ren test
#or
yarn build then yarn test
```

## Usage

```sh
import rover from 'mars-rover'


rover('5 5')('1 2 N')('LMLMLMLMM')


#or

const mars = rover('5 5')
mars('1 2 N')
mars('LMLMLMLMM')


#or

const mars = rover('5 5')
mars('3 3 E')('MMRMMRMRRM')


```
