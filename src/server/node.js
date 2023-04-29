
const Koa = require('koa');
// const Router = require('koa-router');
const cors = require('@koa/cors');
const axios = require('axios');
const CLIENT_ID = '9d300717e9196fb7b135';
const CLIENT_SECRET = 'cea73f119e04e009f40f48eb4007b3ac8cddd4bd';

// const router = new Router();
const app = new Koa();
app.use(cors());

app.use(async ctx => {
  if (ctx.path === '/oauth/github') {
    const code = ctx.request.query.code;

    const tokenResponse = await axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token?' +
        `client_id=${CLIENT_ID}&` +
        `client_secret=${CLIENT_SECRET}&` +
        `code=${code}`,
      headers: {
        accept: 'application/json'
      }
    });

    const access_token = tokenResponse.data.access_token;
    
    // console.log('access_token', access_token)
    const useInfo = await axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        accept: 'application/json',
        Authorization: `token ${access_token}`
      }
    });
  
    const {
      name,
      // avatar_url
    } = useInfo.data;

    ctx.redirect(`http://localhost:8000/r3f-taichi?name=${name}`)
    // ctx.body = {
    //     code: 200,
    //     message: '登录成功',
    //     data: {
    //         useInfo: {
    //           name,
    //           avatar_url
    //         },
    //         loginTime: new Date
    //     }
    // }
  } else {
    ctx.body = {
      code: 404
    };
  }
});

// router.all('/oauth/github', async (ctx) => {
//     const query = ctx.request.query;
//     console.log('query', query)
//     ctx.body = {
//         code: 200,
//         message: '登录成功',
//         data: {
//             accessCode: query.code,
//             loginTime: new Date()
//         }
//     }
// })

console.log('node 服务启动了');

app.listen(8080);
