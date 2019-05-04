//导入相应的数据库操作
const queryScore= require('../controllers/queryScoreDAO');

module.exports={
    //查询个人成绩
    personQuery:async (ctx,next)=>{
        try{
            let query={
                sportId:ctx.request.body.sportId,
                athletesId:ctx.request.body.athletesId,
                tieId:ctx.request.body.tieId,
                majorId:ctx.request.body.majorId,
            };

            let list =  await queryScore.personQueryScore(query);
            let listAll =  await queryScore.queryAllScoreP();
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
    //查询团队项目成绩
    teamQuery:async (ctx,next)=>{
        try{
            let query={
                sportId:ctx.request.body.sportId,
                athletesId:ctx.request.body.athletesId,
                tieId:ctx.request.body.tieId,
                majorId:ctx.request.body.majorId,
            };
            let list =  await queryScore.teamQueryScore(query);
            let listAll =  await queryScore.queryAllScoreT();
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
    //添加个人项目成绩
    addPersonScore:async (ctx,next)=>{
        try{
            let query={
                sportId:ctx.request.body.sportId,
                athletesId:ctx.request.body.athletesId,
                prePersonScore:ctx.request.body.prePersonScore,
                prePersonRanking:ctx.request.body.prePersonRanking,
                finalPersonRcore:ctx.request.body.finalPersonRcore,
                finalPersonRanking:ctx.request.body.finalPersonRanking,
                personYear:ctx.request.body.personYear,
            };
            let data =  await queryScore.addScorePerson(query);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },

    //添加团队项目成绩
    addTeamScore:async (ctx,next)=>{
        try{
            let query={
                sportId:ctx.request.body.sportId,
                teamId:ctx.request.body.teamId,
                preTeamScore:ctx.request.body.preTeamScore,
                preTeamRanking:ctx.request.body.preTeamRanking,
                finalTeamScore:ctx.request.body.finalTeamScore,
                finalTeamRanking:ctx.request.body.finalTeamRanking,
                yearTeam:ctx.request.body.yearTeam,
            };
            let data =  await queryScore.addScoreTeam(query);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },

    //修改个人项目成绩
    updatePersonScore:async (ctx,next)=>{
        try{
            let query={
                sportId:ctx.request.body.sportId,
                athletesId:ctx.request.body.athletesId,
                prePersonScore:ctx.request.body.prePersonScore,
                prePersonRanking:ctx.request.body.prePersonRanking,
                finalPersonRcore:ctx.request.body.finalPersonRcore,
                finalPersonRanking:ctx.request.body.finalPersonRanking,
                personYear:ctx.request.body.personYear,
                scorePersonId:ctx.request.body.scorePersonId,
            };
            let data =  await queryScore.updateScorePer(query);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },

    //修改团队项目成绩
    updateTeamScore:async (ctx,next)=>{
        try{
            let query={
                sportId:ctx.request.body.sportId,
                teamId:ctx.request.body.teamId,
                preTeamScore:ctx.request.body.preTeamScore,
                preTeamRanking:ctx.request.body.preTeamRanking,
                finalTeamScore:ctx.request.body.finalTeamScore,
                finalTeamRanking:ctx.request.body.finalTeamRanking,
                yearTeam:ctx.request.body.yearTeam,
                scoreTeamId:ctx.request.body.scoreTeamId,
            };
            let data =  await queryScore.updateScoreTeam(query);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },

    //删除个人项目成绩
    delPersonScore:async (ctx,next)=>{
        try{
            let delId = ctx.request.body.delId;
            let data =  await queryScore.delScorePer(delId);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },

    //删除团队项目成绩
    delTeamScore:async (ctx,next)=>{
        try{
            let delId = ctx.request.body.delId;
            let data =  await queryScore.delScoreTeam(delId);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },

    //添加团队
    addTeam:async (ctx,next)=>{
        try{
            let query={
                athletesId:ctx.request.body.athletesId,
                teamName:ctx.request.body.teamName,
            };
            let data =  await queryScore.addTeam(query);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },

    //修改团队---
    updateTeam:async (ctx,next)=>{
        try{
            let query={
                athletesId:ctx.request.body.athletesId,
                teamName:ctx.request.body.teamName,
                teamId:ctx.request.body.teamId,
            };
            let data =  await queryScore.updateTeam(query);
            if(data.affectedRows===1){
                ctx.body={code:200,message:'success',data:true};
            }else{
                ctx.body={code:200,message:'error',data:false};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },

    //查询团队
    queryTeam:async (ctx,next)=>{
        try{
            let query={};
            query.pageSize = Number(ctx.query.pageSize);
            query.pageNum = Number(ctx.query.pageNum)-1;
            if(ctx.query.teamName !=='false'){
                query.teamName = ctx.query.teamName;
            }else{
                query.teamName=false;
            }
            let list =await queryScore.queryTeam(query);
            let listAll =await queryScore.queryTeamAll();
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

    // 删除团队
    delTeam:async (ctx,next)=>{
        try{
            let teamId = ctx.request.body.teamId;
            let data =  await queryScore.delTeam(teamId);
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