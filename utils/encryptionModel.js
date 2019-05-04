/*
* 加密的公共模块
* 未加密密码:oldPwd
* return 新加密码:newPwd
*
* */
//导入加密模块
const crypto=require('crypto');

function encryption(oldPwd) {
    const hash = crypto.createHash('md5');//采用md5的方式加密
    hash.update(oldPwd);//进行加密
    let newPwd = hash.digest('hex');//产生32位字符
    return newPwd;
}
module.exports = encryption;