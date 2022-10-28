const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    present: {
        type: Number,
        default: 0
    },
    absent: {
        type: Number,
        default: 0
    }
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student