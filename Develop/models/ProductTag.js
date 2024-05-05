const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Have to add product_id as an integer; references product model's id.
    // product_id: {
    //   type: DataTypes.INTEGER,
      
    // },
    // Have to add tag_id as an integer; references tag model's id.
    // tag_id: {
    //   type: DataTypes.INTEGER,
          
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
