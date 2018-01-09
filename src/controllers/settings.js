import sequelize from '../lib/sequelize';
import Sequelize from 'sequelize';
import request from 'request-promise-native';

const settings = sequelize.define('moa_settings', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  maxBorrowDays: {
    type: Sequelize.INTEGER,
  },
  reborrowTimes: {
    type: Sequelize.INTEGER,
  },
  preReborrowDays: {
    type: Sequelize.INTEGER,
  },
  maxBorrowBooks: {
    type: Sequelize.INTEGER,
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
    model: settings
  });
};

export let updateSettings = async(ctx) => {
  let setting = ctx.request.body;
  let result = await settings.update(setting, {
    where: {
      id: setting.id ? setting.id : 1
    }
  });
  ctx.body = {
    result: result
  };
};

export let getSettings = async(ctx) => {
  let book = await query(`select * from moa_settings`);
  ctx.body = {
    result: book[0]
  };
};