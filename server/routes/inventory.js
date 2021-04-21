const express = require('express');
const fs = require('fs');
// const uuid = require('uuid');
const router = express.Router();
// const inventoryData = require('../data/inventories.json');

let inventoryData;

try {
    const data = fs.readFileSync("data/inventories.json", "utf8");
    inventoryData = JSON.parse(data);
} catch (error) {
    console.error("Error reading file", error);
}

// send all inventory data
router.get("/", (_req,res)=>{
    const inventoryList = inventoryData.map((inventory) => {
        let inventoryItem = {
            id: inventory.id,
            item: inventory.itemName,
            category: inventory.category,
            status: inventory.status,
            quantity: inventory.quantity,
            description: inventory.description,
            warehouse: inventory.warehouseName,
        };
        return inventoryItem;
    });
    res.status(200).json(inventoryList);
});

module.exports = router;
