import React, { useState } from 'react';
import { EMPLOYEE_API_END_POINT } from '../../utils/constant';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const Edit = () => {
    const {id} = useParams()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        courses: [],
        image: null
    });

    const [error, setError] = useState('');
   const navigate = useNavigate()
    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // For gender (radio buttons)
        if (name === "gender") {
            setFormData({
                ...formData,
                gender: value
            });
        }
        // For courses (checkboxes)
        else if (name === "courses") {
            const selectedCourses = formData.courses.includes(value)
                ? formData.courses.filter(course => course !== value)
                : [...formData.courses, value];
            setFormData({
                ...formData,
                courses: selectedCourses
            });
        }
        // For other input fields (text or select)
        else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const validImageTypes = ['image/jpeg', 'image/png'];

        if (file && validImageTypes.includes(file.type)) {
            setFormData({
                ...formData,
                image: file
            });
            setError('');
        } else {
            setError('Please upload a valid image (JPG/PNG).');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create a FormData object to handle file upload
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('mobileNo', formData.mobileNo);
        formDataToSend.append('designation', formData.designation);
        formDataToSend.append('gender', formData.gender);
    
        // Append courses as an array
        formData.courses.forEach(course => {
            formDataToSend.append('courses[]', course);
        });
    
        // Append the image if selected
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }
    
        try {
            const res = await axios.put(`${EMPLOYEE_API_END_POINT}/editProfile/${id}`, formDataToSend, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
    
            if (res.data.success) {
                navigate("/employee-list");
                toast.success(res.data.message);
            }
        }
        catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
    };
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Edit Employee Details</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        
                    />
                </div>

                {/* Mobile No */}
                <div className="flex flex-col">
                    <label htmlFor="mobileNo" className="text-sm font-medium text-gray-700">Mobile No</label>
                    <input
                        type="text"
                        id="mobileNo"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Designation (Dropdown) */}
                <div className="flex flex-col">
                    <label htmlFor="designation" className="text-sm font-medium text-gray-700">Designation</label>
                    <select
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>

                {/* Gender (Radio Buttons) */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Gender</label>
                    <div className="flex items-center space-x-4 mt-1">
                        <div>
                            <input
                                type="radio"
                                id="M"
                                name="gender"
                                value="M"
                                checked={formData.gender === 'M'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="M" className="text-sm">M</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="F"
                                name="gender"
                                value="F"
                                checked={formData.gender === 'F'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="F" className="text-sm">F</label>
                        </div>
                    </div>
                </div>

                {/* Courses (Checkboxes) */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Courses</label>
                    <div className="flex items-center space-x-4 mt-1">
                        <div>
                            <input
                                type="checkbox"
                                id="BCA"
                                name="courses"
                                value="BCA"
                                checked={formData.courses.includes('BCA')}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="BCA" className="text-sm">BCA</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="MCA"
                                name="courses"
                                value="MCA"
                                checked={formData.courses.includes('MCA')}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="MCA" className="text-sm">MCA</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="BSC"
                                name="courses"
                                value="BSC"
                                checked={formData.courses.includes('BSC')}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="BSC" className="text-sm">BSC</label>
                        </div>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="flex flex-col">
                    <label htmlFor="image" className="text-sm font-medium text-gray-700">Profile Image (JPG/PNG)</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                        className="p-2 mt-1 border border-gray-300 rounded-md"
                    />
                    {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Edit Employee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
