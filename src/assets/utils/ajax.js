function $post(opt){
    let options = Object.assign({
        url:"",
        method:'POST',
        data:null,
        header:{}
    },opt);
    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open(options.method,options.url);
        Object.keys(options.header).map( item =>{
            xhr.setRequestHeader(item,options.header.item)
        })
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState===4){
                if(/^(2|3)\d{2}$/.test(xhr.status)){
                    resolve(JSON.parse(xhr.responseText))
                }else{
                    reject(xhr)
                }
            }
        }
        xhr.send(options.data);
    })
}

function $get(opt){
    let options = Object.assign({
        url:"",
        method:'GET',
        header:{}
    },opt);
    return new Promise( (resolve,reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open(options.method,options.url);
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState===4){
                if(/^(2|3)\d{2}$/.test(xhr.status)){
                    resolve(JSON.parse(xhr.responseText))
                }else{
                    reject(xhr)
                }
            }
        }
        xhr.send();
    })
}

export{
    $post,
    $get
}