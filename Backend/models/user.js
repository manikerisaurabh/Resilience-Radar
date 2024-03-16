const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    address: {
        village: {
            type: String,
        },
        county: {
            type: String
        },
        district: {
            type: String
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }
});

const user = mongoose.model("User", userSchema);
module.exports = user;