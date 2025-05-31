import express from 'express';
const app = express();
//设置跨域
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With,yourHeaderFeild");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
})

//创建路由文件
import chartOne from './router/one';
import chartTwo from './router/two';
import chartThree from './router/three';
import chartFour from './router/four';

//使用中间件来配置路由
app.use('/one', chartOne);
app.use('/two', chartTwo);
app.use('/three', chartThree);
app.use('/four', chartFour);

app.listen(5173);