'use strict'

var validHtml = require('../data/valid').html

/**
 * @description check if selector is lower-case
 * @param {object} [node] curr line being linted
 * @return {boolean} true selector has upper-case problem, false if not
 */
var selectorLowerCase = function( node, line ) {
  var type = node['__type']

  if ( type !== "Selector" ) { return }

  var segments = node['segments']
  var hasUpperCase = false
  var upperCaseRe = /[A-Z]/

  for (var i = 0; i < segments.length; i++) {
    var obj = segments[i]
    var literal = obj.string
    var symbolValid = ( i === 0 ? true : !(/[\.\:#]/.test(segments[i-1].string)) )
    if ( validHtml.indexOf(literal.toLowerCase()) !== -1 && symbolValid ) {
      if(upperCaseRe.test(literal)){
        hasUpperCase = true
        break
      }
    }
  }

  if( hasUpperCase ) {
    if ( this.cache.disabledLine.indexOf(this.cache.lineNo) === -1 ) {
      // update lineNo, because lineno maybe wrong in situation p.text \n DIV.message, use lineno of the last segment
      this.cache.lineNo = segments[segments.length-1].lineno
      this.cache.origLine = this.cache.origLines[this.cache.lineNo-1]
      this.msg( 'selector must be lower case!' )
    }
  }

  return hasUpperCase

}

module.exports = selectorLowerCase
