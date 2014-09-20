describe('Set', function () {
  describe('#new', function () {
    it('initializes with a root node', function () {
      var set = new Set()
      expect(set.root).not.toBeNull()
      expect(set.root).toEqual(jasmine.any(Node))
    })
  })

  describe('#insert', function () {
    it('calls root.insert()', function () {
      var a_set = new Set()
      a_set.root = new Node()
      spyOn(a_set, 'insert')
      a_set.insert(100)
      expect(a_set.insert).toHaveBeenCalledWith(100)
    })
  })

  describe('#lookup', function () {
  })
})
