import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcSynchronize } from 'react-icons/fc';
import { Checkbox } from 'antd';

export default function Home() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchPlace, setSearchPlace] = useState('');
    const [bedroomFilters, setBedroomFilters] = useState([]);
    const [rentFilters, setRentFilters] = useState([]);

    useEffect(() => {
        getAllProperties();
        getTotal();
    }, []);

    const getAllProperties = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/property/property-list/${page}`);
            setLoading(false);
            setProperties(data.properties);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const getTotal = async () => {
        try {
            const { data } = await axios.get('/api/v1/property-count');
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/property/property-list/${page}`);
            setLoading(false);
            setProperties([...properties, ...data?.properties]);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleSearchPlace = (e) => {
        setSearchPlace(e.target.value);
    };

    const handleBedroomFilter = (value) => {
        setBedroomFilters(value);
    };

    const handleRentFilter = (value) => {
        setRentFilters(value);
    };

    const filterProperties = () => {
        let filteredProperties = properties.filter((property) => {
            if (bedroomFilters.length > 0 && !bedroomFilters.includes(property.bedrooms)) {
                return false;
            }
            if (rentFilters.length > 0 && !rentFilters.includes(property.rent)) {
                return false;
            }
            return property.place.toLowerCase().includes(searchPlace.toLowerCase());
        });

        setProperties(filteredProperties);
    };

    useEffect(() => {
        filterProperties();
    }, [searchPlace, bedroomFilters, rentFilters]);

    return (
        <Layout>
            <div className="home">
                <div className="row mt-3">
                    <div className="col-md-3 filter">
                        <h4 className="text-center">Filter Properties</h4>
                        <div className="d-flex flex-column">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Place"
                                value={searchPlace}
                                onChange={handleSearchPlace}
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <h5>Bedrooms</h5>
                            <Checkbox.Group onChange={handleBedroomFilter} value={bedroomFilters}>
                                <Checkbox value={1}>1</Checkbox>
                                <Checkbox value={2}>2</Checkbox>
                                <Checkbox value={3}>3</Checkbox>
                                <Checkbox value={4}>4</Checkbox>
                                <Checkbox value={5}>5</Checkbox>
                                <Checkbox value={6}>6</Checkbox>
                            </Checkbox.Group>
                        </div>
                        <div className="d-flex flex-column">
                            <h5>Rent</h5>
                            <Checkbox.Group onChange={handleRentFilter} value={rentFilters}>
                                <Checkbox value={1000}>1000</Checkbox>
                                <Checkbox value={2000}>2000</Checkbox>
                                <Checkbox value={3000}>3000</Checkbox>
                                <Checkbox value={4000}>4000</Checkbox>
                                <Checkbox value={5000}>5000</Checkbox>
                            </Checkbox.Group>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Properties</h1>
                        <div className="d-flex flex-wrap">
                            {properties?.map((p) => (
                                <div className="card m-2" key={p._id}>
                                    <img src={`/api/v1/property/property-photo/${p?._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title ">{p.name}</h5>
                                        <h5 className="card-price">{p.rent}</h5>
                                        <button className="btn btn-details ms-1" onClick={() => navigate(`/property/${p.slug}`)}>
                                            I'm Interested
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="m-2 p-3">
                            {properties && properties.length < total && (
                                <button
                                    className="btn btn-load"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                    }}
                                >
                                    {loading ? 'Loading...' : 'Show more'} <FcSynchronize />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
