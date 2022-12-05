// https://adventofcode.com/2022/day/3

import * as fs from "fs"

const LOWER_CHAR_MINUS = 96
const UPPER_CHAR_MINUS = 38

const rucksacks = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n")
    .filter((it) => !!it)
    .map((it) => it.split(""))

// Assignment 1

const sumOfDuplicates = rucksacks.reduce((sum, rucksack) => {
    const duplicate = rucksack.find((item) => rucksack.indexOf(item, rucksack.length / 2) > -1) as string
    return (
        sum +
        duplicate.charCodeAt(0) -
        (duplicate.charCodeAt(0) > LOWER_CHAR_MINUS ? LOWER_CHAR_MINUS : UPPER_CHAR_MINUS)
    )
}, 0)

console.log("Sum of duplicates", sumOfDuplicates)

// Assignment 2

const groupedRucksacks = rucksacks.reduce<string[][][]>(
    (grouped, rucksack) => {
        if (grouped[grouped.length - 1].length > 2) {
            grouped.push([])
        }
        grouped[grouped.length - 1].push(rucksack)
        return grouped
    },
    [[]],
)

const sumOfBadges = groupedRucksacks.reduce((sum, groupRucksacks) => {
    const groupBadge = groupRucksacks.reduce((a, b) => a.filter((c) => b.includes(c)))[0]
    return (
        sum +
        groupBadge.charCodeAt(0) -
        (groupBadge.charCodeAt(0) > LOWER_CHAR_MINUS ? LOWER_CHAR_MINUS : UPPER_CHAR_MINUS)
    )
}, 0)

console.log("Sum of badges", sumOfBadges)
