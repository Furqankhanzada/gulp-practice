"use strict";var should=require("should"),app=require("../../app"),User=require("./user.model"),user=new User({provider:"local",name:"Fake User",email:"test@test.com",password:"password"});describe("User Model",function(){before(function(e){User.remove().exec().then(function(){e()})}),afterEach(function(e){User.remove().exec().then(function(){e()})}),it("should begin with no users",function(e){User.find({},function(s,t){t.should.have.length(0),e()})}),it("should fail when saving a duplicate user",function(e){user.save(function(){var s=new User(user);s.save(function(s){should.exist(s),e()})})}),it("should fail when saving without an email",function(e){user.email="",user.save(function(s){should.exist(s),e()})}),it("should authenticate user if password is valid",function(){return user.authenticate("password").should.be["true"]}),it("should not authenticate user if password is invalid",function(){return user.authenticate("blah").should.not.be["true"]})});