const request = require('request')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/jiazhaokaoshi')
const db = mongoose.connection

const questionSechema = mongoose.Schema({
  question: String, // 问题
  a: String,
  b: String,
  c: String,
  d: String,
  ta: String, // 正确答案index
  bestanswer: String,// 最佳答案的理由
  bestanswerid: Number,// 不清楚
  type: Number,
  id: Number,
  imageurl: String,
  sinaimg: String
})
const questionErrSechema = mongoose.Schema({
  errId: Number,
  msg: String,
  body: String
})

const Question = mongoose.model('Questionk1', questionSechema)
const Errk1 = mongoose.model('QuestionNotGetk1', questionErrSechema)

// const maxIndex = 2
const maxIndex = 1330
let getCount = 0

async function main() {
  let current = 1
  while(current <= maxIndex) {
    getData(current)
    current++
    await new Promise((res, rej) => {
      setTimeout(() => {
        res()
      }, 500);
    })
  }
}


function getData (index) {
  request.get(getUrl(index), function (err, res) {
    if (err) {
      console.error(`第${index}条数据抓取失败`)
      saveErr(index, '抓取失败')
    }
    try {
      const questionObject = JSON.parse(res.body)
      questionObject.type = questionObject.Type
      saveData(questionObject)
    } catch (error) {
      saveErr(index, '解析不正确', res.body)
      console.log(`第${index}条数据数据格式不正确`)
    }
  })
}


function getUrl(index) {
  const r = Math.random()
  return `http://mnks.jxedt.com/get_question?r=${r}&index=${index}`
}


function saveData(data) {
  const question = new Question(data)
  question.save(function (err) {
    if (err) {
      console.log(`第${data.id}条数据保存失败`)
      saveErr(data.id, '保存失败')
    }
    getCount++
    console.log(`第${data.id}条数据保存成功,已抓取${getCount}条数据`)
    if (getCount === maxIndex - 1) {
      db.close()
    }
  })
}


function saveErr({id}, msg, body) {
  const err = new Errk1({errId:id, msg, body})
  err.save()
}


main()