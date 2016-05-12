'use strict'

var minusDigitalRe = /^\-\d+/
var minusStartRe = /^\-/
var numberRe = /^-?[1-9]\d*$|^(-?([1-9]\d*)?\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/

/**
 * @description check operator has a space beside it
 * @param {string} [line] curr line being linted
 * @return {boolean} true if meet, false if not
 */
var operatorSpace = function( node, line ) {
  var type = node['__type']

  if( type !== 'Expression' ) { return }

  var nodes = node['nodes']

  var hasSpace = true

  for (var i = 0; i < nodes.length; i++) {
    var obj = nodes[i]
    var prevobj = i===0?null:nodes[i-1]
    var objType = obj['type']

    if( objType === 'Unit' ) {
      // -30px+20px
      // 30px+20px
      // [√]-30px-20px => -30px -20px
      // [√]30px-20px => 30px -20px
      // [√]$var-20px => $var-20px
      // if this node is a minus number Unit, we check whether it's prev object is a Unit
      if( minusDigitalRe.test(obj['val']) && prevobj && prevobj.type ) {

      }
    }

    if( objType === 'Ident' ) {

    }

    if( objType === 'BinaryOp' ) {

    }

    if( objType === 'UnaryOp' ) {
      continue
    }


  }

  if( !hasSpace ) {
    this.msg('must have a space beside an operator')
  }

}

module.exports = operatorSpace
