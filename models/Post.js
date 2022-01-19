const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    tit: { 
        type: String 
    },
    description: { 
        type: String 
    },
    tag: { 
        type: Array
    },
    idAutor: { 
        type: String
    },
    image: { 
        type: String
    }
});

const  Post = mongoose.model('Post', PostSchema)

module.exports =  { Post }
