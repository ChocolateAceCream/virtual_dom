/**
 * Virtual-dom Element.
 * @param {String} tagName
 * @param {Object} props - Element's properties,
 *                       - using object to store key-value pair
 * @param {Array<Element|String>} - This element's children elements.
 *                                - Can be Element instance or just a piece plain text.
 */

// import _ from 'lodash'
class Element {
  constructor(tagName, props, children) {
    console.log('-------arguments-----', arguments)

    this.tagName = tagName
    if (!_.isPlainObject(props)) {
      // second parameter is not props, it's children
      children = props
      props = {}
    }
    this.props = props
    this.children = children
  }

  render() {
    var el = document.createElement(this.tagName)
    var props = this.props
    for (var propName in props) {
      var propValue = props[propName]
      el.setAttribute(propName, propValue)
    }
    var children = this.children
    if (_.isArray(children)) {
      children.forEach(child => {
        if (child instanceof Element) {
          let r = child.render()
          el.appendChild(r)
        } else {
          el.appendChild(document.createTextNode(child))
        }
      })
    }
    console.log('---el---', el)
    return el
  }
}

export default Element

