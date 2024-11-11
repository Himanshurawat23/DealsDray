import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        enum: ['HR', 'Manager', 'Sales'],
        required: true
    },
    gender: {   
        type: String,
        enum: ['M', 'F'], 
        required: true
    },
    courses: {
        type: [String], 
        enum: ['MCA', 'BCA', 'BSC'],
        required: true
    },
    profileimage: {
        type: String,
        default: "" 
    }
}, { timestamps: true });

export const Employee = mongoose.model("Employee", employeeSchema);
