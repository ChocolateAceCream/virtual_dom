import el from "./element.js"
var tree = new el('div', { 'id': 'container' }, [
  new el('h1', { style: 'color: blue' }, ['simple virtal dom']),
  new el('p', ['Hello, virtual-dom']),
  new el('ul',[new el('li')]),
  "div"
])
console.log('----tree---', tree)
var root = tree.render()
const app = document.getElementById('app')
app?.appendChild(root)

// console.log('----ul---', ul)
// var ulRoot = ul.render()
// console.log('----urRoot---', ulRoot)
// document.body.appendChild(ulRoot)