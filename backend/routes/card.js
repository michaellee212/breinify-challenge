const router = require("express").Router();
let Card = require("../models/card.modal");

// Middleware for specifc /card route
router.use(timeLog = (req, res, next) => {
    console.log('Date: ', Date())
    next()
  })

// Does a GET request to find all card 
router.route("/").get((req, res) => {
    Card.find()
        .then(card => res.json(card))
        .catch(err => res.status(400).json("Error: " + err));
})

// Does a POST request to add new card
router.route("/add").post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    const newCard = new Card({
        name,
        description,
    });

    newCard.save()
        .then(() => res.json("Card added"))
        .catch(err => res.status(400).json("Error: " + err));
});

// Does a GET request to find card by :id
router.route("/:id").get((req, res) => {
    Card.findById(req.params.id)
        .then(card => res.json(card))
        .catch(err => res.status(400).json("Error: " + err));
})

// Does a DELETE request to remove card by :id
router.route("/:id").delete((req, res) => {
    Card.findByIdAndDelete(req.params.id)
        .then(() => res.json("Card deleted"))
        .catch(err => res.status(400).json("Error: " + err));
})

// Does a PUT request to update card by :id
router.route("/update/:id").put((req, res) => {
    Card.findById(req.params.id)
        .then(card => {
            card.name = req.body.name;
            card.description = req.body.description;

            card.save()
                .then(() => res.json("Card updated"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
})

module.exports = router;