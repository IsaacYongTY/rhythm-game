
import Selector from './Selector.js'

import songs from './songs.js'
import Game from './Game.js'

import gameAudio from './gameAudio.js'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth / 2
canvas.height = innerHeight


const introScreen = document.querySelector('#intro-screen')
const startScreen = document.querySelector('.start-screen')
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
let confirmationSoundEffect = new Audio(gameAudio.confirmationSoundEffect)
let selector = new Selector()

let songCardsHolder = document.createElement('div')

songCardsHolder.setAttribute('class','start-screen__song-cards')
songCardsHolder.style.gridTemplateColumns = `repeat(${songs.length}, 1fr)`


songs.forEach((song, index) => {

    let coverArtHolder = document.createElement('div')
    coverArtHolder.setAttribute('class',`start-screen__song-cards__song-card__cover-art`)

    coverArtHolder.style.backgroundImage = `url(${song.coverArt}`

    let songTitleHolder = document.createElement('div')
    let songTitleP = document.createElement('p')
    songTitleHolder.setAttribute('class',`start-screen__song-cards__song-card__song-title`)

    let songTitleText = document.createTextNode(song.title)
    songTitleP.appendChild(songTitleText)
    songTitleHolder.appendChild(songTitleP)

    let artistHolder = document.createElement('div')
    artistHolder.setAttribute('class',`start-screen__song-cards__song-card__artist`)

    let artistText = document.createTextNode(song.artist)
    artistHolder.appendChild(artistText)

    let songCardHolder = document.createElement('div')
    songCardHolder.setAttribute('class',`start-screen__song-cards__song-card`)
    songCardHolder.setAttribute('id','1')

    songCardHolder.appendChild(coverArtHolder)
    songCardHolder.appendChild(songTitleHolder)
    songCardHolder.appendChild(artistHolder)

    songCardsHolder.appendChild(songCardHolder)

})

startScreen.appendChild(songCardsHolder)

addEventListener('keydown', (e) => {

    e.preventDefault()

        introSong.pause()

        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                if(startScreen.style.display === 'flex') {
                    selector.move(e.key)
                }
                break

            case 'Enter':

                if(startScreen.style.display === 'flex') {
                    selector.select()
                }

                if(introScreen.style.display === 'block') {
                    confirmationSoundEffect.currentTime = 0
                    confirmationSoundEffect.play()

                    introSong.play()

                    startScreen.style.display = 'flex'
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
                    let position = index + 1
                    let color
                    switch(position) {
                        case 1:
                        case 7:
                            color = '#95FF95'
                            break
                        case 2:
                        case 6:
                            color = '#FFFF77'
                            break
                        case 3:
                        case 5:
                            color = '#6B6BFB'
                            break
                        default:
                            color = '#F57272'
                    }

                    game.playerHitBoxArray[index].color = color
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


