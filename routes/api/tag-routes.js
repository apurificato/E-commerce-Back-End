const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Router to get a new tag in the database:
//   Still need to include associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (err) {
    console.error(err);
    // Error response to the client for failing to get tags
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// Router to get a new tag in the database by its ID:
//   Still need to include associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findOne({ where: { id: tagId } });
    if (!tag) {
      // Error sent if tag is not found
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    // Error response to the client for failing to get the tag
    res.status(500).json({ error: 'Failed to fetch tag' });
  }
});

// Router to create a new tag in the database:
router.post('/', async (req, res) => {
  try {
    const { tag_name } = req.body;
    const tag = new Tag({ tag_name })
    await Tag.create(tag)
    // Success response for created tag
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    // Error response to the client when tag is not created
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

// Router to update a new tag in the database by its ID:
router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      // If the tag is not found, 404 Not Found response sent
      return res.status(404).json({ error: 'Tag not found' });
    }
    await tag.update(req.body);
    // Success repsonse sent
    res.json({ message: 'Tag updated successfully', tag });
  } catch (err) {
    console.error(err);
    // Error response to the client for failing to update the tag
    res.status(500).json({ error: 'Failed to update tag' });
  }
});

// Router to delete a tag in the database by its ID:
router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      // If the tag is not found, 404 Not Found response sent
      return res.status(404).json({ error: 'Tag not found' });
    }
    // Deletes tag from DB
    await tag.destroy();
    // Success response to the client is sent when deleted
    res.json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(err);
    // Error response sent for failing to delete the tag
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;
