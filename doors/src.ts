const n = 100

function round(cN: number, boxes: number[]) {
    for (let i = 0; i < 50; i++) {
        const next = boxes[cN]
        if (next == cN)
            return true
        cN = next
    }
    return false
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
}

function genRange(n) {
    const res = []
    for (let i = 0; i < n; i++) {
        res.push(i)
    }
    return res
}

const array = shuffle(genRange(100))

const foundOne = 0


function allRounds() {
    let found = 0
    for (let i = 0; i < 50; i++) {
        const res = round(i, [...array])
        if (res)
            found++
    }
    return found == 50? 1: 0
}

let foundTotal = 0

for(let i=0;i<10_000;i++)
    foundTotal += allRounds()

console.log(foundTotal)