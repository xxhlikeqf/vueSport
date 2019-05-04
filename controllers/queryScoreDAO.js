//新闻管理的相关操作
const DAO = require('../controllers/DAO');

class DB {
    //查询个人比赛成绩
    personQueryScore(queryObj){
        if(!(queryObj.sportId&&queryObj.athletesId&&queryObj.tieId&&queryObj.majorId)){
            return DAO('select studentName,sportName,tieName,majorName,prePersonScore,prePersonRanking,finalPersonRcore,finalPersonRanking from personscore LEFT JOIN athletesinfo on personscore.athletesId=athletesinfo.athletesId LEFT JOIN sport ON sport.sportId = personscore.sportId LEFT JOIN tie on athletesinfo.tieId = tie.tieId left join major on athletesinfo.majorId=major.majorId;',
                [])
        }else{
            return DAO('select studentName,sportName,tieName,majorName,prePersonScore,prePersonRanking,finalPersonRcore,finalPersonRanking from personscore LEFT JOIN athletesinfo on personscore.athletesId=athletesinfo.athletesId LEFT JOIN sport ON sport.sportId = personscore.sportId LEFT JOIN tie on athletesinfo.tieId = tie.tieId left join major on athletesinfo.majorId=major.majorId where personscore.sportId =? or athletesinfo.athletesId =? OR tie.tieId =? or major.majorId =?;',
                [queryObj.sportId,queryObj.athletesId,queryObj.tieId,queryObj.majorId]);
        }
    }
    //查询团队比赛成绩
    teamQueryScore(queryObj){
        if(!(queryObj.sportId&&queryObj.athletesId&&queryObj.tieId&&queryObj.majorId)){
            return DAO('select studentName,sportName,tieName,majorName,preTeamScore,preTeamRanking,finalTeamScore,finalTeamRanking from teamscore LEFT JOIN teamdetail on teamscore.teamId=teamdetail.athletesId LEFT JOIN athletesinfo ON athletesinfo.athletesId = teamdetail.athletesId LEFT JOIN sport ON sport.sportId = teamscore.sportId LEFT JOIN tie on athletesinfo.tieId = tie.tieId left join major on athletesinfo.majorId=major.majorId;',
                [])
        }else{
            return DAO('select studentName,sportName,tieName,majorName,preTeamScore,preTeamRanking,finalTeamScore,finalTeamRanking from teamscore LEFT JOIN teamdetail on teamscore.teamId=teamdetail.athletesId LEFT JOIN athletesinfo ON athletesinfo.athletesId = teamdetail.athletesId LEFT JOIN sport ON sport.sportId = teamscore.sportId LEFT JOIN tie on athletesinfo.tieId = tie.tieId left join major on athletesinfo.majorId=major.majorId WHERE teamscore.sportId =? or athletesinfo.athletesId =? OR tie.tieId =? or major.majorId =?;',
                [queryObj.sportId,queryObj.athletesId,queryObj.tieId,queryObj.majorId]);
        }
    }

    //查询个人所有成绩
    queryAllScoreP(){
        return DAO('SELECT * from personscore;',[]);
    }
    //查询团队所有成绩
    queryAllScoreT(){
        return DAO('SELECT * from teamscore;',[]);
    }
    //添加---个人项目成绩
    addScorePerson(addObj){
        return DAO('insert into personscore(sportId,athletesId,prePersonScore,prePersonRanking,finalPersonRcore,finalPersonRanking,personYear) VALUES(?,?,?,?,?,?,?);',
            [addObj.sportId,addObj.athletesId,addObj.prePersonScore,addObj.prePersonRanking,addObj.finalPersonRcore,addObj.finalPersonRanking,addObj.personYear]);
    }

    //添加---团队项目成绩
    addScoreTeam(addObj){
        return DAO('insert into teamscore(sportId,teamId,preTeamScore,preTeamRanking,finalTeamScore,finalTeamRanking,yearTeam) VALUES(?,?,?,?,?,?,?);',
            [addObj.sportId,addObj.teamId,addObj.preTeamScore,addObj.preTeamRanking,addObj.finalTeamScore,addObj.finalTeamRanking,addObj.yearTeam]);
    }

    //修改----个人成绩
    updateScorePer(updateObj){
        return DAO('update personscore set sportId = ?,athletesId=?,prePersonScore = ?,prePersonRanking=?,finalPersonRcore=?,finalPersonRanking=?,personYear = ? WHERE scorePersonId = ?;',
            [updateObj.sportId,updateObj.athletesId,updateObj.prePersonScore,updateObj.prePersonRanking,updateObj.finalPersonRcore,updateObj.finalPersonRanking,updateObj.personYear,updateObj.scorePersonId])
    }
    //修改----团队成绩
    updateScoreTeam(updateObj){
        return DAO('UPDATE teamscore set sportId = ?,teamId=?,preTeamScore = ?,preTeamScore=?,finalTeamScore = ?,finalTeamRanking =?,yearTeam = ? where scoreTeamId = ?;',
            [updateObj.sportId,updateObj.teamId,updateObj.preTeamScore,updateObj.preTeamScore,updateObj.finalTeamScore,updateObj.finalTeamRanking,updateObj.yearTeam,updateObj.scoreTeamId])
    }

    //删除--个人成绩
    delScorePer(delId){
        return DAO('delete FROM personscore WHERE scorePersonId = ?;',
            [delId])
    }

    //删除 ---- 团队成绩
    delScoreTeam(delId){
        return DAO('delete FROM teamscore WHERE scoreTeamId = ?;',
            [delId])
    }

    //添加团队--
    addTeam(addObj){
        return DAO('insert into teamdetail(athletesId,teamName) VALUES (?,?);',
            [addObj.athletesId,addObj.teamName])
    }

    //修改团队
    updateTeam(updateObj){
        return DAO('update teamdetail set athletesId=?,teamName=? WHERE teamId =?;',
            [updateObj.athletesId,updateObj.teamName,updateObj.teamId])
    }

    //查询团队---分页
    queryTeam(queryObj){
        if(queryObj.teamName){
            return DAO(`select teamId,teamName,studentName,teamdetail.athletesId FROM teamdetail LEFT JOIN athletesinfo on teamdetail.athletesId =athletesinfo.athletesId where teamName LIKE '%${queryObj.teamName}%' ORDER BY teamId ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,[])
        }else{
            return DAO(`select teamId,teamName,studentName,teamdetail.athletesId FROM teamdetail LEFT JOIN athletesinfo on teamdetail.athletesId =athletesinfo.athletesId ORDER BY teamId ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,[])
        }

    }

    //查询团队---所有
    queryTeamAll(){
            return DAO(`SELECT * FROM teamdetail`,[])
    }

    //查询团队
    delTeam(teamId){
        return DAO('DELETE FROM teamdetail WHERE teamId = ?;',[teamId])
    }

}
module.exports=new DB();