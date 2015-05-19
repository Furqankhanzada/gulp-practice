"use strict";var express=require("express"),controller=require("./comment.controller"),router=express.Router();router.get("/",controller.index),router.get("/:id",controller.show),router.get("/:id/reply",controller.showReplyComment),router.post("/",controller.create),router.put("/:id",controller.update),router.patch("/:id",controller.update),router["delete"]("/:id",controller.destroy),module.exports=router;