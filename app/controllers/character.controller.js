const db = require("../models");
const Character = db.character;

// Create and Save a new Character
exports.create = (req, res) => {
    if (!req.body.id) {
      res.status(400).send({ message: "id can not be empty!" });
      return;
    }
    const character = new Character({
      id: req.body.id,
      name: req.body.name,
      kind: req.body.kind,
      voiceActors: req.body.voiceActors,
      films: req.body.films
    });
    // Save character in the database
    Character
      .save(character)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while save character."
        });
      });
};

// get all Character from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};
    Character.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving character."
        });
      });
};
// get a character with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Character.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Character Not found for id =" + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Character for id =" + id });
      });
};
// Update a character by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      Character.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
                message: "Character Not found for id =" + id
            });
          } else res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Character with id=" + id
          });
        });
};
// Delete a character with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Character.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: "Character Not found for id =" + id
          });
        } else {
          res.send({
            message: "Character was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Character with id=" + id
        });
      });
};
