import { threadId } from "node:worker_threads"

export class TreeNode<T>{
    constructor(
        public value: T,
        public left?: TreeNode<T>,
        public right?: TreeNode<T>
    ) { }
}

export default class Tree<T>{
    root?: TreeNode<T>

    constructor() { }

    add(val: T, node?: TreeNode<T>) {
        const n = node || this.root
        if (!n) {
            this.root = new TreeNode(val)
            return
        }

        if(n.value>val){
            if(n.left){
                this.add(val, n.left)
            }else{
                n.left = new TreeNode(val)
            }
        }else{
            if(n.right){
                this.add(val, n.right)
            }else{
                n.right = new TreeNode(val)
            }
        }
    }
}