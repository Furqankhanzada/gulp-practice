'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var underscore = require('underscore');
var s3 = require('s3');

var client = s3.createClient({
    maxAsyncS3: 20,     // this is the default
    s3RetryCount: 3,    // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
        accessKeyId: 'AKIAIZPQYKHYUICKCVDA',
        secretAccessKey: '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'
        // any other options are passed to new AWS.S3()
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    }
});

//upload image on s3
exports.postImageUpload = function(req, res) {

    var data = underscore.pick(req.body, 'name', 'description')
        , file = req.files.file;

    var params = {
        localFile: file.path,
        s3Params: {
            Bucket: 'triby',
            Key: 'blog-' + file.name,
            ACL: 'public-read'
        }
    };
    var uploader = client.uploadFile(params);
    uploader.on('error', function(err) {
        console.error("unable to upload:", err.stack);
        res.send({"status":"error","url_file": url});
    });
    uploader.on('progress', function() {
        console.log("progress", uploader.progressMd5Amount,
            uploader.progressAmount, uploader.progressTotal);
    });
    uploader.on('end', function() {
        console.log("done uploading");
        var url = s3.getPublicUrlHttp('triby','blog-' + file.name);
        res.send({"status":"success","url_file": url});
    });
};

// Get list of posts
exports.index = function(req, res) {
    Post.find().populate('post_author').exec(function (err, posts) {
        if(err) { return handleError(res, err); }
        return res.json(200, posts);
    });
};

// Get a single post
exports.show = function(req, res) {
  Post.findById(req.params.id).populate('post_author').exec (function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    return res.json(post);
  });
};

exports.showAuthorPost = function(req, res) {
    Post.find({post_author: req.params.id}, function (err, post) {
        if(err) { return handleError(res, err); }
        if(!post) { return res.send(404); }
        return res.json(post);
    });
};
exports.filterPosts = function(req, res) {
    Post.find({category: req.params.id}, function (err, post) {
        if(err) { return handleError(res, err); }
        if(!post) { return res.send(404); }
        return res.json(post);
    });
};
exports.editPost = function(req, res) {
    Post.findById(req.params.id, function (err, post) {
        if(err) { return handleError(res, err); }
        if(!post) { return res.send(404); }
        return res.json(post);
    });
};

// Creates a new post in the DB.
exports.create = function(req, res) {
  Post.create(req.body, function(err, post) {
    if(err) { return handleError(res, err); }
    return res.json(201, post);
  });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
