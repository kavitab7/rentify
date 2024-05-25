import React from 'react'
import { NavLink, Link } from "react-router-dom";
import { FaHotel } from "react-icons/fa6";
import { useAuth } from '../Context/auth';
import toast from 'react-hot-toast';

export default function Header() {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" href="#">
                        <FaHotel /> Rentify</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active" aria-current="page" >Home</NavLink>
                            </li>

                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link" >Register</NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link ">Login</NavLink>
                                    </li>
                                </>) : (<>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.firstname}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to={`/dashboard/${auth?.user?.role === 'seller' ? "seller" : "user"}`} className="dropdown-item" >Dashboard</NavLink></li>
                                            <li><NavLink onClick={handleLogout} to="/login" className="dropdown-item ">Logout</NavLink>
                                            </li>
                                        </ul>
                                    </li>


                                </>)
                            }
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
