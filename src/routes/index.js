const express = require('express');
const router = express.Router();
const productRoutes = require('./products/products.routes');
const productMongoRoutes = require('./products/productsMongo.routes')
const productFirebaseRoutes = require('./products/productsFirebase.routes')


const carritoRoutes = require('./carrito/carrito.routes')
const carritoMongoRoutes = require('./carrito/carritoMongo.routes')
const carritoFirebaseRoutes = require('./carrito/carritoFirebase.routes')

router.get('/health', async (_req, res) => {
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || 'undefined',
        health: 'Up!'
    })
})

.use('/product', productRoutes)
.use('/productMongo', productMongoRoutes)
.use('/productFirebase', productFirebaseRoutes)

.use('/carrito', carritoRoutes)
.use('/carritoMongo', carritoMongoRoutes)
.use('/carritoFirebase', carritoFirebaseRoutes)

module.exports = router;