// https://adventofcode.com/2022/day/2

import * as fs from "fs"

type Opponent = "A" | "B" | "C"
type Player = "X" | "Y" | "Z"
const rulesA = {
    A: {X: 1 + 3, Y: 2 + 6, Z: 3},
    B: {X: 1, Y: 2 + 3, Z: 3 + 6},
    C: {X: 1 + 6, Y: 2, Z: 3 + 3},
}
const rulesB = {
    A: {draw: 1 + 3, win: 2 + 6, loose: 3},
    B: {loose: 1, draw: 2 + 3, win: 3 + 6},
    C: {win: 1 + 6, loose: 2, draw: 3 + 3},
}

const plays = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map((it) => it.split(" "))
    .filter((it) => it.length === 2)

const pointsA = plays.reduce((points, game) =>
    points + rulesA[game[0] as Opponent][game[1] as Player]
, 0)

const pointsB = plays.reduce((points, game) => {
    switch (game[1] as Player) {
        case "X": // Loose
            return points + rulesB[game[0] as Opponent].loose
        case "Y": // draw
            return points + rulesB[game[0] as Opponent].draw
        case "Z": // win
            return points + rulesB[game[0] as Opponent].win
    }
}, 0)

console.log("A Points", pointsA)
console.log("B Points", pointsB)
