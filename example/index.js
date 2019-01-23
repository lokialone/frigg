import Frigg from '../src/index';

// const testJson = {
//     background: {
//         type: 'color',
//         width: 400,
//         height: 400,
//         value: '#00ff00'
//     },
//     height: 400,
//     width: 400,
//     background: {
//         type: 'image',
//         width: 400,
//         height: 400,
//         value: 'http://img.souche.com/0c17e613d439f2070246a8e4078350c5.jpg'
//     },
//     items: [
//         {
//             type: 'image',
//             top: 100,
//             left: 100,
//             width: 150,
//             height: 150,
//             rotate: 0,
//             clip: {
//                 width: 200,
//                 height: 100,
//                 left: 0,
//                 right: 0
//             },
//             opacity: 0.8,
//             value: 'https://img.souche.com/183902048c3c0327d079c968ab6b4989.jpg'
//         },
//         // {
//         //     type: 'text',
//         //     top: 0,
//         //     left: 0,
//         //     width: 100,
//         //     height: 100,
//         //     rotate: 0,
//         //     value: '你好哇，李银河\nhello',
//         //     style: {
//         //         'font-size': 14,
//         //         'font-family': '',
//         //         'letter-spacing': 3,
//         //         'line-height': 58,
//         //         'text-align': 'right',
//         //         color: 'red'
//         //     }
//         // },
//         {
//             type: 'group',
//             top: 0,
//             left: 0,
//             width: 200,
//             height: 200,
//             rotate: 30,
//             items: [
//                 {
//                     type: 'text',
//                     top: 10,
//                     left: 10,
//                     width: 100,
//                     height: 100,
//                     rotate: 0,
//                     value: '我不好0.0',
//                     style: {
//                         'font-size': 14,
//                         'font-family': '',
//                         'letter-spacing': 3,
//                         'line-height': 28,
//                         'text-align': 'center',
//                         color: 'red'
//                     }
//                 },
//                 {
//                     type: 'text',
//                     top: 40,
//                     left: 10,
//                     width: 100,
//                     height: 100,
//                     rotate: 0,
//                     value: '我不好',
//                     style: {
//                         'font-size': 14,
//                         'font-family': '',
//                         'letter-spacing': 3,
//                         'line-height': 28,
//                         'text-align': 'center',
//                         color: 'red'
//                     }
//                 },
//             ]
//         }
//     ]

// } 
const testJson = {
    "width": 296,
    "height": 346,
    "items": [
        {
            "id": "24ddb84e-afdc-4662-969b-ef1185e46524",
            "top": 0,
            "left": 0,
            "width": 296,
            "height": 346,
            "rotate": 0,
            "type": "textGroup",
            "items": [
                {
                    "id": "5b589d44-3d8b-44b5-a92f-eb2762ad289b",
                    "top": 0,
                    "left": 96,
                    "width": 200,
                    "height": 200,
                    "rotate": 0,
                    "type": "text",
                    "value": "文字占位符",
                    "style": {
                        "font-family": "Arial",
                        "font-size": "30px",
                        "color": "red",
                        "font-weight": "normal",
                        "font-style": "italic",
                        "text-align": "left",
                        "letter-spacing": "20",
                        "line-height": "34px"
                    }
                },
                {
                    "id": "3ab69949-49ef-4c0c-b8d3-f39f6e93ada9",
                    "top": 146,
                    "left": 0,
                    "width": 200,
                    "height": 200,
                    "rotate": 0,
                    "type": "text",
                    "value": "文字占位符",
                    "style": {
                        "font-family": "Arial",
                        "font-size": "30px",
                        "color": "#000000",
                        "font-weight": "normal",
                        "font-style": "normal",
                        "text-align": "left",
                        "letter-spacing": "0px",
                        "line-height": "34px"
                    }
                }
            ]
        }
    ]
}

let a = new Frigg(testJson)

a.getImage().then((res) => {
    console.log('res', res);
})

a.getThumbnail(200).then((res) => {
    console.log('getThumbnail', res);
})