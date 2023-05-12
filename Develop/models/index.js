// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
// Categories have many Products
Category.hasMany(Products, {
  foreignKey: 'category_id',
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany( Tags, {
  foreignKey: 'ProductTag'
})
// Tags belongToMany Products (through ProductTag)
Tags.belongsToMany(Products,{
  foreignKey: 'ProductTag'
})



module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
