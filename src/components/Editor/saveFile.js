let fs = $require('fs'); 

export default function(path, data){
    if (!path) return Promise.reject('saveFile Warnning, Path Not Found'); 

    return new Promise((res, rej) => {
        fs.writeFile(path, data, (err, ok) => {
            if (err) {
                rej(err); 
            } else {
                res(ok);
            }
        });
    });
}
