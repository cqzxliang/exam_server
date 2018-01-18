import sequelize from '../lib/sequelize';
import Sequelize from 'sequelize';
import request from 'request-promise-native';

const exam = sequelize.define('moa_exams', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
  },
  refDept: {
    type: Sequelize.STRING,
  },
  code: {
    type: Sequelize.STRING,
  },
  version: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.INTEGER,
  },
  passScore: {
    type: Sequelize.INTEGER,
  },
  companyId: {
    type: Sequelize.STRING,
  }
}, {
  freezeTableName: true,
  timestamps: true
})

let query = (sql) => {
  return sequelize.query(sql, {
    model: exam
  });
};

export let getAllExams = async(ctx) => {
  let exams = await query(`select * from moa_exams`);
  ctx.body = {
    result: exams
  };

};

export let getExamById = async(ctx) => {
  let id = ctx.params.id;
  let exam = await query(`select * from moa_exams where id =${id}`);
  ctx.body = {
    result: exam[0]
  };
};

// export let getBookByIsbn = async(ctx) => {
//   let isbn = ctx.params.isbn;
//   let book = await query(`select * from moa_lib_books where isbn13 =${isbn}`);
//   ctx.body = {
//     result: book[0]
//   };
// };

// // 模糊查询
// export let getBooksByTitltOrISBN = async(ctx) => {
//   let txt = ctx.params.text;
//   let books = await query(`select * from moa_lib_books where (title like '%${txt}%' or isbn13 like '%${txt}%')`);
//   ctx.body = {
//     result: books
//   };
// };

// // 分页查询
// export let queryBooksByPage = async(ctx) => {
//   let page = ctx.query.page ? ctx.query.page : 1;
//   let num = ctx.query.num ? ctx.query.num : 10;
//   let startIndex = (page - 1) * num >= 0 ? (page - 1) * num : 0;
//   let filter = ctx.params.text;;
//   let books = await query(`select * from moa_lib_books where id in (select id from moa_lib_books 
//     where (title like '%${filter}%' or isbn13 like '%${filter}%')) limit ${startIndex},${num};`);
//   ctx.body = {
//     result: books
//   };
// };

// export let addBook = async(ctx) => {
//   let book = ctx.request.body;
//   let result = await bookLibrary.create(book);
//   ctx.body = {
//     result: result
//   };
// };

// export let updateBook = async(ctx) => {
//   let book = ctx.request.body;
//   let result = await bookLibrary.update(book, {
//     where: {
//       id: book.id
//     }
//   });
//   ctx.body = {
//     result: result
//   };
// };

// export let deleteBook = async(ctx) => {
//   let id = ctx.params.id;
//   let result = await bookLibrary.destroy({
//     where: {
//       id: id
//     }
//   });
//   ctx.body = {
//     result: result
//   };
// };

// export let getBookFromDouBan = async(ctx) => {
//   let isbn = ctx.params.isbn;
//   try {
//     let result = await request.get('https://api.douban.com/v2/book/isbn/' + isbn);
//     ctx.body = {
//       result: JSON.parse(result)
//     };
//   } catch (e) {
//     ctx.body = {
//       result: null
//     };
//   }

// }