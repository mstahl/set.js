/*
 * Set.js
 *
 * A simple Set data structure, guaranteeing O(log n) lookup, insertion, and
 * deletion. Implemented using red-black self-balancing trees.
 *
 * (c) 2014 max thom stahl, released under the MIT license
 */

var Set = function () {
  this.root = new Node()
}
Set.prototype.insert = function (object) {
  return this.root.insert(object)
}
Set.prototype.lookup = function (object) {
  return this.root.lookup(object)
}

var Node = function () {
  // The actual data this node contains, NULL if this is an empty leaf node
  this.content = null

  // Relationships to other nodes
  this.parent = null
  this.left = null
  this.right = null

  // Auto-balancing variables
  this.color = 'red'

  // Pointer back to the enclosing set
  this.set = null
}
Node.prototype.height = function () {
  var left_height = 0, right_height = 0

  if(this.left !== null) left_height = this.left.height()
  if(this.right !== null) right_height = this.right.height()

  if(left_height > right_height) return left_height + 1
  else return right_height + 1
}
Node.prototype.insert = function (object) {
  if(this.content === null) {
    this.content = object
    return this
  }
  else if(object <= this.content) {
    if(this.left === null) this.left = new Node()
    return this.left.insert(object)
  }
  else {
    if(this.right === null) this.right = new Node()
    return this.right.insert(object)
  }
}
Node.prototype.lookup = function (object) {
  if(object === this.content) return this
  else if(object <= this.content) return this.left.lookup(object)
  else return this.right.lookup(object)
}
