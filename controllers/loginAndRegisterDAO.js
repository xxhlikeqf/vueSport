//登录注册的相关操作
const DAO = require('../controllers/DAO');

class DB {
    //修改学生登录密码
    changeStuPwd(manageObj){
        return DAO('UPDATE athletesinfo SET studentPassword = ? WHERE athletesId = ?',
            [manageObj.mId,manageObj.mPwd])
    }
    //获取用户的登录密码
    getStuPwd(sId){
        return DAO('select studentPassword FROM athletesinfo WHERE studentNum=?;',[sId])
    }

    //获取管理员的登录密码
    getManagePwd(mId){
        return DAO('select mPassword FROM manageuser WHERE jobNum = ?;',[mId])
    }




}
module.exports=new DB();