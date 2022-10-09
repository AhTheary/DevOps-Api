var express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const {} = require('../schemas');
var router = express.Router();
const userService = require('../services/user');
const forgotService = require('../services/forgot')
const Jwt = require("jsonwebtoken");


router.get('/id/:id', async function(req, res, next) {
    const { id } = req.params;
    const result = await userService.findById(id);
    res.json(result);
})

// all users
router.get('/all', async(req, res) => {
    const result = await userService.findAll()
    res.json(result);
})

router.post('/update-password', auth.ensureSignedIn, async(req, res, next) => {
    const user = Jwt.verify(req.session.jwt, "jwt-secret");
    // to do
    const result = await userService.updatePass(req.body, user._id);
    res.json(result);
})

router.post('/update', auth.ensureSignedIn, async(req, res, next) => {
    const result = await userService.update(req.body);
    res.json(result);
})

router.delete('/delete', auth.ensureSignedIn, async(req, res, next) => {
    const { _id } = req.body;
    const result = await userService.remove(_id);
    res.json(result);
})

router.post("/reset-password", async(req, res, next) => {
    const { email } = req.body;
    const result = await forgotService.reset(email)
    res.json(result)
})

router.post("/change-password", async(req, res, next) => {
    const result = await forgotService.changePassword(req.body)
    res.json(result)
})

router.post("/reset-password", async(req, res, next) => {
    const { email } = req.body;
    const result = await forgotService.reset(email)
    res.json(result)
})

router.post("/change-password", async(req, res, next) => {
    const result = await forgotService.changePassword(req.body)
    res.json(result)
})

module.exports = router