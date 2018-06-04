const express = require('express');
const User = require('../model/user');
const router = express.Router();
const Offre = require('../model/offre');

router.get('/', function (req, res, next) {
    Offre.find(function (err, offres) {
        if (err) {
            return next(err);

        } else {
            res.json(offres);
        }
    });
});


router.get('/:username', function (req, res, next) {
    User.findOne({ userName: req.params.username }, function (err, user) {
        if (err) return next(err);
        if (user) {
            Offre.find({ username: user.userName }, function (err, contents) {
                if (err) return next(err);
                res.json(contents);
            })
        }
    });
});

router.post('/add/:username', function (req, res, next) {
    User.findOne({ userName: req.params.username }, function (err, user) {
        if (err) return next(err);

        if (user) {
            let offre = new Offre(req.body);
            offre.save(function (err) {
                if (err) return next(err);
                res.json(offre);
            });
        }
    });

});

router.delete('/delete/:username', function (req, res, next) {
    User.findOne({ userName: req.params.username }, function (err, user) {
        if (err) return next(err);

        if (user) {
            Offre.findOneAndRemove({ username: user.userName }, function (err, offre) {
                if (err) return next(err)
                res.json(offre)
            });
        }
    });
});


router.get('/edit/:id', function (req, res, next) {
    Offre.findOne({ _id: req.params.id }, function (err, offre) {
        if (err) return next(err)
        res.json(offre)
    });
});

router.put('/edit', (req, res, next) => {
    Offre.findOne({ _id: req.body._id }, (err, offre) => {
        if (err) return next(err);

        if (offre) {
            offre.entreprise = req.body.entreprise;
            offre.ville = req.body.ville;
            offre.email = req.body.email;
            offre.tel = req.body.tel;
            offre.poste = req.body.poste;
            offre.description = req.body.description;
            offre.save();
            res.json(offre);
        }
    });
});



module.exports = router;
