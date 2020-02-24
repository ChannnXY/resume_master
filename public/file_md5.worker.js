// const md5  = require('spark-md5');

self.onmessage = e =>{
    window.console.log(e.data.method)
    // const fileChunkList = e.data;
    // const spark = new md5.SparkMD5.ArrayBuffer();
    // let count = 0,percentage= 0;

    // const loadNext = index =>{
    //     const reader = new FileReader();
    //     reader.readAsArrayBuffer(fileChunkList[index].file);
    //     reader.onload = e =>{
    //         count++;
    //         spark.append(e.target.result);
    //         if(count===fileChunkList.length){
    //             self.postMessage({
    //                 percentage:100,
    //                 hash:spark.end()
    //             })
    //             self.close()
    //         }else{
    //             percentage+=100/fileChunkList.length;
    //             self.postMessage({
    //                 percentage:percentage
    //             })
    //             loadNext(count);
    //         }
    //     }
    // }
    // loadNext(0);
}