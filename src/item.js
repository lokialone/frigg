import Quene from './queue.js'
import Konva from 'konva'

class Item { 
    constructor(layer, data) {
        this.layer = layer
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

    add() {
        Quene.push(() => this.draw())
    }

    draw() {
        Quene.next()
    }
}

class ImageItem extends Item {
    constructor(layer, data) {
       super(layer, data)
       this.clip = data.clip || {
           left: 0,
           top: 0,
           width: data.width,
           height: data.height
       }
    }
    
    async draw() {
        let group = new Konva.Group({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            rotation: this.rotate,
            opacity: this.opacity,
            clip: {
                x: 0,
                y: 0,
                width: this.width,
                height: this.height
            },
        });
        let image = await this.imagePromise(this.value)
        let yoda = new Konva.Image({
            image: image,
            x : this.clip.left,
            y : this.clip.top,
            width : this.clip.width,
            height : this.clip.height
        })
        group.add(yoda)
        this.layer.add(group)
        Quene.next()
    }

    imagePromise(value) {
        let image = new Image()
        image.setAttribute('crossOrigin', 'Anonymous')
        image.src = value
        return new Promise((resolve) => {
            image.onload = (() => {
                resolve(image)
            })
        })
    }
}

class TextItem extends Item {
    constructor(layer, data) {
        super(layer, data)
        let style = this.removePx(data.style)
        this.fontSize = parseInt(style['font-size']) || 28
        this.fontFamily = style['font-family'] || 'sans-serif'
        this.textAlgin =  style['text-align'] || 'left'
        this.letterSpacing = style['letter-spacing']|| 0
        this.lineHeight = style['line-height'] || this.fontSize + 4
        this.color = style.color || '#1a1a1a'
        this.fontStyle = style['font-weight'] === 'bold' ? 'bold' : style['font-style']

    }

    removePx(style) {
        let res = []
        Object.keys(style).forEach((item) => {
            let value = style[item]
            if (typeof value === 'string') {
                value = value.replace('px', '')
            }
            res[item] = value
        })
        return res;
    }

    draw() {
        this.layer.add(this.pureDraw())
        Quene.next()
    }

    pureDraw() {
        let text = new Konva.Text({
            x: this.x,
            y: this.y,
            width: this.width,
            text: this.value,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
            fontStyle: this.fontStyle,
            align: this.textAlgin,
            fill: this.color,
            rotation: this.rotate
        })
        text.letterSpacing(parseInt(this.letterSpacing))
        // console.log('text', )
        return text   
    }    
}

class TextGroupItem extends Item {
    constructor(layer, data) {
        super(layer, data)
        this.data = data
        this.items = data.items
        this.group = new Konva.Group({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            rotation: this.rotate,
            opacity: this.opacity,
            clip: {
                x: 0,
                y: 0,
                width: this.width,
                height: this.height
            }
        })
    }
    draw() {
        this.drawTexts()
        Quene.next()
        
    }

    drawTexts() {
        this.items.forEach((item) => {
            let tmpItem = new TextItem(this.layer, item)
            this.group.add(tmpItem.pureDraw())
        })
        this.layer.add(this.group)
    }
}

export { ImageItem, TextItem, TextGroupItem }