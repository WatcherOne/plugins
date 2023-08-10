const $button = document.getElementById('button')
const $result = document.getElementById('result')
const $canvas = document.getElementById('canvas')
const { width: canvasW, height: canvasH } = $canvas.getBoundingClientRect()
const ctx = $canvas.getContext('2d')

document.addEventListener('selectstart', (e) => {
    // 鼠标拖拽不会选中文字
    e.preventDefault()
})

// 中奖单，p为中奖率
const reward = [
    { id: 0, title: '特等奖', content: '一个大嘴巴子', p: 10 },
    { id: 1, title: '一等奖', content: '二个大嘴巴子', p: 20 },
    { id: 2, title: '二等奖', content: '三个大嘴巴子', p: 30 }
]
let currentReward = 0

function init () {
    const text = '特等奖'
    $result.innerText = text
    ctx.fillStyle = 'silver'
    ctx.fillRect(0, 0, canvasW, canvasH)
}

let isDraw = false
// 鼠标按下
$canvas.ontouchstart = () => {
    isDraw = true
}

// 拖动
$canvas.ontouchmove = (event) => {
    // 按下并只有一根手指才可以刮动
    if (isDraw && event.targetTouches.length === 1) {
        event.preventDefault()
        const touch = event.targetTouches[0]
        ctx.beginPath()
        // 设置新画上的元素, 叠加, 重合消除的功能
        ctx.globalCompositeOperation = 'destination-out'
        ctx.arc(touch.pageX - $canvas.offsetLeft - 48, touch.pageY - $canvas.offsetTop - 30, 10, 0, 7, false)
        ctx.fill()
        ctx.closePath()
    }
}

// 鼠标松开
$canvas.ontouchend = () => {
    isDraw = false
}

$button.addEventListener('click', () => {
    const $mask = document.getElementById('mask')
    $mask.classList.add('hidden')
})

window.onload = () => {
    init()
}
