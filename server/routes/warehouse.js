const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
const router = express.Router();
const formatter = require("../utils/formatter");

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

    if (warehouses) {
        res.status(201).send(warehouses);
    } else {
        res.status(500).send(
            "Unable to get warehouses, was not able to map through warehouse.json"
        );
    }
});

router.get("/:id", (req, res) => {
    // find warehouse
    let targetWarehouse = warehouseData.find(
        (result) => result.id === req.params.id
    );

    if (targetWarehouse) {
        res.status(201).send(targetWarehouse);
    } else {
        res.status(500).send("Warehouse not found");
    }
});

router.post("/", (req, res) => {
    const {
        name,
        address,
        city,
        country,
        contactName,
        position,
        phone,
        email,
    } = req.body;

    if (
        warehouseData.find((warehouse) => {
            return (
                warehouse.name === name &&
                warehouse.address === address &&
                warehouse.city === city &&
                warehouse.country === country
            );
        })
    ) {
        res.status(500).send("Warehouse already exists")
    } else {

        let formattedPhoneNumber = formatter.formatPhone(phone);

        warehouseData.push({
            id: uuid.v4(),
            name: name,
            address: address,
            city: city,
            country: country,
            contact: {
                name: contactName,
                position: position,
                phone: formattedPhoneNumber,
                email: email,
            },
        });
        try {
            fs.writeFileSync("data/warehouses.json", JSON.stringify(warehouseData));
            res.status(201).json(warehouseData);
        } catch (error) {
            console.error("Error writing to warehouses.json", error);
        }
    }

});

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
        let formattedPhoneNumber = formatter.formatPhone(req.body.phone);
        targetWarehouse.name = req.body.name;
        targetWarehouse.address = req.body.address;
        targetWarehouse.city = req.body.city;
        targetWarehouse.country = req.body.country;
        targetWarehouse.contact.name = req.body.contactName;
        targetWarehouse.contact.position = req.body.position;
        targetWarehouse.contact.phone = formattedPhoneNumber;
        targetWarehouse.contact.email = req.body.email;

        // write to file
        try {
            fs.writeFileSync(
                "data/warehouses.json",
                JSON.stringify(warehouseData)
            );
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

//This Deletes a warehouse using the warehouse ID
router.delete("/:id", (req, res) => {
    // find warehouse and delete from the warehouse json
    const deleteWarehouse = warehouseData.findIndex(
        (warehouse) => warehouse.id === req.params.id
    );

    if (deleteWarehouse) {
        warehouseData.splice(deleteWarehouse, 1);

        fs.writeFileSync("data/warehouses.json", JSON.stringify(warehouseData));
        // find all inventories corresponding to the spicific warehouse and delete them
        const updatedInventory = inventoryData.filter(
            (inventory) => inventory.warehouseID != req.params.id
        );
        fs.writeFileSync(
            "data/inventories.json",
            JSON.stringify(updatedInventory)
        );
        res.status(200).json(warehouseData);
    } else {
        res.status(500).send("Warehouse not found");
    }
});

module.exports = router;
