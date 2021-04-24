const e = require("express");
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
    if (inventoryData) {
        res.status(200).json(inventoryData);
    } else {
        res.status(500).send("Unable to read inventories.json");
    }
});

//find inventory item
router.get("/:id", (req, res) => {
    let inventoryItem = inventoryData.find(
        (result) => result.id === req.params.id
    );

    if (inventoryItem) {
        res.status(201).json(inventoryItem);
    } else {
        res.status(500).send("Unable to find item in inventories.json");
    }
});

router.get("/warehouse/:id", (req, res) => {
    let warehouseInventories = inventoryData.filter(
        (inventory) => inventory.warehouseID === req.params.id
    );

    res.status(200).json(warehouseInventories);
});

router.delete("/:id", (req, res) => {
    const deleteInventoryItem = inventoryData.findIndex(
        (item) => item.id === req.params.id
    );

    if (deleteInventoryItem) {
        inventoryData.splice(deleteInventoryItem, 1);
        fs.writeFileSync("data/inventories.json", JSON.stringify(inventoryData));
        res.json(inventoryData);
    } else {
        res.status(500).send("Warehouse not found");
    }
});


router.put("/:id", (req, res) => {
    // find warehouse
    let inventoryItem = inventoryData.find(
        (result) => result.id === req.params.id
    );

    // check for empty values inside object from request
    let hasEmptyField = false;
    Object.values(req.body).forEach((value) => {
        if (value.length < 1) {
            hasEmptyField = true;
        }
    });

    // Regex to check phone number
    // const phoneRegex = /^\+?(\d{1,2})?\s?\-?\.?\(?\d{3}[\-\)\.\s]?\s?\d{3}[\-\.\s]?\d{4}$/im;
    // let isValidPhone = phoneRegex.test(req.body.phone);

    // const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // let isValidEmail = emailRegex.test(req.body.email);

    // Create new inventory object to add if only data is valid
    if (!hasEmptyField) {
        // let formattedPhoneNumber = formatter.formatPhone(req.body.phone);
        inventoryItem.warehouseID = req.body.warehouseID;
        inventoryItem.warehouseName = req.body.warehouseName;
        inventoryItem.itemName = req.body.itemName;
        inventoryItem.description = req.body.description;
        inventoryItem.category = req.body.category;
        inventoryItem.status = req.body.status;
        inventoryItem.quantity = req.body.quantity;
        

        // write to file
        try {
            fs.writeFileSync(
                "data/inventories.json",
                JSON.stringify(inventoryData)
            );
        } catch (error) {
            console.error("Error writing to inventories.json", error);
        }

        res.status(200).json(req.body);
    } else {
        res.status(500).send(
            "New data is invalid."
        );
    }
});


module.exports = router;
