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

module.exports = {
    createItem
}