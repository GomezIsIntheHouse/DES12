const express = require('express');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');
const CarritoService = require('../../services/carrito/carrito.services');

const router = express.Router();


const carritoService = new CarritoService();

router.post('/', async (req, res, next) => {
    try{
        const { body } = req;
        if(_.isNil(body))(res.status(400).json({success: false, message: "REQ ERROR (Body missing)"}));
        
        Object.assign(body, {
            uuid: uuidv4()
        });
        
        const data = await carritoService.createCarrito(body);

        if(!data.success)(res.status(500).json(data))
        res.status(200).json(data);
    }catch(err){
        next(err);
    }   
});

router.get('/', async(_req, res, next)=>{
    try {
        const data = await carritoService.getCarritos();
        if(!data.success)(res.status(500).json(data))
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
})

router.get('/:carritoUuid', async(req, res, next)=>{
    try {
        const { carritoUuid } = req.params;
        console.log(carritoUuid)
        const data = await carritoService.getCarrito(carritoUuid);
        if(!data.success)(res.status(500).json(data))
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
})



router.post('/:carritoUuid', async(req, res, next)=>{

    try {
        const { carritoUuid } = req.params;
        const { body } = req
       

    if(_.isNil(carritoUuid) || _.isNil(body))(res.status(400).json(
        {success: false, message: "Req error"}
        ));
    const data = await carritoService.updateCarrito(carritoUuid, body)
    res.status(200).json(body);

    } catch (err) {
        next(err);
    }

    
})
router.post('/:carritoUuid/product', async(req, res, next)=>{

    try {
        const { carritoUuid } = req.params;
        const { body } = req


    if(_.isNil(carritoUuid) || _.isNil(body))(res.status(400).json(
        {success: false, message: "Req error"}
        ));
    const data = await carritoService.addProductsToCart(carritoUuid, body)
    res.status(200).json(data);

    } catch (err) {
        next(err);
    }

    
})

router.delete('/:carritoUuid/product/:id_prod', async (req, res, next) => {
    try{
        const { carritoUuid } = req.params;
        const { id_prod } = req.params;
    
        if(_.isNil(carritoUuid) && _.isNil(id_prod) )(res.status(400).json({success: false, message: "Req error"}));

        const data = await carritoService.deleteProductToCart(carritoUuid, id_prod)

        if(!data.success)(res.status(500).json(data))
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
})





module.exports = router;