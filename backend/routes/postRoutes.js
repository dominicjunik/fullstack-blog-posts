const express = require('express')

const router = express.Router()

const postControl = require('../controllers/postController')

// seed 
router.post('/seed', postControl.seed)

// index
router.get('/', postControl.index)

// delete
router.delete('/:id', postControl.delete)

// update
router.put('/:id', postControl.update)

// create
router.post('/', postControl.create)

// show
router.get('/:id', postControl.show)

module.exports = router