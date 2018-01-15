import sequelize from '../lib/sequelize';
import Sequelize from 'sequelize';
import request from 'request-promise-native';

const users = sequelize.define('moa_users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  avatarUrl: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.INTEGER,
  },
  language: {
    type: Sequelize.STRING,
  },
  nickName: {
    type: Sequelize.STRING,
  },
  openId: {
    type: Sequelize.STRING,
  },
  province: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
  role: {
    type: Sequelize.STRING,
  },
  chinese_name: {
    type: Sequelize.STRING,
  },
  english_name: {
    type: Sequelize.STRING,
  },
  empno: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: true,
  timestamps: true
})

let query = (sql) => {
  return sequelize.query(sql, {
    model: users
  });
};

export let addUser = async(ctx) => {
  let user = ctx.request.body;
  let result = await users.create(user);
  ctx.body = {
    result: result
  };
};

export let getUserByUsernameAndPassword = async(ctx) => {
  let loginInfo = ctx.request.body;
  let res = await query(`select id,avatarUrl,city,country,gender,language,nickName,openId,province,role,chinese_name,english_name,
  empno,  createdAt,updatedAt,deletedAt
   from moa_users where empno='${loginInfo.empno}' and password ='${loginInfo.password}'`);
  ctx.body = {
    result: res[0]
  };
}

export let getUserById = async(ctx) => {
  let id = ctx.params.id;
  let user = await query(`select id,avatarUrl,city,country,gender,language,nickName,openId,province,role,chinese_name,english_name,
  empno,  createdAt,updatedAt,deletedAt from moa_users where id ='${id}'`);
  let result;
  if (user && user.length > 0) {
    result = user[0];
  } else {
    result = null;
  }
  ctx.body = {
    result: result
  };
};

export let getUserByOpenId = async(ctx) => {
  let openId = ctx.params.openId;
  let user = await query(`select id,avatarUrl,city,country,gender,language,nickName,openId,province,role,chinese_name,english_name,
  empno,  createdAt,updatedAt,deletedAt from moa_users where openId ='${openId}'`);
  let result;
  if (user && user.length > 0) {
    result = user[0];
  } else {
    result = null;
  }
  ctx.body = {
    result: result
  };
};

export let getUserByEmpno = async(ctx) => {
  let empno = ctx.params.empno;
  let user = await query(`select id,avatarUrl,city,country,gender,language,nickName,openId,province,role,chinese_name,english_name,
  empno,  createdAt,updatedAt,deletedAt from moa_users where empno ='${empno}'`);
  let result;
  if (user && user.length > 0) {
    result = user[0];
  } else {
    result = null;
  }
  ctx.body = {
    result: result
  };
};

export let updateUser = async(ctx) => {
  let user = ctx.request.body;
  let result = await users.update(user, {
    where: {
      id: user.id
    }
  });
  ctx.body = {
    result: result
  };
};