//导入相应的数据库操作
const manageOption= require('../controllers/manageDAO');
//导入自己封装的加密模块
const encrytionModel = require('../utils/encryptionModel');

module.exports={
    //分页查询管理员信息
    queryManage:async (ctx,next)=>{
        try{
            let query={
                jobNum:ctx.query.jobNum,
                mName:ctx.query.mName,
                pageNum:ctx.query.pageNum-1,
                pageSize:ctx.query.pageSize,
            };
            if(ctx.query.jobNum !=='false'){
                query.jobNum = ctx.query.jobNum;
            }else{
                query.jobNum=false;
            }
            if(ctx.query.mName !=='false'){
                query.mName = ctx.query.mName;
            }else{
                query.mName=false;
            }
            let list =  await manageOption.queryManage(query);
            let listAll =  await manageOption.queryAll();
            let data ={
                list,
                pageNum:query.pageNum,
                pageSize:query.pageSize,
                total:listAll.length,
            };
            ctx.body={code:200,message:'success',data};
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    //添加管理员
    addManageInfo:async (ctx,next)=>{
        try{
            let query={
                jobNum:ctx.request.body.jobNum,
                mName:ctx.request.body.mName,
                sex:ctx.request.body.sex,
                moblie:ctx.request.body.moblie,
                email:ctx.request.body.email,
            };
            query.mPwd = encrytionModel(ctx.request.body.mPwd);
        console.log(query);
        let data =  await manageOption.addManage(query);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
            ctx.body={code:200,message:'success',data};
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    //编辑管理员
    editManageInfo:async (ctx,next)=>{
        try{
            let query={
                mName:ctx.request.body.mName,
                sex:ctx.request.body.sex,
                moblie:ctx.request.body.moblie,
                email:ctx.request.body.email,
                manageId:ctx.request.body.manageId,
            };
            let data =  await manageOption.editManage(query);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    //删除管理员
    delManageInfo:async (ctx,next)=>{
        try{
            let manageId=ctx.request.body.manageId;
            let data =  await manageOption.delManage(manageId);
            ctx.body={code:200,message:'success',data};
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },

};