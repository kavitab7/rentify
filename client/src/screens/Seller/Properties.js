import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import SellerMenu from '../../components/SellerMenu'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Properties = () => {
    const [properties, setProperties] = useState([]);

    const getAllProperties = async () => {
        try {
            const { data } = await axios.get('/api/v1/property/get-property');
            setProperties(data.properties);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting properties");
        }
    }

    useEffect(() => {
        getAllProperties();
    }, []);

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row dashboard">
                    <div className="col-md-3">
                        <SellerMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Properties</h1>
                        <div className="d-flex adminProducts flex-wrap">
                            {properties?.map((property) => (
                                <Link key={property._id} to={`/dashboard/seller/property/${property.slug}`} className="property-link">
                                    <div className="card m-2">
                                        <img src={`/api/v1/property/property-photo/${property?._id}`} className="card-img-top" alt={property.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{property.name}</h5>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Properties;
