import Frigg from '../src/index';
import { downloadFile } from '../src/tool.js';

 const testJson = {
    background: {
    //    type: 'image',
    //    value: 'https://img.souche.com/bbe38c96ca3ca758c3c2ceaf39a1b7c1.jpg',
          type: 'color',
          value: '#00ff00'
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
            value: "http://pic1.win4000.com/wallpaper/7/57198bb95c6b5.jpg",
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
            value: "http://pic1.win4000.com/wallpaper/7/57198bb95c6b5.jpg",
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
   img.src = res;
   document.body.append(img)
})

// a.getThumbnail(200).then((res) => {
//     console.log('getThumbnail', res);
//     img.src = res;
//    document.body.append(img)
// })