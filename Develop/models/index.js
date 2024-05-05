// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsToMany(Category
  // ,{
  // through: 'product_has_categories',
  // foreignKey: 'product_id',
  // }
);

// Categories have many Products
Category.hasMany(Product
  // ,{
  // through: 'category_has_products',
  // foreignKey: 'category_id',
  // }
);

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: 'productTag',
  foreignKey: 'tag_id',
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: 'productTag'
  // foreignKey: 'product_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

Category.hasMany(Product, {
  through: 'category_has_products',
  foreignKey: 'category_id',
});

// Product belongs to Category, as a category can have multiple products but a product can only belong to one category.

// Category has many Product models.

// Product belongs to many Tag models. Using the ProductTag through model, allow products to have multiple tags and tags to have many products.

// Tag belongs to many Product models.