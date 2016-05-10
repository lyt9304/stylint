'use strict'

// super simple.
// if theres anything on the line besides whitespace, it aint empty
var emptyLineRe = /\S/
var urlRe = /( +|:)url\(.+\)/g

/**
 * @description sets values like context, determine whether we even run tests, etc
 * @param {string} [line] curr line being linted
 * @returns {Function | undefined} undefined if we catch something, else lint()
 */
var setState = function( line ) {
	this.state.context = this.setContext( this.cache.line )

	// ignore the current line if @stylint ignore
	if ( this.cache.origLine.indexOf( '@stylint ignore' ) !== -1 ) {
    this.cache.disabledLine.push(this.cache.lineNo)
		return
	}

	// if @stylint on / off commands found in the code
	if ( this.stylintOn( this.cache.origLine ) ||
		this.stylintOff( this.cache.origLine ) === false ) {
    this.cache.disabledLine.push(this.cache.lineNo)
		return
	}

	// if hash starting / ending, set state and return early
	if ( this.hashOrCSSStart( line ) ||
		this.hashOrCSSEnd( line ) === false ) {
    this.cache.disabledLine.push(this.cache.lineNo)
		return
	}

	// if starting / ending keyframes
	if ( this.keyframesStart( line ) ||
		this.keyframesEnd( line ) === false ) {
    this.cache.disabledLine.push(this.cache.lineNo)
		return
	}

	// if entire line is comment, just check comma spacing and that's it
	if ( this.startsWithComment( line ) ) {
		if ( typeof this.config.commentSpace !== 'undefined' ) {
			this.state.conf = this.config.commentSpace.expect || this.config.commentSpace
			this.state.severity = this.config.commentSpace.error ? 'Error' : 'Warning'
			this.lintMethods.commentSpace.call( this )
		}
		return
	}

	// if empty line
	if ( emptyLineRe.test( line ) === false ) {
		this.cache.sortOrderCache = []
		return
	}

	// checking url rules
	if ( urlRe.test(line) ) {
		if ( typeof this.config.urlQuotation !== 'undefined' && this.config.urlQuotation !== false) {
			this.state.conf = this.config.urlQuotation.expect || this.config.urlQuotation
			this.state.severity = this.config.urlQuotation.error ? 'Error' : 'Warning'
			this.lintMethods.urlQuotation.call( this, line )
		}

    if ( typeof this.config.urlLink !== 'undefined' && this.config.urlLink !== false) {
      this.state.conf = this.config.urlLink.expect || this.config.urlLink
      this.state.severity = this.config.urlLink.error ? 'Error' : 'Warning'
      this.lintMethods.urlLink.call( this, line )
    }

		// we have to clean url rule after we checked it
    this.cache.line = line.replace( urlRe, "" )
    this.cache.origLine = this.cache.origLine.replace( urlRe, "" )
	}

	// actually run tests if we made it this far
	if ( this.state.testsEnabled === true ) {
		return this.lint()
	} else {
    this.cache.disabledLine.push(this.cache.lineNo)
  }
}

module.exports = setState
