let Article = require("../models/Article");

module.exports = {

  index: function(req,res) {
    res.sendFile("../public/index.html");
  },

  // This method handles retrieving articles from the db
  saved: function(req, res) {
    Article.find({})
      .exec(function(err,doc) {
        if(err){
          console.log(err);
        } else {
          res.send(doc);
        }
      })
  },
  // This method handles creating new quotes
  create: function(req, res) {
      let newArticle = new Article({
          title: req.body.title,
          date: req.body.date,
          url: req.body.url
      });

      newArticle.save(function(err, doc){
          if(err){
              console.log(err);
              res.send(err);
          } else {
              res.json(doc);
          }
      });
  },

  // This method handles deleting quotes
  destroy: function(req, res) {
      Article.find({'_id': req.params.id}).remove()
          .exec(function(err, doc) {
              res.send(doc);
          });
  }
};
