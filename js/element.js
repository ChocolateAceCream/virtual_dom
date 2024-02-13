console.log("-------element.js----")

class Element {
  constructor(tagName='', props={}, children=[]) {
    console.log('-------arguments-----', arguments)
    if (!(this instanceof Element)) {
      if (!Array.isArray(children) && children) {
        this.children = [children]
      }
    }
    this.tagName = tagName
    this.props = props
    this.children = [children]
  }

  render() {

  }
}

Element.prototype.render = function () {
  var el = document.createElement(this.tagName)
  var props = this.props

  for (var propName in props) {
    var propValue = props[propName]
    el.setAttribute(propName, propValue)
  }
  var children = this.children
  console.log('---this---', this)
  // children.forEach(child => {
  //   console.log('---child---,child instanceof Element', child, child instanceof Element)
  //   if (child instanceof Element) {
  //     let r = child.render()
  //     console.log('---r1---', r)
  //     el.appendChild(r)
  //   } else {
  //     el.appendChild(document.createTextNode(child))
  //   }
  // })
  console.log('---el---', el)
  return el
}


export default Element

