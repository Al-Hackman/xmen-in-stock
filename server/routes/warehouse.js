const express = require('express');
const fs = require('fs');
// const uuid = require('uuid');
const router = express.Router();


let warehouseData;

try {
    const data = fs.readFileSync("data/warehouses.json", "utf8");
    warehouseData= JSON.parse(data);
} catch (error) {
    console.error("Error reading file",error);
}


console.log(warehouseData);
router.get('/', (_req, res)=> {
    const warehouses = warehouseData.map(warehouse => {
        let singleWarehouse = {
            id: warehouse.id,
            name: warehouse.name,
            address: `${warehouse.address}, ${warehouse.city}, ${warehouse.country}`,
            contact: {
            name: warehouse.name,  
            phone: warehouse.phone,
            email: warehouse.email
        } 
    }
        return singleWarehouse
    })
    res.status(201).send(warehouses);     
});  

router.get('/:id', (req, res)=> { 
    let  everyWarehouse= req.params.id;
    let result = warehouseData.find(result => result.id === everyWarehouse)
    res.status(201).send(result);

});

// router.post('/', (req, res)=> {
    
// });



module.exports = router
