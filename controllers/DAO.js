//导入mysql模块
const mysql =require('mysql');
//导入数据库配置
const options = require('../controllers/dbconfig');
//创建线程池
const pool = mysql.createPool(options);

//公开的模块方法
function query(sql,value) {
    return new Promise((resolve,reject)=>{
        pool.getConnection(function (err,connection) {
            if(err){
                reject(err);
            }
            connection.query(sql,value,(err,row)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(row);
                }
                connection.release();
            })
        })
    })
}
//导出模块
module.exports=query;
