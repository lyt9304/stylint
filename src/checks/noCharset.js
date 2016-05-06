'use strict'


/**
 * @description disallows use of @charset
 * @param {string} [line] curr line being linted
 * @return {boolean} true if @charset used, false if not
 */
var noCharset = function( line ) {

  var charset = false

  if ( line.indexOf( '@charset' ) !== -1 ) {
    charset = true
  }

  if ( charset === true ) {
    this.msg( '@charset is disallowed ' )
  }

  return charset
}

module.exports = noCharset
