
   /**
 *获取数据的数据类型，
 * return 小写的类型 array , boolean, object, number, string, null, undefined, function 等
 */
export function getTypeOf (d) {
	return Object.prototype.toString.call(d).slice(8, -1).toLowerCase()
}
/**
 * 是否为数据是否array
 * @param {} d 
 */
export function isArray(d) {
    if (Array.isArray) {
		return Array.isArray(d)    
    }
    else{
        return getTypeOf(d) === 'array'
    }
}

// 可中断的遍历器
export function _each(items, fn) {
    let len = items.length
    if (!isArray(items) && !len) return
    for (let i = 0; i < len; i++) {
        if (fn(items[i])) return
    }
}

export function downloadFile(url, name) {
    // 修复firefox无法点击下载
    HTMLElement.prototype.click = function() {
        var evt = this.ownerDocument.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        this.dispatchEvent(evt);
    };
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
}
