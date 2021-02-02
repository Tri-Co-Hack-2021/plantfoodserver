require('dotenv').config();
let express = require('express');
let app = express();
const db = require("./db");

let user = require('./controllers/usercontroller');
let recipe = require('./controllers/recipecontroller');

app.use(require('./middleware/headers'));
app.use(express.json());



app.use ('/user',user);
app.use('/recipe', recipe)

db.authenticate()
  .then(() => db.sync())  // => (force: true)
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));  
  })
  .catch((err) => {console.log(err)
  })
