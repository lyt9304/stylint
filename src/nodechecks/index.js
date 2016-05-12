var stampit = require( 'stampit' )

// group together all the checks in this folder
var nodeLinterMethods = stampit().methods( {
  nodeLintMethods: {
    selectorLowerCase: require('./selectorLowerCase'),
    mixinNameCheck: require('./mixinNameCheck'),
    mixinParamNameCheck: require('./mixinParamNameCheck'),
    prefixMixinParamsWithDollar: require('./prefixMixinParamsWithDollar'),
    propertyLowerCase: require('./propertyLowerCase'),
    operatorSpace: require('./operatorSpace'),
    expressionParen: require('./expressionParen'),
    complexSelectorNewLine: require('./complexSelectorNewLine'),
    complexSelectorComma: require('./complexSelectorComma'),
    varNameCheck: require('./varNameCheck')
  }
} )

module.exports = nodeLinterMethods
