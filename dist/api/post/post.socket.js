"use strict";function onSave(e,o,t){e.emit("post:save",o)}function onRemove(e,o,t){e.emit("post:remove",o)}var Post=require("./post.model");exports.register=function(e){Post.schema.post("save",function(o){onSave(e,o)}),Post.schema.post("remove",function(o){onRemove(e,o)})};