const canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

export default class PlayerHitBox {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.color = "green"
        this.width = width
        this.height = height

    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        // ctx.arc(this.x, this.y, 30, 0, Math.PI * 2, false)
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.fill()
    }

    remove() {
        ctx.clearRect(this.x,this.y, this.width, this.height)
    }
}

