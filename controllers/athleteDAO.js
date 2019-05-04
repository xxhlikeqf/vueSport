//新闻管理的相关操作
const DAO = require('../controllers/DAO');

class DB {
    //报名---增加运动员
    athleteEnroll(queryObj){
        return DAO('INSERT INTO athletesinfo(studentNum,studentPassword,studentName,tieId,majorId,studentSex,sportId,studentMobile,athletesNum) VALUES (?,?,?,?,?,?,?,?,?);',
            [queryObj.sNum,queryObj.sPwd,queryObj.sName,queryObj.tieId,queryObj.majorId,queryObj.sSex,queryObj.sportId,queryObj.phone,queryObj.sNum])
    }
    //查询系别
    getSelect(){
       return DAO('select * FROM tie ',[]);
    }
    //根据系别查询专业
    getMajor(id){
        return DAO('select * FROM major WHERE tieId =?; ',[id]);
    }
    //修改报名信息
    updateEnsroll(queryObj){
        return DAO('UPDATE athletesinfo SET studentName=?,tieId=?,majorId=?,studentSex=?,sportId=?,studentMobile=? WHERE athletesId = ?;',
            [queryObj.sName,queryObj.tieId,queryObj.majorId,queryObj.sSex,queryObj.sportId,queryObj.phone,queryObj.athletesId])
    }
    //查询运动员信息(按条件/不按条件,模糊搜索)
    queryAthleteInfo(queryObj){
        if(queryObj.stuNum && queryObj.stuName){
            return DAO(`SELECT athletesId,studentNum,studentPassword,studentName,studentSex,userType,athletesNum,studentMobile,tieName,majorName FROM athletesinfo LEFT JOIN tie ON athletesinfo.tieId = tie.tieId LEFT JOIN major ON athletesinfo.majorId = major.majorId where studentNum LIKE '%${queryObj.stuNum}%' and studentName LIKE '%${queryObj.stuName}%' ORDER BY athletesId ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,[])
        }else if(queryObj.stuName){
            return DAO(`SELECT athletesId,studentNum,studentPassword,studentName,studentSex,userType,athletesNum,studentMobile,tieName,majorName FROM athletesinfo LEFT JOIN tie ON athletesinfo.tieId = tie.tieId LEFT JOIN major ON athletesinfo.majorId = major.majorId where studentName LIKE '%${queryObj.stuName}%' ORDER BY athletesId ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,[])
        }else  if(queryObj.stuNum){
            return DAO(`SELECT athletesId,studentNum,studentPassword,studentName,studentSex,userType,athletesNum,studentMobile,tieName,majorName FROM athletesinfo LEFT JOIN tie ON athletesinfo.tieId = tie.tieId LEFT JOIN major ON athletesinfo.majorId = major.majorId where studentNum LIKE '%${queryObj.stuNum}%' ORDER BY athletesId ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,[])
        }else{
            return DAO(`SELECT athletesId,studentNum,studentPassword,studentName,studentSex,userType,athletesNum,studentMobile,tieName,majorName FROM athletesinfo LEFT JOIN tie ON athletesinfo.tieId = tie.tieId LEFT JOIN major ON athletesinfo.majorId = major.majorId ORDER BY athletesId ASC LIMIT ${queryObj.pageNum},${queryObj.pageSize};`,[])
        }
    }

    //查询所有
    queryAll(){
        return DAO('SELECT * FROM athletesinfo',[])
    }

    //删除运动员
    delAthlete(aId){
        return DAO('DELETE FROM athletesinfo WHERE athletesId =?;',[aId])
    }

}
module.exports=new DB();