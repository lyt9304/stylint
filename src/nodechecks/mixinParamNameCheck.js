'use strict'

var littleCamel = /^[a-z]+([A-Z][a-z]+)*$/

/**
 * @description check mixin param if it is valid spelled (only contains a-z/A-Z/0-9, and be little camel-case)
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet, false if not
 */
var mixinParamNameCheck = function( node, line ) {
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
  var invalidChar = /[^a-zA-Z0-9]/

  for ( var i = 0; i < paramNodes.length; i++ ) {
    var param = paramNodes[i]
    if ( param['__type'] !== 'Ident' ) { continue }

    var paramName = param['name']

    // except the $ on the head
    if( /^\$/.test(paramName) ){
      paramName = paramName.replace(/^\$/, "")
    }

    if( invalidChar.test( paramName ) || !littleCamel.test( paramName )) {
      nameCheck = false
      break
    }
  }

  if ( !nameCheck ) {
    if ( this.cache.disabledLine.indexOf(this.cache.lineNo) === -1 ) {
      this.cache.lineNo = node['val']['lineno']
      this.cache.origLine = this.cache.origLines[this.cache.lineNo - 1]
      this.msg('except prefix $, names of mixin params only contain a-z/A-Z/0-9, and must be little camel-case')
    }
  }

  return nameCheck
}

module.exports = mixinParamNameCheck
