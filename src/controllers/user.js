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
  }
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

export let getUserByOpenId = async(ctx) => {
  let openid = ctx.params.openid;
  let user = await query(`select * from moa_users where openId ='${openid}'`);
  ctx.body = {
    result: user[0]
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