function getExitCode( errsLength, warningsLength, maxErrors, maxWarnings ) {
	if ( errsLength > 0 ) {
		if ( typeof maxErrors === 'number' ) {
			if ( errsLength > maxErrors ) return 1
		}
		else return 1
	}

	if ( typeof maxWarnings === 'number' && warningsLength > maxWarnings ) return 1

	return 0
}

function logMsg(type, arr){
  var filtered = arr.filter( function( str ) { return !!str } )

  if ( filtered.length ) {
    var msg = filtered.join( '\n\n' ) + '\n'
  }

  if ( msg ) {
    if( type === 'error' ) {
      console.log( '\033[31m' + msg + '\033[0m')
    } else {
      console.log( '\033[33m' + msg + '\033[0m')
    }
  }
}

/**
 * @description outputs our messages, wipes errs/warnings if watching
 * @returns {Object | Function} returns process exit if not watching, or obj otherwise
 */
var done = function() {

	this.state.exitCode = getExitCode( this.cache.errs.length, this.cache.warnings.length, this.config.maxErrors, this.config.maxWarnings )

	// when testing we want to silence the console a bit, so we have the quiet option
	if ( !this.state.quiet ) {

    logMsg('error', this.cache.errs)
    logMsg('warning', this.cache.warnings)

    console.log(this.cache.msg)

	}

	// don't kill the linter if watch is watching
	// else there's no more to do, so exit the process
	if ( !this.state.watching ) {
		this.callback( this.state.exitCode || null )
		return process.exit( this.state.exitCode )
	}

	var returnValue = {
		errs: this.cache.errs.slice( 0 ),
		warnings: this.cache.warnings.slice( 0 ),
		exitCode: this.state.exitCode,
		msg: this.cache.msg
	}

	// if watching we reset the errors/warnings arrays
	this.cache.errs = []
	this.cache.warnings = []

	return returnValue
}

module.exports = done
