const express = require("express");
const fs = require("fs");
// const uuid = require('uuid');
const router = express.Router();
const formatter = require('../utils/formatter');

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

    // add corresponding inventory to warehouse data to send
    targetWarehouse.inventories = inventoryData.filter(
        (item) => item.warehouseID === targetWarehouse.id
    );
    res.status(201).send(targetWarehouse);
});

// router.post('/', (req, res)=> {

// });

router.put("/:id", (req, res) => {
    // find warehouse
    let targetWarehouse = warehouseData.find(
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
    const phoneRegex = /^\+?(\d{1,2})?\s?\-?\.?\(?\d{3}[\-\)\.\s]?\s?\d{3}[\-\.\s]?\d{4}$/im;
    let isValidPhone = phoneRegex.test(req.body.phone);

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValidEmail = emailRegex.test(req.body.email);

    // Create new warehouse object to add if only data is valid
    if (!hasEmptyField && isValidPhone && isValidEmail) {
        let updatedWarehouse = { ...targetWarehouse };
        let formattedPhoneNumber = formatter.formatPhone(req.body.phone);
        updatedWarehouse.name = req.body.name;
        updatedWarehouse.address = req.body.address;
        updatedWarehouse.city = req.body.city;
        updatedWarehouse.country = req.body.country;
        updatedWarehouse.contact.name = req.body.contactName;
        updatedWarehouse.contact.position = req.body.position;
        updatedWarehouse.contact.phone = formattedPhoneNumber;
        updatedWarehouse.contact.email = req.body.email;


        // write to file
        try {
            fs.writeFileSync("data/warehouses.json", JSON.stringify(warehouseData));
        } catch (error) {
            console.error("Error writing to warehouses.json", error);
        }

        res.status(200).json(req.body);
    } else {
        res.status(500).send(
            "New data is invalid. All fields must be filled in. Phone number and email address must be in the correct format"
        );
    }
});

module.exports = router;
