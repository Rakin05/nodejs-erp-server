var mongoose = require("mongoose");
var should = require("should");
var config = require("../config/test");


var UserRepository = require("../repositories/UserRepository");

describe("UserRepository", function(){
    before(function(done){
        // open the connection to mongodb
        mongoose.connect(config.db);
        done();
    });

    it("should be true that true is true", function(){
        true.should.equal(true);
    });

    after(function(done){
        //close the connection
        mongoose.connection.close(function(err){
            done(err);
        });
    });
});
