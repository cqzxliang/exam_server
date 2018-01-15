var WXBizDataCrypt = require('../tool/WXBizDataCrypt')
import {
  Wechat as config
} from '../config';
import request from 'request-promise-native';

export let decryptData = async(ctx) => {
  let content = ctx.request.body;
  console.log(content);
  let appId = content.appId;
  let sessionKey = content.sessionKey;
  let encryptedData = content.encryptedData;
  let iv = content.iv;
  let pc = new WXBizDataCrypt(appId, sessionKey);
  let data = pc.decryptData(encryptedData, iv);
  ctx.body = {
    result: data
  };
};

export let getOpenId = async(ctx) => {
  let code = ctx.params.code;
  console.log(code)
  let appId = config.appId;
  let appSecret = config.appSecret;
  let result = await request.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`);
  ctx.body = {
    result: result
  };
};

// import jwt from 'jsonwebtoken'
// import fs from 'fs'
// import path from 'path'

// const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

// // 用户登录的时候返回token
// // let token = jwt.sign({
// //   userInfo: userInfo // 你要保存到token的数据
// // }, publicKey, { expiresIn: '7d' })

// /**
//  * 检查授权是否合法
//  */
// export let CheckAuth = (ctx) => {
//   let token = ctx.request.header.authorization
//   try {
//     let decoded = jwt.verify(token.substr(7), publicKey)
//     if (decoded.userInfo) {
//       return {
//         status: 1,
//         result: decoded.userInfo
//       }
//     } else {
//       return {
//         status: 403,
//         result: {
//           errInfo: '没有授权'
//         }
//       }
//     }
//   } catch (err) {
//     return {
//       status: 503,
//       result: {
//         errInfo: '解密错误'
//       }
//     }
//   }
// }

// export let Post = (ctx) => {
//   switch (ctx.params.action) {
//     case 'check':
//       return CheckAuth(ctx).then(result => { ctx.body = result })
//     default:
//       return CheckAuth(ctx).then(result => { ctx.body = result })
//   }
// }