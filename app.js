require('dotenv').config();
let express = require('express');
let app = express();
const db = require("./db");

let user = require('./controllers/usercontroller');

app.use(require('./middleware/headers'));
app.use(express.json());

const validateSession = require('./middleware/validateSession')


app.use ('/user',user);


db.authenticate()
  .then(() => db.sync())  // => (force: true)
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));  
  })
  .catch((err) => {console.log(err)
  })
