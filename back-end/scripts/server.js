import app from './app.js'
// Cette ligne permet d'éxécuter le code de connectBdd.js
import connection from './database/connectBdd.js';

app.listen(8081, () => {
  console.log("Server started ...");
});