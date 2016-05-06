'use strict'

var mixinRe = /(\s*)(\S+)(\s*)\(.+\)/ // but still need to check cache.mixinsDeclared
var parensBeginWithSpaceRe = /\(\s+/
var parensEndWithSpaceRe = /\s+\)+/
var mixinWithSpaceRe = /(\s)+\(/

/**
 * @description checks for extra space when using mixin
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet preferred form, false if not
 */
var mixinSpacePref = function( line ) {
  if ( !mixinRe.test( line ) ) { return }

  // if it's not a mixin, then we don't care about it
  if ( !this.cache.mixinsDeclared.hasOwnProperty( RegExp.$2 ) ) {
    return
  }

  // handle 2 kinds of situations
  // 1. some-mixin(arg1, arg2)
  // 2. some-mixin ( arg1, arg2 ) having space

  var hasStartSpace = parensBeginWithSpaceRe.test( line )
  var hasEndSpace = parensEndWithSpaceRe.test( line )
  var hasMixinSpace = mixinWithSpaceRe.test( line )

  if ( ( hasStartSpace || hasEndSpace || hasMixinSpace) ) {
    this.msg( 'mixin(param1, param2) is preferred' )
  }

  return hasStartSpace && hasEndSpace && hasMixinSpace
}

module.exports = mixinSpacePref
