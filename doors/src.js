var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var n = 100;
function round(cN, boxes) {
    for (var i = 0; i < 50; i++) {
        var next = boxes[cN];
        if (next == cN)
            return true;
        cN = next;
    }
    return false;
}
function shuffle(array) {
    array.sort(function () { return Math.random() - 0.5; });
    return array;
}
function genRange(n) {
    var res = [];
    for (var i = 0; i < n; i++) {
        res.push(i);
    }
    return res;
}
var array = shuffle(genRange(100));
var foundOne = 0;
function allRounds() {
    var found = 0;
    for (var i = 0; i < 50; i++) {
        var res = round(i, __spreadArray([], array));
        if (res)
            found++;
    }
    return found == 50 ? 1 : 0;
}
var foundTotal = 0;
for (var i = 0; i < 10000; i++)
    foundTotal += allRounds();
console.log(foundTotal);
