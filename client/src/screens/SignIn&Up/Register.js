import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";

export default function Register() {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("buyer");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register', {
                firstname,
                lastname,
                email,
                password,
                phone,
                role
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout>
            <div className="login">
                <div className="login-info">
                    <h1> Register </h1>
                    <form onSubmit={handleSubmit} >
                        <div className="mb-3">
                            <input type="text" value={firstname} onChange={(e) => setfirstname(e.target.value)} className="form-control" placeholder='Enter your First Name' required />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={lastname} onChange={(e) => setlastname(e.target.value)} className="form-control" placeholder='Enter your Last Name' required />
                        </div>
                        <div className="mb-3">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder='Enter your Email' required />
                        </div>
                        <div className="mb-3">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder='Enter your Password' required />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder='Enter your Phone' required />
                        </div>
                        <div className="mb-3">
                            <select value={role} onChange={(e) => setRole(e.target.value)} className="form-control">
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-login">Submit</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
