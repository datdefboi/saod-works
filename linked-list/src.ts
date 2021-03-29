class LinkedListNode<T>{
    constructor(
        public next: LinkedListNode<T> | null,
        public prev: LinkedListNode<T> | null,
        public val: T,
    ) { }
}

class LinkedList<T> {
    head: LinkedListNode<T> | null
    tail: LinkedListNode<T> | null

    count: number = 0

    iterate(iterator: (v: T, n: LinkedListNode<T>) => boolean) {
        let c = this.head
        while (c) {
            if (!iterator(c.val, c))
                break
            c = c.next
        }
    }

    debug() {
        let c = this.head
        while (c) {
            console.log(`${c.prev?.val} => ${c.val} => ${c.next?.val}`)
            c = c.next
        }
    }

    addHead(v: T) {
        var n = new LinkedListNode<T>(this.head, null, v)

        if (this.head)
            this.head.prev = n
        this.head = n

        if (!this.count)
            this.tail = n

        this.count++
    }

    addTail(v: T) {
        var n = new LinkedListNode<T>(null, this.tail, v)

        if (this.tail)
            this.tail.next = n
        this.tail = n

        if (!this.count)
            this.head = n
        this.count++
    }

    insertAfter(nV: T, predicate: (v: T) => boolean) {
        this.iterate((v, n) => {
            if (predicate(v)) {
                var node = new LinkedListNode(n.next, n, nV)

                if (n == this.tail)
                    this.tail = node

                if (n.next)
                    n.next.prev = node

                n.next = node

                return false
            }
            return true
        })
    }

    counts(predicate: (v: T) => boolean) {
        let count = 0
        this.iterate((v) => {
            if (predicate(v)) {
                count++
            }
            return true
        })
        return count
    }

    remove(predicate: (v: T) => boolean) {
        this.iterate((v, n) => {
            if (predicate(v)) {
                if (n.prev)
                    n.prev.next = n.next

                if (n.next)
                    n.next.prev = n.prev

                if (this.tail == n)
                    this.tail = n.prev

                if (this.head == n)
                    this.head = n.next


                return false
            }
            return true
        })
    }
}

const ll = new LinkedList<number>()
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

ll.addHead(10)
ll.addHead(20)
ll.addHead(30)
ll.addTail(-30)

ll.insertAfter(50, p => p == 10)
ll.insertAfter(60, p => p == 30)

ll.remove(p=>p == 20)
ll.remove(p=>p == -30)
ll.remove(p=>p == 30)

ll.debug()
