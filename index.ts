// @ts-ignore
import { parse as pegParse } from './robot.js'

type Cardinal = "north" | "east" | "south" | "west"

type RobotOut = [
    Position,
    Direction,
    boolean,
    string?
]
type Position = [number, number]
type Direction = number

/**
 * @description List of commands
 */
type CommandList = Array<number>

/**
 * @description List of obstacles
 */
type ObstacleList = Array<[number, number]>

/**
 * @description Values passed into the Into the Interpreter
 */
type RobotIn = [
    number,
    CommandList,
    RobotOptions
]

type CardinalMap = {
    [K in Cardinal]: Position
}

type RobotOptions = {
    finishLine: Position,
    obstacles: ObstacleList
}

function isOutside(a: number, b: number) {
    return a > b || a < -b
}

function getVel(dir: Cardinal): Position {
    const map: CardinalMap = {
        north: [0, 1],
        east: [1, 0],
        south: [0, -1],
        west: [-1, 0]
    }
    return map[dir]
}

function getCardinal(angle: Direction): Cardinal {
    if(typeof angle === 'string') angle = parseInt(angle);
    if( typeof angle === 'undefined') throw new Error('angle is undefines')
    if(angle < 0 || angle > 360) angle = mod(angle, 360);
    const directions: Cardinal[] = ["north", "east", "south", "west"];
    const degree = 360 / directions.length;
    angle = angle + degree / 2;
    for (let i = 0; i < directions.length; i++) {
      if (angle >= (i * degree) && angle < (i + 1) * degree) return directions[i];
    }
    return "north";
}

function parseAngle(val: any) {
    return parseInt(val) % 360
}

function range(size: number, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function mod(a: number, b: number) {
    return ((a % b) + b) % b
}

function arrayEquality<T>(a: Array<T>, b: Array<T>) {
    return JSON.stringify(a) === JSON.stringify(b)
}

/**
 * @param {CommandList} commands
 * @param {RobotOptions} options
 * @param {boolean} verbose
 * @returns {Generator<RobotOut>}
 */
function* interpret(gridSize: number, commands: CommandList, options: RobotOptions, verbose: boolean = true): Generator<RobotOut> {
    let direction: Direction = 0 // North by default
    let pos: Position = [0, 0]
    let vel = [0, 1] // Should match the direction variable
    let lastStep = ""
    const { finishLine, obstacles } = options
    if(obstacles.some(r => arrayEquality(pos, r))) {
        throw new Error("CommandError: Obstacle cannot be (0, 0)")
    } else if(arrayEquality(pos, finishLine)) {
        throw new Error("CommandError: Finish line cannot be origin")
    }
    cmdLoop: for(let cmd of commands) {
        if(Math.sign(cmd) < 0) {
            // Turn command
            switch(cmd) {
                case -2:
                    // left
                    direction -= 90
                    direction = parseAngle(direction)
                    vel = getVel(getCardinal(direction))
                    lastStep = "turn left."
                    break;
                case -1:
                    // right
                    direction += 90
                    direction = parseAngle(direction)
                    vel = getVel(getCardinal(direction))
                    lastStep = "turn right."
                    break;
            }
        } else if(Math.sign(cmd) > 0) {
            // Move command
            lastStep = `(forward ${cmd})`
            for(const i of range(cmd)) {
                pos[0] += vel[0]
                pos[1] += vel[1]
                lastStep += `\n\tmove 1. (out of ${cmd})`
                if(obstacles.some(r => arrayEquality(pos, r)) || isOutside(pos[0], gridSize) || isOutside(pos[1], gridSize)) {
                    pos[0] -= vel[0]
                    pos[1] -= vel[1]
                    lastStep += "\n\tRobot hit wall. skipping."
                    break
                } else if(arrayEquality(pos, finishLine)) {
                    lastStep += "\nRobot hit finish line!"
                    yield [ pos, direction, true, verbose?lastStep:'' ]
                    break cmdLoop
                }
            }
        } else {
            throw new Error("CommandError")
        }
        yield [ pos, direction, arrayEquality(pos, finishLine), verbose?lastStep:'' ]
    }
}

function truncateComments(string: string): string {
    return string.replace(/\/.*/gm, "")
}

function parse(code: string): RobotIn {
    return pegParse(truncateComments(code)) as RobotIn
}

/**
 * @param {string} code 
 * @param {boolean} verbose 
 * @returns {Generator<RobotOut>}
 * @description takes the output of the parser and passes it to the interpreter
 */
export default function* parseAndInterpret(code: string, verbose: boolean = false): Generator<RobotOut> {
    yield* interpret(...parse(code), verbose)
}

export {
    parseAndInterpret,
    parse,
    interpret
}