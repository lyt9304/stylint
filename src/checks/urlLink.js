'use strict'

var urlRe = /( +|:)url\((.+)\)/g
var baxingResourceRe = /^https?:\/\/s\.baixing\.net/

/**
 * test if a string matches pattern of url
 * @param str_url
 * @returns {boolean}
 * @constructor
 */
function IsURL( str_url ) {

  var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
    + "|" // 允许IP和DOMAIN（域名）
    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
    + "[a-z]{2,6})" // first level domain- .com or .museum
    + "(:[0-9]{1,4})?" // 端口- :80
    + "((/?)|" // a slash isn't required if there is no file name
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

  var re=new RegExp( strRegex );

  if ( re.test( str_url ) ){
    return true;
  } else {
    return false;
  }
}

/**
 * @description check url() should not contain quotation
 * @param  {string} [line] curr line being linted
 * @return {boolean} true if in order, false if not
 */
var urlLink = function( line ) {

  if( !urlRe.test(line) ) { return }

  var content = RegExp.$2.trim()

  content = content.replace(/["']/g, "")

  if( !baxingResourceRe.test(content) ) {
    this.msg( 'url must matches http://s.baixing.net/{path-to-resource}' )
  }

}

module.exports = urlLink