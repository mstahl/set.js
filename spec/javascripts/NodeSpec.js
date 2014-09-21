describe('Node', function () {
  describe('#new', function () {
    var node = new Node()

    it('initializes with null contents', function () {
      expect(node.content).toBe(null)
    })

    it('initializes with a null left child', function () {
      expect(node.left).toBe(null)
    })

    it('initializes with a null right child', function () {
      expect(node.right).toBe(null)
    })

    it('initializes with a null parent', function () {
      expect(node.parent).toBe(null)
    })

    it('initializes with a null set', function () {
      expect(node.set).toBe(null)
    })

    it('initializes with red color', function () {
      expect(node.color).toBe('red')
    })
  })

  describe('#insert', function () {
    it('sets its content if node is an empty leaf node', function () {
      var node = new Node()
      node.insert('foo')
      expect(node.content).toBe('foo')
      expect(node.left).toBe(null)
      expect(node.right).toBe(null)
    })

    it('recursively calls left.insert() for content <= this.content', function () {
      var root = new Node()
      var left = new Node()

      root.content = 100
      root.left = left
      spyOn(left, 'insert')

      root.insert(50)
      expect(left.insert).toHaveBeenCalledWith(50)
    })

    it('recursively calls right.insert() for content > this.content', function () {
      var root = new Node()
      var right = new Node()

      root.content = 100
      root.right = right
      spyOn(right, 'insert')

      root.insert(150)
      expect(right.insert).toHaveBeenCalledWith(150)
    })
  })

  describe('#lookup', function () {
    it('returns current node if it matches', function () {
      var node = new Node()
      node.content = 100
      expect(node.lookup(100)).toBe(node)
    })

    it('recursively calls left.lookup() for object <= this.content', function () {
      var node = new Node()
      node.content = 100
      node.left = new Node()

      spyOn(node.left, 'lookup')
      node.lookup(50)
      expect(node.left.lookup).toHaveBeenCalledWith(50)
    })

    it('recursively calls right.lookup() for object > this.content', function () {
      var node = new Node()
      node.content = 100
      node.right = new Node()

      spyOn(node.right, 'lookup')
      node.lookup(150)
      expect(node.right.lookup).toHaveBeenCalledWith(150)
    })
  })

  describe('#height', function () {
    it('returns 1 for a single node', function () {
      var node = new Node()
      expect(node.height()).toBe(1)
    })

    it('calls height on its left and right children if it has children', function () {
      var node = new Node()
      node.left = new Node()
      node.right = new Node()
      spyOn(node.left, 'height')
      spyOn(node.right, 'height')

      node.height()
      expect(node.left.height).toHaveBeenCalled()
      expect(node.right.height).toHaveBeenCalled()
    })

    describe('when the left child has greater height than the right one', function () {
      it('adds one to the left child height', function () {
        var node = new Node()
        node.left = new Node()
        node.right = new Node()

        spyOn(node.left, 'height').and.returnValue(10)
        spyOn(node.right, 'height').and.returnValue(5)
        expect(node.height()).toBe(11)
      })
    })

    describe('when the right child has greater height than the left one', function () {
      it('adds one to the right child height', function () {
        var node = new Node()
        node.left = new Node()
        node.right = new Node()

        spyOn(node.left, 'height').and.returnValue(10)
        spyOn(node.right, 'height').and.returnValue(50)
        expect(node.height()).toBe(51)
      })
    })
  })
})