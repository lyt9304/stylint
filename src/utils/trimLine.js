'use strict'

var urlRe = /( +|:)url\((.+)\)/g
var placeholder = "{{stylint-url-placeholder}}"

/**
 * @description separate out line comments and remove interpolation
 * @param {string} [line] curr line being linted
 * @returns {string} the line, but minus all the annoying stuff
*/
var trimLine = function( line ) {
	var startsWithCommentRe = /(^\/\/)/
	this.state.hasComment = false
	this.cache.comment = ''

	//filter url and replace it with placeholder
	if ( urlRe.test( line ) ) {
		var tmpurl = RegExp.$2
		line = line.replace(tmpurl, placeholder)
	}

	// strip line comments except urls
	if ( line.indexOf( '//' ) !== -1 ) {
		this.state.hasComment = true
		this.cache.comment = line.slice( line.indexOf( '//' ), line.length )

		if ( !startsWithCommentRe.test( line.trim() ) ) {
			line = line.slice( 0, line.indexOf( '//' ) - 1 )
		}
	}

	// restore the url
	if ( tmpurl ) {
		line = line.replace(placeholder, tmpurl)
	}

	// strip interpolated variables
	// and the content inside quotes
	return line
		.replace( /( *{\S+} *)/, '' )
}

module.exports = trimLine
