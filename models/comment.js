const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    text: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },                
    createdAt: { type: Date, default: Date.now } 
});
module.exports = mongoose.model("Comment", commentSchema);
