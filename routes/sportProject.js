const router = require('koa-router')();
const sportProjectApi = require('../modelAPI/sportProjectApi');
router.prefix('/sportProject');
//分页查询当前页面的数据
router.get('/', async (ctx, next) => {
    await sportProjectApi.searchProject(ctx,next);
});
//添加运动项目
router.post('/addSport', async (ctx, next) => {
    await sportProjectApi.addSport(ctx,next);
});
//编辑运动项目
router.post('/editSport', async (ctx, next) => {
    await sportProjectApi.editSport(ctx,next);
});

//删除运动项目
router.post('/delSport', async (ctx, next) => {
    await sportProjectApi.delSport(ctx,next);
});

//获取根据项目类型（个人/团队）获取项目
router.get('/getTypeSport/:isTeam', async (ctx, next) => {
    await sportProjectApi.getSportClassify(ctx,next);
});
module.exports = router;
