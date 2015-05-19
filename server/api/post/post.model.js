'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  post_author: { type: Schema.ObjectId, ref: 'User' },
  post_date: { type: Date, default: Date.now },
  //post_date_gmt: { type: Date, default: Date.now },
  post_content: String,
  post_tittle: String,
  post_status: String,
  image: String,
  //comment_status: String,
  post_name: String,
  pinged: String,
  post_modified_date: String,
  //post_modified_gmt: String,
  menu_order: String,
  comment_count: String,
  category: String

});

module.exports = mongoose.model('Post', PostSchema);
