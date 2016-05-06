'use strict'

var mixinRe = /(\s*)(\S+)(\s*)\((.+)\)/ // but still need to check cache.mixinsDeclared

/**
 * @description check mixin param is start with a dollar symbol
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet, false if not
 */
var prefixMixinsWithDollar = function( line ) {
  if ( !mixinRe.test( line ) ) { return }

  var mixinName = RegExp.$2
  var paramStr = RegExp.$4

  // if it's not a mixin, then we don't care about it
  if ( !this.cache.mixinsDeclared.hasOwnProperty( mixinName ) ) {
    return
  }

  var paramList = paramStr.split( "," ).map( function( item ){
    return item.trim()
  } )

  var nameCheck = true

  for ( var i = 0; i < paramList.length; i++ ) {
    var param = paramList[i]
    if( !( /^\$/.test( param ) ) ) {
      nameCheck = false
    }
  }

  if ( !nameCheck ) {
    this.msg( 'mixin params must start with $' )
  }

  return nameCheck
}

module.exports = prefixMixinsWithDollar
