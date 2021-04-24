const express = require("express");
const fs = require("fs");
const uuid = require('uuid');
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


router.post("/", (req, res) => {
    const {
        itemName,
        description,
        category,
        status,
        quantity,
        warehouseName,
    } = req.body;

    inventoryData.push({
        id: uuid.v4(),
        name: itemName,
        description,
        category,
        status,
        quantity,
        warehouseName,
    });
    fs.writeFileSync("data/inventories.json", JSON.stringify(inventoryData));
    res.json(inventoryData);
});






router.get("/warehouse/:id", (req, res) => {
    let warehouseInventories = inventoryData.filter(
        (inventory) => inventory.warehouseID === req.params.id
    );
    res.status(200).json(warehouseInventories);
});

router.delete("/:id", (req, res) => {
    const deleteInventoryItem = inventoryData.findIndex(
        (item) => item.id === req.params.id);
        inventoryData.splice(deleteInventoryItem, 1);
        fs.writeFileSync("data/inventories.json", JSON.stringify(inventoryData));
        res.json(inventoryData);
})


module.exports = router;
