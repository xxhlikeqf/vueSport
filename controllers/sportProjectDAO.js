//新闻管理的相关操作
const DAO = require('../controllers/DAO');

class DB {
    //查询项目
    searchSport(queryObj){
        console.log(queryObj);
        if(queryObj.sportName){
            return DAO(
                `SELECT * FROM sport where sportName LIKE '%${queryObj.sportName}%' ORDER BY sportId ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,
                []
            );
        }else{
            return DAO(
                `SELECT * FROM sport where sportName LIKE '%%' ORDER BY sportId ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,
                []
            );
        }
    }
    //查询所有
    searchSportAll(){
        return DAO('SELECT * FROM sport where sportName',[]);
    }

    //新增项目
    addSport(sportObj){
        return DAO('INSERT INTO sport(sportName,isTeamSport,sporttypeName,sportRecord) VALUES (?,?,?,?);',
            [sportObj.sportName,sportObj.isTeam,sportObj.typeName,sportObj.sportRecord]);
    }

    //修改项目
    updateSport(sportObj){
        return DAO('UPDATE sport SET sportName=?,isTeamSport=?,sporttypeName=?,sportRecord=? WHERE sportId = ? and 1=1;',
            [sportObj.sportName,sportObj.isTeam,sportObj.typeName,sportObj.sportRecord,sportObj.sportId]);
    }

    //删除项目
    delSport(id){
        return DAO('DELETE FROM sport WHERE sportId = ?;',[id])
    }
    //根据是否是团队项目来查询
    selectClassify(isTeam){
        if(isTeam){
            return DAO('SELECT * FROM sport WHERE isTeamSport = ?;',[isTeam])
        }else{
            return DAO('SELECT * FROM sport ',[])
        }
    }

}
module.exports=new DB();