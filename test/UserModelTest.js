var should = require("should");

var User = require("../models/UserModel");

describe("UserModel", function(){
    var user = null;

    // setup a User to work with
    before(function(){
        user = new User(
            {
                //some credentials to work with
                userName: "newUser",
                firstName: "New",
                lastName: "User",
                email: "newuser@user.com",
                password: "test123"
            }
        );
    });
    describe("propertys", function(){
        it("should have a _id", function(){
            user.should.have.property("_id");
        });

        it("should have a Username", function(){
            user.should.have.property("userName");
            user.userName.should.be.a("string");
        });
        
        it("should have a firstName", function(){
            user.should.have.property("firstName");
            user.firstName.should.be.a("string");
        });

        it("should have a lastName", function(){
            user.should.have.property("lastName");
            user.lastName.should.be.a("string");
        });

        it("should have a email", function(){
            user.should.have.property("email");
            user.email.should.be.a("string");
        });

        it("should have a password", function(){
            user.should.have.property("password");
            user.password.should.be.a("string");
        });

        it("should have an auth_token", function(){
            user.should.have.property("auth_token");
            user.auth_token.should.be.a("string");
        });
    });
});
