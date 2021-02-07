
const canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight

const keyWidth = 100
const keyHeight = 50

const ctx = canvas.getContext('2d')

class Player {
    constructor() {
        this.x = 300;
        this.y = 300;
        this.color = "blue"
        this.dy = 0
        this.dx = 0
        this.velocity = 20
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        // ctx.arc(this.x, this.y, 30, 0, Math.PI * 2, false)
        ctx.fillRect(this.x,this.y,100,50)
        ctx.fill()
    }

    remove() {
        console.log(this.x)
        ctx.clearRect(this.x,this.y,100, 50)
    }

    moveUp() {
        ctx.clearRect(this.x,this.y,100, 50)
        this.y -= this.velocity

    }

    moveDown() {
        ctx.clearRect(this.x,this.y,100, 50)
        this.y += this.velocity
    }

    moveLeft() {
        ctx.clearRect(this.x,this.y,100, 50)
        this.x -= this.velocity
    }

    moveRight() {
        ctx.clearRect(this.x,this.y,100, 50)
        this.x += this.velocity
    }
}

class PlayerHitBox {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.color = "green"
        this.width = width
        this.height = height

    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        // ctx.arc(this.x, this.y, 30, 0, Math.PI * 2, false)
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.fill()
    }

    remove() {
        ctx.clearRect(this.x,this.y, this.width, this.height)
    }
}

class MusicBlock {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'red'
        this.dy = 3;

        // setTimeout(()=> {
        //
        // },3000)
    }

    draw() {
        ctx.clearRect(this.x,this.y - this.dy,this.width,this.height)
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.fill()
    }
}

let playerHitBoxArray = []



const createKeys = (numOfKeys, startingX, startingY, width,height) => {
    for(let i = 0; i < numOfKeys; i++) {
        playerHitBoxArray.push(new PlayerHitBox(startingX, startingY, width, height))

        startingX += width
    }
}


createKeys(7,200,500,keyWidth,keyHeight)

const songMap = [
    [1],
    [2],
    [3],
    [3],
    [1,3],
    [2,4],
    [1,3,5]
]

musicBlockArray = songMap.map((line,i) => {

    let resultArray = []

    line.forEach((position) => {
        resultArray.push(new MusicBlock((position + 1 )*keyWidth, 0,keyWidth, keyHeight))
    })

    return resultArray
})

const generateMusicBlock = (interval) => {


    for (let i = 0; i <musicBlockArray.length; i++) {
        setTimeout(() => {

            for (let j = 0; j < musicBlockArray[i].length ; j++) {
                musicBlockArray[i][j].draw()
                musicBlockArray[i][j].y += musicBlockArray[i][j].dy
            }
        },i*interval)
    }
    // musicBlockArray.forEach((block, index) => {
    //     setTimeout(() => {
    //
    //     block.forEach((element) => {
    //
    //         element.draw()
    //         element.y += element.dy
    //     })
    //
    //     },index*interval)
    // })
}

const update = () => {


    generateMusicBlock(500)

    addEventListener('keydown', (e) => {
        if(e.key == 'g') {

            musicBlockArray[1].draw()

        }
    })

    requestAnimationFrame(update)
}

let controlKeyArray = ['a','s','d', ' ' , 'j', 'k','l']

addEventListener('keydown',(e) => {

    for (let i = 0 ; i < controlKeyArray.length; i++) {
        if(e.key == controlKeyArray[i]) {
            playerHitBoxArray[i].draw()
        }
    }
    // controlKeyArray.forEach((key, index) => {
    //     if(e.key == key) {
    //         playerHitBoxArray[index].draw()
    //     }
    // })
})

addEventListener('keyup',(e) => {
    controlKeyArray.forEach((key, index) => {
        if(e.key == key) {
            playerHitBoxArray[index].remove()
        }
    })
})

update()