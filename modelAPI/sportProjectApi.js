//导入相应的数据库操作
const sportProject = require('../controllers/sportProjectDAO');

module.exports={
    //查询运动项目（有条件、无条件）
    searchProject:async (ctx,next)=>{
        try{
            let query={};
            query.pageSize = Number(ctx.query.pageSize);
            query.pageNum = Number(ctx.query.pageNum)-1;
            if(ctx.query.sportName !=='false'){
                query.sportName = ctx.query.sportName;
            }else{
                query.sportName=false;
            };
            let list = await sportProject.searchSport(query);
            let listAll = await sportProject.searchSportAll(query);
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
    //新增运动项目
    addSport:async (ctx,next)=>{
        try{
            let query={
                sportName:ctx.request.body.sportName,
                isTeam:ctx.request.body.isTeam,
                typeName:ctx.request.body.typeName,
                sportRecord:ctx.request.body.sportRecord
            };
           let data =  await sportProject.addSport(query);
           if(data.affectedRows===1){
               ctx.body={code:200,message:'success',data:true};
           }else{
               ctx.body={code:200,message:'error',data:false};
           }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    //编辑运动项目
    editSport:async (ctx,naxt)=>{
        try{
            let query={
                sportName:ctx.request.body.sportName,
                isTeam:ctx.request.body.isTeam,
                typeName:ctx.request.body.typeName,
                sportRecord:ctx.request.body.sportRecord,
                sportId:ctx.request.body.sportId
            };
            let data = await sportProject.updateSport(query);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    //删除运动项目
    delSport:async (ctx,naxt)=>{
        try{
            let sportId=ctx.request.body.sportId;
            let data = await sportProject.delSport(sportId);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    //根据是否是组队来查询运动项目
    getSportClassify:async (ctx,next)=>{
        try{
            let isTeam='';
            if(ctx.params.isTeam !=='false'){
                isTeam =ctx.params.isTeam;
            }else{
                isTeam =false;
            }
            let data = await sportProject.selectClassify(isTeam);
            ctx.body={code:200,message:'success',data};
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    }
};