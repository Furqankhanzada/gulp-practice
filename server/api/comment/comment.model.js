'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  comment_post_id: { type: Schema.ObjectId, ref: 'Post' },
  comment_author: String,
  comment_author_email: String,
  comment_author_url: String,
  comment_author_ip: String,
  comment_date: { type: Date, default: Date.now },
  comment_gate_gmt: { type: Date, default: Date.now },
  comment_content: {type:String, required: 'Content is required'},
  comment_karma: String,
  comment_approved: Boolean,
  comment_agent: String,
  comment_type: String,
  comment_parent: String
});

module.exports = mongoose.model('Comment', CommentSchema);