module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
  })
  return Recipe;
}