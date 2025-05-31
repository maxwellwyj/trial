import express from 'express';
const router1 = express.Router();
import threedata from '../mock/three.json';

//请求和响应
router1.get("/data", (req, res) => {
  res.send({msg:'我是three的路由地址',chartData:threedata})
});

export default router1;