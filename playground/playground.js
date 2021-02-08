
import PlayerHitBox from '../js/PlayerHitBox.js'

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

let lastRender

const isCollided = (musicBlockArray, playerHitBoxArray) => {

    // Collide Check 1
    musicBlockArray.forEach((musicBlock) => {

        playerHitBoxArray.forEach((playerHitBox) => {

             musicBlock.forEach((element) => {
                 if(element.y > playerHitBox.y - playerHitBox.height
                     && element.x === playerHitBox.x
                     && element.y < playerHitBox.y)
                     // && musicBlock[0].x < playerHitBoxArray[0].x + playerHitBoxArray[0].width)
                 {
                     console.log(`${element} is collided with ${playerHitBox}`)
                 }
             })

        })
        // if(musicBlock[0].y > playerHitBoxArray[0].y - playerHitBoxArray[0].height
        //     && musicBlock[0].x === playerHitBoxArray[0].x
        //     && musicBlock[0].y < playerHitBoxArray[0].y)
        //     // && musicBlock[0].x < playerHitBoxArray[0].x + playerHitBoxArray[0].width)
        // {
        //     console.log('is collided')
        // }
        //
        // if(musicBlock[0].y > playerHitBoxArray[1].y - playerHitBoxArray[1].height
        //     && musicBlock[0].x === playerHitBoxArray[1].x
        //     && musicBlock[0].y < playerHitBoxArray[1].y)
        //     // && musicBlock[0].x < playerHitBoxArray[1].x + playerHitBoxArray[1].width)
        // {
        //     console.log('is collided 2')
        // }
        //
        // if(musicBlock[0].y > playerHitBoxArray[2].y - playerHitBoxArray[2].height
        //     && musicBlock[0].x === playerHitBoxArray[2].x
        //     && musicBlock[0].y < playerHitBoxArray[2].y)
        //     // && musicBlock[0].x < playerHitBoxArray[1].x + playerHitBoxArray[1].width)
        // {
        //     console.log('is collided 3')
        // }
    })

}
class MusicBlock {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'red'

        this.speed = 3;

        this.dy = 3;

    }

    draw() {
        ctx.clearRect(this.x,this.y - this.dy,this.width,this.height)
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.fill()
    }
}


const createKeys = (numOfKeys, startingX, startingY, width,height) =>
    Array(numOfKeys).fill(0).map((element, index) =>
        new PlayerHitBox(startingX + width * index, startingY, width, height))


let playerHitBoxArray = createKeys(7,200,500,keyWidth,keyHeight)

const songMap = [
    [1],
    // [],
    // [],
    // [],
    [2],
    [3],
    [7],
    // [1,3,5],
    [2,4]

]

let musicBlockArray = songMap.map((line,i) => {
    let resultArray = []

    if(line.length > 0) {
        line.forEach((position) => {
            resultArray.push(new MusicBlock((position + 1) * keyWidth, 0, keyWidth, keyHeight))
        })
    } else {
        resultArray.push()
    }

    return resultArray
})

const generateMusicBlock = (interval) => {
    for (let i = 0; i < musicBlockArray.length; i++) {
        setTimeout(() => {
            if(musicBlockArray[i].length > 0) {
                for (let j = 0; j < musicBlockArray[i].length ; j++) {
                    musicBlockArray[i][j].draw()
                    musicBlockArray[i][j].y += musicBlockArray[i][j].dy
                }
            }
        },i*interval)
    }

}

const update = () => {

    lastRender = Date.now()
    generateMusicBlock(1000)

    isCollided(musicBlockArray,playerHitBoxArray)
    requestAnimationFrame(update)
}

let controlKeyArray = ['a','s','d', ' ' , 'j', 'k','l']

addEventListener('keydown',(e) => {

    for (let i = 0 ; i < controlKeyArray.length; i++) {
        if(e.key == controlKeyArray[i]) {
            playerHitBoxArray[i].draw()
        }
    }
})

addEventListener('keyup',(e) => {
    controlKeyArray.forEach((key, index) => {
        if(e.key == key) {
            playerHitBoxArray[index].remove()
        }
    })
})

update()

console.log(Date.now())