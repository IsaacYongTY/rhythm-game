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
const startingY = 670


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
        this.blockInterval = (1 / ( this.song.bpm / 60 ) * 1000 / this.subBeat )
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


            for (const index of self.controlKeyArray.keys()) {
                self.playerHitBoxArray[index].draw()
            }

            requestAnimationFrame(frame)
        }


        if(!self.isEnd) {
            requestAnimationFrame(frame)
        } else {
            cancelAnimationFrame(frame)
        }

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

            this.musicBlockArray.forEach((musicBlock,index) => {
                setTimeout(() => {
                    if (musicBlock.length > 0 && !this.isEnd) {
                        musicBlock.forEach((element)=> {
                            if (!element.isHit && !element.isMissed) {
                                element.draw()
                                element.y += element.dy
                            }
                        })
                    }
                }, index * interval)
            })
        }
    }

    isMissed(musicBlockArray, playerHitBoxArray) {

        musicBlockArray.forEach((musicBlock, index) => {

            if(musicBlock.length > 0 ) {
                musicBlock.forEach((element) => {
                    if(element.y - element.height > playerHitBoxArray[0].y && !element.isMissed ) {
                        element.isMissed = true
                        element.remove()

                        if (this.streaks > this.longestStreaks) {
                            this.longestStreaks = this.streaks
                        }

                        this.streaks = 0
                        streaksHolder.textContent = String(0)
                     }
                })
            }
        })
    }

    isCollided(musicBlockArray, playerHitBoxArray,position) {
        musicBlockArray.forEach((musicBlock) => {
            musicBlock.forEach((element,j) => {

            let playedKey = playerHitBoxArray[position]
                if(playedKey.isActive) {
                    if (element.y > playedKey.y - playedKey.height
                        && element.x === playedKey.x

                        && !element.isHit) {
                        element.remove()

                        this.score += 20
                        this.streaks += 1

                        scoreHolder.textContent = `${this.score}`
                        streaksHolder.textContent = `${this.streaks}`

                        element.isHit = true
                    }
                }
            })
        })
    }

    getGrade(score) {
        let grade
        let gradeColor = 'white'

        if(score > 3000) {
            grade = 'A'
            gradeColor = '#FFD700'
        } else if (score > 2000){
            grade = 'B'
        } else if (score > 100) {
            grade = 'C'
        } else {
            grade = 'F'
            gradeColor = '#8b0000'
        }

        return { grade, gradeColor }
    }

    stop() {
        ctx.clearRect(0,0, innerWidth, innerHeight)

        gameScreen.style.display = 'none'
        endScreen.style.display = 'flex'

        this.selectedSong.pause()
        this.isEnd = true

        scoreHolder.textContent = '0'
        streaksHolder.textContent = '0'

        endScreenArtistHolder.innerHTML = ''
        endScreenSongTitleHolder.innerHTML = ''
        gradeHolder.innerHTML = ''
        endScreenCoverArtHolder.style.backgroundImage = `url('${this.song.coverArt}')`

        endScreenSongTitleHolder.textContent = `${this.song.title}`
        endScreenArtistHolder.textContent = `${this.song.artist}`

        endScoreHolder.textContent = `${this.score}`
        endStreaksHolder.textContent = `${this.longestStreaks}`

        let grade = this.getGrade(this.score).grade
        let gradeColor = this.getGrade(this.score).gradeColor

        let gradeText = document.createTextNode(grade)
        gradeHolder.appendChild(gradeText)
        gradeHolder.style.color = gradeColor

    }
}