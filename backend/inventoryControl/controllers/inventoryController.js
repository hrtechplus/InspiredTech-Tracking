const ItemSchema = require('../models/itemSchema');


// Create a new Item (POST)
const createItem = async (req, res) => {
    const {itemID, itemName, itemBrand, itemPrice,
        stockCount, itemDescription, catagory, warranty} = req.body;

    try {
        const itemDocument = await ItemSchema.create({itemID, itemName,
            itemBrand, itemPrice, stockCount, itemDescription, catagory, warranty})
        res.status(200).json(itemDocument);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Create a new Item
const readItems = async (req, res) => {
    const items = await ItemSchema.find({});
    res.status(200).json(items);
}

// Delete a Item
const deleteItem = async (req, res) => {
    const { id } = req.params;

    const item = await ItemSchema.findOneAndDelete({itemID: id});

    if(!item) {
        return res.status(404).json({error: 'No such an item found :('});
    }
    res.status(200).json(item);
}

// Update a Item
const updateItem = async (req, res) => {
    const { id } = req.params;

    const item = await ItemSchema.findOneAndUpdate({itemID: id}, {
        ...req.body
    })

    if(!item) {
        return res.status(404).json({error: 'No such an item found :('});
    }
    res.status(200).json(item);
}

module.exports = {
    createItem,
    readItems,
    deleteItem,
    updateItem
}