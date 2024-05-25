import React from 'react'
import Layout from '../../components/Layout'
import { useAuth } from '../../Context/auth';


export default function Dashboard() {
    const [auth] = useAuth();
    return (
        <Layout >
            <div className="container-fluid p-3 m-3 dashboard">
                <div className="col-md-9">
                    <div className="card w-75 p-3">
                        <h3>{auth?.user?.Firstname}</h3> <span>{auth?.user?.Lastname}</span>
                        <h3>{auth?.user?.email}</h3>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
