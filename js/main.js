
import Selector from './Selector.js'

import songs from './songs.js'
import Game from './Game.js'

import gameAudio from './gameAudio.js'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth / 2
canvas.height = innerHeight


const introScreen = document.querySelector('#intro-screen')
const startScreen = document.querySelector('#start-screen')
const gameScreen = document.querySelector('#game-screen')
const endScreen = document.querySelector('#end-screen')
const playAgainButton = document.querySelector('#play-again-button')
const quitButton = document.querySelector('#quit-button')

let endScoreHolder = document.querySelector('#end-score')
let endStreaksHolder = document.querySelector('#end-streaks')

introScreen.style.display = 'block'
startScreen.style.display = 'none'
endScreen.style.display = 'none'
gameScreen.style.display = 'none'
// Start Screen

let introSong = new Audio(gameAudio.introSong)
let selector = new Selector()

addEventListener('keydown', (e) => {

    e.preventDefault()



        introSong.pause()
        switch(e.key) {
            case 'ArrowLeft':
                if(startScreen.style.display === 'block') {
                    selector.moveLeft()
                }
                break
            case 'ArrowRight':
                if(startScreen.style.display === 'block') {
                    selector.moveRight()
                }
                break
            case 'Enter':

                if(startScreen.style.display === 'block') {
                    selector.select()
                }

                if(introScreen.style.display === 'block') {
                    introSong.play()
                    startScreen.style.display = 'block'
                    introScreen.style.display = 'none'

                }
    }


})


for(let i=0 ; i < 3; i++) {
    document.querySelector(`#song-${i+1}`).addEventListener('click', (e) => {
        introSong.pause()
        console.log(`clicked song ${i+1}`)
        let game = new Game(songs[i])

        startScreen.style.display = 'none'
        gameScreen.style.display = 'block'


        addEventListener('keydown',(e) => {
            e.preventDefault()
            for (let i = 0 ; i < game.controlKeyArray.length; i++) {
                if(e.key == game.controlKeyArray[i]) {

                    game.playerHitBoxArray[i].color = 'blue'
                    game.playerHitBoxArray[i].isActive = true
                    game.isCollided(game.musicBlockArray,game.playerHitBoxArray)
                }
            }

        })

        addEventListener('keyup',(e) => {
            game.controlKeyArray.forEach((key, index) => {
                if(e.key == key) {
                    game.playerHitBoxArray[index].color = 'green'
                    game.playerHitBoxArray[index].isActive = false
                }
            })
        })

        playAgainButton.addEventListener('click', (e) => {
            endScreen.style.display = 'none'
            startScreen.style.display = 'block'
            introSong.currentTime = 0
            introSong.play()
        })

        quitButton.addEventListener('click', (e) => {
            game.stop()
            game.isEnd = true
            gameScreen.style.display = 'none'
            endScreen.style.display = 'block'
            endScoreHolder.textContent = `Final Score: ${game.score}`
            endStreaksHolder.textContent = `Longest streak: ${game.longestStreaks}`
        })



        game.render()

    })
}


