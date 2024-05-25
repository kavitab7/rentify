const express = require('express');
const { requireSignIn, isSeller } = require('../middleware/authMiddleware');
const formidable = require('express-formidable');
const {
    createPropertyController,
    getPropertyController,
    getSinglePropertyController,
    propertyPhotoController,
    deletePropertyController,
    updatePropertyController,
    propertyFiltersController,
    propertyCountController,
    allPropertiesController,
    checkLike,
    likeProperty
} = require('../controller/propertyController');

const router = express.Router();


router.post('/create-property', requireSignIn, isSeller, formidable(), createPropertyController);

router.post('/like/:id', requireSignIn, likeProperty);

router.put('/update-property/:pid', requireSignIn, isSeller, formidable(), updatePropertyController);

router.get('/get-property', getPropertyController);

router.get('/get-property/:slug', requireSignIn, getSinglePropertyController);

router.get('/property-photo/:pid', propertyPhotoController);

router.get('/check-like/:id', requireSignIn, checkLike);


router.delete('/delete-property/:pid', requireSignIn, isSeller, deletePropertyController);

router.get("/property-count", propertyCountController);

router.get("/property-list/:page", allPropertiesController);

module.exports = router;
