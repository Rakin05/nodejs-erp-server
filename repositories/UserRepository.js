var q = require("q");

var User = require("../models/UserModel");


function UserRepository(){
    this.createUser = createUser;
}

function createUser(userName, firstName, lastName, password, email){
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

module.exports = UserRepository;
