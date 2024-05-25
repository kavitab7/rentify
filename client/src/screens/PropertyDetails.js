import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function PropertyDetails() {
    const navigate = useNavigate();
    const params = useParams();

    const [property, setProperty] = useState({});
    const [seller, setSeller] = useState({});

    useEffect(() => {
        if (params?.slug) getProperty();
    }, [params?.slug]);

    const getProperty = async () => {
        try {
            const { data } = await axios.get(`/api/v1/property/get-property/${params.slug}`);
            setProperty(data?.property);
            setSeller(data?.property?.seller);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="row container property-details">
                <div className="col-md-6">
                    <img
                        src={`/api/v1/property/property-photo/${property?._id}`}
                        className="card-img-top detail-img"
                        alt={property?.name}
                        height="300"
                        width={"350px"}
                    />
                </div>
                <div className="col-md-6 property-details-info">
                    <h1 className="text-center">Property Details</h1>
                    <hr />
                    <h5>Name: {property.name}</h5>
                    <h6 className="price">
                        Rent: {property?.rent}
                    </h6>
                    <p>Place: {property?.place}</p>
                    <p>Area: {property?.area}</p>
                    <p>Bedrooms: {property?.bedrooms}</p>
                    <p>Bathrooms: {property?.bathrooms}</p>
                </div>
            </div>
            <hr />
            <div className="row container seller-details">
                <div className="col-md-12">
                    <h2>Seller Details</h2>
                    <p>Name: {seller?.Firstname}  {seller?.Lastname} </p>
                    <p>Email: {seller?.email}</p>
                    <p>Phone: {seller?.phone}</p>
                </div>
            </div>
        </Layout>
    );
}
