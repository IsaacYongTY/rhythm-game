const canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

export default class MusicBlock {
    constructor(x,y,width,height,speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'red'
        this.dy = speed;
        this.isHit = false
        this.isMissed = false

    }

    draw() {
        ctx.clearRect(this.x,this.y - this.dy,this.width,this.height)
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.fill()
    }

    remove() {
        ctx.clearRect(this.x,this.y - this.dy,this.width,this.height)
    }
}