const express = require('express');
const router = express.Router();
const {Ingredients} = require("../models");

router.get("/", async (req, res) => {
    // res.send("Hello World");
    const listOfIngredients = await Ingredients.findAll()
    res.json(listOfIngredients)
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Ingredients.create(post);
    res.json(post);
});

module.exports = router