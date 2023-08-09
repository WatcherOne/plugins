import https from 'https'
import fs from 'fs/promises'
import cheerio from 'cheerio'

process.stdin.setEncoding('utf-8')

const welcomeline = '**************************************\n'
const welcomeText = '服务启动成功\n'
console.log(`${welcomeline}${welcomeText}${welcomeline}`)

function readlineSync () {
    return new Promise(resolve => {
        process.stdin.resume()
        process.stdout.write('请输入需要查询的网址：')
        process.stdin.on('data', (data) => {
            // process.stdin.pause()
            resolve(data)
        })
    })
}

async function start () {
    const result = await readlineSync()
    console.log(result)
    start()
}

start()

// https.get('https://fanyi.baidu.com', res => {
//     let html = ''
//     res.on('data', chunk => {
//         // 得到 Buffer 数据流
//         // 通过字符串拼接可以得到 html 解构数据
//         // console.log(chunk + '')
//         html += chunk
//     })
//     res.on('end', () => {
//         handleHtml(html)
//     })
// })

// let $ = null
// let RST = ''

// function handleHtml (html) {
//     $ = cheerio.load(html)
//     $('html').each(function () {
//         getContent($(this))
//     })
//     writeHtml()
// }

// function getContent (node) {
//     const a = node.contents()
//     if (a.length === 0) {
//         if (node.is('br')) {
//             RST += 'n'
//         } else {
//             RST += node.text().trim()
//         }
//     } else {
//         node.contents().each(function () {
//             getContent($(this))
//         })
//         if (node.is('p') || node.is('tr')) {
//             RST += 'n'
//         }
//     }
// }

// async function writeHtml () {
//     const err = await fs.writeFile('./output.json', JSON.stringify(RST))
//     if (err) {
//         console.error('解析错误')
//     } else {
//         console.log('请查看 output.json 文件')
//     }
// }
