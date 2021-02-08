import PlayerHitBox from './PlayerHitBox.js'
import MusicBlock from './MusicBlock.js'
import songMap from './songMap.js'
import gameAudio from './gameAudio.js'

const canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight

const keyWidth = 100
const keyHeight = 50

const ctx = canvas.getContext('2d')

let scoreHolder = document.querySelector('#score')
let streaksHolder = document.querySelector('#streaks')
let score = 0
let streaks = 0

class Game {

}
let lastRender


scoreHolder.textContent = `Score: ${score}`
streaksHolder.textContent = `Streaks: ${streaks}`

const isCollided = (musicBlockArray, playerHitBoxArray) => {
    musicBlockArray.forEach((musicBlock) => {
        playerHitBoxArray.forEach((playerHitBox,i) => {
            musicBlock.forEach((element,j) => {
                if(element.y > playerHitBox.y - playerHitBox.height
                    && element.x === playerHitBox.x
                    && playerHitBox.isActive
                    && !element.isHit)
                {
                    element.remove()


                    score += 10

                    streaks += 1

                    scoreHolder.textContent = `Score: ${score}`
                    streaksHolder.textContent = `Streaks: ${streaks}`

                    element.isHit = true
                }

            })
        })
    })
}

const isMissed = (musicBlockArray, playerHitBoxArray) => {
    musicBlockArray.forEach((musicBlock) => {
        playerHitBoxArray.forEach((playerHitBox) => {
            musicBlock.forEach((element) => {

                if (element.y > playerHitBox.y + playerHitBox.height
                    && element.x === playerHitBox.x
                    && !element.isHit
                    && !element.isMissed)
                {
                    element.isMissed = true
                    element.color = 'purple'
                    streaks = 0
                    streaksHolder.textContent = `Streaks: ${streaks}`
                }

            })
        })
    })
}



const createKeys = (numOfKeys, startingX, startingY, width,height) =>
    Array(numOfKeys).fill(0).map((element, index) =>
        new PlayerHitBox(startingX + width * index, startingY, width, height))

let playerHitBoxArray = createKeys(7,200,500,keyWidth,keyHeight)

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
                    if(!musicBlockArray[i][j].isHit) {
                        musicBlockArray[i][j].draw()
                        musicBlockArray[i][j].y += musicBlockArray[i][j].dy
                    }
                }
            }
        },i * interval)
    }
}



let controlKeyArray = ['a','s','d', ' ' , 'j', 'k','l']

let song1 = new Audio(gameAudio.song1)

addEventListener('keypress',(e) => {
    e.preventDefault()
    for (let i = 0 ; i < controlKeyArray.length; i++) {
        if(e.key == controlKeyArray[i]) {

            playerHitBoxArray[i].color = 'blue'
            playerHitBoxArray[i].isActive = true
            isCollided(musicBlockArray,playerHitBoxArray)
        }
    }

    if(e.key == '6') {


        song1.play()
    }

    if(e.key == '7') {
        song1.pause()
    }
})

addEventListener('keyup',(e) => {
    controlKeyArray.forEach((key, index) => {
        if(e.key == key) {
            playerHitBoxArray[index].color = 'green'
            playerHitBoxArray[index].isActive = false
        }
    })
})

const render = () => {

    lastRender = Date.now()
    generateMusicBlock(1000)
    isMissed(musicBlockArray,playerHitBoxArray)
    requestAnimationFrame(render)

    for (let i = 0 ; i < controlKeyArray.length; i++) {
        playerHitBoxArray[i].draw()
    }
}



render()

console.log(Date.now())