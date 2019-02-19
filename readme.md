# Frigg
将一定格式的json转成对应的jpg图片，返回图片的base64信息

当前可用@souche/frigg@0.0.3

## usgae


```
    //testJson 绘制的格式
    let a = new Frigg(testJson)
    //获取绘制的图片
    a.getImage().then((res) => {
        console.log('res', res);
    })
    //获取缩略图,需传入缩率图宽度
    a.getThumbnail(200).then((res) => {
        console.log('getThumbnail', res);
    })
```

## json格式

### 实例
```
    //testJson格式
    const testJson = {
    height: 400,
    width: 400,
    background: {
        type: 'color',
        width: 400,
        height: 400,
        value: '#00ff00'
    },
    // background: {
    //     type: 'image',
    //     width: 400,
    //     height: 400,
    //     value: 'http://img2.3lian.com/2014/f5/63/d/16.jpg'
    // },
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
                }
            ]
        }
    ]

} 

```

- left, top的值皆为相对于 backgroud的距离 最左边和最上边的距离。

- 可绘制的items的type类型为，text(文字)、group(文字组,多个text组合在一起的文本)、image。

- background 可为2种类型， image(图片背景) 和 color (纯色背景)；







