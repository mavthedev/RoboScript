
# robot.peggy

## 


### Program

![Program](./robot/Program.svg)

References: [Grid](#Grid), [Headers](#Headers), [Commands](#Commands)

### Grid

![Grid](./robot/Grid.svg)

Used by: [Program](#Program)
References: [integer](#integer), [semicolon](#semicolon), [n__](#n__)

### Headers

![Headers](./robot/Headers.svg)

Used by: [Program](#Program)
References: [Finish](#Finish), [Obstacles](#Obstacles)

### Finish

![Finish](./robot/Finish.svg)

Used by: [Headers](#Headers)
References: [coord](#coord), [semicolon](#semicolon), [n__](#n__)

### Obstacles

![Obstacles](./robot/Obstacles.svg)

Used by: [Headers](#Headers)
References: [Obstacle](#Obstacle)

### Obstacle

![Obstacle](./robot/Obstacle.svg)

Used by: [Obstacles](#Obstacles)
References: [coord](#coord), [semicolon](#semicolon), [n__](#n__)

### Commands

![Commands](./robot/Commands.svg)

Used by: [Program](#Program)
References: [line](#line)

### line

![line](./robot/line.svg)

Used by: [Commands](#Commands)
References: [Command](#Command), [dot](#dot), [n__](#n__)

### Command

![Command](./robot/Command.svg)

Used by: [line](#line)
References: [turn](#turn), [go](#go)

### turn

![turn](./robot/turn.svg)

Used by: [Command](#Command)
References: [__](#__), [lr](#lr)

### go

![go](./robot/go.svg)

Used by: [Command](#Command)
References: [__](#__), [integer](#integer)

### lr

![lr](./robot/lr.svg)

Used by: [turn](#turn)

### integer

![integer](./robot/integer.svg)

Used by: [Grid](#Grid), [go](#go), [coord](#coord)
References: [negate](#negate)

### negate

![negate](./robot/negate.svg)

Used by: [integer](#integer)

### semicolon

![semicolon](./robot/semicolon.svg)

Used by: [Grid](#Grid), [Finish](#Finish), [Obstacle](#Obstacle)

### dot

![dot](./robot/dot.svg)

Used by: [line](#line)

### coord

![coord](./robot/coord.svg)

Used by: [Finish](#Finish), [Obstacle](#Obstacle)
References: [__](#__), [integer](#integer)

### n__

![n__](./robot/n__.svg)

Used by: [Grid](#Grid), [Finish](#Finish), [Obstacle](#Obstacle), [line](#line)
References: [n_](#n_)

### n_

![n_](./robot/n_.svg)

Used by: [n__](#n__)
References: [_](#_)

### __

![__](./robot/__.svg)

Used by: [turn](#turn), [go](#go), [coord](#coord)
References: [_](#_)

### _

![_](./robot/_.svg)

Used by: [n_](#n_), [__](#__)

