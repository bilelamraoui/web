const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OffreSchema = new Schema({
    username: String,
    entreprise: String,
    ville: String,
    date: String,
    email: String,
    tel: Number,
    poste: String,
    description: String,

})

const model = mongoose.model('offre', OffreSchema);

module.exports = model;

