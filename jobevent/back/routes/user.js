const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../model/user');
const userRoutes = express.Router();

userRoutes.get('/',function(req,res){
    User.find(function(err, users){
        if(err){
            console.log(err);
            
        }else{
            res.json(users);
        }
    })
});

userRoutes.post('/login', (req,res)=>{
    User.findOne({email: req.body.email},function(err, existingUser){
        if (existingUser) {
            if (existingUser.comparePasswords(req.body.password)) {
                sendToken(existingUser, res)
            } else{
                return res.json({
                    passNoSuccess: true,
                    message: "Password is incorrect !"
                });
            }
            
        } else {
            return res.json({
                userNoSuccess: true,
                message: "Email is incorrect !"
            });
        }
    });
});

userRoutes.post('/add',function (req, res, next) {
    let user = new User(req.body);

    User.findOne({email: req.body.email}, function (err, existingUser){
        if (existingUser) {
            res.json({
                data: req.body.email,
                message: "already exist !"
            });
        }else {
            user.save((err,user)=>{
                if (err) return next(err);
                sendToken(user, res);
            });

        }
    });
});
userRoutes.delete('/delete/:username', checkAuthenticated, (req, res, next) => {
    User.findOneAndRemove({userName: req.params.username},(err,user) =>{
        if (err)return next(err);
        console.log(user);
        res.json(user);
    })
})

function checkAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
        return res.send({message: 'Unauthorized request. Missing authentification header'});
    }
    let token = req.header('Authorization').split(' ')[1];
    let payload = jwt.decode(token, '123abc1234');

    if (!payload) {
        return res.sendFile({message: 'Unautorised request. Authentification header is invalid'});
    }
    req.user = payload;

    next();
}

userRoutes.put('/edit', checkAuthenticated, (req, res, next) =>{
    User.findOne({ _id: req.user}, (err, user) => {
        if (err) return next(err); 
        if (user.userName !== req.body.userName.toLowerCase()) {
            User.findOne({ userName: req.body.userName.toLowerCase() }, function (err, existingUsername) {
                if(err) return next(err);

                if (existingUsername) {
                    if (user._id !== existingUsername._id) {
                        return res.json({
                            data: req.body.userName || req.body.userName.toLowerCase(),
                            message: "already exist !"
                        });
                        
                    }
                    
                }else {
                        user.firstName = req.body.firstName;
                        user.lastName = req.body.lastName;
                        user.userName = req.body.userName;
                        user.email = req.body.email;
                        user.password = req.body.password;
                        user.save();
                        res.json(user);
                }
            });
            
        } else{
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.userName = req.body.userName;
            user.email = req.body.email;
            user.password = req.body.password;
            user.save();
            res.json(user); 
        }
    })
})

userRoutes.get('/edit/:username', function (req, res) {
    User.findOne({ userName: req.params.username}, (err, user) =>{
        res.json(user);
    });   
});
function sendToken(user, res){
    let token = jwt.sign(user.id, '123abc1234');
    res.json({
        username: user.userName,
        token
    });
}

module.exports = userRoutes;