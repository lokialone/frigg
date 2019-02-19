import { isArray, downloadFile } from './tool.js'
import { ImageItem, TextItem, TextGroupItem, Rect } from './item.js'
import Konva from 'konva'
import Quene from './queue.js'
import uuid from 'uuid/v4'

//为了保证图片绘制的顺序，使用绘制队列

class Frigg {
    constructor(data) {
        this.ratio = data.width / data.height
        this.bgJson = data.background || ''
        this.itemsJson = data.items
        // // uuid是否不需要呢0。0
        this.containerId = uuid()
        
        this.createContainer()
        
        this.stage = new Konva.Stage({
            container: this.containerId,
            width: data.width || 100,
            height: data.height || 100
        })
        this.layer = new Konva.Layer()
        this.fn = null
        this.load()
    }

    draw() {
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
                    resolve(image)  
                })
                Quene.next()
            }) 
            return this.fn;
            
        }  
    }

    getImage() {
        return this.load()
    }

    drawBackground(bgJson) {
        if (!bgJson) return
        if (bgJson.type === 'color') {
            let rect = Rect(bgJson.width || 750, bgJson.height || 1334, bgJson.value)
            this.layer.add(rect)
        } else{
            let bg = new ImageItem(this.layer, bgJson)
            bg.add()
        }
    }

    drawItems(itemsData) {
        if (!isArray(itemsData) || itemsData.length < 1) return
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
        return i.type.toLowerCase().includes(type.toLowerCase())
    }

    getThumbnail(width) {
        let height = width / this.ratio
        let canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        let ctx = canvas.getContext('2d')
        return this.load().then(() => {
            this.canvas = this.container.querySelector('canvas')
            ctx.drawImage(this.canvas, 0, 0, width, height)
            const image = canvas.toDataURL()
            return image
        })  
    }
}
export default Frigg




