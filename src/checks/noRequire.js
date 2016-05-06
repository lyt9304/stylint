'use strict'


/**
 * @description disallows use of @require
 * @param {string} [line] curr line being linted
 * @return {boolean} true if @require used, false if not
 */
var noRequire = function( line ) {

  var required = false

  if ( line.indexOf( '@require' ) !== -1 ) {
    required = true
  }

  if ( required === true ) {
    this.msg( '@require is disallowed ' )
  }

  return required
}

module.exports = noRequire
