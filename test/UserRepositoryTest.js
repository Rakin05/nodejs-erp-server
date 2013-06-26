var mongoose = require("mongoose");
var should = require("should");
var config = require("../config/test");

var UserRepository = require("../repositories/UserRepository");

describe("UserRepository", function(){
    var repository = null;
    before(function(done){
        // open the connection to mongodb
        mongoose.connect(config.db);
        repository = new UserRepository();
        done();
    });

    it("should be true that true is true", function(done){
        repository.createUser(
            "Rakin",
            "Felix", "Klotzsche",
            "felixklotzsche@gmail.com",
            "test123").then(function(doc){
                should.exist(doc);
                doc.should.have.property("userName");
                doc.should.have.property("firstName");
                doc.should.have.property("lastName");
                doc.should.have.property("email");
                doc.should.have.property("password");
                doc.should.have.property("auth_token");
                done();
            }).fail(function(err){
                done(err);
            });
    });

    after(function(done){
        //close the connection
        mongoose.connection.close(function(err){
            done(err);
        });
    });
});
