var express = require("express");
const auth = require("../middlewares/auth");
const {} = require("../schemas");
var router = express.Router();

const feedbackService = require("../services/feedback");
router.get("/id/:id", async function(req, res, next) {
    const { id } = req.params;
    const result = await feedbackService.findById(id);
    res.json(result);
});

router.post("/create", auth.ensureSignedIn, async(req, res, next) => {
    const { firstName, lastName, email, subject, message } = req.body;
    const result = await feedbackService.create({ firstName, lastName, email, subject, message });
    res.json(result);
});

// all itens
router.get("/all", async(req, res) => {
    const result = await feedbackService.findAll(req, res);
    res.json({ success: true, data: result });
});

router.delete("/delete", auth.ensureSignedIn, async(req, res, next) => {
    const { _id } = req.body;
    const result = await feedbackService.remove(_id);
    res.json(result);
});

module.exports = router;