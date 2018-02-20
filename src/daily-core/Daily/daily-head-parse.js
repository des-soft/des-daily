module.exports = text => (
    text.slice(1, -1)
        .split('\n')
        .map(e => e.trim())
        .filter(e => e)
        .reduce((obj, cur) => {
            let [key, val] = cur.split(':'); 

            if (!val || !key) {
                return obj; 
            } else {
                key = key.trim(); 
                val = val.trim(); 

                obj[key] = val; 

                return obj; 
            }
        }, {})
); 
