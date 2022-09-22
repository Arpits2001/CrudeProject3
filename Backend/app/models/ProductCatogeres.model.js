module.exports = (sequelize, Sequelize) => {
    const ProductCat = sequelize.define("productCat", {
      catid: {
        type: Sequelize.INTEGER,
         // user_id can not be null.
      allowNull:false,

      // To uniquely identify user
      primaryKey:true

      },
      catname: {
        type: Sequelize.STRING
      }
      
    });
  
    ProductCat.associate = models => {
        ProductCat.belongsTo(models.Product);
      
}
    return ProductCat;
  };
  