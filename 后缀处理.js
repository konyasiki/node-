const fs=require("fs");
const readline = require('readline');
const path=require('path');
let dir_name;
let End;
const _readline=readline.Interface({
    input:process.stdin,
    output:process.stdout
})
/*
*@param {string} dir 路径
先解析路径用path.resolve
再接着fs.readsync读取文件返回数组
将数组循环赋值给新的变量接着拼接path.join
接着util判断用path.parse（）返回文件对象
更改文件名
*/
function returnnewname(dir,ext){
    const file= path.resolve(dir);
    filelist=fs.readdirSync(file);
    for(i=0;i<filelist.length;i++){
        let newfilelist;
        newfilelist=filelist[i];
        _newfilelist=path.join(dir,newfilelist);
        let fileobj;
        fileobj=path.parse(_newfilelist);
        let newfilename=fileobj.name+ext;
        try{
            fs.renameSync(_newfilelist,path.join(fileobj.dir,newfilename));
            console.log(path.join(dir,newfilename));
        }catch(err){
            console.error('发生错误');
        }
        
    }
    console.log('done');
    
}
_readline.question('输入文件路径',(answer)=>{
    console.log(`文件夹地址是${answer}`);
    dir=answer;
    _readline.question('你要更改的后缀是?',(_answer)=>{
        if(_answer.startsWith('.'))
            ext=_answer;
        else
            ext='.'+_answer;
        returnnewname(dir,ext);
        _readline.close();
        _readline.on('close',()=>{
        process.exit('go!');
        })
    })
})

