const request = require('request')

const maxIndex = 2
// const maxIndex = 1330
let getCount

function main() {
  let current = 1
  while(current <= maxIndex) {
    getData(current)
    current++
  }
}


function getData (index) {
  request.get(getUrl(index), function (err, res) {
    if (err) {
      console.error(`第${index}条数据抓取失败`)
    }
    console.log(res.body)
  })
}



function getUrl(index) {
  const r = Math.random()
  return `http://mnks.jxedt.com/get_question?r=${r}&index=${index}`
}

main()