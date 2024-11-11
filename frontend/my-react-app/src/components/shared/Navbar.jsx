import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-toastify';
import { setUser } from '../../redux/authSlice';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <nav className="flex items-center p-4 bg-gray-800 text-white">
            <div className="flex-1">
                <Link to="/" className="text-lg font-semibold">Home</Link>
            </div>

            <div className="mx-8">
                <Link to="/employee-list" className="text-lg">EmployeeList</Link>
            </div>

            {/* Added the CreateEmployee Link */}
            <div className="mx-8">
                <Link to="/create-employee" className="text-lg">Create Employee</Link>
            </div>

            <div className="flex-1 text-center">
                <span className="text-lg">{user.username ? user.username : "No one"}</span>
            </div>

            <div className="ml-8">
                <button onClick={logoutHandler} className="text-lg bg-red-500 px-4 py-2 rounded-lg">Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
