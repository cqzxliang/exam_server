import sequelize from '../lib/sequelize';
import Sequelize from 'sequelize';
import request from 'request-promise-native';

const answer = sequelize.define('moa_exam_answers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  examId: {
    type: Sequelize.INTEGER,
  },
  questionId: {
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  seq: {
    type: Sequelize.INTEGER,
  },
  answer: {
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: true,
  timestamps: true
})

let query = (sql) => {
  return sequelize.query(sql, {
    model: answer
  });
};

export let addAnswer = async(ctx) => {
  let obj = ctx.request.body;
  for (let i = 0; i < obj.questionIds.length; i++) {
    let an = {
      examId: obj.examId,
      questionId: obj.questionIds[i],
      userId: obj.userId,
      seq: obj.seq,
      answer: obj.answers[i],
    }
    await answer.create(an);
  }
  ctx.body = {
    result: 'OK'
  };
};

export let getSeq = async(ctx) => {
  let userId = ctx.params.userId;
  let result = await query(`select max(seq) seq from moa_exam_answers where userId=${userId};`);
  ctx.body = {
    result: result[0].seq
  };
};