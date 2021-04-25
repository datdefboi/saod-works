import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tree, { TreeNode } from './utils/tree';
import TreeNodePresenter from './components/TreeNodePresenter';

function App() {
  const tree = new Tree<number>()

  tree.add(5)
  tree.add(9)
  tree.add(12)
  tree.add(8)
  tree.add(3)

  console.log(tree.root)

  function renderTree<T>(node: TreeNode<T>) {
    return <TreeNodePresenter node={node} />
  }

  return (
    <div className="App">
      {renderTree(tree.root!)}
    </div>
  );
}

export default App;
