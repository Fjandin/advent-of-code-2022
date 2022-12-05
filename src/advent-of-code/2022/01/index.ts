// https://adventofcode.com/2022/day/1

import * as fs from "fs"

const calories = fs
    .readFileSync("./input.txt")
    .toString("utf8")
    .split("\n\n")
    .map((it) =>
        it
            .split("\n")
            .map(Number.parseFloat)
            .filter((it) => !isNaN(it))
            .reduce((a, b) => a + b),
    )
    .sort((a, b) => a - b)

console.log("top elf calories sum:", calories.slice(-1)[0])

console.log(
    "top 3 elf calories sum:",
    calories.slice(-3).reduce((a, b) => a + b),
)
