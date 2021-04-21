const express = require('express');
// const fs = require('fs');
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
router.get("/", (req,res)=>{
    res.status(200).json(inventoryData);
});

module.exports = router
