import Quene from './queue.js'

class Item { 
    constructor(ctx, data) {
        this.ctx = ctx
        this.width = data.width 
        this.height = data.height
        this.x = data.left || 0
        this.y = data.top || 0
        this.value = data.value || ''
        this.opacity = data.opacity || 1
        this.rotate = data.rotate || 0
        this.centerX = this.x + this.width / 2
        this.centerY = this.y + this.height / 2
    }

    rotateCanvas(ctx) {
        ctx.translate(this.centerX, this.centerY)
        ctx.rotate(this.rotate * Math.PI / 180)
    }

    add() {
        Quene.push(() => this.draw())
    }

    draw() {
        Quene.next()
    }
}

class ImageItem extends Item {
    constructor(ctx, data) {
       super(ctx, data)
    }
    
    async draw() {
        let ctx = this.ctx
        ctx.save()
        ctx.globalAlpha = this.opacity
        this.rotateCanvas(ctx)
        this.image = await this.imagePromise(this.value)
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2 , this.width, this.height)
        ctx.restore()
        Quene.next()
    }

    imagePromise(value) {
        let image = new Image()
        image.src = value
        return new Promise((resolve) => {
            image.onload = (() => {
                resolve(image)
            })
        })
    }
}

class TextItem extends Item {
    constructor(ctx, data) {
        super(ctx, data)
        let style = data.style
        this.fontSize = style['font-size'] || 28
        this.fontFamily = style['font-family'] || 'sans-serif'
        this.textAlgin =  style['text-align'] || 'left'
        this.letterSpacing = style['letter-spacing']|| 2
        this.lineHeight = style['line-height'] || this.fontSize + 4
        this.color = style.color || '#1a1a1a'
    }

    draw() {
        this.pureDraw()
        Quene.next()
    }

    pureDraw() {
        let ctx = this.ctx
        ctx.save()
        this.setFont(ctx)
        this.rotateCanvas(ctx)
        // for debug
        // ctx.rect(this.x - this.centerX, this.y - this.centerY, this.width, this.height)
        // ctx.stroke()
        // for debug
        
        this.drawOneLineText(ctx)
        ctx.restore()
    }

    setFont(ctx) {
        ctx.textBaseline = 'top'
        ctx.font = `${this.fontSize}px ${this.fontFamily}`
        ctx.fillStyle = this.color
    }
    // 增加自动换行，行高， letter-spacing， 文字对齐文字绘制
    // TODO
    drawText(ctx) {
        let originRowLength = ctx.measureText(this.value).width
        let startX = this.letterSpacing
        //
        let dy = (this.lineHeight - this.fontSize) / 2
        // let 
        for (let i = 0, len = this.value.length; i < len; i++) {
           
            
            if (x + letterWidth / len > this.width) {
                let row = (x + letterWidth / len) / this.width
                // x = x - this.width * row - this.letterSpacing
                y = this.y + row * this.lineHeight + dy
            }
            ctx.fillText(this.value[i], x - centerX, y - centerY)
        }
    }
    // 绘制开始位置，字宽
    getLetterInfo(ctx) {
        let originRowLength = ctx.measureText(this.value).width
        let textLen = this.value.length
        let letterWidth = originRowLength / textLen
        let startX = 0
        if (this.textAlgin === 'left') {
            startX = 0
        } else if (this.textAlgin === 'center') {
            
            startX = (this.width - (originRowLength + (textLen - 1) * this.letterSpacing)) / 2
            
        } else {
            startX = this.width - (originRowLength + (textLen + 1) * this.letterSpacing)
        }

        startX < 0 ? startX = 0: null
        return {startX, letterWidth}
    }
    // 提供行高，letter-spacing, 文字对齐
    drawOneLineText(ctx) {
        const {startX, letterWidth} = this.getLetterInfo(ctx)
        const dy = (this.lineHeight - this.fontSize) / 2
        for (let i = 0, len = this.value.length; i < len; i++) {
            let x = this.x + startX + letterWidth * i + this.letterSpacing * i
            // if (x + letterWidth > this.width) return
            ctx.fillText(this.value[i], x - this.centerX, this.y + dy - this.centerY)
        }
    }

}


class TextGroupItem extends Item {
    constructor(ctx, data) {
        super(ctx, data)
        this.data = data
        this.items = data.items
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.parentCtx = ctx
        this.ctx = this.canvas.getContext('2d')

    }
    draw() {
        let ctx = this.ctx
        let parentCtx = this.parentCtx
        this.drawTexts(ctx)
        parentCtx.save()
        this.rotateCanvas(parentCtx)
        // 绘制子元素
        parentCtx.drawImage(this.canvas, this.x - this.centerX, this.y - this.centerY, this.width, this.height)
        parentCtx.restore()
        Quene.next()
        
    }

    drawTexts(ctx) {
        this.items.forEach((item) => {
            let tmpItem = new TextItem(ctx, item)
            tmpItem.pureDraw()
        })
    }
}

export { ImageItem, TextItem, TextGroupItem }