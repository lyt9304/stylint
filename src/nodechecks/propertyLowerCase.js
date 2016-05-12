'use strict'

var validJSON = require('../data/valid')

/**
 * @description check if property is lower-case
 * @param {object} [node] curr line being linted
 * @return {boolean} true selector has upper-case problem, false if not
 */
var propertyLowerCase = function( node, line ) {
  var type = node['__type']

  if ( type !== "Property" ) { return }

  var segments = node['segments']
  var hasUpperCase = false
  var upperCaseRe = /[A-Z]/

  for (var i = 0; i < segments.length; i++) {
    var obj = segments[i]
    var propName = obj.name

    if ( obj['__type'] !== 'Ident') { return }

    var isCSS =  validJSON.css.some( function( css ) {
      return propName.toLowerCase() === css || this.checkPrefix( propName.toLowerCase(), css, validJSON )
    }.bind( this ) )

    if ( isCSS ) {
      if(upperCaseRe.test(propName)){
        hasUpperCase = true
        break
      }
    }
  }

  if( hasUpperCase ) {
    if ( this.cache.disabledLine.indexOf(this.cache.lineNo) === -1 ) {
      this.msg('property must be lower case!')
    }
  }

  return hasUpperCase

}

module.exports = propertyLowerCase
