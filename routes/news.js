const router = require('koa-router')();
const newsApi = require('../modelAPI/newsApi');
router.prefix('/news');
//分页查询当前页面的数据
router.get('/', async (ctx, next) => {
    await newsApi.getAllNews(ctx,next);
});

//删除新闻
router.get('/delNew/:newId', async (ctx, next) => {
    await newsApi.delNews(ctx,next);
});

//添加新闻
router.post('/addNews', async (ctx, next) => {
    await newsApi.addNews(ctx,next);
});

//查看详情
router.get('/lookDetail/:newId', async (ctx, next) => {
    await newsApi.lookNewDetail(ctx,next);
});

//修改新闻信息
router.post('/updateNews', async (ctx, next) => {
    await newsApi.updateNews(ctx,next);
});


module.exports = router;
