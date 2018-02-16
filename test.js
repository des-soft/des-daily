const child_process = require('child_process')


child_process.exec('electron .', (err, stdout, stderr) => {
    err && console.log(err); 

    console.log(stdout); 

    

}); 
