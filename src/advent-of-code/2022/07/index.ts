// https://adventofcode.com/2022/day/6

import * as fs from "fs"

const lines = fs
    .readFileSync("./input.txt", "utf-8")
    // Split by line
    .split("\n")
    // Filter out useless stuff
    .filter((it) => !!it && it !== "$ ls" && it.substring(0, 3) !== "dir")
    // Split by part
    .map((line) => line.split(" "))

// Keep track of dir sizes
const dirs: {[dir: string]: number} = {}
// Keep track of current dir
let currentDir: string[] = ["ROOT"]

// Loop through terminal lines
lines.forEach((line) => {
    if (line[0] === "$") {
        if (line[1] === "cd" && line[2] === "/") {
            currentDir = ["ROOT"]
        } else if (line[1] === "cd" && line[2] === "..") {
            currentDir.pop()
        } else {
            currentDir.push(line[2])
        }
        return
    }

    currentDir.reduce<string[]>((d, folder) => {
        const newD = [...d, folder]
        dirs[newD.join("/")] = (dirs[newD.join("/")] ?? 0) + parseFloat(line[0])
        return newD
    }, [])
})

// Assignment 1

const DIR_SIZE_LIMIT = 100_000

const sumOfDirsLessThanLimit = Object.values(dirs).reduce((sum, dirSize) => {
    return sum + (dirSize <= DIR_SIZE_LIMIT ? dirSize : 0)
}, 0)

console.log("Sum of dirs of size less than", DIR_SIZE_LIMIT, sumOfDirsLessThanLimit)

// Assignment 2

const FILESYSTEM_SPACE = 70_000_000
const UNUSED_SPACE_REQUIREMENT = 30_000_000
const UNUSED_SPACE = FILESYSTEM_SPACE - dirs.ROOT

Object.values(dirs)
    .sort((a, b) => a - b)
    .some((size) => {
        if (UNUSED_SPACE + size >= UNUSED_SPACE_REQUIREMENT) {
            console.log("Smallest dir to delete", size)
            return true
        }
        return false
    })
