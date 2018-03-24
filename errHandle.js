const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/jiazhaokaoshi')

const questionErrSechema = mongoose.Schema({
  errId: Number,
  msg: String,
  body: String
})
const Errk1 = mongoose.model('QuestionNotGetk1', questionErrSechema)


function main() {
  const questions = Errk1.find(function (err, res) {
    res.forEach(item => {
      try {
        const str = decodeURIComponent(item.body)
        console.log(str)
        const questionItem = JSON.parse(str)
        // questionItem.type = questionItem.Type
        // saveData(questionItem)
      } catch (error) {
        console.log(error)
      }
    })
  })
}


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

const Question = mongoose.model('Questionk1', questionSechema)

function saveData(data) {
  const question = new Question(data)
  question.save(function (err) {
    if (err) {
      console.log(`第${data.id}条数据保存失败`)
      saveErr(data.id, '保存失败')
    }
    getCount++
    console.log(`第${data.id}条数据保存成功,已抓取${getCount}条数据`)
  })
}

main()