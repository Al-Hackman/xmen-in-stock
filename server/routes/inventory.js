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

//find inventory item
router.get("/:id", (req, res) => {
    let inventoryItem = inventoryData.find(
        (result) => result.id === req.params.id
    );
    res.status(201).send(inventoryItem);
});

router.get("/warehouse/:id", (req, res) => {
    let warehouseInventories = inventoryData.filter(
        (inventory) => inventory.warehouseID === req.params.id
    );
    res.status(200).json(warehouseInventories);
});

<<<<<<< HEAD
router.delete("/:id", (req, res) => {
    const deleteInventoryItem = inventoryData.findIndex(
        (item) => item.id === req.params.id);
        inventoryData.splice(deleteInventoryItem, 1);
        fs.writeFileSync("data/inventories.json", JSON.stringify(inventoryData));
        res.json(inventoryData);
})
=======
//find single inventory item
router.get("/:id", (req, res) => {
    let inventoryItem = inventoryData.find(
        (result) => result.id === req.params.id
    );
    res.status(201).send(inventoryItem);
});
>>>>>>> 20a90d9b6311b4ed59d8675bc13a2b8ac240c5fd


module.exports = router;
