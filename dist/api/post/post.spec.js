"use strict";var should=require("should"),app=require("../../app"),request=require("supertest");describe("GET /api/posts",function(){it("should respond with JSON array",function(e){request(app).get("/api/posts").expect(200).expect("Content-Type",/json/).end(function(t,r){return t?e(t):(r.body.should.be["instanceof"](Array),void e())})})});