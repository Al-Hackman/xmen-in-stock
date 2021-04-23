const express = require("express");
const fs = require("fs");
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
router.get("/", (_req, res) => {
    res.status(200).json(inventoryData);
});

router.get("/warehouse/:id", (req, res) => {
    let warehouseInventories = inventoryData.filter(
        (invetory) => invetory.warehouseID === req.params.id
    );
    res.status(200).json(warehouseInventories);
});

//find single inventory item
router.get("/:id", (req, res) => {
    let inventoryItem = inventoryData.find(
        (result) => result.id === req.params.id
    );
    res.status(201).send(inventoryItem);
});


module.exports = router;
