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
      spyOn(a_set.root, 'insert')
      a_set.insert(100)
      expect(a_set.root.insert).toHaveBeenCalledWith(100)
    })
  })

  describe('#lookup', function () {
    it('calls root.lookup()', function () {
      var a_set = new Set()
      spyOn(a_set.root, 'lookup')
      a_set.lookup(100)
      expect(a_set.root.lookup).toHaveBeenCalledWith(100)
    })
  })
})
