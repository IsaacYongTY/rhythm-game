


let player
// let player = document.querySelector('#player')
let playerPosition = 4

window.addEventListener('keydown', (e) => {
    keyHandler(e)
})

const keyHandler = (e) => {
    if(e.key === 'ArrowLeft') {
        console.log(player)
        if(playerPosition !== 1) {
            document.querySelector('#player').remove()
            playerPosition--
            document.querySelector(`.player-${playerPosition}`).appendChild(player)
        }   else {
            console.log("You've hit the left wall")
        }

    }

    if(e.key === 'ArrowRight') {

        if(playerPosition !== 7) {
            console.log('You move to right')
            player.remove()
            playerPosition++
            document.querySelector(`.player-${playerPosition}`).appendChild(player)
        }   else {
            console.log("You've hit the right wall")
        }

    }

    console.log(e.key)
}

let playerInitialPosition = 4


const init = () => {
    console.log(document.querySelector(`.player-4`))
    player = document.createElement('div')
    player.setAttribute('id','player')
    document.querySelector(`.player-${playerInitialPosition}`).appendChild(player)
    console.log(player)

}

init()