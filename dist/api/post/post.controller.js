"use strict";function handleError(r,e){return r.send(500,e)}var _=require("lodash"),Post=require("./post.model"),underscore=require("underscore"),s3=require("s3"),client=s3.createClient({maxAsyncS3:20,s3RetryCount:3,s3RetryDelay:1e3,multipartUploadThreshold:20971520,multipartUploadSize:15728640,s3Options:{accessKeyId:"AKIAIZPQYKHYUICKCVDA",secretAccessKey:"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"}});exports.postImageUpload=function(r,e){var o=(underscore.pick(r.body,"name","description"),r.files.file),n={localFile:o.path,s3Params:{Bucket:"triby",Key:"blog-"+o.name,ACL:"public-read"}},t=client.uploadFile(n);t.on("error",function(r){console.error("unable to upload:",r.stack),e.send({status:"error",url_file:url})}),t.on("progress",function(){console.log("progress",t.progressMd5Amount,t.progressAmount,t.progressTotal)}),t.on("end",function(){console.log("done uploading");var r=s3.getPublicUrlHttp("triby","blog-"+o.name);e.send({status:"success",url_file:r})})},exports.index=function(r,e){Post.find().populate("post_author").exec(function(r,o){return r?handleError(e,r):e.json(200,o)})},exports.show=function(r,e){Post.findById(r.params.id).populate("post_author").exec(function(r,o){return r?handleError(e,r):o?e.json(o):e.send(404)})},exports.showAuthorPost=function(r,e){Post.find({post_author:r.params.id},function(r,o){return r?handleError(e,r):o?e.json(o):e.send(404)})},exports.filterPosts=function(r,e){Post.find({category:r.params.id},function(r,o){return r?handleError(e,r):o?e.json(o):e.send(404)})},exports.editPost=function(r,e){Post.findById(r.params.id,function(r,o){return r?handleError(e,r):o?e.json(o):e.send(404)})},exports.create=function(r,e){Post.create(r.body,function(r,o){return r?handleError(e,r):e.json(201,o)})},exports.update=function(r,e){r.body._id&&delete r.body._id,Post.findById(r.params.id,function(o,n){if(o)return handleError(e,o);if(!n)return e.send(404);var t=_.merge(n,r.body);t.save(function(r){return r?handleError(e,r):e.json(200,n)})})},exports.destroy=function(r,e){Post.findById(r.params.id,function(r,o){return r?handleError(e,r):o?void o.remove(function(r){return r?handleError(e,r):e.send(204)}):e.send(404)})};