const express = require("express");
const fs = require("fs");
// const uuid = require('uuid');
const router = express.Router();

let warehouseData;
// get warehouse data
try {
    const data = fs.readFileSync("data/warehouses.json", "utf8");
    warehouseData = JSON.parse(data);
} catch (error) {
    console.error("Error reading file", error);
}

let inventoryData;
// Get Inventory data
try {
    const data = fs.readFileSync("data/inventories.json", "utf8");
    inventoryData = JSON.parse(data);
} catch (error) {
    console.error("Error reading file", error);
}

router.get("/", (_req, res) => {
    const warehouses = warehouseData.map((warehouse) => {
        let singleWarehouse = {
            id: warehouse.id,
            name: warehouse.name,
            address: `${warehouse.address}, ${warehouse.city}, ${warehouse.country}`,
            contact: {
                name: warehouse.contact.name,
                phone: warehouse.contact.phone,
                email: warehouse.contact.email,
            },
        };
        return singleWarehouse;
    });
    res.status(201).send(warehouses);
});

router.get("/:id", (req, res) => {
    // find warehouse
    let targetWarehouse = warehouseData.find(
        (result) => result.id === req.params.id
    );
    
    let resultWarehouse = {
        id: targetWarehouse.id,
        name: targetWarehouse.name,
        address: `${targetWarehouse.address}, ${targetWarehouse.city}, ${targetWarehouse.country}`,
        contact: {
            name: targetWarehouse.contact.name,
            position: targetWarehouse.contact.position,
            phone: targetWarehouse.contact.phone,
            email: targetWarehouse.contact.email,
        },
    }

    // add corresponding inventory to warehouse data to send
    resultWarehouse.inventories = inventoryData.filter(
        (item) => item.warehouseID === targetWarehouse.id
    );
    res.status(201).send(resultWarehouse);
});

// router.post('/', (req, res)=> {

// });

module.exports = router;
