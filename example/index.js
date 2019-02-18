import Frigg from '../src/index';
import { downloadFile } from '../src/tool.js';

// const testJson = {
//     // background: {
//     //     type: 'color',
//     //     width: 400,
//     //     height: 400,
//     //     value: '#00ff00'
//     // },
//     height: 400,
//     width: 400,
//     // background: {
//     //     type: 'image',
//     //     width: 400,
//     //     height: 400,
//     //     value: 'http://img.souche.com/0c17e613d439f2070246a8e4078350c5.jpg'
//     // },
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
    background: {
       type: 'image',
       value: 'https://img.souche.com/bbe38c96ca3ca758c3c2ceaf39a1b7c1.jpg'
    },
    height: 1334,
    width: 750,
    items: [
        {
            top: 50,
            height: 160,
            width: 241.05461393596985,
            id: "35aa179f-549d-4f7a-baad-f898ec1250fc",
            left: 17.142857142857142,
            ratio: 1.5065913370998116,
            rotate: -17.805754945908006,
            type: "image",
            value: "https://img.souche.com/74ce3bbf2fcc52bc932102991f601c88.JPG",
            style: {opacity: 1},
            clip: {
                height: 160,
                left: 0,
                top: 0,
                width: 241.05461393596985
            }
        },
        {
            top: 437.14285714285717,
            height: 160,
            width: 241.05461393596985,
            id: "35aa179f-549d-4f7a-baad-f898ec1250fc",
            left: 297.14285714285717,
            ratio: 1.5065913370998116,
            rotate: -20.57235853939214,
            type: "image",
            value: "https://img.souche.com/74ce3bbf2fcc52bc932102991f601c88.JPG",
            style: {opacity: 1},
            clip: {
                height: 232.06428571428572,
                left: 0,
                top: -72.06428571428572,
                width: 349.62604250739844
            }
        }

    ]

}
let a = new Frigg(testJson)
let img = document.createElement('img');

a.getImage().then((res) => {
    // console.log('res', res);
   img.src = res;
   document.body.append(img)
})

// a.getThumbnail(200).then((res) => {
//     console.log('getThumbnail', res);
// })