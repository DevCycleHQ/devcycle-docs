!(function () {
  if (typeof window !== 'undefined') {
    var e = (globalThis.rudderanalytics = globalThis.rudderanalytics || [])
    ;(e.methods = [
      'load',
      'page',
      'track',
      'identify',
      'alias',
      'group',
      'ready',
      'reset',
      'getAnonymousId',
      'setAnonymousId',
      'getUserId',
      'getUserTraits',
      'getGroupId',
      'getGroupTraits',
      'startSession',
      'endSession',
    ]),
      (e.factory = function (t) {
        return function () {
          var r = Array.prototype.slice.call(arguments)
          return r.unshift(t), e.push(r), e
        }
      })
    for (var t = 0; t < e.methods.length; t++) {
      var r = e.methods[t]
      e[r] = e.factory(r)
    }
    ;(e.loadJS = function (e, t) {
      var r = document.createElement('script')
      ;(r.type = 'text/javascript'),
        (r.async = !0),
        (r.src = 'https://analytics.devcycle.com/sdk')
      var a = document.getElementsByTagName('script')[0]
      a.parentNode.insertBefore(r, a)
    }),
      e.loadJS(),
      e.load('2U4ReRYBAsyeoBkDlIW9P4CitLU', 'https://analytics.devcycle.com', {
        configUrl: 'https://analytics.devcycle.com',
      })
  }
})()
