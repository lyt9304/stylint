'use strict'

function getComplexSelectorLineNo(node){
  var lineno = -1
  var segments = node['segments']
  var length = segments.length
  length >= 3 ? lineno = segments[length-1]['lineno']:lineno = -1
  return lineno
}

/**
 * @description check if complex selector are in new line and with comma
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet, false if not
 */
var complexSelectorComma = function( node, line ) {
  var type = node['__type']
  var prevLineno = -1
  var prevLine = ""

  if ( type !== 'Group') { return }

  var nodes = node['nodes']

  var noComma

  for (var i = 0; i < nodes.length; i++) {
    var obj = nodes[i]
    var objType = obj['__type']

    if ( objType === 'Selector' ) {
      var lineno = getComplexSelectorLineNo(obj)
      if ( lineno !== -1 && prevLineno !== -1 && lineno !== prevLineno) {
        prevLine.indexOf(',') === -1 ? noComma = true : noComma = false
        break
      }
      prevLineno = lineno
      prevLine = this.cache.origLines[prevLineno-1]
    }
  }


  if ( this.state.conf === 'always' && noComma === true ) {
    this.cache.lineNo = prevLineno
    this.cache.origLine = this.cache.origLines[prevLineno-1]
    this.msg( 'complex selector must use comma' )
  }

  if ( this.state.conf === 'never' && noComma === false ) {
    this.cache.lineNo = prevLineno
    this.cache.origLine = this.cache.origLines[prevLineno-1]
    this.msg( 'complex selector can\'t use comma to separate lines' )
  }

}

module.exports = complexSelectorComma
