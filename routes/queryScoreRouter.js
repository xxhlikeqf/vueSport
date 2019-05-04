const router = require('koa-router')();
const queryScoreApi = require('../modelAPI/queryScoreApi');
router.prefix('/queryScore');
//查询个人项目成绩
router.post('/', async (ctx, next) => {
    await queryScoreApi.personQuery(ctx,next);
});

//查询团队项目成绩
router.post('/queryTeam', async (ctx, next) => {
    await queryScoreApi.teamQuery(ctx,next);
});

//添加个人项目成绩
router.post('/addPersonScore', async (ctx, next) => {
    await queryScoreApi.addPersonScore(ctx,next);
});

//添加团队项目成绩
router.post('/addTeamScore', async (ctx, next) => {
    await queryScoreApi.addTeamScore(ctx,next);
});

//修改个人成绩
router.post('/updatePersonScore', async (ctx, next) => {
    await queryScoreApi.updatePersonScore(ctx,next);
});

//修改团队项目
router.post('/updateTeamScore', async (ctx, next) => {
    await queryScoreApi.updateTeamScore(ctx,next);
});

//删除个人成绩
router.post('/delPersonScore', async (ctx, next) => {
    await queryScoreApi.delPersonScore(ctx,next);
});

//删除团队项目
router.post('/delTeamScore', async (ctx, next) => {
    await queryScoreApi.delTeamScore(ctx,next);
});

//addTeam---添加团队
router.post('/addTeam', async (ctx, next) => {
    await queryScoreApi.addTeam(ctx,next);
});

//修改团队
router.post('/updateTeam', async (ctx, next) => {
    await queryScoreApi.updateTeam(ctx,next);
});

//查询团队
router.get('/queryTeam', async (ctx, next) => {
    await queryScoreApi.queryTeam(ctx,next);
});

//删除团队
router.post('/delTeam',async (ctx,next)=>{
    await queryScoreApi.delTeam(ctx,next);
});

module.exports = router;