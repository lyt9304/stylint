'use strict'

/**
 * @description check mixin param if it is start with $
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet, false if not
 */
var prefixMixinParamsWithDollar = function( node, line ) {
  var type = node['__type']
  var valType

  if( node['val'] ) {
    valType = node['val']['__type']
  } else {
    return
  }

  if ( type !== 'Ident' || valType !== 'Function') { return }

  var paramNodes = node['val']['params']['nodes']

  var nameCheck = true
  var prefixDollar = /^\$/

  for ( var i = 0; i < paramNodes.length; i++ ) {
    var param = paramNodes[i]
    if ( param['__type'] !== 'Ident' ) { continue }

    var paramName = param['name']
    if( !prefixDollar.test( paramName ) ) {
      nameCheck = false
      break
    }
  }

  if ( this.state.conf === 'always' && !nameCheck ) {
    if ( this.cache.disabledLine.indexOf(this.cache.lineNo) === -1 ) {
      this.cache.lineNo = node['val']['lineno']
      this.cache.origLine = this.cache.origLines[this.cache.lineNo - 1]
      this.msg('mixin params must start with $')
    }
  }

  if ( this.state.conf === 'never' && nameCheck ) {
    if ( this.cache.disabledLine.indexOf(this.cache.lineNo) === -1 ) {
      this.cache.lineNo = node['val']['lineno']
      this.cache.origLine = this.cache.origLines[this.cache.lineNo - 1]
      this.msg('$ sign is disallowed for mixin parameters')
    }
  }

  return nameCheck
}

module.exports = prefixMixinParamsWithDollar
