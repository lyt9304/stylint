'use strict'

/**
 * @description checks spell for mixin name (using a-z,0-9,-)
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet, false if not
 */
var mixinNameCheck = function( node, line ) {
  var type = node['__type']
  var valType

  if( node['val'] ) {
    valType = node['val']['__type']
  } else {
    return
  }

  if ( type !== 'Ident' || valType !== 'Function') { return }

  var name = node['val']['name']

  var invalidChar = /[^a-zA-Z\-]/
  var firstLetter = /^[a-z\-]/
  var nameCheck = !invalidChar.test(name) && firstLetter.test(name)

  if ( !nameCheck ) {
    if ( this.cache.disabledLine.indexOf(this.cache.lineNo) === -1 ) {
      this.cache.lineNo = node['val']['lineno']
      this.cache.origLine = this.cache.origLines[this.cache.lineNo - 1]
      this.msg('mixin name only contains a-z/0-9/-, also first letter must be a-z')
    }
  }

  return nameCheck
}

module.exports = mixinNameCheck
