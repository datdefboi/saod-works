class LinkedListNode {
    constructor(next, prev, val) {
        this.next = next;
        this.prev = prev;
        this.val = val;
    }
}
class LinkedList {
    constructor() {
        this.count = 0;
    }
    iterate(iterator) {
        let c = this.head;
        while (c) {
            if (!iterator(c.val, c))
                break;
            c = c.next;
        }
    }
    debug() {
        var _a, _b;
        let c = this.head;
        while (c) {
            console.log(`${(_a = c.prev) === null || _a === void 0 ? void 0 : _a.val} => ${c.val} => ${(_b = c.next) === null || _b === void 0 ? void 0 : _b.val}`);
            c = c.next;
        }
    }
    addHead(v) {
        var n = new LinkedListNode(this.head, null, v);
        if (this.head)
            this.head.prev = n;
        this.head = n;
        if (!this.count)
            this.tail = n;
        this.count++;
    }
    addTail(v) {
        var n = new LinkedListNode(null, this.tail, v);
        if (this.tail)
            this.tail.next = n;
        this.tail = n;
        if (!this.count)
            this.head = n;
        this.count++;
    }
    insertAfter(nV, predicate) {
        this.iterate((v, n) => {
            if (predicate(v)) {
                var node = new LinkedListNode(n.next, n, nV);
                if (n == this.tail)
                    this.tail = node;
                if (n.next)
                    n.next.prev = node;
                n.next = node;
                return false;
            }
            return true;
        });
    }
    counts(predicate) {
        let count = 0;
        this.iterate((v) => {
            if (predicate(v)) {
                count++;
            }
            return true;
        });
        return count;
    }
    remove(predicate) {
        this.iterate((v, n) => {
            if (predicate(v)) {
                if (n.prev)
                    n.prev.next = n.next;
                if (n.next)
                    n.next.prev = n.prev;
                if (this.tail == n)
                    this.tail = n.prev;
                if (this.head == n)
                    this.head = n.next;
                return false;
            }
            return true;
        });
    }
}
const ll = new LinkedList();
/*
function pick() {
    return Math.trunc(Math.random() * 3)
}

function simulateMonte(change: boolean) {
    var roomN = pick()

    if (!change) {
        return pick() == roomN
    } else {
        return Math.random() > 0.5
    }
}

const yes = new LinkedList<boolean>()
const no = new LinkedList<boolean>()
for (let i = 0; i < 100_000; i++) {
    yes.addHead(simulateMonte(true))
    no.addHead(simulateMonte(false))
}

console.log(`YES = ${yes.counts(p => p)} NO = ${no.counts(p => p)}`) */
ll.addHead(10);
ll.addHead(20);
ll.addHead(30);
ll.addTail(-30);
ll.insertAfter(50, p => p == 10);
ll.insertAfter(60, p => p == 30);
ll.remove(p => p == 20);
ll.remove(p => p == -30);
ll.remove(p => p == 30);
ll.debug();
