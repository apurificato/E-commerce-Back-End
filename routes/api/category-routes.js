const router = require('express').Router();
const { Category, Product } = require('../../models/');

// The `/api/categories` endpoint

router.get('/categories', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  res.send('Categories found successfully')
});

router.get('/categories:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  res.send('Categories found by ID successfully')
});

router.post('/categories', async (req, res) => {
  // create a new category in the database
  try {
    const { id, category_name } = req.body
    const category = new Category({ id, category_name })
    await Category.create(category)
} catch (err) {
    console.log(err)
    // Redirect user back to the categories page
    res.redirect('/categories')
}
});

router.put('/categories:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/categories:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
