var express = require("express");
const auth = require("../middlewares/auth");
const {} = require("../schemas");
var router = express.Router();
const Jwt = require("jsonwebtoken");

const reviewService = require("../services/review");
router.get("/id/:id", async function(req, res, next) {
    const { id } = req.params;
    const result = await reviewService.findById(id);
    res.json(result);
});

router.post("/create", auth.ensureSignedIn, async(req, res, next) => {
    const user = Jwt.verify(req.session.jwt, "jwt-secret");
    console.log(user);
    const { storeId, star, comment } = req.body;
    let userId = user._id;
    const result = await reviewService.create({ userId, storeId, star, comment });
    res.json(result);
});

// all itens
router.get("/all", async(req, res) => {
    const result = await reviewService.findAll(req, res);
    res.json({ success: true, data: result });
});

router.post("/update", auth.ensureSignedIn, async(req, res, next) => {
    const { _id, star, comment } = req.body;
    const result = await reviewService.update({ _id, star, comment });
    res.json(result);
});

router.delete("/delete", auth.ensureSignedIn, async(req, res, next) => {
    const { _id } = req.body;
    const result = await reviewService.remove(_id);
    res.json(result);
});

module.exports = router;