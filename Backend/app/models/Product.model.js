module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    proid: {
      // Integer Datatype
      type:Sequelize.INTEGER,

      // Increment the value automatically
      autoIncrement:true,

      // user_id can not be null.
      allowNull:false,

      // To uniquely identify user
      primaryKey:true
    },
    proname: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    },
    catid: {
      type: Sequelize.INTEGER
    },
    
  });
  Product.associate = models => {
    Person.hasOne(models.ProductCat);
  }
  return Product;
};
