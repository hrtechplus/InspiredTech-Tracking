const express = require('express');
const router = express.Router();

// Import functionalities to implement routes
const { createItem, readItems, deleteItem, updateItem } = require('../controllers/inventoryController');


// Read a Item
router.get('/', readItems)

router.get('/addItems', (req, res) => {
    res.send('Adding items...');
})

// Create a new Item
router.post('/addItems', createItem)

// Delete a Item
router.delete('/:id', deleteItem)

// Update a Item
router.patch('/:id', updateItem)

module.exports = router;