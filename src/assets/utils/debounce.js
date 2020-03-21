// 触发之后n秒之后再执行，如果n秒内触发事件，则重新计算时间
const debounce = (fn,wait=300)=>{
    let timer;
    return function(){
        timer && clearTimeout(timer);
        const context = this,
            args = arguments;
        timer = setTimeout(() => {
            fn.apply(context,args)
        }, wait);
    }
}

// 触发之后先立即执行一次，n秒内不能再执行
const debounceSync = (fn,wait=300)=>{
    let timer;
    return function(){
        const context = this,
            args = arguments;
        timer && clearTimeout(timer);
        let callNow = !timer;
        timer = setTimeout(() => {
            timer = null
        }, wait);
        if(callNow) fn.apply(context,args)
    }
}

export{
    debounce,
    debounceSync
}