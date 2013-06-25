var mongoose = require("mongoose");

var userSchema =  mongoose.Schema({
    userName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    auth_token: { type: String, default: ''}
});

var User = mongoose.model("user", userSchema);

module.exports = User;
