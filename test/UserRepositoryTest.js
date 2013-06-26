var mongoose = require("mongoose");
var should = require("should");
var config = require("../config/test");

var UserRepository = require("../repositories/UserRepository");
var User = require("../models/UserModel");

describe("UserRepository", function(){
    var repository = null;
    before(function(done){
        // open the connection to mongodb
        mongoose.connect(config.db);
        repository = new UserRepository();
        done();
    });

    it("should save a new User", function(done){
        repository.createUser("Rakin",
                              "Felix",
                              "Klotzsche",
                              "test@test.com",
                              "test123"
                             )
            .then(function(doc){
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

    it("should find a user by userName", function(done){
        repository.findByUserName("Rakin").then(function(doc){
            should.exist(doc);
            doc.should.have.property("userName");
            doc.userName.should.equal("Rakin");
            done();
        }).fail(function(err){
           done(err); 
        });
    });

    it("should find a user by email", function(done){
        repository.findByEmail("test@test.com")
            .then(function(doc){
                should.exist(doc);
                doc.should.have.property("userName");
                doc.should.have.property("email");
                doc.userName.should.equal("Rakin");
                doc.email.should.equal("test@test.com");
                done();
            }).fail(function(err){
                done(err);
            });
    });

    // 
    it("should have the ability to count users", function(done){
        repository.countUsers()
            .then(function(count){
                count.should.equal(1);
                done();
            }).fail(function(err){
                done(err);
            });

        // goddamn is this ugly :-D
        // create a new user and the userCount should now be 2
        repository.createUser("test", "test", "test", "test@test.com","test")
            .then(function(){
                repository.countUsers().then(function(count){
                    count.should.equal(2);
                });
            }).fail(function(err){
                done(err);
            });
    });

    after(function(done){
        User.remove({}, function(err){
            if(err){
                done(err);
            }else{
                mongoose.connection.close(function(err){
                    done();
                });
            }
        });
    });
});
