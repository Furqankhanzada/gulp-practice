'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: String,
//    slug: String,
    term_group: {type: Schema.ObjectId}
});

module.exports = mongoose.model('Category', CategorySchema);