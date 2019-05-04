//新闻管理的相关操作
const DAO = require('../controllers/DAO');

class DB {
    //查询管理员信息(按条件/不按条件,模糊搜索)
    queryManage(queryObj){
        if(queryObj.jobNum && queryObj.mName){
            return DAO(`SELECT * FROM manageuser where jobNum LIKE '%${queryObj.jobNum}%' and mName LIKE '%${queryObj.mName}%' ORDER BY id ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,[])
        }else if(queryObj.jobNum){
            return DAO(`SELECT * FROM manageuser where jobNum LIKE '%${queryObj.jobNum}%' ORDER BY id ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,[])
        }else  if(queryObj.mName){
            return DAO(`SELECT * FROM manageuser where mName LIKE '%${queryObj.mName}%' ORDER BY id ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,[])
        }else{
            return DAO(`SELECT * FROM manageuser ORDER BY id ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,[])
        }
    }

    //查询所有
    queryAll(){
        return DAO('SELECT * FROM manageuser ;',[])
    }

    //增加管理员
    addManage(manageObj){
        return DAO('INSERT INTO manageuser(jobNum,mPassword,mName,sex,mobile,email,userType) VALUES(?,?,?,?,?,?,?);',
            [manageObj.jobNum,manageObj.mPwd,manageObj.mName,manageObj.sex,manageObj.moblie,manageObj.email,'admin']);
    }
    //修改管理员
    editManage(manageObj){
        return DAO('UPDATE manageuser SET mName=?,sex=?,email=? WHERE id = ?',
            [manageObj.mName,manageObj.sex,manageObj.moblie,manageObj.email,manageObj.manageId]);
    }
    //删除管理员
    delManage(manageId){
        return DAO('DELETE FROM manageuser WHERE id =?;',[manageId]);
    }
    //查询管理员密码
    getManagePwd(manageId){
        return DAO('select mPassword FROM manageuser WHERE id = ?;',[manageId])
    }

}
module.exports=new DB();