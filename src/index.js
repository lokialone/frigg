import { isArray, downloadFile } from './tool.js'
import { ImageItem, TextItem, TextGroupItem } from './item.js'
import Quene from './queue.js'

//为了保证图片绘制的顺序，使用绘制队列

class Frigg {

    constructor(data) {
        this.ratio = data.width / data.height
        this.bgJson = data.background
        this.itemsJson = data.items
        this.stage = new Konva.Stage({
            container: 'container',
            width: data.width,
            height: data.height
        })
        this.layer = new Konva.Layer()
        this.fn = null
        this.load()
    }

    draw(ctx) {
        this.drawBackground(this.bgJson)
        this.drawItems(this.itemsJson)

    }

    load() {
        if (this.fn) {
            return this.fn
        } else {
            this.fn = new Promise ((resolve, reject) => {
                this.draw(this.layer)
                Quene.push(() => {
                    this.stage.add(this.layer)
                    let image = this.stage.toDataURL()
                    if (!image) {
                        reject('无法生成image')
                    }
                    resolve(image)
                })
                Quene.next()
            }) 
            return this.fn;
            
        }  
    }

    getImage() {
        return new Promise((resolve) => {
            this.load().then((iamge) => {
                resolve(iamge)
            })
        })
    }

    drawBackground(bgJson) {
        if (bgJson.type === 'color') {
            let rect = new Konva.Rect({
                x: 0,
                y: 0,
                width: bgJson.width,
                height: bgJson.width,
                fill: bgJson.value
              })
            this.layer.add(rect)
        } else{
            let bg = new ImageItem(this.layer, bgJson)
            bg.add()
        }
    }

    drawItems(itemsData) {
        if (itemsData.length <= 0 && !isArray(itemsData)) return
        const TYPES = [ImageItem, TextItem, TextGroupItem]
        itemsData.forEach(element => {
            TYPES.some((i) =>  {
                if (this.isItem(i, element.type)) {
                    let tmpItem = new i(this.layer, element)
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
        const { ctx, canvas } = this.createCanvas(width, height)
        return new Promise ((resolve)=> {
            this.load().then(() => {
                ctx.drawImage(this.canvas, 0, 0, width, height)
                const image = canvas.toDataURL()
                resolve(image)
            })  
        })
    }
}
export default Frigg




