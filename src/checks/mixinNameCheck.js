'use strict'

var mixinRe = /(\s*)(\S+)(\s*)\(.+\)/ // but still need to check cache.mixinsDeclared

/**
 * @description checks spell for mixin name (using a-z,0-9,-)
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet, false if not
 */
var mixinNameCheck = function( line ) {
  if ( !mixinRe.test( line ) ) { return }

  var mixinName = RegExp.$2

  // if it's not a mixin, then we don't care about it
  if ( !this.cache.mixinsDeclared.hasOwnProperty( mixinName ) ) {
    return
  }

  var invalidChar = /[^a-zA-Z\-]/
  var firstLetter = /^[a-z]/
  var nameCheck = !invalidChar.test(mixinName) && firstLetter.test(mixinName)

  if ( !nameCheck ) {
    this.msg( 'mixin name only contains a-z/0-9/-, also first letter must be a-z' )
  }

  return nameCheck
}

module.exports = mixinNameCheck
