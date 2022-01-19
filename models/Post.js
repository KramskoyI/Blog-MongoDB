const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    titel: { 
        type: String 
    },
    description: { 
        type: String 
    },
    tag: { 
        type: String
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
