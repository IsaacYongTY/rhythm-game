import MusicBlock from "./MusicBlock.js";
import PlayerHitBox from "./PlayerHitBox.js";
import gameAudio from './gameAudio.js';

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')


let scoreHolder = document.querySelector('.game-screen__game-grids__score-holder__score')
let streaksHolder = document.querySelector('.game-screen__game-grids__streaks-holder__streaks')

let endScoreHolder = document.querySelector('.end-screen__result-grids__end-score-grid__end-score')
let endStreaksHolder = document.querySelector('.end-screen__result-grids__end-streaks-grid__end-streaks')
let gradeHolder =  document.querySelector('.end-screen__result-grids__grade')

const gameScreen = document.querySelector('.game-screen')
const endScreen = document.querySelector('.end-screen')

let endScreenCoverArtHolder = document.querySelector('.end-screen__result-grids__cover-art-grid__cover-art')
let endScreenSongTitleHolder = document.querySelector('.end-screen__result-grids__cover-art-grid__song-title')
let endScreenArtistHolder = document.querySelector('.end-screen__result-grids__cover-art-grid__artist')


const keyWidth = 100
const keyHeight = 30
const numOfKeys = 7
const startingX = (1100 - numOfKeys * keyWidth) / 2
const startingY = 690


export default class Game {
    constructor(song) {
        this.score = 0
        this.streaks = 0
        this.longestStreaks = 0
        this.song = song
        this.controlKeyArray = ['s','d','f', ' ' , 'j', 'k','l']
        this.playerHitBoxArray = this.createKeys(numOfKeys,startingX ,startingY,keyWidth,keyHeight)
        this.selectedSong = new Audio(this.song.audio)
        this.subBeat = song.subBeat
        this.blockInterval = (1 / ( this.song.bpm / 60 ) * 1000 / this.subBeat ).toFixed(2)
        this.speed = 5
        this.isEnd = false

        this.musicBlockArray = this.createMusicBlockArray(song)

        this.selectedSong.play()

        this.selectedSong.addEventListener('ended', (e) => {
            console.log('Song ended')
            let endingApplause = new Audio(gameAudio.endingApplause)
            endingApplause.play()
            this.stop()
        })


    }

    render() {

        let self = this
        function frame() {

            self.generateMusicBlock(self.blockInterval)

            self.isMissed(self.musicBlockArray, self.playerHitBoxArray)

            for (let i = 0; i < self.controlKeyArray.length; i++) {
                self.playerHitBoxArray[i].draw()
            }

            requestAnimationFrame(frame)
        }


        if(!self.isEnd) {
            requestAnimationFrame(frame)
        } else {
            cancelAnimationFrame(frame)
        }

    }

    stop() {
        ctx.clearRect(0,0, innerWidth, innerHeight)

        gameScreen.style.display = 'none'
        endScreen.style.display = 'flex'

        let grade = ''

        this.selectedSong.pause()
        this.isEnd = true

        scoreHolder.textContent = `${this.score}`
        streaksHolder.textContent = `${this.longestStreaks}`

        endScreenArtistHolder.innerHTML = ''
        endScreenSongTitleHolder.innerHTML = ''
        gradeHolder.innerHTML = ''
        endScreenCoverArtHolder.style.backgroundImage = `url('${this.song.coverArt}')`

        endScreenSongTitleHolder.textContent = `${this.song.title}`
        endScreenArtistHolder.textContent = `${this.song.artist}`

        endScoreHolder.textContent = `${this.score}`
        endStreaksHolder.textContent = `${this.longestStreaks}`

        if(this.score > 1500) {
            grade = 'A'
        } else if (this.score > 1000){
            grade = 'B'
        } else if (this.score > 500) {
            grade = 'C'
        } else {
            grade = 'F'
        }

        let gradeText = document.createTextNode(grade)
        gradeHolder.appendChild(gradeText)

    }

    createKeys(numOfKeys, startingX, startingY, width,height) {
        return Array(numOfKeys).fill(0).map((element, index) =>
            new PlayerHitBox(startingX + width * index, startingY, width, height,index))
    }

    createMusicBlockArray(song) {
        return song.songMap.map((line,i) => {
            let resultArray = []

            if(line.indexOf(0) === -1) {
                line.forEach((position,index) => {
                        resultArray.push(new MusicBlock(startingX + (position - 1)* keyWidth, 0, keyWidth, keyHeight,this.speed))
                    }
                )
            }   else {
                resultArray.push()
            }
            return resultArray
        })
    }

    generateMusicBlock(interval) {

        if(!this.isEnd) {


            for (let i = 0; i < this.musicBlockArray.length; i++) {
                setTimeout(() => {
                    if (this.musicBlockArray[i].length > 0 && !this.isEnd) {
                        for (let j = 0; j < this.musicBlockArray[i].length; j++) {
                            if (!this.musicBlockArray[i][j].isHit && !this.musicBlockArray[i][j].isMissed) {
                                this.musicBlockArray[i][j].draw()
                                this.musicBlockArray[i][j].y += this.musicBlockArray[i][j].dy
                            }
                        }
                    }
                }, i * interval)
            }
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

                        if (this.streaks > this.longestStreaks) {
                            this.longestStreaks = this.streaks
                        }

                        this.streaks = 0
                        streaksHolder.textContent = String(0)
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

                        this.score += 20
                        this.streaks += 1

                        scoreHolder.textContent = `${this.score}`
                        streaksHolder.textContent = `${this.streaks}`

                        element.isHit = true
                    }

                })
            })
        })
    }
}