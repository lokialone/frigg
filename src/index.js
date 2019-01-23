import { isArray, downloadFile } from './tool.js'
import { ImageItem, TextItem, TextGroupItem } from './item.js'
import Quene from './queue.js'
import uuid from 'uuid/v4'

//为了保证图片绘制的顺序，使用绘制队列

class Frigg {

    constructor(data) {
        this.ratio = data.width / data.height
        this.bgJson = data.background
        this.itemsJson = data.items
        this.containerId = uuid()
        this.createContainer()
        this.stage = new Konva.Stage({
            container: this.containerId,
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

    createContainer() {
        let div = document.createElement('div')
        div.id = this.containerId
        div.style.visibility = 'hidden'
        div.style.zIndex = '-1'
        div.style.position = 'absolute'
        this.container = div
        document.body.append(div)
    }

    removeContainer() {
        document.body.removeChild(this.container)
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
                    // this.removeContainer()
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
                height: bgJson.height,
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
        let canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        let ctx = canvas.getContext('2d')
       
        return new Promise ((resolve)=> {
            this.load().then(() => {
                let imageOrigin = this.container.querySelector('canvas')
                ctx.drawImage(imageOrigin, 0, 0, width, height)
                const image = canvas.toDataURL()
                // downloadFile(image, 'test')
                resolve(image)
            })  
        })
    }
}
export default Frigg




