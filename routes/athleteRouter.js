const router = require('koa-router')();
const athleteApi = require('../modelAPI/athleteApi');
router.prefix('/athleteRouter');

//运动员报名
router.post('/', async (ctx, next) => {
    await athleteApi.enrollInfo(ctx,next);
});

//修改运动员报名
router.post('/updateEnscroll', async (ctx, next) => {
    await athleteApi.updateEnscroll(ctx,next);
});

//获取系别
router.get('/getTie', async (ctx, next) => {
    await athleteApi.selectTie(ctx,next);
});

//获取根据系别获取专业
router.get('/getMajor/:tieId', async (ctx, next) => {
    await athleteApi.getMajor(ctx,next);
});

//运动员分页查询运动员信息
router.get('/athleteInfo', async (ctx, next) => {
    await athleteApi.getAthleteInfo(ctx,next);
});

//查询所有的运动员信息
router.get('/athleteInfoAll', async (ctx, next) => {
    await athleteApi.getAllAthlete(ctx,next);
});

//删除运动员信息
router.get('/delAthInfo/:aId', async (ctx, next) => {
    await athleteApi.delAthlete(ctx,next);
});

module.exports = router;