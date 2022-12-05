// https://adventofcode.com/2022/day/5

import * as fs from "fs"

const input = fs.readFileSync("./input.txt", "utf-8").split("\n\n")

/*
Rotate boxes array 90deg so we get a boxes (x, y) representation
 */
const cratesMain = input[0]
    .split("\n")
    .reverse()
    .slice(1)
    .map((it) => {
        return it.match(/(.{1,4})/g)?.map((it) => it.trim() || null)
    })
    .reduce<string[][]>((final, row, y) => {
        row?.map((it, x) => {
            if (it) {
                final[x] = final[x] || []
                final[x].push(it)
            }
        })
        return final
    }, [])

// Assignment 1

const crates1: string[][] = JSON.parse(JSON.stringify(cratesMain))

input[1]
    .split("\n")
    .filter((it) => !!it)
    .forEach((move) => {
        const splitMoves = move.split(" ")
        const count = parseInt(splitMoves[1], 10)
        const from = parseInt(splitMoves[3], 10) - 1
        const to = parseInt(splitMoves[5], 10) - 1
        const cratesToMove = crates1[from].splice(-count).reverse()
        crates1[to].push(...cratesToMove)
    })

const topCrates1 = crates1.reduce((final, crates) => {
    return final + crates.pop()?.replace(/\[(\w)\]/, "$1")
}, "")

console.log("Top crates 1", topCrates1)

// Assignment 2 - Only difference from assignment 1 is that we don't reverse the crates we pick up

const crates2: string[][] = JSON.parse(JSON.stringify(cratesMain))

input[1]
    .split("\n")
    .filter((it) => !!it)
    .forEach((move) => {
        const splitMoves = move.split(" ")
        const count = parseInt(splitMoves[1], 10)
        const from = parseInt(splitMoves[3], 10) - 1
        const to = parseInt(splitMoves[5], 10) - 1
        const cratesToMove = crates2[from].splice(-count)
        crates2[to].push(...cratesToMove)
    })

const topCrates2 = crates2.reduce((final, crates) => {
    return final + crates.pop()?.replace(/\[(\w)\]/, "$1")
}, "")

console.log("Top crates 2", topCrates2)
