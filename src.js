class StackNode {
    constructor(next, value) {
        this.next = next;
        this.value = value;
    }
}
class MaxSizeReachedException {
}
class StackIsEmptyException {
}
class Stack {
    constructor() {
        this.count = 0;
    }
    push(val) {
        const node = new StackNode(this.currentNode, val);
        this.currentNode = node;
        this.count++;
    }
    clear() {
        this.count = 0;
        this.currentNode = undefined;
    }
    pop() {
        if (!this.count)
            throw new StackIsEmptyException();
        const cN = this.currentNode;
        this.currentNode = cN.next;
        this.count--;
        return cN.value;
    }
    peak() {
        if (this.currentNode == undefined)
            throw new StackIsEmptyException();
        return this.currentNode.value;
    }
    getIsEmpty() {
        return !this.count;
    }
}
const opens = ["[", "(", "{"];
const closes = ["]", ")", "}"];
const s = new Stack();
function checkIsStringValid(str) {
    s.clear();
    for (const c of str) {
        const i = opens.indexOf(c);
        if (i != -1) {
            s.push(i);
            continue;
        }
        const eI = closes.indexOf(c);
        if (eI != -1) {
            if (s.getIsEmpty())
                return false;
            const inStack = s.pop();
            if (inStack == eI) {
            }
            else {
                return false;
            }
        }
    }
    return s.getIsEmpty();
}
for (const s of ["((sss)", "())", ")ee", "(", "({)}", "[{{}}()]"]) {
    console.log(`For '${s}' got ${checkIsStringValid(s)}`);
}
