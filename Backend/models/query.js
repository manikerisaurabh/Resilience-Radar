const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const querySchema = new Schema({
    raisedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    location: {
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
    },
    description: {
        type: String
    },
    img: {
        type: String,
        required: true
    }
});

const query = mongoose.model("Query", querySchema);
module.exports = query;