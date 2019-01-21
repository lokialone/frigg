import { isArray, downloadFile } from './tool.js'
import { ImageItem, TextItem, TextGroupItem } from './item.js'
import Quene from './queue.js'

//为了保证图片绘制的顺序，使用绘制队列

class Frigg {

    constructor(data) {
        this.ratio = data.width / data.height
        this.bgJson = data.background
        const {ctx, canvas} = this.createCanvas(data.width, data.height)
        this.canvas = canvas
        this.ctx = ctx
        this.itemsJson = data.items
        this.image = ''        
    }

    draw(ctx) {
        this.drawBackground(ctx, this.bgJson)
        this.drawItems(ctx, this.itemsJson)

    }

    createCanvas(width, height) {
        const canvas = document.createElement('canvas')
        canvas.crossorigin = 'anonymous'
        document.body.append(canvas)
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        return {
            canvas,
            ctx 
        }
    }


    getImage() {
        return new Promise ((resolve, reject) => {
            this.draw(this.ctx)
            Quene.push(() => {
                let image = this.canvas.toDataURL()
                if (!image) {
                    reject('无法生成image')
                }
                resolve(image)
            // downloadFile(image, 'template.jpg')
            })
            Quene.next()
        })
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

    getThumbnail(width) {
        let height = width / this.ratio
        let time = 0
        const { ctx, canvas } = this.createCanvas(width, height)
        return new Promise((resolve, reject) => {
            let timer = setInterval(() => {
                time ++
                if (!this.image) {
                    ctx.drawImage(this.canvas, 0, 0, width, height)
                    const image = canvas.toDataURL()
                    resolve(image)
                }
                if (time > 10000) {
                    clearInterval(timer);
                    reject('');
                }
            }, 10);
        })
       
    }
}
export default Frigg




