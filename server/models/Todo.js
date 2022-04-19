const mongoose = require("mongoose")
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema

mongoose.plugin(slug);

const todoSchema = new Schema({

    title: {
      type:String,
      required:true
    },
    body: {
        type:String,
        required:true
    },

    author: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
     
    slug: {
      type: String, 
      slug: "title" 
    },
    done: {
        type: Boolean, 
        default: false
    }
   
    
  },  { timestamps: true });

  const Todo = mongoose.model('Todo', todoSchema);

  exports.Todo = Todo