const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be null'],
        unique: true
    },
    password: String,
    created_date: Date,
    modified_date: Date,
    email:  {
        type: String,
        required: [true, 'Email cannot be empty'],
        unique: true
    },
    name: String,
    registered: { type: Boolean, default: true }
});

UserSchema.pre('save', ()=>{
    const currentDate = new Date();

    this.modified_date = currentDate;

    if(!created_date)
        this.created_date = currentDate;
});

var User = mongoose.model('User', UserSchema, 'users');

module.exports = User;