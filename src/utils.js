const fs=require('fs');
const path = require("path");

function copyDirectorySync(src,dist){
    let srcStat = fs.statSync(src);
    if(!fs.existsSync(src)){return;}
    if(srcStat.isDirectory(src)){
        if(!fs.existsSync(dist)){
            fs.mkdirSync(dist);
        }
    }
    //读取目录
    let currPaths = fs.readdirSync(src);
    currPaths.forEach(function(currPath){
        var newSrc = path.resolve(src, currPath);
        var newDist = path.resolve(dist, currPath); 
        if(fs.statSync(newSrc).isDirectory()){
            copyDirectorySync(newSrc, newDist);
        }else if(fs.statSync(newSrc).isFile()){
            fs.writeFileSync(newDist, fs.readFileSync(newSrc));
        }
    });
}

module.exports = {
    copyDirectorySync
};