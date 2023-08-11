// 人机对赌
// 比点数大小，比剪刀石头布，随机事件产生？，选择做什么的随机
// readline：逐行读取
// clear：清除控制台
// chalk：终端样式库，粉笔

import readline from 'readline'
import chalk from 'chalk'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const gameList = [
    { id: 1, title: '剪刀石头布' },
    { id: 2, title: '比点数' }
]
const showGameList = gameList.map((item, index) => `${index + 1}. ${chalk.underline.italic(item.title)}`).join('\n')

const gapStr = `=========================================================================`
const gapLine = chalk.rgb(64, 181, 99)(gapStr)
const title = chalk.bold.bgCyan('小游戏列表')
const description = `${title}\n${showGameList}`
console.log(gapLine)
console.log(description)
console.log(gapLine)

// rl.setPrompt('')
// rl.prompt()
const selectGame = () => {
    rl.question('> 请选择游戏（序号）：', (answer) => {
        // 选择不同展示不同的详细
        switch (answer.trim()) {
            case '1': gameStone(); break;
            default: findNotCommand(); break;
        }
    })
}

const findNotCommand = () => {
    console.log('请输入正确的游戏序号')
    selectGame()
}

const gameStone = () => {
    console.log('剪刀石头布的游戏哦')
}

selectGame()

// rl.on('line', line => {
//     // 选择不同展示不同的详细
//     console.log(line)
// })
