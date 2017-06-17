/**
 * Created by ryanrodwell on 6/9/17.
 */
// Include the Mongoose Dependencies
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let ArticleSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "Title is Required"
    },
    date: {
        type: Date,
        default: Date.now,
        required: "Date is Required"
    },
    url: {
        type: String,
        required: "URL is Required",
        unique: true
    }
});

// Create the Model
let Article = mongoose.model('Article', ArticleSchema);

// Export it for use elsewhere
module.exports = Article;