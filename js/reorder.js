/*
* @fileName reorder.js
* @author Di Sheng
* @date 2024/02/20 10:54:52
* @description reorder oldList to form newList, return moves that includes insert/remover and children list to compare with old list to find which nodes from old list need to patch.
*/

const INSERT = 5
const REMOVE = 4

/*
@param {Array} oldList, newList - array of items with or without keys
@param {String} key - the key property of the items
@return {Object} - {children: Array, moves: Array}
children is a new list of items used to compare with oldList, so item with same key in both list will be deep compared for its props and iterate its children.
moves is a list of actions to modify oldList to form newList,
1. remove items that now found in newList from oldList,
2. insert new items from newList to oldList
3. clean up any nodes that not keyed by remove them from oldList.
*/
export default function reorder(oldList=[], newList=[], key) {
  let moves = [] // returned moves
  let oldListLength = oldList?.length
  let newListLength = newList?.length
  let resultChildren = [] /*should be same length with oldList,
  1. if item from oldList also present in newList, then append item at its index from oldList to resultChildren.
  2. if item item from oldList not present in newList, append a null so in future dfs, we know this item is removed and skip it.
  3. if item is text, replace it with text from newList free or if no text from newList free so in future dfs we patch a TEXT to replace its text. If no more items are from newList free we push a null so in dfs we know we can skip this item.
  P.S all null items will be removed during reorder.
  */

  let oldListKeyIndexAndFree= makeKeyIndexAndFree(oldList, key)
  let newListKeyIndexAndFree = makeKeyIndexAndFree(newList, key)
  let newListKeyIndexMapper = newListKeyIndexAndFree.keyIndexMapper
  let oldListKeyIndexMapper = oldListKeyIndexAndFree.keyIndexMapper
  let newListFree = newListKeyIndexAndFree.free
  let newListFreeIdx=0
  oldList.forEach(child => {
    let k = getItemKey(child, key)
    if (k) {
      if (k in newListKeyIndexMapper) {
        // if k also present in new list, append item from newList
        resultChildren.push(newList[newListKeyIndexMapper[k]])
      } else {
        // k is not in new list, append a null so in future dfs,
        resultChildren.push(null)
      }
    } else {
      // child without key, push an item from new list's free
      resultChildren.push(newListFree[newListFreeIdx] || null)
      newListFreeIdx++
    }
  })

  // resulcontains the items from new list whose key also present in both old list
  let tmp = [ ...resultChildren ]

  let acc = 0
  tmp = tmp.filter((v, i) => {
    if (v === null) {
      moves.push({ index: i - acc, type: REMOVE })
      acc++
    }
    return v !== null
  })

  let j = 0 //idx for iterate tmp
  for (let i = 0; i < newList.length; i++) {
    let newItem = newList[i]
    let newItemKey = getItemKey(newItem, key)
    let tmpItem = tmp[j]
    let tmpItemKey = getItemKey(tmp[j], key)
    if (!newItemKey) {
      //newItem is not keyed, just insert item
      moves.push({index: i, item: newItem, type: INSERT})
    } else if (newItemKey == tmpItemKey) {
      // same key in both list, continue
      j++
    } else if (!oldListKeyIndexMapper.hasOwnProperty(newItemKey)){
      // newItem is not present in origin list key mapper, insert newItem
      moves.push({ index: i, item: newItem, type: INSERT })
    } else if (getItemKey(tmp[j + 1], key) === newItemKey) {
      // if remove the current item from tmp will make next item from tmp match the newItem, then remove current item from tmp
      moves.push({ index: i, type: REMOVE })
      j = j + 2 // since current j is removed and next j is matched, we move j+2
    } else {
      // this newItem is also found in tmp, but not in the current i idx, we first insert this item, then remove the item from tmp with same key later
      moves.push({ index: i, item: newItem, type: INSERT })
    }
  }

  // check if j reached the end, cut off any remaining items from tmp
  let l = newList.length
  for (let i = 0; j < tmp.length; i++) {
    moves.push({ index: l + i, type: REMOVE })
    j++
  }
  return {
    moves: moves,
    children: resultChildren
  }
}


// given a list, return a key-index map for those items which have a key property and a free array for those items without a key property
function makeKeyIndexAndFree(list, key) {
  let keyIndexMapper = {}
  let free = []
  list.forEach((item, idx) => {
    let k = getItemKey(item, key)
    if (k) {
      keyIndexMapper[k] = idx
    } else {
      free.push(item)
    }
  })
  return {
    keyIndexMapper,
    free
  }
}

// in case key is a function that is used to get 'actual key' from item
function getItemKey(item, key) {
  let k
  if (!item || !key) {
    k = undefined
  } else if (typeof key === 'string') {
    k = item[key]
  } else {
    k = key(item)
  }
  return k
}





// var aChildren = [
//   { key: 'K' },
//   { key: 'A' },
//   { key: 'B' },
//   { key: 'C' },
//   { key: 'D' },
//   "asd",
//   { key: 'E' },
// ];

// var bChildren = [
//   { key: 'B' },
//   { key: 'F' },
//   "dsasd",
//   { key: 'D' },
//   { key: 'A' },
// ];

// let r = reorder(aChildren, bChildren, 'key');