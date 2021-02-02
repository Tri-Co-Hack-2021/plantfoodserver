const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgress'
});

sequelize.authenticate().then(
  function() {
    console.log('Connected to the plantfood Database!');
  },
  function(err){
    console.log(err);
  }
);

User = sequelize.import('./models/user');
Recipe = sequelize.import('./models/recipe');


User.hasMany(Recipe);
Recipe.belongsTo(User);


module.exports = sequelize;