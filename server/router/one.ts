import express from 'express';
const router1 = express.Router();
import onedata from '../mock/one.json';


//请求和响应
router1.get("/data", (req, res) => {
  res.send({msg:'我是one的路由地址',chartData:onedata})
});

export default router1;