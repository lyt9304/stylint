'use strict'

// strips out comments and urls
// var cleanFileRe = /( +|:)url\(.+\)|(\r\n|\n|\r)|(^(\/\*)|([\s'"](\/\*)))(?!\/)(.|[\r\n]|\n)+?\*\/\n?/gm
// for checking url rules, we are not replace url part here, we replace it when url rule check is done
var cleanFileRe = /(\r\n|\n|\r)|(^(\/\*)|([\s'"](\/\*)))(?!\/)(.|[\r\n]|\n)+?\*\/\n?/gm
var lineEndingsRe = /\r\n|\n|\r/gm

var Parser = require('stylus').Parser
var fs = require('fs')

var jsonFormat = require('json-format')
var config = {
  type: 'space',
  size: 2
}

/**
 * @description parses file for testing by removing extra new lines and block comments
 * @param {Object} [err] error obj from async if it exists
 * @param {Array} [res] array of files to parse
 * @returns {Function} test function
 */
var parse = function( err, res ) {
	if ( err ) { throw new Error( err ) }

	return res.forEach( function( file, i ) {
		var lines
		this.cache.file = this.cache.files[i]
		this.cache.fileNo = i

		// strip out block comments, but dont destroy line history
		// to do these we replace block comments with new lines
		lines = file.toString().replace( cleanFileRe, function( str ) {
			// WHERE IS YOUR GOD NOW
			return ( new Array( str.split( lineEndingsRe ).length ) ).join( '\n' )
		} ).split( '\n' )

		// updating cache as we go, and passing to the next step
		lines.forEach( function( line, lineNo ) {
			this.cache.origLine = line
			this.cache.line = this.trimLine( line )
			this.cache.lineNo = lineNo + 1 // line nos don't start at 0
			this.cache.rule = ''
			return this.setState( line )
		}.bind( this ) )

    this.cache.origLines = lines

		// record disabledLine for ast checking
		console.log(this.cache.disabledLine)

    var parser = new Parser(file.toString())
    try {
      var ast = parser.parse()
      //fs.writeFileSync("test.txt", jsonFormat( ast, config))
      ast = JSON.parse(JSON.stringify(ast))
      this.astlint( ast )

    }catch(err){
      this.state.severity = 'Error'
      this.cache.lineNo = err.lineno || parser.lexer.lineno;
      this.cache.origLine = this.cache.origLine[this.cache.lineNo-1] || ""
      this.msg( 'Stylus parse error!' )
    }

		// save previous file
		this.cache.prevFile = this.cache.file
		this.cache.disabledLine = []

		// if on the last file, call the done function to output success or error msg
		if ( this.cache.fileNo === res.length - 1 ) {
			return this.reporter( '', 'done' )
		}
	}.bind( this ) )
}

module.exports = parse
