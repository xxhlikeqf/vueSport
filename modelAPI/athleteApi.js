//导入相应的数据库操作
const athleteOption= require('../controllers/athleteDAO');
//导入自己封装的加密模块
const encrytionModel = require('../utils/encryptionModel');

module.exports={
    //分页查询运动员信息
    getAthleteInfo:async (ctx,next)=>{
        try{
            let query={
                stuNum:ctx.query.stuNum,
                stuName:ctx.query.stuName,
                pageNum:ctx.query.pageNum-1,
                pageSize:ctx.query.pageSize,
            };
            if(ctx.query.stuNum !=='false'){
                query.stuNum = ctx.query.stuNum;
            }else{
                query.stuNum=false;
            }
            if(ctx.query.stuName !=='false'){
                query.stuName = ctx.query.stuName;
            }else{
                query.stuName=false;
            }
            let list =  await athleteOption.queryAthleteInfo(query);
            let listAll =  await athleteOption.queryAll();
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

    //获取所有的运动员
    getAllAthlete: async (ctx ,next)=>{
        try{
            let listAll =  await athleteOption.queryAll();
            let data ={
                list:listAll
            };
            ctx.body={code:200,message:'success',data};
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },

    //添加运动员报名信息
    enrollInfo:async (ctx,next)=>{
        try{
            let query={
                sNum:ctx.request.body.sNum,
                sName:ctx.request.body.sName,
                tieId:ctx.request.body.tieId,
                majorId:ctx.request.body.majorId,
                sSex:ctx.request.body.sSex,
                sportId:ctx.request.body.sportId,
                phone:ctx.request.body.phone,
            };
            console.log(query);
            query.sPwd = encrytionModel(ctx.request.body.sNum);
            let data =  await athleteOption.athleteEnroll(query);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    //获取系别
    selectTie:async (ctx,next)=>{
        try{
            let data =  await athleteOption.getSelect();
        ctx.body={code:200,message:'success',data};
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    //根据系别获取专业
    getMajor:async (ctx,next)=>{
        try{
            let tieId = ctx.params.tieId;
            let data =  await athleteOption.getMajor(tieId);
            ctx.body={code:200,message:'success',data};
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    //修改报名信息
    updateEnscroll:async (ctx,next)=>{
        try{
            let query={
                sName:ctx.request.body.sName,
                tieId:ctx.request.body.tieId,
                majorId:ctx.request.body.majorId,
                sSex:ctx.request.body.sSex,
                sportId:ctx.request.body.sportId,
                phone:ctx.request.body.phone,
                athletesId:ctx.request.body.athletesId,
            };
            let data =  await athleteOption.updateEnsroll(query);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    //删除运动员信息
    delAthlete:async (ctx,next)=>{
        try{
            let aId=ctx.params.aId;
            let data =  await athleteOption.delAthlete(aId);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    }
};