const express = require('express');
// const fs = require('fs');
// const uuid = require('uuid');
const router = express.Router();
const warehouseData = require('../data/warehouses.json');

router.get('/', (_req, res)=> {
    const Warehouses = warehouseData.map(warehouse => {
        let singleWarehouse = {
            id: warehouse.id,
            name: warehouse.name,
            address: warehouse.address,
            city: warehouse.city,
            country: warehouse.country,
            contact: {
            name: warehouse.name,
            position: warehouse.position,
            phone: warehouse.phone,
            email: warehouse.email
        } 
    }
        return singleWarehouse
    })
    res.status(201).send(Warehouses);     
});  

router.get('/:id', (req, res)=> {
    let  everyWarehouse= req.params.id;
    let result = warehouseData.find(result => result.id === everyWarehouse)
    res.status(201).send(result);

});

// router.post('/', (req, res)=> {
    
// });



module.exports = router
