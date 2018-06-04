const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName : String,
    lastName : String,
    userName : {type: String, unique: true },
    email : {type: String, unique: true , lowercase: true},
    password : String,

});

UserSchema.pre('save',function(next){
    let user = this;

    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt)=> {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, (err,hash) =>{
            if (err) return next(err);
            user.password = hash;
            next();
        })
    });   
});

UserSchema.methods.comparePasswords = function (password) {
    return bcrypt.compareSync(password, this.password);
};
const model = mongoose.model('user',UserSchema);

module.exports = model;