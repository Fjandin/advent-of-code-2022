// https://adventofcode.com/2022/day/6

import * as fs from "fs"

const signals = fs.readFileSync("./input.txt", "utf-8").split("\n")[0].split("")

const checkForSignal = (inputArray: string[], length: number) => {
    const checkArray: string[] = []
    let atPos: number | null = null
    signals.some((signal, index) => {
        checkArray.push(signal)
        if (checkArray.length < length) {
            return false
        }
        if (checkArray.length > length) {
            checkArray.shift()
        }
        const hasDuplicates = checkArray.some((it, i) => checkArray.indexOf(it) !== i)
        if (!hasDuplicates) {
            atPos = index + 1
            return true
        }
        return false
    })

    return atPos
}

// Assignment 1

console.log("(4) Signal at", checkForSignal(signals, 4))

// Assignment 2

console.log("(14) Signal at", checkForSignal(signals, 14))
