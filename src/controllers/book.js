import sequelize from '../lib/sequelize';
import Sequelize from 'sequelize';
import request from 'request-promise-native';

const bookLibrary = sequelize.define('moa_lib_books', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  author: {
    type: Sequelize.TEXT,
  },
  author_info: {
    type: Sequelize.STRING,
  },
  binding: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
  isbn13: {
    type: Sequelize.STRING,
  },
  pages: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.STRING,
  },
  pubdate: {
    type: Sequelize.STRING,
  },
  publisher: {
    type: Sequelize.STRING,
  },
  subtitle: {
    type: Sequelize.STRING,
  },
  summary: {
    type: Sequelize.TEXT,
  },
  title: {
    type: Sequelize.STRING,
  },
  company_id: {
    type: Sequelize.STRING,
  },
  enabled: {
    type: Sequelize.STRING,
  },
  catalog: {
    type: Sequelize.STRING,
  },
  qty: {
    type: Sequelize.INTEGER,
  }
}, {
  freezeTableName: true,
  timestamps: false
})

let query = (sql) => {
  return sequelize.query(sql, {
    model: bookLibrary
  });
};

export let getAllBooks = async(ctx) => {
  let books = await query(`select * from moa_lib_books`);
  ctx.body = {
    result: books
  };
};

export let getBookById = async(ctx) => {
  let id = ctx.params.id;
  let book = await query(`select * from moa_lib_books where id =${id}`);
  ctx.body = {
    result: book[0]
  };
};

// 模糊查询
export let getBooksByTitltOrISBN = async(ctx) => {
  let txt = ctx.params.text;
  let books = await query(`select * from moa_lib_books where (title like '%${txt}%' or isbn13 like '%${txt}%')`);
  ctx.body = {
    result: books
  };
};

// 分页查询
export let queryBooksByPage = async(ctx) => {
  let page = (ctx.query.page ? ctx.query.page : 1) >= 0 ? (ctx.query.page ? ctx.query.page : 1) : 1;
  let num = (ctx.query.num ? ctx.query.num : 1) >= 0 ? (ctx.query.num ? ctx.query.num : 1) : 1;
  let startIndex = (page - 1) * num >= 0 ? (page - 1) * num : 0;
  let filter = ctx.params.text;;
  let books = await query(`select * from moa_lib_books where id in (select id from moa_lib_books 
    where (title like '%${filter}%' or isbn13 like '%${filter}%')) limit ${startIndex},${num};`);
  ctx.body = {
    result: books
  };
};

export let addBook = async(ctx) => {
  let book = ctx.request.body;
  let result = await bookLibrary.create(book);
  ctx.body = {
    result: result
  };
};

export let updateBook = async(ctx) => {
  let id = ctx.params.id;
  let book = ctx.request.body;
  let result = await bookLibrary.update(book, {
    where: {
      id: id
    }
  });
  ctx.body = {
    result: result
  };
};

export let deleteBook = async(ctx) => {
  let id = ctx.params.id;
  let result = await bookLibrary.destroy({
    where: {
      id: id
    }
  });
  ctx.body = {
    result: result
  };
};

export let getBookFromDouBan = async(ctx) => {
  let isbn = ctx.params.isbn;
  let result = await request.get('https://api.douban.com/v2/book/isbn/' + isbn);
  // console.log(result);
  ctx.body = {
    result: JSON.parse(result)
  };
}