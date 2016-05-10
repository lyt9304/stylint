'use strict'

var urlRe = /url\s*\((.+)\)/

/**
 * @description check url() should not contain quotation
 * @param  {string} [line] curr line being linted
 * @return {boolean} true if in order, false if not
 */
var urlQuotation = function( line ) {

  if( !urlRe.test(line) ) { return }

  var content = RegExp.$1.trim()

  var hasQuote = /^['"]/.test(content)

  if ( this.state.conf === 'always' && hasQuote === false ) {
    this.msg( 'url must in quotation' )
  }
  else if ( this.state.conf === 'never' && hasQuote === true ) {
    this.msg( 'quotation is disallowed for url link' )
  }

}

module.exports = urlQuotation
