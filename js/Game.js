import MusicBlock from "./MusicBlock.js";
import PlayerHitBox from "./PlayerHitBox.js";

let scoreHolder = document.querySelector('#score')
let streaksHolder = document.querySelector('#streaks')

const keyWidth = 100
const keyHeight = 30

export default class Game {
    constructor(song) {
        this.score = 0
        this.streaks = 0
        this.song = song
        this.controlKeyArray = ['a','s','d', ' ' , 'j', 'k','l']
        this.playerHitBoxArray = this.createKeys(7,200,500,keyWidth,keyHeight)
        this.selectedSong = new Audio(this.song.audio)
        this.blockInterval = 1 / ( this.song.bpm / 60 ) * 1000 / 4

        this.musicBlockArray = song.songMap.map((line,i) => {
            let resultArray = []

            if(line.indexOf(0) > 0) {
                line.forEach((position,index) => {
                    if(position == 1) {
                        resultArray.push(new MusicBlock((index + 2) * keyWidth, 0, keyWidth, keyHeight))
                    }
                })
            }

            return resultArray
        })

        this.selectedSong.play()
    }

    render() {
        this.generateMusicBlock(this.blockInterval)
        this.isMissed(this.musicBlockArray,this.playerHitBoxArray)
        requestAnimationFrame(() => {
            this.render()
        })

        for (let i = 0 ; i < this.controlKeyArray.length; i++) {
            this.playerHitBoxArray[i].draw()
        }
    }

    stop() {
        this.selectedSong.pause()
    }

    createKeys(numOfKeys, startingX, startingY, width,height) {
        return Array(numOfKeys).fill(0).map((element, index) =>
            new PlayerHitBox(startingX + width * index, startingY, width, height))
    }

// [1]
    //[1,0,0,0,0,0,0]
    generateMusicBlock(interval) {
        for (let i = 0; i < this.musicBlockArray.length; i++) {
            setTimeout(() => {
                if(this.musicBlockArray[i].length > 0) {
                    for (let j = 0; j < this.musicBlockArray[i].length ; j++) {
                        if(!this.musicBlockArray[i][j].isHit && !this.musicBlockArray[i][j].isMissed) {
                            this.musicBlockArray[i][j].draw()
                            this.musicBlockArray[i][j].y += this.musicBlockArray[i][j].dy
                        }
                    }
                }
            },i * interval)
        }
    }

    isMissed(musicBlockArray, playerHitBoxArray) {
        musicBlockArray.forEach((musicBlock) => {
            playerHitBoxArray.forEach((playerHitBox) => {
                musicBlock.forEach((element) => {

                    if (element.y > playerHitBox.y + playerHitBox.height
                        && element.x === playerHitBox.x
                        && !element.isMissed)
                    {
                        element.isMissed = true
                        element.remove()
                        // element.color = 'purple'
                        this.streaks = 0
                        streaksHolder.textContent = `Streaks: ${this.streaks}`
                    }

                })
            })
        })
    }

    isCollided(musicBlockArray, playerHitBoxArray) {
        musicBlockArray.forEach((musicBlock) => {
            playerHitBoxArray.forEach((playerHitBox,i) => {
                musicBlock.forEach((element,j) => {
                    if(element.y > playerHitBox.y - playerHitBox.height
                        && element.x === playerHitBox.x
                        && playerHitBox.isActive
                        && !element.isHit)
                    {
                        element.remove()

                        this.score += 10
                        this.streaks += 1

                        scoreHolder.textContent = `Score: ${this.score}`
                        streaksHolder.textContent = `Streaks: ${this.streaks}`

                        element.isHit = true
                    }

                })
            })
        })
    }
}