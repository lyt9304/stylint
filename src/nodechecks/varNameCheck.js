'use strict'

/**
 * @description checks spell for variable name (using a-z,0-9,-)
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet, false if not
 */
var varNameCheck = function( node, line ) {
  var type = node['__type']
  var valType

  if( node['val'] ) {
    valType = node['val']['__type']
  } else {
    return
  }

  if ( type !== 'Ident' || valType !== 'Expression') { return }

  var name = node['name']
  var prefixDollarRe = /^\$/

  // replace prefix dollar
  if ( prefixDollarRe.test(name) ) {
    name = name.replace(prefixDollarRe, "")
  }

  var invalidChar = /[^a-zA-Z\-]/
  var firstLetter = /^[a-z\-]/
  var nameCheck = !invalidChar.test(name) && firstLetter.test(name)

  if ( !nameCheck ) {
    if ( this.cache.disabledLine.indexOf(this.cache.lineNo) === -1 ) {
      this.cache.lineNo = node['val']['lineno']
      this.cache.origLine = this.cache.origLines[this.cache.lineNo - 1]
      this.msg('except prefix $, variable name only contains a-z/0-9/-, also first letter must be a-z')
    }
  }

  return nameCheck
}

module.exports = varNameCheck
