/* eslint-disable */
//jshint unused:false
/* globals hex_md5:true */
/*jshint -W116 */
//该文件依赖 md5.js
function getKeys(obj) {
  var result = [];
  for (var key in obj) {
    result.push(key);
  }

  return result;
}
function formatForToken(jsonObj) {
	/*jsonObj 为参数组成的json对象
		获取token;
	*/
  var str = '';
  if (!jsonObj) {
    return str;
  }
  var keys = getKeys(jsonObj) || [];
  keys.sort();
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = jsonObj[key];
    if (key != 'token')
      str += key + '=' + value + '&';
  }
  str = str.substring(0, str.length - 1);
  return str;
}
//获取token
//!！！api网关也要在jsonObj传
function achieveToken(jsonObj) {
  var md5 = require('./md5.js');
  var str = formatForToken(jsonObj);
  str += '&key=SD7B3L3P';
  return  md5.hex_md5(str);
}

//转化成小程序模板语言 这一步非常重要 不然无法正确调用
module.exports = {
  achieveToken: achieveToken,

}
