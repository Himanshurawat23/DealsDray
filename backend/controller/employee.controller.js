
import { Employee } from "../models/employee.models.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";





export const create_employee = async (req, res) => {
    try {
        const { name, email, mobileNo, designation, gender, courses } = req.body
        console.log(req.body)
        if (!name || !email || !mobileNo || !designation || !gender || !courses || !req.file) {
            return res.status(401).json({
                message: "Something is missing",
                success: true
            })
        }
    
        const file = req.file;

        const fileUri = getDataUri(file);
        
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
  
        const employee = await Employee.findOne({ email });
        if (employee) {
            return res.status(400).json({
                message: "Try some other emailID",
                success: false
            })
        }

        console.log(cloudResponse.secure_url)
        await Employee.create({
            name,
            email,
            mobileNo,
            designation,
            gender,
            courses,
            profileimage: cloudResponse.secure_url
        })
        return res.status(200).json({
            message: "Employee created successfully",
            success: true
        })
    }
    catch (error) {
        return res.status(400).json({
            message: "Internal Error",
            success: true
        })
    }
}

export const fetchallemployee = async (req, res) => {
    try {
        const employesslist = await Employee.find()
        if (!employesslist) {
            return res.status(400).json({
                message: "currently there is no employee present",
                success: false
            })
        }
        let totalemployee = await Employee.countDocuments()
        return res.status(201).json({
            message: "Emplyee find it",
            success: true,
            employesslist,
            totalemployee
        })
    }
    catch (error) {
        return res.status(400).json({
            message: "Internal Error",
            success: true
        })
    }
}

export const edit_employee = async (req, res) => {
    try {
        const { name, email, mobileNo, designation, gender, courses } = req.body
        let employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(501).json({
                message: "There is no employee"
            })
        }
        if (name) employee.name = name
        if (email) employee.email = email
        if (mobileNo) employee.mobileNo = mobileNo
        if (designation) employee.designation = designation
        if (gender) employee.gender = gender
        if (courses) employee.courses = courses
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            employee.profileimage=cloudResponse.secure_url
        }
        await employee.save()
        console.log("108")
        employee={
            _id : employee._id,
            name:employee.name,
            email:employee.email,
            mobileNo:employee.mobileNo,
            designation:employee.designation,
            gender:employee.gender,
            courses:employee.courses,
            profileimage:employee.profileimage
        }
        return res.status(200).json({
            message: "Profile updated successfully.",
            success: true
        })
    }
    catch (error) {
        return res.status(400).json({
            message: "Internal Error",
            success: true
        })
    }
}

export const delete_employee = async (req,res)=>{
    try{
       const employeeId = req.params.id
       if(!employeeId){
        return res.status(400).json({
            message:"there is no employee with this emailID",
            success:false
        })
       }
       await Employee.findByIdAndDelete(employeeId)
       let totalemployee = await Employee.countDocuments()
       return res.status(200).json({
        message:"Employee removed successfully",
        success:true,
       })

    }
    catch (error){
        return res.status(400).json({
            message:"Internal server error"
        })
    }
}