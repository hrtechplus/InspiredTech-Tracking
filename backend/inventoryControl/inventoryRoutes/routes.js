const express = require('express');
const router = express.Router();
const {createItem} = require('../controllers/inventoryController');

router.get('/', (req, res) => {
    res.send('Hello, inventory manager!');
})

router.get('/addItems', (req, res) => {
    res.send('Adding items...');
})

router.post('/addItems', createItem)

module.exports = router;