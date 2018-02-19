const osHomedir = require('os-homedir')
    , path = require('path')
    , USER_HOME = osHomedir()
    , mkdir = require('../utils/mkdir')
    , DAILY_DIR = path.join(USER_HOME, '.des-daily')

// mkdir /home/wang/.des-daily 
mkdir(DAILY_DIR); 

module.exports = DAILY_DIR; 

