import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/SellerMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

export const UpdateProperty = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rent, setrent] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    // Fetch single property
    const getSingleProperty = async () => {
        try {
            const { data } = await axios.get(`/api/v1/property/${params.slug}`);
            setName(data.property.name);
            setId(data.property._id);
            setDescription(data.property.description);
            setrent(data.property.rent);
            setBedrooms(data.property.bedrooms);
            setBathrooms(data.property.bathrooms);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleProperty();
    }, []);

    // Update property
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const propertyData = new FormData();
            propertyData.append("name", name);
            propertyData.append("description", description);
            propertyData.append("rent", rent);
            propertyData.append("bedrooms", bedrooms);
            propertyData.append("bathrooms", bathrooms);
            photo && propertyData.append("photo", photo);

            const { data } = await axios.put(`/api/v1/property/${id}`, propertyData);

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update property");
        }
    };

    // Delete property
    const handleDelete = async () => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this property?");
            if (!confirmDelete) return;

            await axios.delete(`/api/v1/property/${id}`);
            toast.success("Property deleted successfully");
            navigate("/dashboard/admin/properties");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete property");
        }
    };

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Property</h1>
                        <div className="m-1 w-75">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Enter name"
                                    className="form-control"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={rent}
                                    placeholder="Enter rent"
                                    className="form-control"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setrent(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={bedrooms}
                                    placeholder="Enter number of bedrooms"
                                    className="form-control"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setBedrooms(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={bathrooms}
                                    placeholder="Enter number of bathrooms"
                                    className="form-control"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setBathrooms(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="property_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-success" onClick={handleUpdate}>
                                    Update Property
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    Delete Property
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProperty;

