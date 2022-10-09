var express = require('express');
const auth = require('../middlewares/auth');
const {} = require('../schemas');
var router = express.Router();

const storeService = require('../services/store');
router.get('/id/:id', async function(req, res, next) {
    const { id } = req.params;
    const result = await storeService.findById(id);
    res.json(result);
})

router.post('/create', async(req, res, next) => {
    const { storeName, ownerName, category, location, imageUrl, desc, review, countReview } = req.body;
    const result = await storeService.create({ storeName, ownerName, category, location, imageUrl, desc, review, countReview })
    res.json(result);
})


// all itens
router.get('/all', async(req, res) => {
    const result = await storeService.findAll(req, res)
    res.json({ success: true, data: result });
})

router.post('/update', auth.ensureSignedIn, async(req, res, next) => {
    const { _id, storeName, ownerName, location, imageUrl, desc } = req.body;
    const result = await storeService.update({ _id, storeName, ownerName, location, imageUrl, desc });
    res.json(result);
})

router.delete('/delete', auth.ensureSignedIn, async(req, res, next) => {
    const { _id } = req.body;
    const result = await storeService.remove(_id);
    res.json(result);
})

module.exports = router