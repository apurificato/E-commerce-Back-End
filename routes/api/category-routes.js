const router = require('express').Router();
const { Category, Product } = require('../../models/');

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    // Error response to the client for failing to get categories
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.get('/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      // Error sent if category is not found
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    // Error response to the client for failing to get the category
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// Router to create a new category in the database:
router.post('/categories', async (req, res) => {
  try {
    const { category_name } = req.body;
    const category = new Category({ category_name })
    await Category.create(category)
    // Success response for created category
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    // Error response to the client when category is not created
    res.status(500).json({ error: 'Failed to create category' });
  }
});


router.put('/categories:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/categories:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
