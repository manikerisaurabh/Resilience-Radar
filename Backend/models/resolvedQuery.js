import mongoose from "mongoose";
const Schema = mongoose.Schema;
const resolvedQuerySchema = new mongoose.Schema({
    resolverId: {
        type: Schema.Types.ObjectId,
        ref: "GovernmentEmployee"
    },
    location: {
        village: {
            type: String,
            required: true
        },
        county: {
            type: String
        },
        district: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        }
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    commitDate: {
        type: Date,
        default: Date.now
    }
});

const ResolvedQuery = mongoose.model("ResolvedQuery", resolvedQuerySchema);
export default ResolvedQuery;