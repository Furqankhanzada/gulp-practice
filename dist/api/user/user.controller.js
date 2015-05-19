"use strict";function handleError(e,r){return e.send(500,r)}var User=require("./user.model"),passport=require("passport"),config=require("../../config/environment"),jwt=require("jsonwebtoken"),_=require("underscore"),validationError=function(e,r){return e.json(422,r)},s3=require("s3"),client=s3.createClient({maxAsyncS3:20,s3RetryCount:3,s3RetryDelay:1e3,multipartUploadThreshold:20971520,multipartUploadSize:15728640,s3Options:{accessKeyId:"AKIAIZPQYKHYUICKCVDA",secretAccessKey:"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"}});exports.imageUpload=function(e,r){var n=(_.pick(e.body,"name","description"),e.files.file),o={localFile:n.path,s3Params:{Bucket:"triby",Key:"blog-"+n.name,ACL:"public-read"}},s=client.uploadFile(o);s.on("error",function(e){console.error("unable to upload:",e.stack),r.send({status:"error",url_file:url})}),s.on("progress",function(){console.log("progress",s.progressMd5Amount,s.progressAmount,s.progressTotal)}),s.on("end",function(){console.log("done uploading");var e=s3.getPublicUrlHttp("triby","blog-"+n.name);r.send({status:"success",url_file:e})})},exports.index=function(e,r){User.find({},"-salt -hashedPassword",function(e,n){return e?r.send(500,e):void r.json(200,n)})},exports.create=function(e,r,n){var o=new User(e.body);o.provider="local",o.role="subscriber",o.save(function(e,n){if(e)return validationError(r,e);var o=jwt.sign({_id:n._id},config.secrets.session,{expiresInMinutes:300});r.json({token:o})})},exports.show=function(e,r,n){User.findById(e.params.id,function(e,o){return e?n(e):o?void r.json(o):r.send(401)})},exports.showData=function(e,r,n){var o=e.user._id;User.findById(o,function(e,o){return e?n(e):o?void r.json(o):r.send(401)})},exports.destroy=function(e,r){User.findByIdAndRemove(e.params.id,function(e,n){return e?r.send(500,e):r.send(204)})},exports.changePassword=function(e,r,n){var o=e.user._id,s=String(e.body.oldPassword),t=String(e.body.newPassword);User.findById(o,function(e,n){n.authenticate(s)?(n.password=t,n.save(function(e){return e?validationError(r,e):void r.send(200)})):r.send(403)})},exports.me=function(e,r,n){var o=e.user._id;User.findOne({_id:o},"-salt -hashedPassword",function(e,o){return e?n(e):o?void r.json(o):r.json(401)})},exports.update=function(e,r){User.findByIdAndUpdate(e.params.id,e.body,function(n,o){return console.log(e.body),console.log(e.user._id),n?handleError(r,n):o?void r.json(o):r.send(404)})},exports.authCallback=function(e,r,n){r.redirect("/")};