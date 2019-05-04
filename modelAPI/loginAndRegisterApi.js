//导入相应的数据库操作
const loginAndRegister= require('../controllers/loginAndRegisterDAO');
//导入自己封装的加密模块
const encrytionModel = require('../utils/encryptionModel');

module.exports={
    //修改密码
    changePwd:async (ctx,next)=>{
        try{
            let query={
                mId:ctx.request.body.mId,
            };
            query.mPwd =encrytionModel(ctx.request.body.mPwd);
            let oldPwd = await loginAndRegister.getStuPwd(query.mId);
            if(oldPwd === query.mPwd){
                let data =  await loginAndRegister.changeStuPwd(query);
                if(data.affectedRows===1){
                    ctx.body={code:200,message:'success',data:true};
                }else{
                    ctx.body={code:200,message:'error',data:false};
                }
            }else{
                ctx.body={code:200,message:'success',data:'输入的密码不正确'};
            }
            ctx.body={code:200,message:'success',data};
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    //登录
    login:async (ctx,next)=>{
        try{
            let query={
                userName:ctx.request.body.userName,
                userType:ctx.request.body.userType,
            };
            query.passWord =encrytionModel(ctx.request.body.passWord);
            let oldPwd = '';
        if(query.userType==='admin'){
            let getPwd = await loginAndRegister.getManagePwd(query.userName);
                oldPwd = getPwd[0].mPassword;
            }else{
                let getPwd= await loginAndRegister.getStuPwd(query.userName);
                oldPwd = getPwd[0].studentPassword;
            }
        if(oldPwd === query.passWord){
                ctx.body={code:200,message:'success',data:'登录成功'};
            }else{
                ctx.body={code:200,message:'success',data:'用户名或密码不正确'};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    }

};