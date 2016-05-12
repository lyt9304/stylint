'use strict'

function findLeftBound(node){
  console.log("?", node.__type)
  var bound = 0
  while(node.left.__type === 'Expression'){
    bound = node.left.column
    node = node.left.nodes[0]
  }

  return bound-1
}

function findRightBound(node, line){
  var bound = 0
  var bounderSymbol = [" ", ","]
  while(node){
    bound = node['right']['column']
    node = node['right']
  }

  var result = bounderSymbol.map(function(item){
    var index =  line.indexOf(item, bound)
    if(index === -1){
      return line.length
    }else{
      return index-1
    }
  })

  return result.sort()[0]

}

// TODO: uncomplete find bound
/**
 * @description check if expression is in paren
 * @param {object} [node] curr line being linted
 * @return {boolean} true selector has upper-case problem, false if not
 */
var expressionParen = function( node, line ) {
  var type = node['__type']

  if ( type !== "Expression" ) { return }

  var nodes = node['nodes']

  var hasParen = true

  for (var i = 0; i < nodes.length; i++) {
    var obj = nodes[i]
    var objType = obj['__type']


    if( objType === 'BinOp' ) {
      //console.log(findLeftBound(obj))
      //console.log(findRightBound(obj, line))
    }
  }

  if( !hasParen ) {
    this.msg( 'expression must in paren!' )
  }

  return hasParen

}

module.exports = expressionParen
