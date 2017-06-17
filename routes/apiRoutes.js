let express = require("express");

let articlesController = require("../controllers/articlesController");

let router = new express.Router();

router.get("/", articlesController.index);
// Get all articles (or optionally a specific article with an id)
router.get("/api/saved", articlesController.saved);
// Create a new articles using data passed in req.body
router.post("/api/saved", articlesController.create);
// Delete a specific articles using the id in req.params.id
router.delete("/api/saved/:id", articlesController.destroy);

module.exports = router;

