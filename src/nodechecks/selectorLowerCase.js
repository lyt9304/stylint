'use strict'

var validHtml = require('../data/valid').html

function isTag( name, prevSymbol ) {
  var isHtmlTag = validHtml.indexOf(name) !== -1
  return isHtmlTag
}

/**
 * @description disallows use of !important
 * @param {object} [node] curr line being linted
 * @return {boolean} true if !important used, false if not
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
        // update lineNo, because lineno maybe wrong in situation p.text \n DIV.message, use lineno of the last segment
        this.cache.lineNo = segments[segments.length-1].lineno
        this.cache.origLine = this.cache.origLines[this.cache.lineNo-1]
        break
      }
    }
  }

  if( hasUpperCase ) {
    this.msg( 'selector must be lower case!' )
  }

}

module.exports = selectorLowerCase
