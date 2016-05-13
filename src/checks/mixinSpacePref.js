'use strict'

var mixinRe = /(\s*)(\+)?([\-\w]+?)(\s*)\((.*)\)/ // but still need to check if it is a mixin
var mixinWithSpaceStr = "(\\\s)+\\\("
var validJSON = require('../data/valid.json')
var validCSS = require('../data/valid.json').css
var validFunc = require('../data/valid.json').function
var ignoreRe = /for(.+)in|screen(.+)and/
var alphabetRe = /[a-zA-Z]/
var pseudo = [
  "not",
  "nth-child",
  "nth-last-child",
  "nth-of-type",
  "nth-last-of-type"
]

/**
 * @description checks for extra space when calling mixin/function
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet preferred form, false if not
 */
var mixinSpacePref = function( line ) {

  // ignore case like @media screen and () or for x in ()
  if ( ignoreRe.test( line ) ) { return }
  // if don't match mixin() form, then return
  if ( !mixinRe.test( line ) ) { return }

  var name = RegExp.$3.trim()

  // at least has an alphabet
  if ( !alphabetRe.test( name ) ) { return }

  var isCSS = validCSS.some( function( css ) {
    return name === css || this.checkPrefix( name, css, validJSON )
  }.bind( this ) )

  var isCSSFunction = validFunc.some( function( func ) {
    return name === func
  } )

  var isPseudo = pseudo.indexOf(name) !== -1

  // if name is a css attribute or a inline-function like rgb/rgba etc., then ignore it
  if ( isCSS || isCSSFunction || isPseudo ) {
    return
  }

  // check if it has space between mixin name and call paren
  var mixinCallRe = new RegExp(name + mixinWithSpaceStr)
  var hasMixinSpace = mixinCallRe.test( line )

  if ( hasMixinSpace ) {
    this.msg( 'mixin(arguments) is preferred than mixin (arguments)' )
  }

  return hasMixinSpace
}

module.exports = mixinSpacePref
