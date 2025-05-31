import express from 'express';
const router1 = express.Router();
import twodata from '../mock/two.json';

//请求和响应
router1.get("/data", (req, res) => {
  res.send({msg:'我是two的路由地址',chartData:twodata})
});

export default router1;