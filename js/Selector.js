import gameAudio from './gameAudio.js'
import songs from './songs.js'


export default class Selector {
    constructor() {
        this.previewLength = 10
        this.selection = 0

        let { previewTime, audio } = songs[this.selection]
        this.song = new Audio (`${audio}#t=${previewTime},${previewTime + this.previewLength}`)
        this.selectionSoundEffect = new Audio(gameAudio.selectionSoundEffect)
        this.selectionNegativeSoundEffect = new Audio(gameAudio.selectionNegativeSoundEffect)

    }

    move(key) {
        if(key === 'ArrowLeft') {
            this.selection > 0 ? this.selection-- : 0
        }   else if (key === 'ArrowRight') {
            this.selection < songs.length ? this.selection++ : this.selection = songs.length
        }
        console.log(this.selection)

        if(this.selection > 0 && this.selection <= songs.length ) {

            this.song.pause()

            let { previewTime, audio } = songs[this.selection - 1]

            this.song = new Audio (`${audio}#t=${previewTime},${previewTime + this.previewLength}`)
            document.querySelector(`#song-${this.selection}`).focus()
            this.selectionSoundEffect.currentTime = 0
            this.selectionSoundEffect.play()

            this.song.play()

        }   else {
            this.selectionNegativeSoundEffect.currentTime = 0
            this.selectionNegativeSoundEffect.play()
        }
}



    select() {
        document.querySelector(`#song-${this.selection}`).click()
        this.song.pause()
    }
}