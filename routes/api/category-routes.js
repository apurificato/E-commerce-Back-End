const router = require('express').Router();
const { Category, Product } = require('../../models/');

// Router to get a new category in the database:
//   Still need to include associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        { model: Product, attributes: ['id', 'product_name'] },
      ]
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    // Error response to the client for failing to get categories
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Router to get a new category in the database by its ID:
//   Still need to include associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findOne({
      where: { id: categoryId },
      include: [
        { model: Product, attributes: ['id', 'product_name'] },
      ]
    });
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
router.post('/', async (req, res) => {
  try {
    const { category_name } = req.body;
    const category = await Category.create({ category_name })
    // Success response for created category
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    // Error response to the client when category is not created
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Router to update a new category in the database by its ID:
router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      // If the category is not found, 404 Not Found response sent
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.update(req.body);
    // Success repsonse sent
    res.json({ message: 'Category updated successfully', category });
  } catch (err) {
    console.error(err);
    // Error response to the client for failing to update the category
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Router to delete a category in the database by its ID:
router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      // If the category is not found, 404 Not Found response sent
      return res.status(404).json({ error: 'Category not found' });
    }
    // Deletes category from DB
    await category.destroy();
    // Success response to the client is sent when deleted
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    // Error response sent for failing to delete the category
    res.status(500).json({ error: 'Failed to delete category' });
  }
});


module.exports = router;
