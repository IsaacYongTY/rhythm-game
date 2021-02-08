class Player {
    constructor() {
        this.speedX = 1
        this.speedY = 1

        this.playerInitialPosition = 4
        this.playerPosition = this.playerInitialPosition

        let playerDOMHolder = document.createElement('div')
        playerDOMHolder.setAttribute('id','player')
        this.DOM = playerDOMHolder

    }

    moveLeft = function(e) {

        if(e.key === 'ArrowLeft') {

            if(this.playerPosition !== 1) {
                this.DOM.remove()
                this.playerPosition--
                document.querySelector(`.player-${this.playerPosition}`).appendChild(this.DOM)
                moveSoundEffect.currentTime = 0
                moveSoundEffect.play()


            }   else {
                console.log("You've hit the left wall")
            }

        }
    }

    moveRight = function(e) {
        if(this.playerPosition !== 7) {
            console.log('You move to right')
            moveSoundEffect.currentTime = 0
            moveSoundEffect.play()
            this.DOM.remove()
            this.playerPosition++
            document.querySelector(`.player-${this.playerPosition}`).appendChild(this.DOM)
        }   else {
            console.log("You've hit the right wall")
        }
    }

}

class MusicBlock {
    constructor() {
        let div = document.createElement('div')
        div.setAttribute('class', 'music-block drop')
        this.DOM = div

        setTimeout(() => {
            this.DOM.remove()
        }, 3000)
    }
}

window.addEventListener('keydown', (e) => {
    keyHandler(e)
})

const keyHandler = (e) => {


    if(e.key === 'ArrowLeft') {
        player.moveLeft(e)
    }

    if(e.key === 'ArrowRight') {
        player.moveRight(e)
    }

    if(e.key === 'p') {
        song.play()
    }

    if(e.key === '[') {
        song.pause()
    }

    if(e.key === 'm') {
        let musicBlock = new MusicBlock()
        document.querySelector('.column-3').appendChild(musicBlock.DOM)

        console.log(player.width)
    }
}
const isCollide = (rect1, rect2) => {

}
class BlockGenerator {
    constructor() {

    }

    generateBlock = function () {
        let musicBlock = new MusicBlock()

        setInterval(() => {
            let randomNum = Math.floor(Math.random() * 7 + 1)
            document.querySelector(`.column-${randomNum}`).appendChild(new MusicBlock().DOM)
        },1000)
    }
}


let playerInitialPosition = 4
const song = new Audio('./assets/audio/Never Gonna Give You Up - Rick Astley.mp3')
const moveSoundEffect = new Audio('./assets/audio/mixkit-arcade-retro-changing-tab-206.wav')

let player = new Player()

const init = () => {

    document.querySelector(`.player-${playerInitialPosition}`).appendChild(player.DOM)
    console.log(player.DOM.getBoundingClientRect())
    let blockGenerator = new BlockGenerator()
    blockGenerator.generateBlock()

}





init()




setInterval(()=> {
    console.log('ass')
},1000)
