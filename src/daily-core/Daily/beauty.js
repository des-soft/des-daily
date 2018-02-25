module.exports = function beauty(obj){
    if (typeof obj.tags === 'string'){
        let tags_str = obj.tags; 

        obj.tags = tags_str.split(',').map(e => e.trim()).filter(e => e); 
    }

    if (obj.date) {
        obj.date = new Date(obj.date); 
    }

    return obj; 
}