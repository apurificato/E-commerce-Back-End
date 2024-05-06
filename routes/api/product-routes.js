const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Router to get a new products in the database:
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'], through: { attributes: [] } }
      ]
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    // Error response to the client for failing to get products
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Router to get a new product in the database by its ID:
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({
      where: { id: productId },
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'], through: { attributes: [] } }
      ]
    });
    if (!product) {
      // Error sent if product is not found
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    // Error response to the client for failing to get the product
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// create new product
router.post('/', (req, res) => {

  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// Router to delete a product in the database by its ID:
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      // If the product is not found, 404 Not Found response sent
      return res.status(404).json({ error: 'Product not found' });
    }
    // Deletes product from DB
    await product.destroy();
    // Success response to the client is sent when deleted
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    // Error response sent for failing to delete the product
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
