"use strict";var errors=require("./components/errors");module.exports=function(e){e.use("/api/comments",require("./api/comment")),e.use("/api/categories",require("./api/category")),e.use("/api/categoryies",require("./api/category")),e.use("/api/posts",require("./api/post")),e.use("/api/users",require("./api/user")),e.use("/auth",require("./auth")),e.route("/:url(api|auth|components|app|bower_components|assets)/*").get(errors[404]),e.route("/*").get(function(r,s){s.sendfile(e.get("appPath")+"/index.html")})};