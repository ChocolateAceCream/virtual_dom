import el from "./element.ts"
var tree = new el('div', { 'id': 'container' }, [
  new el('h1', { style: 'color: blue' }, ['simple virtal dom']),
  new el('p', null,['Hello, virtual-dom']),
  new el('ul',null, [new el('li')]),
  "div"
])
console.log('----tree---', tree)
var root = tree.render()
document.body.appendChild(root)

// console.log('----ul---', ul)
// var ulRoot = ul.render()
// console.log('----urRoot---', ulRoot)
// document.body.appendChild(ulRoot)