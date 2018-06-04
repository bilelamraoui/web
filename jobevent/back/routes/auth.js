const express = require('express');
const user = require('../model/user');
const router = express.Router();


router.get('/', function(req, res) {
    user.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
});

router.post('/register', function (req, res) {
    let request = body.req;

    res.send(request);
});

module.exports = router;