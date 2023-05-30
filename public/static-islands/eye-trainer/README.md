# Eye Trainer
This is a simple eye trainer game.

## How to play
1. Select your routine which you'd like to play (limited support at this time).
2. Follow the dot with your eyes.
    * Don't move your head.
    * Don't move your eyes off the dot.

# Future plans
* Add more routines.
* Add more options.

# Implementation
This game is written purely using Javascript and the SVG DOM. It uses the `getPointAtLength` method to get the position of the dot at a given length along the path. The dot is then moved to that position. The dot is moved at a constant speed, so the time it takes to complete a routine is dependent on the length of the path. The dot is moved using the `requestAnimationFrame` method and it's callback argument to ensure that the dot is always moved at the same speed regardless of the framerate.