'use strict'


/**
 * @description disallows use of @extend
 * @param {string} [line] curr line being linted
 * @return {boolean} true if @extend used, false if not
 */
var noExtend = function( line ) {

  var extended = false

  if ( line.indexOf( '@extend' ) !== -1 ) {
    extended = true
  }

  if ( extended === true ) {
    this.msg( '@extend is disallowed ' )
  }

  return extended
}

module.exports = noExtend
