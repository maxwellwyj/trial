import express from 'express';
const router1 = express.Router();
import fourdata from '../mock/four.json';

//请求和响应
router1.get("/data", (req, res) => {
  res.send({msg:'我是four的路由地址',chartData:fourdata})
});

export default router1;