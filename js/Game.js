import MusicBlock from "./MusicBlock.js";
import PlayerHitBox from "./PlayerHitBox.js";

let scoreHolder = document.querySelector('#score')
let streaksHolder = document.querySelector('#streaks')

let endScoreHolder = document.querySelector('#end-score')
let endStreaksHolder = document.querySelector('#end-streaks')

const gameScreen = document.querySelector('#game-screen')
const endScreen = document.querySelector('#end-screen')

const keyWidth = 100
const keyHeight = 30


export default class Game {
    constructor(song) {
        this.score = 0
        this.streaks = 0
        this.longestStreaks = 0
        this.song = song
        this.controlKeyArray = ['a','s','d', ' ' , 'j', 'k','l']
        this.playerHitBoxArray = this.createKeys(7,100,670,keyWidth,keyHeight)
        this.selectedSong = new Audio(this.song.audio)
        this.subBeat = song.subBeat
        this.blockInterval = (1 / ( this.song.bpm / 60 ) * 1000 / this.subBeat ).toFixed(2)
        this.speed = 5

        this.musicBlockArray = song.songMap.map((line,i) => {
            let resultArray = []

            if(line.indexOf(0) === -1) {
                line.forEach((position,index) => {

                        resultArray.push(new MusicBlock(position * keyWidth, 0, keyWidth, keyHeight,this.speed))
                    }
                )
            }   else {
                resultArray.push()
            }
            return resultArray
        })

        // this.musicBlockArray = song.songMap.map((line,i) => {
        //     let resultArray = []
        //
        //     if(line.indexOf(1) >= 0) {
        //         line.forEach((position,index) => {
        //
        //             if(position == 1) {
        //                 resultArray.push(new MusicBlock((index + 1) * keyWidth, 0, keyWidth, keyHeight,this.speed))
        //             }
        //         })
        //     }
        //     return resultArray
        // })

        this.selectedSong.play()

        this.selectedSong.addEventListener('ended', (e) => {
            console.log('Song ended')
            this.stop()

        })
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
        endScoreHolder.textContent = `Final Score: ${this.score}`
        endStreaksHolder.textContent = `Longest streak: ${this.longestStreaks}`
        gameScreen.style.display = 'none'
        endScreen.style.display = 'block'
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

                        if (this.streaks > this.longestStreaks) {
                            this.longestStreaks = this.streaks
                        }

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