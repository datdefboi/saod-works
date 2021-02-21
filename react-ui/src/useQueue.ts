import { useState } from "react"

class StackNode<T>{
    constructor(
        public next: StackNode<T> | undefined,
        public value: T
    ) { }
}

class MaxSizeReachedException { }
class StackIsEmptyException { }


class Queue<T> implements Iterable<T> {
    head: StackNode<T> | undefined
    tall: StackNode<T> | undefined

    constructor() { }

    [Symbol.iterator]() {
        let current = this.head
        return {
            next() {
                const done = !current
                let value = undefined

                if (current) {
                    value = current.value
                    current = current.next
                }

                return {
                    done,
                    value
                }
            }
        } as IterableIterator<T>
    }

    count = 0

    push(val: T) {
        if (!this.head || !this.tall) {
            this.head = this.tall = new StackNode(undefined, val)
            this.count++
            return
        }
        const node = new StackNode(undefined, val)
        this.tall.next = node
        this.tall = node
        this.count++
    }

    clear() {
        this.count = 0
        this.head = this.tall = undefined
    }

    pop(): T {
        if (!this.count)
            throw new StackIsEmptyException()

        const cN = this.head
        this.head = cN?.next
        this.count--
        return cN!!.value
    }

    peak(): T {
        if (!this.head)
            throw new StackIsEmptyException()
        return this.head.value
    }

    getIsEmpty() {
        return !this.count
    }
}

interface QueueControl<T> {
    push(val: T): void
    pop(): T
    peak(): T
    count: number,
    iterator: Iterable<T>
}

export default function useQueue<T>() {
    const [q, setQ] = useState<Queue<T>>(new Queue<T>())
    const [count, setCount] = useState(0)

    const toggle = () => { setCount(q.count) }

    return {
        push(v: T) {
            q.push(v)
            toggle()
            console.log("count set")
        },
        pop() {
            const val = q.pop()
            toggle()
            return val
        },
        peak() {
            return q.peak()
        },
        count,
        iterator: q
    } as QueueControl<T>
}
