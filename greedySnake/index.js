window.onload = () => {
    // 某些格子有彩蛋：碰到了什么事故，遇到了什么奇遇！！！

    // [参考地址] - https://blog.csdn.net/weixin_40845165/article/details/123608142
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    const bgColor = 'white'
    const snakeHeadColor = '#cc4b4b'
    const snakeBodyColor = '#1a8dcc'
    const foodColor = 'yellow'

    const snakeArr = [null, null, null]  // 20 * 20 矩形，则 400块格子，队列表示 蛇整身数组范围【0 ~ 399】
    let food = 0                         // 食物的位置，范围【0 ~ 399】
    let direction = 1                    // 表示蛇运动方向，范围 { 1, -1, 20, -20 } 只要加上这个值就表示新蛇头的位置

    // 进入网页初始化
    function init () {
        // 初始化蛇的位置
        const snakeHeadPos = random(0, 400)
        snakeArr[0] = snakeHeadPos
        const { x, y } = getDrawPos(snakeHeadPos)
        const xDirection = x <= 200 ? 1 : -1
        const yDirection = y >= 200 ? -20 : 20
        direction = Math.random() * 10 > 5 ? xDirection : yDirection
        // 初始化随机食物位置 - (食物不能在蛇内部)
        while(snakeArr.indexOf((food = random(0, 400))) >= 0);
        draw(snakeHeadPos, snakeHeadColor)
        draw(food, foodColor)
    }

    // 产生可能出现的随机位置
    function random (min, max) {
        return Math.floor(Math.random() * (max - min)) + min
    }

    function getDrawPos (seat) {
        return {
            x: (seat % 20) * 20 + 1,
            y: Math.floor(seat / 20) * 20 + 1
        }
    }

    function draw (seat, color) {
        ctx.fillStyle = color
        // 绘制方块 x坐标、y坐标、长、宽
        const { x, y } = getDrawPos(seat)
        ctx.fillRect(x, y, 18, 18)
    }

    function runGame () {
        const newPos = snakeArr[0] + direction  // 新蛇头的位置
        snakeArr.unshift(newPos)             // 添加新蛇头到队列前
        // 判断蛇头是否超出边界
        // if (newPos < 0 || newPos > 399 || (direction === 1 && newPos % 20 === 0) || (direction === -1 && newPos % 20 === 19)) {
        //     console.log(newPos)
        //     gameOver()
        //     return
        // }
        draw(newPos, snakeHeadColor)         // 绘制新蛇头
        draw(snakeArr[1], snakeBodyColor)    // 绘制之前的蛇头为蛇身
        draw(snakeArr.pop(), bgColor)        // 去除蛇尾最后一个格子, 因为移动了，然后绘制成白色
    }

    function gameOver () {
        cancelAnimationFrame(runId)  // 暂停游戏
        // 显示结果
    }

    function CheckIsOverBound (pos) {

    }

    // 键盘绑定事件
    const keydownMap = {
        ArrowUp: -20,
        ArrowDown: 20,
        ArrowLeft: -1,
        ArrayRight: 1,
        w: -20,
        s: 20,
        a: -1,
        d: 1
    }
    document.onkeydown = (e) => {
        const key = e.key
        const newDirection = keydownMap[key] || direction
        // 若方向与原方向相同, 则方向不变
        direction = (snakeArr[1] - snakeArr[0] === newDirection) ? direction : newDirection
    }

    let runId = null
    let enable = true  // 限制绘制时间间隔
    function start () {
        if (enable) {
            enable = false
            requestAnimationFrame(runGame)
            setTimeout(() => enable = true, 400)
        }
        runId = requestAnimationFrame(start)
    }

    // cancelAnimationFrame(runId)

    init()
    start()
}
