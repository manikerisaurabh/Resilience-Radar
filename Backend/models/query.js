// import mongoose from 'mongoose'
// const Schema = mongoose.Schema;

// const querySchema = new mongoose.Schema({
//     raisedBy: {
//         type: Schema.Types.ObjectId,
//         ref: "User"
//     },
//     location: {
//         village: {
//             type: String,
//         },
//         county: {
//             type: String
//         },
//         district: {
//             type: String
//         },
//         state: {
//             type: String,

//         },
//         country: {
//             type: String,

//         }
//     },
//     description: {
//         type: String
//     },
//     img: {
//         type: String,
//         required: true
//     }
// });

// const Query = mongoose.model("Query", querySchema);
// export default Query;










import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const querySchema = new Schema({
    raisedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    location: {
        village: {
            type: String
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
    category: { // New attribute
        type: String,
        required: true,
        enum: ["Infrastructure", "Education", "Healthcare", "Environment", "Social Welfare"] // Example categories
    },
    urgency: { // New attribute
        type: String,
        enum: ["Low", "Medium", "High", "Critical"]
    },
    status: { // New attribute
        type: String,
        enum: ["New", "In Progress", "Commit", "Resolved"]    //"Under Investigation", "Proposed Solution",
    },
    dateReported: { // New attribute (optional)
        type: Date,
        default: Date.now
    },
    completionDate: {
        type: Date
    },
    targetPopulation: { // New attribute (optional)
        type: Number
    },

});

const Query = mongoose.model("Query", querySchema);
export default Query;
