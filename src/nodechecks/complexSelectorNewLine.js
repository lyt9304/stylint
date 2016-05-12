'use strict'

function getComplexSelectorLineNo(node){
  var lineno = -1
  var segments = node['segments']
  var length = segments.length
  length >= 3 ? lineno = segments[length-1]['lineno']:lineno = -1
  return lineno
}

/**
 * @description check if complex selector are in new line
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet, false if not
 */
var complexSelectorNewLine = function( node, line ) {
  var type = node['__type']
  var prevLineno = -1

  if ( type !== 'Group') { return }

  var nodes = node['nodes']

  var noNewLine = false

  for (var i = 0; i < nodes.length; i++) {
    var obj = nodes[i]
    var objType = obj['__type']

    if ( objType === 'Selector' ) {
      var lineno = getComplexSelectorLineNo(obj)
      if ( lineno !== -1 && prevLineno !== -1 && lineno === prevLineno) {
        noNewLine = true
        break
      }
      prevLineno = lineno
    }
  }

  if ( noNewLine ) {
    if ( this.cache.disabledLine.indexOf(this.cache.lineNo) === -1 ) {
      this.cache.lineNo = lineno
      this.cache.origLine = this.cache.origLines[lineno - 1]
      this.msg('complex selector must use new line')
    }
  }


}

module.exports = complexSelectorNewLine
