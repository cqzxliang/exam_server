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
  shouldPaybackDate: {
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
  let result = await query(`select count(id) num from moa_borrow where userId = ${id} and borrowStatus in ('A','W')
  and actualPaybackDate is  null;`);
  ctx.body = {
    result: result[0]
  };
};

export let getBorrowByUserId = async(ctx) => {
  let userId = ctx.query.userId;
  let bookId = ctx.query.bookId;
  let result = await query(`select count(id) num from moa_borrow where userId = ${userId} and bookId=${bookId} and borrowStatus in ('A','W')
  and actualPaybackDate is  null;`);
  ctx.body = {
    result: result[0]
  };
};

export let getBorrowByStatus = async(ctx) => {
  let userId = ctx.query.userId;
  let status = ctx.query.status;
  let type = ctx.query.type || null;
  let result;
  if (type === "payback") {
    result = await query(`select a.id borrowId,a.borrowDate,a.shouldPaybackDate,a.actualPaybackDate,b.image,b.title,b.author,b.price,b.publisher,b.qty,b.id bookId 
    from moa_borrow a,moa_lib_books b 
    where a.bookId = b.id and a.userId = ${userId}  and a.borrowStatus ='${status}' and a.actualPaybackDate is not null;`);
  } else {
    result = await query(`select a.id borrowId,a.borrowDate,a.shouldPaybackDate,a.actualPaybackDate,b.image,b.title,b.author,b.price,b.publisher,b.qty,b.id bookId 
    from moa_borrow a,moa_lib_books b 
    where a.bookId = b.id and a.userId = ${userId}  and a.borrowStatus ='${status}' and a.actualPaybackDate is null;`);
  }

  ctx.body = {
    result: result
  };
};

export let getBorrowStatus = async(ctx) => {
  let userId = ctx.query.userId;
  let result = await query(`
    select count(id) num,'W' type from moa_borrow where userId = ${userId}  and borrowStatus ='W' and actualPaybackDate is null
    union
    select count(id) num ,'A' type  from moa_borrow where userId = ${userId}  and borrowStatus ='A' and actualPaybackDate is null
    union
    select count(id) num ,'payback' type  from moa_borrow where userId = ${userId}  and borrowStatus ='A' and actualPaybackDate is not null
    `);
  ctx.body = {
    result: result
  };
};

export let updateBorrow = async(ctx) => {
  let b = ctx.request.body;
  let result = await borrow.update(b, {
    where: {
      id: b.id
    }
  });
  ctx.body = {
    result: result
  };
};