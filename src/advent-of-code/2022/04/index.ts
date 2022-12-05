// https://adventofcode.com/2022/day/4

import * as fs from "fs"

type Range = [number, number]

const isSubsetOf = (main: Range, check: Range) => check[0] >= main[0] && check[1] <= main[1]

const intersects = (main: Range, check: Range) => check[1] >= main[0]

const sectionAssignments = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n")
    .filter((it) => !!it)
    .map((it) => it.split(",").map((it) => it.split("-").map(parseFloat))) as Array<[Range, Range]>

// Assignment 1

const sectionSubsets = sectionAssignments.reduce(
    (count, sectionRanges) =>
        count +
        (isSubsetOf(sectionRanges[0], sectionRanges[1]) || isSubsetOf(sectionRanges[1], sectionRanges[0]) ? 1 : 0),
    0,
)

console.log("Sections with subset", sectionSubsets)

// Assignment 2

const sectionIntersects = sectionAssignments.reduce(
    (count, sectionRanges) =>
        count +
        (intersects(sectionRanges[0], sectionRanges[1]) && intersects(sectionRanges[1], sectionRanges[0]) ? 1 : 0),
    0,
)

console.log("Sections with intersect", sectionIntersects)
