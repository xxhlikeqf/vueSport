const router = require('koa-router')();
const manageApi = require('../modelAPI/manageApi');
router.prefix('/manageRouter');

//查询管理员
router.get('/', async (ctx, next) => {
    await manageApi.queryManage(ctx,next);
});

//添加管理员
router.post('/addManage', async (ctx, next) => {
    await manageApi.addManageInfo(ctx,next);
});

//编辑管理员
router.post('/editManage', async (ctx, next) => {
    await manageApi.editManageInfo(ctx,next);
});

//删除管理员
router.post('/delManage', async (ctx, next) => {
    await manageApi.delManageInfo(ctx,next);
});

module.exports = router;