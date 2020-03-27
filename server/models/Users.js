const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const UsersSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    groups: {
        type: Schema.Types.ObjectId,
        ref: "groups"
    }

});

UsersSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = User = mongoose.model("users", UsersSchema, "users");