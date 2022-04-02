const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let student = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

module.exports = mongoose.model('student', student);