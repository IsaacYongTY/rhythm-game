const canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

export default class PlayerHitBox {
    constructor(x,y,width,height, index) {
        this.x = x;
        this.y = y;

        this.position = index + 1

        switch(this.position) {
            case 1:
            case 7:
                this.color = '#95FF95'
                break
            case 2:
            case 6:
                this.color = '#FFFF77'
                break
            case 3:
            case 5:
                this.color = '#6B6BFB'
                break
            default:
                this.color = '#F57272'

        }

        this.width = width
        this.height = height
        this.isActive = false


    }

    draw() {
        ctx.beginPath()

        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.fill()
    }

    remove() {
        ctx.clearRect(this.x,this.y, this.width, this.height)
    }
}

