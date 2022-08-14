module.exports = app => {
    const character = require("../controllers/character.controller.js");
    var router = require("express").Router();

    router.post("/", character.create);
    router.get("/", character.findAll);
    router.get("/:id", character.findOne);
    router.put("/:id", character.update);
    router.delete("/:id", character.delete);

    app.use('/character', router);
  };