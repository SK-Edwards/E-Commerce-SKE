const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
Category.findAll({attributes: ['id', 'category_name'],
  include: [
    {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then((categoryData) => {
  if(!categoryData) {
    res.status(404).json({message: 'Found no categories'});
    return;
  }
  res.json(categoryData);
  console.log(categoryData);

  
}) .catch(err => {
  console.log(err);
  res.status(500).json(err)
});

  
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(categoryData => {
      if(!categoryData) {
        res.status(404).json({message: 'No categories found'});
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});
  // be sure to include its associated Products


router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
Category.update(req.body, {
  where: {
    id: req.params.id
  }
})
.then(categoryData => {
  if(!categoryData) {
    res.status(404).json({message: 'No category with this id exists'});
    return;
  }
  res.json(categoryData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
})

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
Category.destroy({
  where: {
    id: req.params.id
  }
})
.then(categoryData => {
  if(!categoryData) {
    res.status(404).json({message: 'No category with this id exists'});
    return;
  }
  res.json(categoryData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
})

});

module.exports = router;
