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
  this.left = null
  this.right = null
}
Node.prototype.height = function () {
  var left_height = 0, right_height = 0

  if(this.left !== null) left_height = this.left.height()
  if(this.right !== null) right_height = this.right.height()

  if(left_height > right_height) return left_height + 1
  else return right_height + 1
}
// Helper functions for rebalancing trees
Node.prototype.balance_factor = function () {
  if(this.content === null) return 0

  var left_height = (typeof(this.left) === 'undefined' || this.left === null) ? 0 : this.left.height()
  var right_height = (typeof(this.right) === 'undefined' || this.right === null) ? 0 : this.right.height()

  return left_height - right_height
}
Node.prototype.rotate_left = function () {
  if(typeof(this.right) === 'undefined' || this.right === null) return this
  var pivot = this.right
  this.right = pivot.left
  pivot.left = this
  return pivot
}
Node.prototype.rotate_right = function () {
  if(typeof(this.left) === 'undefined' || this.left === null) return this
  var pivot = this.left
  this.left = pivot.right
  pivot.right = this
  return pivot
}
Node.prototype.rebalance = function () {
  var tree_balance = this.balance_factor()

  // If we're already balanced, go ahead and just return the input
  if(tree_balance === -1 || tree_balance === 0 || tree_balance === 1) {
    return this
  } else if(tree_balance === 2) {
    if(this.left.balance_factor() === -1) this.left = this.left.rotate_left()
    return this.rotate_right()
  } else {
    if(this.right.balance_factor() === 1) this.right = this.right.rotate_right()
    return this.rotate_left()
  }
}
Node.prototype.insert = function (object) {
  if(this.content === null) {
    this.content = object
    return this
  }
  else if(object <= this.content) {
    if(this.left === null) this.left = new Node()
    this.left = this.left.insert(object)
    return this.rebalance()
  }
  else {
    if(this.right === null) this.right = new Node()
    this.right = this.right.insert(object)
    return this.rebalance()
  }
}
Node.prototype.lookup = function (object) {
  if(object === this.content) return this
  else if(object <= this.content) return this.left.lookup(object)
  else return this.right.lookup(object)
}
Node.prototype.inspect = function () {
  // Some little stupid helper functions
  var indent = function (level) {
    if(level === 0) return ''
    else return '  ' + indent(level - 1)
  }
  var indenting_inspect = function (indent_level, node) {
    var string_representation = ''
    if(node.content !== null) {
      string_representation += indent(indent_level) + "+-[ " + node.content + " ]\n"
      if(node.left !== null) string_representation += indenting_inspect(indent_level + 1, node.left)
      else string_representation += indent(indent_level + 1) + "+-< null >\n"
      if(node.right !== null) string_representation += indenting_inspect(indent_level + 1, node.right)
      else string_representation += indent(indent_level + 1) + "+-< null >\n"
    }
    else string_representation += indent(indent_level) + "+-< null >\n"

    return string_representation
  }
  return indenting_inspect(0, this)
}

// Uncomment for helpful benchmarks
// console.log("Loading test data")
// var test_data_set = require('./test_data.json')
// console.log("Benchmarking insertions")
// for(var problem_size = 10000; problem_size <= 50000; problem_size += 10000) {
//   console.log("Problem size = " + problem_size)
//   for(var repetition = 0; repetition < 5; repetition++) {
//     var set = new Set()
//     var before_time = new Date()
//     for(var i = 0; i < problem_size; ++i) {
//       set.insert(test_data_set[i])
//     }
//     var after_time = new Date()
//     console.log("(" + repetition + "): " + (after_time - before_time))
//   }
// }
