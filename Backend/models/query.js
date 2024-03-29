import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const querySchema = new mongoose.Schema({
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

        },
        country: {
            type: String,

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

const Query = mongoose.model("Query", querySchema);
export default Query;










// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const querySchema = new Schema({
//   raisedBy: {
//     type: Schema.Types.ObjectId,
//     ref: "User"
//   },
//   location: {
//     village: {
//       type: String,
//       required: true
//     },
//     county: {
//       type: String
//     },
//     district: {
//       type: String
//     },
//     state: {
//       type: String
//     },
//     country: {
//       type: String
//     }
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   img: {
//     type: String,
//     required: true
//   },
//   category: { // New attribute
//     type: String,
//     required: true,
//     enum: ["Infrastructure", "Education", "Healthcare", "Environment", "Social Welfare"] // Example categories
//   },
//   urgency: { // New attribute
//     type: String,
//     enum: ["Low", "Medium", "High", "Critical"]
//   },
//   status: { // New attribute
//     type: String,
//     enum: ["New", "Under Investigation", "Proposed Solution", "In Progress", "Resolved"]
//   },
//   estimatedImpact: { // New attribute (optional)
//     type: Number
//   },
//   dateReported: { // New attribute (optional)
//     type: Date,
//     default: Date.now
//   },
//   targetPopulation: { // New attribute (optional)
//     type: Number
//   },
//   costEstimation: { // New attribute (optional)
//     type: Number
//   },
//   proposedSolutions: { // New attribute (optional)
//     type: String
//   },
//   attachments: { // New attribute (optional)
//     type: [String]
//   },
//   geolocation: { // New attribute (optional) - consider privacy concerns
//     type: {
//       type: String,
//       enum: ["Point"] // GeoJSON Point format
//     },
//     coordinates: {
//       type: [Number],
//       index: "2dsphere" // Enable geospatial queries
//     }
//   }
// });

// const query = mongoose.model("Query", querySchema);
// module.exports = query;
