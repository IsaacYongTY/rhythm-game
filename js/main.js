import PlayerHitBox from './PlayerHitBox.js'
import MusicBlock from './MusicBlock.js'
import songMap from './songMap.js'
import gameAudio from './gameAudio.js'
import Selector from './Selector.js'
const canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight

const keyWidth = 100
const keyHeight = 50

let scoreHolder = document.querySelector('#score')
let streaksHolder = document.querySelector('#streaks')


class Game {
    constructor(song) {
        this.score = 0
        this.streaks = 0

        this.song = song
    }

    render() {
        generateMusicBlock(1000)
        isMissed(musicBlockArray,playerHitBoxArray)
        requestAnimationFrame(() => {
            this.render()
        })

        for (let i = 0 ; i < controlKeyArray.length; i++) {
            playerHitBoxArray[i].draw()
        }
    }
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
                    game.streaks = 0
                    streaksHolder.textContent = `Streaks: ${game.streaks}`
                }

            })
        })
    })
}

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


                    game.score += 10

                    game.streaks += 1

                    scoreHolder.textContent = `Score: ${game.score}`
                    streaksHolder.textContent = `Streaks: ${game.streaks}`

                    element.isHit = true
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


// Start Screen


let selector = new Selector()

addEventListener('keydown', (e) => {
    e.preventDefault()
    switch(e.key) {
        case 'ArrowLeft':
            selector.moveLeft()
            break
        case 'ArrowRight':
            selector.moveRight()
            break
        case 'Enter':
            selector.select()
    }
})

for(let i=0 ; i < 3; i++) {
    document.querySelector(`#song-${i+1}`).addEventListener('click', (e) => {
        console.log(`clicked song ${i+1}`)
    })
}


let game = new Game(song)
//
// scoreHolder.textContent = `Score: ${game.score}`
// streaksHolder.textContent = `Streaks: ${game.streaks}`
//
// game.render()
//
// console.log(Date.now())