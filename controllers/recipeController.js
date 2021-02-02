const router = require('express').Router();
const Recipe = require('../db').import('../models/recipe');
const validateSession = require('../middleware/validateSession');


router.post('/', validateSession, function(req, res){
  Recipe.create({
    title: req.body.title,
    directions: req.body.directions,
    ingredients: req.body.ingredients,
    userId: req.user.id
  })
  .then(
    function createSuccess(recipe) {  
        res.json ({
            recipe: recipe,
        message: 'Recipe successfully created!'
      });
    }
  )
  .catch((err) => res.status(500).json({ error: err }));
})

router.get('/all', (req, res) => {
  Recipe.findAll()
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json({ error: err }))
})



module.exports = router;