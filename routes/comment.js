var express = require("express");
const auth = require("../middlewares/auth");
const {} = require("../schemas");
var router = express.Router();
const Jwt = require("jsonwebtoken");

const commentService = require("../services/comment");
router.get("/id/:id", async function(req, res, next) {
    const { id } = req.params;
    const result = await commentService.findById(id);
    res.json(result);
});

router.post("/create", auth.ensureSignedIn, async(req, res, next) => {
    const user = Jwt.verify(req.session.jwt, "jwt-secret");
    console.log(user);
    const { userpostId, comment } = req.body;
    let usercommentId = user._id; // user for comments
    const result = await commentService.create({ usercommentId, userpostId, comment });
    res.json(result);
});

// all itens
router.get("/all", async(req, res) => {
    const result = await commentService.findAll(req, res);
    res.json({ success: true, data: result });
});

router.post("/update", auth.ensureSignedIn, async(req, res, next) => {
    const { _id, star, comment } = req.body;
    const result = await commentService.update({ _id, star, comment });
    res.json(result);
});

router.delete("/delete", auth.ensureSignedIn, async(req, res, next) => {
    const { _id } = req.body;
    const result = await commentService.remove(_id);
    res.json(result);
});

module.exports = router;