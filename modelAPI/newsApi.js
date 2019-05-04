//导入相应数据库操作
const newsDAO = require('../controllers/newsDAO');

module.exports ={
    getAllNews:async (ctx,next)=>{//分页查询所有的新闻(包括有条件，或者无条件)
        try{
            let query={};
                query.pageSize = Number(ctx.query.pageSize);
                query.pageNum = Number(ctx.query.pageNum)-1;
            if(ctx.query.newTitle !=='false'){
                    query.newTitle = ctx.query.newTitle;
            }else{
                query.newTitle=false;
            }
            let list = await newsDAO.allNew(query);
            let listAll = await newsDAO.queryAll();
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
    delNews:async (ctx,next)=>{//删除新闻
        try {
            let id = ctx.params.newId;
            let data = await newsDAO.delNew(id);
            if(data.changedRows===0){
                ctx.body={code:200,message:'不存在',data:false};
            }else{
                ctx.body={code:200,message:'success',data:true};
            }
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    addNews:async (ctx,next)=>{//新闻新闻
        try {
           let newObj = {
               mid:ctx.request.body.mid,
               nTitle:ctx.request.body.nTitle,
               nContent:ctx.request.body.nContent,
               nDate:ctx.request.body.nDate,
               nTimes:ctx.request.body.nTimes,
           };
        let data = await newsDAO.addNews(newObj);
            ctx.body={code:200,message:'success',data};
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    lookNewDetail:async (ctx,next)=>{//新闻详情
        try {
           let id = ctx.params.newId;
            let data = await newsDAO.lookNewDetail(id);
            ctx.body={code:200,message:'success',data};
        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },
    updateNews:async (ctx,next)=>{//更新新闻信息
        try {
            let newsDetail = {
                newId:ctx.request.body.newId,
                mid:ctx.request.body.mid,
                nTitle:ctx.request.body.nTitle,
                nContent:ctx.request.body.nContent,
                nDate:ctx.request.body.nDate,
                nTimes:ctx.request.body.nTimes,
            };
        let data = await newsDAO.updateNew(newsDetail);
        if(data.affectedRows===1){
            ctx.body={code:200,message:'success',data:true};
        }else{
            ctx.body={code:200,message:'修改失败',data:false};
        }

        }catch (e) {
            ctx.body={code:500,message:'服务器错误'}
        }
    },

};