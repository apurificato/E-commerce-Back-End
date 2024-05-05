// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // specify the foreign key column
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // specify the foreign key column
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id', // specify the foreign key column in the join table
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id', // specify the foreign key column in the join table
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
