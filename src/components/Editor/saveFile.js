let fs = $require('fs'); 

export default function(path, data){
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
