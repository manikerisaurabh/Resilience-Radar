import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const governmentEmployeeSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        enum: ["Infrastructure", "Education", "Healthcare", "Environment", "Social Welfare"],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    profilePic: {
        type: String
    },
    isGovEmp: {
        type: String,
        required: true,
        enum: ['true', 'false'],
        default: true
    },
    queryIncharge: [{
        type: Schema.Types.ObjectId,
        ref: "Query"
    }],
    // You can add more fields as needed, such as address, role, etc.
}, { timestamps: true });

const GovernmentEmployee = mongoose.model('GovernmentEmployee', governmentEmployeeSchema);

export default GovernmentEmployee;
