import { isArray, downloadFile } from './tool.js'
import { ImageItem, TextItem, TextGroupItem } from './item.js'
import Quene from './queue.js'

const testJson = {
    // background: {
    //     type: 'color',
    //     width: 400,
    //     height: 400,
    //     value: '#00ff00'
    // },
    background: {
        type: 'image',
        width: 400,
        height: 400,
        value: 'http://img2.3lian.com/2014/f5/63/d/16.jpg'
    },
    items: [
        {
            type: 'image',
            top: 200,
            left: 200,
            width: 100,
            height: 100,
            rotate: 45,
            opacity: 0.3,
            value: 'http://img2.3lian.com/2014/f5/63/d/16.jpg'
        },
        {
            type: 'image',
            top: 200,
            left: 90,
            width: 100,
            height: 100,
            rotate: 30,
            opacity: 0.7,
            value: 'http://img2.3lian.com/2014/f5/63/d/16.jpg'
        },
        {
            type: 'text',
            top: 200,
            left: 90,
            width: 100,
            height: 100,
            rotate: 0,
            value: '我不好',
            style: {
                'font-size': 14,
                'font-family': '',
                'letter-spacing': 3,
                'line-height': 28,
                'text-align': 'center',
                color: 'red'
            }
        },
        {
            type: 'text',
            top: 0,
            left: 0,
            width: 100,
            height: 100,
            rotate: 0,
            value: '你好哇，李银河',
            style: {
                'font-size': 14,
                'font-family': '',
                'letter-spacing': 3,
                'line-height': 28,
                'text-align': 'center',
                color: 'red'
            }
        },
        {
            type: 'group',
            top: 200,
            left: 0,
            width: 200,
            height: 200,
            rotate: 0,
            items: [
                {
                    type: 'text',
                    top: 0,
                    left: 10,
                    width: 100,
                    height: 100,
                    rotate: 40,
                    value: '我不好',
                    style: {
                        'font-size': 14,
                        'font-family': '',
                        'letter-spacing': 3,
                        'line-height': 28,
                        'text-align': 'center',
                        color: 'red'
                    }
                },
                {
                    type: 'text',
                    top: 40,
                    left: 10,
                    width: 100,
                    height: 100,
                    rotate: 0,
                    value: '我不好',
                    style: {
                        'font-size': 14,
                        'font-family': '',
                        'letter-spacing': 3,
                        'line-height': 28,
                        'text-align': 'center',
                        color: 'red'
                    }
                },
            ]
        }
    ]

} 

//为了保证图片绘制的顺序，
class Frigg {

    constructor(data) {
        this.bgJson = data.background
        const ctx = this.createCanvas(this.bgJson.width, this.bgJson.height)
        this.itemsJson = data.items
        this.createImage(ctx)
    }

    draw(ctx) {
        this.drawBackground(ctx, this.bgJson)
        this.drawItems(ctx, this.itemsJson)

    }

    createImage(ctx) {
        this.draw(ctx)
        Quene.push(() => {
            let image = this.canvas.toDataURL()
            // downloadFile(image, 'template.jpg')
        })
        Quene.next()
        
    }


    createCanvas(width, height) {
        const canvas = document.createElement('canvas')
        canvas.crossorigin = 'anonymous'
        document.body.append(canvas)
        canvas.width = width
        canvas.height = height
        this.canvas = canvas
        const ctx = canvas.getContext('2d')
        return ctx
    }

    drawBackground(ctx, bgJson) {
        if (bgJson.type === 'color') {
            ctx.fillStyle = bgJson.value
            ctx.fillRect(0, 0, bgJson.width, bgJson.height);
        } else{
            let bg = new ImageItem(ctx, bgJson)
            bg.add()
        }
    }

    drawItems(ctx, itemsData) {
        if (itemsData.length <= 0 && !isArray(items)) return
        const TYPES = [ImageItem, TextItem, TextGroupItem]
        itemsData.forEach(element => {
            TYPES.some((i) =>  {
                if (this.isItem(i, element.type)) {
                    let tmpItem = new i(ctx, element)
                    tmpItem.add()
                    return true
                }
            })
        }); 
    }

    isItem(i, type) {
        return i.name.toLowerCase().includes(type)
    }
}

new Frigg(testJson)

export default Frigg




