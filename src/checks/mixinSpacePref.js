'use strict'

var mixinRe = /(\s*)(\S+)(\s*)\((.+)\)/ // but still need to check if it is a mixin
var mixinWithSpaceRe = /(\s)+\(/
var mixinWithSpaceStr = "(\\\s)+\\\("
var validJSON = require('../data/valid.json')
var validCSS = require('../data/valid.json').css
var validFunc = require('../data/valid.json').function
var prefix = require('../data/valid.json').prefixes

/**
 * @description checks for extra space when calling mixin/function
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet preferred form, false if not
 */
var mixinSpacePref = function( line ) {

  // if don't match mixin() form, then return
  if ( !mixinRe.test( line ) ) { return }

  var name = RegExp.$2.trim()

  console.log(name)

  var isCSS = validCSS.some( function( css ) {
    return name === css || this.checkPrefix( name, css, validJSON )
  }.bind( this ) )

  var isCSSFunction = validFunc.some( function( func ) {
    return name === func
  } )

  // if name is a css attribute or a inline-function like rgb/rgba etc., then ignore it
  if ( isCSS || isCSSFunction ) {
    return
  }

  // check if it has space between mixin name and call paren
  var mixinCallRe = new RegExp(name+mixinWithSpaceStr)
  var hasMixinSpace = mixinCallRe.test( line )

  if ( hasMixinSpace ) {
    this.msg( 'mixin(arguments) is preferred than mixin (arguments)' )
  }

  return hasMixinSpace
}

module.exports = mixinSpacePref
