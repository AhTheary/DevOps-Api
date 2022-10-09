var express = require('express');
const auth = require('../middlewares/auth');
const {} = require('../schemas');
var router = express.Router();
const favoriteService = require("../services/favorite")

router.post('/create', auth.ensureSignedIn, async(req, res, next) => {
    const result = await favoriteService.create(req.body)
    res.json(result);
})

// all itens
router.get('/all', auth.ensureSignedIn, async(req, res) => {
    const result = await favoriteService.findAll(req, res)
    res.json({ success: true, data: result });
})

router.delete('/delete/:id', auth.ensureSignedIn, async(req, res, next) => {
    const { id } = req.params;
    const result = await favoriteService.remove(id);
    res.json(result);
})

module.exports = router