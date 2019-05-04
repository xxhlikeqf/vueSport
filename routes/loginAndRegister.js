const router = require('koa-router')();
const loginAndRegisterApi = require('../modelAPI/loginAndRegisterApi');
router.prefix('/loginAndRegister');

//登陆验证
router.post('/', async (ctx, next) => {
    await loginAndRegisterApi.login(ctx,next);
});

//修改学生密码
router.post('/changePwd', async (ctx, next) => {
    await loginAndRegisterApi.changePwd(ctx,next);
});

module.exports = router;