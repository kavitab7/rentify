const { default: slugify } = require('slugify');
const propertyModel = require('../models/property');
const fs = require('fs');
const dotenv = require("dotenv");
dotenv.config();

const createPropertyController = async (req, res) => {
    try {
        const { name, place, area, rent, bedrooms, bathrooms } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' });
            case !place:
                return res.status(500).send({ error: 'Place is required' });
            case !area:
                return res.status(500).send({ error: 'Area is required' });
            case !rent:
                return res.status(500).send({ error: 'Rent is required' });
            case !bedrooms:
                return res.status(500).send({ error: 'Bedrooms are required' });
            case !bathrooms:
                return res.status(500).send({ error: 'Bathrooms are required' });
            case !photo:
                return res.status(500).send({ error: 'Photo is required and size should be less than 1 MB' });
        }

        const property = new propertyModel({ ...req.fields, slug: slugify(name), seller: req.user._id });
        if (photo) {
            property.photo.data = fs.readFileSync(photo.path);
            property.photo.contentType = photo.type;
        }
        await property.save();
        res.status(201).send({
            success: true,
            message: "Property created successfully",
            property,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating property",
            error,
        });
    }
};

const getPropertyController = async (req, res) => {
    try {
        const properties = await propertyModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            count: properties.length,
            message: 'All properties:',
            properties,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while getting all properties',
        });
    }
};

const getSinglePropertyController = async (req, res) => {
    try {
        const property = await propertyModel.findOne({ slug: req.params.slug }).populate('seller', 'name email').select("-photo");

        res.status(200).send({
            success: true,
            message: 'Single property fetched:',
            property,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while getting single property',
        });
    }
};

const propertyPhotoController = async (req, res) => {
    try {
        const property = await propertyModel.findById(req.params.pid).select("photo");
        if (property.photo.data) {
            res.set("Content-Type", property.photo.contentType);
            return res.status(200).send(property.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while getting property photo',
        });
    }
};

const deletePropertyController = async (req, res) => {
    try {
        await propertyModel.findByIdAndDelete(req.params.pid).select("-photo");

        res.status(200).send({
            success: true,
            message: 'Property deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while deleting property',
        });
    }
};

const updatePropertyController = async (req, res) => {
    try {
        const { name, place, area, rent, bedrooms, bathrooms } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' });
            case !place:
                return res.status(500).send({ error: 'Place is required' });
            case !area:
                return res.status(500).send({ error: 'Area is required' });
            case !rent:
                return res.status(500).send({ error: 'Rent is required' });
            case !bedrooms:
                return res.status(500).send({ error: 'Bedrooms are required' });
            case !bathrooms:
                return res.status(500).send({ error: 'Bathrooms are required' });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'Photo is required and size should be less than 1 MB' });
        }

        const property = await propertyModel.findByIdAndUpdate(req.params.pid, {
            ...req.fields, slug: slugify(name), seller: req.user._id
        }, { new: true });

        if (photo) {
            property.photo.data = fs.readFileSync(photo.path);
            property.photo.contentType = photo.type;
        }
        await property.save();
        res.status(201).send({
            success: true,
            message: "Property updated successfully",
            property,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating property",
            error,
        });
    }
};

const propertyCountController = async (req, res) => {
    try {
        const total = await propertyModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in property count",
            error,
        });
    }
};

const allPropertiesController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const properties = await propertyModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            properties,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in property list",
            error,
        });
    }
};

const checkLike = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const property = await propertyModel.findById(id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        const liked = property.likes && property.likes.includes(userId);

        res.status(200).json({ success: true, liked, likes: property.likes });
    } catch (error) {
        console.error('Error checking like: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const likeProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const property = await propertyModel.findById(id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        property.likes.push(userId);
        await property.save();

        res.status(201).json({ success: true, message: 'Like added successfully' });
    } catch (error) {
        console.error('Error adding like: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createPropertyController,
    getPropertyController,
    getSinglePropertyController,
    propertyPhotoController,
    deletePropertyController,
    updatePropertyController,
    propertyCountController,
    allPropertiesController,
    checkLike,
    likeProperty
};
