/**
 * 
 */
class Queue {
    constructor() {
        this.funcs = [];
    }

    push(fn) {
        if (typeof fn === 'function') {
            this.funcs.push(fn);
        }
    }
    
    start() {
        this.next()
    }

    next() {
        let fn = this.funcs.shift();
        if (typeof fn === 'function') {
            fn();
        }
    }

}

export default new Queue();