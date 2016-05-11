var stampit = require( 'stampit' )

// group together all the checks in this folder
var nodeLinterMethods = stampit().methods( {
  nodeLintMethods: {
    selectorLowerCase: require('./selectorLowerCase'),
    mixinNameCheck: require('./mixinNameCheck'),
    mixinParamNameCheck: require('./mixinParamNameCheck')
  }
} )

module.exports = nodeLinterMethods
