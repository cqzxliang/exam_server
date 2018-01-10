import sequelize from '../lib/sequelize';
import Sequelize from 'sequelize';
import request from 'request-promise-native';

const borrow = sequelize.define('moa_borrow', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  bookId: {
    type: Sequelize.INTEGER,
  },
  borrowDate: {
    type: Sequelize.DATE,
  },
  shoudPaybackDate: {
    type: Sequelize.DATE,
  },
  actualPaybackDate: {
    type: Sequelize.DATE,
  },
  borrowStatus: {
    type: Sequelize.STRING,
  },
  reBorrowFlag: {
    type: Sequelize.STRING,
  }
}, {
  freezeTableName: true,
  timestamps: true
});

let query = (sql) => {
  return sequelize.query(sql, {
    model: borrow
  });
};

export let addBorrow = async(ctx) => {
  let bo = ctx.request.body;
  let result = await borrow.create(bo);

  ctx.body = {
    result: result
  };
};

export let getBorrowCount = async(ctx) => {
  let id = ctx.params.userId;
  let result = await query(`select count(id) num from moa_borrow where userId = ${id} and borrowStatus in ('A','W');`);
  ctx.body = {
    result: result[0]
  };
};

export let getBorrowByUserId = async(ctx) => {
  let userId = ctx.query.userId;
  let bookId = ctx.query.bookId;
  let result = await query(`select count(id) num from moa_borrow where userId = ${userId} and bookId=${bookId} and borrowStatus in ('A','W');`);
  ctx.body = {
    result: result[0]
  };
};

export let getBorrowByStatus = async(ctx) => {
  let userId = ctx.query.userId;
  let bookId = ctx.query.bookId;
  let status = ctx.query.status;
  let result = await query(`select count(id) num from moa_borrow where userId = ${userId} and bookId=${bookId} and borrowStatus ='${status}';`);
  ctx.body = {
    result: result
  };
};

export let getBorrowStatus = async(ctx) => {
  let userId = ctx.query.userId;
  let bookId = ctx.query.bookId;
  let result = await query(`
    select count(id) num,'W' type from moa_borrow where userId = ${userId} and bookId=${bookId} and borrowStatus ='W'
    union
    select count(id) num ,'A' type  from moa_borrow where userId = ${userId} and bookId=${bookId} and borrowStatus ='A'
    `);
  ctx.body = {
    result: result
  };
};