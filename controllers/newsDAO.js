//新闻管理的相关操作
const DAO = require('../controllers/DAO');

class DB {
    //发布新闻---新增新闻
    addNews(newDetails){
        return DAO("insert INTO newtable(id,newsTitle,newsContent,newsDate,newsTimes) VALUES(?,?,?,?,?);",
            [newDetails.mid,newDetails.nTitle,newDetails.nContent,newDetails.nDate,newDetails.nTimes]);
    }
    //分页查询所有的新闻--按条件/不按条件
    allNew(queryObj){
        if(queryObj.newTitle){
            return DAO(
                `SELECT newsId,newsTitle,newsContent,newsDate,newsTimes,mName,userType,manageuser.id FROM newtable INNER JOIN manageuser on newtable.id =manageuser.id where newsTitle LIKE '%${queryObj.newTitle}%' ORDER BY newsId ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,
                []
            );
        }else{
            return DAO(
                `SELECT newsId,newsTitle,newsContent,newsDate,newsTimes,mName,userType,manageuser.id FROM newtable INNER JOIN manageuser on newtable.id =manageuser.id ORDER BY newsId ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,
                []
            );
        }

    }

    queryAll(){
        return DAO('SELECT * FROM newtable',[]);
    }

    //根据id---删除指定新闻
    delNew(id){
        return DAO("DELETE FROM newtable WHERE newsId = ?;",[id]);
    }
    //根据id---查看详情
    lookNewDetail(id){
        return DAO("select * from newtable INNER JOIN manageuser on newtable.id =manageuser.id where newsId = ?;",[id]);
    }
    //根据id---修改新闻信息
    updateNew(newsDetail){
        return DAO("UPDATE newtable SET id=?,newsTitle=?,newsContent=?,newsDate=?,newsTimes = ? WHERE newsId =? and 1=1",
            [newsDetail.mid,newsDetail.nTitle,newsDetail.nContent,newsDetail.nDate,newsDetail.nTimes,newsDetail.newId]);
    }

}
module.exports=new DB();