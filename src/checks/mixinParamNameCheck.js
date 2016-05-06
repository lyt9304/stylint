'use strict'

var mixinRe = /(\s*)(\S+)(\s*)\((.+)\)/ // but still need to check cache.mixinsDeclared
var littleCamel = /^[a-z]+([A-Z][a-z]+)*$/

/**
 * @description check mixin param if it is valid spelled (only contains a-z/A-Z/0-9, and be little camel-case)
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet, false if not
 */
var mixinParamNameCheck = function( line ) {
  if ( !mixinRe.test( line ) ) { return }

  var mixinName = RegExp.$2
  var paramStr = RegExp.$4

  // if it's not a mixin, then we don't care about it
  if ( !this.cache.mixinsDeclared.hasOwnProperty( mixinName ) ) {
    return
  }

  var paramList = paramStr.split( "," ).map( function( item ){
    return item.trim().replace(/^\$/,"") // strip and move the $ on the head
  } )

  var nameCheck = true
  var invalidChar = /[^a-zA-Z0-9]/

  for ( var i = 0; i < paramList.length; i++ ) {
    var param = paramList[i]
    if( invalidChar.test( param ) || !littleCamel.test( param )) {
      nameCheck = false
    }
  }

  if ( !nameCheck ) {
    this.msg( 'names of mixin params only contain a-z/A-Z/0-9, and are little camel-case' )
  }

  return nameCheck
}

module.exports = mixinParamNameCheck
