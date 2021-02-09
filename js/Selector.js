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

        document.querySelector(`#song-${this.selection}`).classList.remove('selected')

        if(key === 'ArrowLeft') {
            this.selection > 0 ? this.selection-- : this.selection = songs.length - 1
        }   else if (key === 'ArrowRight') {
            this.selection < songs.length - 1?  this.selection++ : this.selection = 0
        }
        console.log(this.selection)

        if(this.selection >= 0 && this.selection < songs.length ) {

            this.song.pause()

            let { previewTime, audio } = songs[this.selection]

            this.song = new Audio (`${audio}#t=${previewTime},${previewTime + this.previewLength}`)


            document.querySelector(`#song-${this.selection}`).classList.add('selected')
            this.selectionSoundEffect.currentTime = 0
            this.selectionSoundEffect.play()

            this.song.play()

        }   else {
            this.selectionNegativeSoundEffect.currentTime = 0
            this.selectionNegativeSoundEffect.play()
        }
}


}