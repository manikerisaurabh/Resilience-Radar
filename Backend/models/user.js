import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
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
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    totalQuery: [{
        type: Schema.Types.ObjectId,
        ref: "Query"
    }],
    resolvedQueries: [{
        type: Schema.Types.ObjectId,
        ref: "Query"
    }],
    pendingToApprove: [{
        type: Schema.Types.ObjectId,
        ref: "Query"
    }],
    isGovEmp: {
        type: String,
        required: true,
        enum: ['true', 'false'],
        default: false
    }
});

const User = mongoose.model("User", userSchema);
export default User;