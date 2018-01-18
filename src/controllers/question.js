import sequelize from '../lib/sequelize';
import Sequelize from 'sequelize';
import request from 'request-promise-native';

const question = sequelize.define('moa_exam_questions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  examId: {
    type: Sequelize.INTEGER,
  },
  num: {
    type: Sequelize.INTEGER,
  },
  score: {
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.INTEGER,
  },
  optionA: {
    type: Sequelize.INTEGER,
  },
  optionB: {
    type: Sequelize.STRING,
  },
  optionC: {
    type: Sequelize.INTEGER,
  },
  optionD: {
    type: Sequelize.STRING,
  },
  optionE: {
    type: Sequelize.INTEGER,
  },
  rightAnswer: {
    type: Sequelize.STRING,
  }
}, {
  freezeTableName: true,
  timestamps: true
})

let query = (sql) => {
  return sequelize.query(sql, {
    model: question
  });
};

// export let getAllExams = async(ctx) => {
//   let exams = await query(`select * from moa_exams`);
//   ctx.body = {
//     result: exams
//   };

// };

export let getQuestionByExamId = async(ctx) => {
  let examId = ctx.params.examId;
  let exam = await query(`select * from moa_exam_questions where examId =${examId} order by num asc`);
  ctx.body = {
    result: exam
  };
};