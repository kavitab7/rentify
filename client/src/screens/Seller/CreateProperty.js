import React, { useState } from 'react';
import Layout from '../../components/Layout';
import SellerMenu from '../../components/SellerMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateProperty = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [area, setArea] = useState('');
    const [rent, setRent] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            if (!name || !place || !area || !rent || !bedrooms || !bathrooms || !photo) {
                toast.error('All fields are required');
                return;
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('place', place);
            formData.append('area', area);
            formData.append('rent', rent);
            formData.append('bedrooms', bedrooms);
            formData.append('bathrooms', bathrooms);
            formData.append('photo', photo);

            const { data } = await axios.post('/api/v1/property/create-property', formData);

            if (data.success) {
                toast.success(data.message);
                navigate('/dashboard/seller/properties');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error creating property:', error);
            toast.error('Something went wrong');
        }
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row dashboard">
                    <div className="col-md-3">
                        <SellerMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Property</h1>
                        <div className="m-1 w-75">
                            <form onSubmit={handleCreate}>
                                <div className="mb-3">
                                    <input type="text" value={name} placeholder="Name" className="form-control" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={place} placeholder="Place" className="form-control" onChange={(e) => setPlace(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="number" value={area} placeholder="Area" className="form-control" onChange={(e) => setArea(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="number" value={rent} placeholder="Rent" className="form-control" onChange={(e) => setRent(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="number" value={bedrooms} placeholder="Bedrooms" className="form-control" onChange={(e) => setBedrooms(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="number" value={bathrooms} placeholder="Bathrooms" className="form-control" onChange={(e) => setBathrooms(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="file" accept="image/*" onChange={handlePhotoChange} />
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-success">Create Property</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProperty;
