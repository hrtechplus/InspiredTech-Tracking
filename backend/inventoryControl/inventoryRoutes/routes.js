const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, inventory manager!');
})

router.get('/addItems/', (req, res) => {
    res.send('Addint items...');
})

module.exports = router;