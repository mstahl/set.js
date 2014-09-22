Set.js
======
I didn't know of a good implementation of a set data structure in Javascript, and
I wanted to practice making complicated data structures in Javascript, so I wrote
this one. Right now its functionality is very limited but I will be continuing to
develop it over the coming weeks.

## Usage

In your HTML:

    <script src="path/to/Set.js"></script>

In your Javascript:

    var a_set = new Set() // Sets initialize empty
    ...
    a_set.insert('foo')   // Insertion time is O(log(n)) each insertion
    a_set.insert('bar')
    ...
    a_set.lookup('baz')   // Lookup time is always O(log(n))

## To do

These are some features I'd really like for v1.0.0 but that aren't currently
implemented:

  * Regular set operations
    - Intersection
    - Union
    - Subset
    - Subtraction
    - Powerset
  * Functional programming features
    - In-order, pre-order, and post-order traversal (map)
    - Iteration over each subset (powerset iteration)
  * To/from array convenience methods (like Haskell's `Set.fromList` function)

## Implementation

The internal data structure used for these sets is the [AVL
Tree](http://en.wikipedia.org/wiki/AVL_tree), a kind of automatically-balancing
binary search tree. Because the tree adjusts its shape after every insert,
inserts and lookups take time proportional to the height of the balanced tree,
or `log(n)` where `n` is the size of the set. Other operations such as inorder
traversal can be done in linear time (O(n)). Whenever possible, memory overhead
has been minimized.

## Contributing to Set.js

Though constructive criticisms and issues/bug reports are welcome, patches are
not. This is my sandbox to practice in. If you want to go make a set data
structure that works the way you want one to, then go ahead and do that. It'll
be a great learning experience for you.
