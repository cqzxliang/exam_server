import sequelize from '../lib/sequelize';
import Sequelize from 'sequelize';

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