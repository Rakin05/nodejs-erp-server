var q = require("q");

var User = require("../models/UserModel");


function UserRepository(){
    this.createUser = createUser;
    this.findByUserName = findByUserName;
    this.findByEmail = findByEmail;
    this.countUsers = countUsers
}

function createUser(userName, firstName, lastName, email, password){
    var deferred = q.defer();

    // allocate a new User and set the properties right
    var newUser = new User();
    newUser.userName = userName;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = password;
    newUser.email = email;

    // create the new User and return the saved User on Success
    newUser.save(function(err){
        if(err){
            deferred.reject(new Error(err));
        }else{
            deferred.resolve(newUser);
        }            
    });
    return deferred.promise;
}

function findByUserName(name){
    var deferred = q.defer();
    User.findOne({ userName: name}, function(err, doc){
        if(err){
            deferred.reject(new Error(err));
        }else{
            deferred.resolve(doc);
        }
    });
    return deferred.promise;
}

function findByEmail(_email){
    var deferred = q.defer();
    User.findOne({email: _email}, function(err,doc){
        if(err){
            deferred.reject(new Error(err));
        }else{
            deferred.resolve(doc);
        }
    });
    return deferred.promise;
}

function countUsers(){
    var deferred = q.defer();
    User.count(function(err, count){
        if(err){
            deferred.reject(new Error(err));
        }else{
            deferred.resolve(count);
        }
    });
    return deferred.promise;
}

module.exports = UserRepository;
