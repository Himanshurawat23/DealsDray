import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { EMPLOYEE_API_END_POINT } from '../../utils/constant';
import { setEmployee } from '../../redux/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [total, setTotal] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [sortField, setSortField] = useState('name');  // Default sort field
    const [sortOrder, setSortOrder] = useState('asc');   // Default sort order (ascending)
    const [searchQuery, setSearchQuery] = useState('');  // State for search query
    const dispatch = useDispatch();
    const { employees } = useSelector(store => store.employee);

    useEffect(() => {
        const fetchemployees = async () => {
            try {
                const res = await axios.get(`${EMPLOYEE_API_END_POINT}/extractEmployee`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setEmployee(res.data.employesslist));
                    setTotal(res.data.totalemployee);
                }
            } catch (error) {
                console.log(error.response?.data?.message || error.message);
                toast.error(error.response?.data?.message || "Error fetching employees");
            }
        };
        fetchemployees();
    }, [dispatch, refresh]);

    const deleteEmployee = async (employeeId) => {
        try {
            const res = await axios.delete(`${EMPLOYEE_API_END_POINT}/deleteProfile/${employeeId}`, { withCredentials: true });
            if (res.data.success) {
                toast.success("Employee deleted successfully");
                setRefresh(!refresh);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting employee");
        }
    };

    const handleSort = (field) => {
        setSortField(field);
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc')); 
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        let fieldA = a[sortField];
        let fieldB = b[sortField];

        // For date comparison
        if (sortField === 'createdAt') {
            fieldA = new Date(fieldA);
            fieldB = new Date(fieldB);
        }

        if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div className="p-4">
            <div className="text-xl font-semibold mb-4">
                Total Employees: {total}
            </div>

            <div className="overflow-x-auto shadow-md">
                <div className="bg-blue-200 p-4 rounded-t-lg flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Employee List</h2>
                    <input
                        type="text"
                        placeholder="Serach by Employee name"
                        className="border rounded-lg px-4 py-2 outline-none w-1/3"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="p-3 text-left border-b border-gray-300 w-24">Unique ID</th>
                            <th className="p-3 text-left border-b border-gray-300 w-20">Image</th>
                            <th className="p-3 text-left border-b border-gray-300 w-40">
                                <button onClick={() => handleSort('name')} className="text-blue-600">
                                    Name {sortField === 'name' && (sortOrder === 'asc' ? '↓' : '↑')}
                                </button>
                            </th>
                            <th className="p-3 text-left border-b border-gray-300 w-40">
                                <button onClick={() => handleSort('email')} className="text-blue-600">
                                    Email {sortField === 'email' && (sortOrder === 'asc' ? '↓' : '↑')}
                                </button>
                            </th>
                            <th className="p-3 text-left border-b border-gray-300 w-32">Mobile No</th>
                            <th className="p-3 text-left border-b border-gray-300 w-32">Designation</th>
                            <th className="p-3 text-left border-b border-gray-300 w-16">Gender</th>
                            <th className="p-3 text-left border-b border-gray-300 w-24">Courses</th>
                            <th className="p-3 text-left border-b border-gray-300 w-32">
                                <button onClick={() => handleSort('createdAt')} className="text-blue-600">
                                    Create Date {sortField === 'createdAt' && (sortOrder === 'asc' ? '↓' : '↑')}
                                </button>
                            </th>
                            <th className="p-3 text-left border-b border-gray-300 w-24">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEmployees.map((employee) => (
                            <tr key={employee._id} className="border-b hover:bg-gray-100">
                                <td className="p-3 w-24">{employee._id ? employee._id.slice(-6) : 'N/A'}</td>
                                <td className="p-3 w-20">
                                    {employee.profileimage ? (
                                        <img src={employee.profileimage} alt="Employee" className="w-8 h-8 rounded-full" />
                                    ) : (
                                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                    )}
                                </td>
                                <td className="p-3 w-40">{employee.name}</td>
                                <td className="p-3 w-40 text-blue-600">{employee.email}</td>
                                <td className="p-3 w-32">{employee.mobileNo}</td>
                                <td className="p-3 w-32">{employee.designation}</td>
                                <td className="p-3 w-16">{employee.gender}</td>
                                <td className="p-3 w-24">{employee.courses ? employee.courses.join(', ') : 'N/A'}</td>
                                <td className="p-3 w-32">
                                    {employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="p-3 w-24 space-x-2">
                                    <Link to={`/edit/${employee._id}`}><button className="text-blue-600 hover:underline">Edit</button></Link>
                                    <button onClick={() => deleteEmployee(employee._id)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
